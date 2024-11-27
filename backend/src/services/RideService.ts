import { Driver, Ride } from '@prisma/client';
import GenericModel from '../models/GenericModel';
import { TCreateRideInput, TEstimateRequestInput } from '../types';
import { TravelMode } from '@googlemaps/google-maps-services-js';
import InternalServerError from '../Error/InternalServerError';
import DriverModel from '../models/DriverModel';
import prisma from '../libs/PrismaClient';
import { Decimal } from '@prisma/client/runtime/library';
import mapsClient from '../libs/mapsClients';
import NotFoundError from '../Error/NotFoundError';
import NotAcceptable from '../Error/NotAcceptable';

class RideService {
  private GOOGLE_API_KEY?: string;
  private _driverModel: GenericModel<Driver>;

  constructor(private _model: GenericModel<Ride>) {
    this.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    this._driverModel = new DriverModel(prisma);
  }
  
  public async estimate(input: TEstimateRequestInput) {
    if (!this.GOOGLE_API_KEY) throw new InternalServerError('Google api key are missing');

    const params = {
      origin: input.origin,
      destination: input.destination,
      mode: TravelMode.driving,
      key: this.GOOGLE_API_KEY,
    };

    const { data } = await mapsClient.directions({ params });

    const legs = data.routes[0].legs[0];

    const distanceInKilometers = new Decimal(legs.distance.value / 1000);

    const driversAvailable = await this._driverModel.getMany({ minKm: distanceInKilometers });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const driversAvailableFormatedAndSorted = driversAvailable.map(({ feePerKm, minKm, ...driver }) => {
      return {
        ...driver,
        value: Number(feePerKm) * Number(distanceInKilometers),
      };}).sort((a, b) => a.value - b.value);

    const reponse = {
      origin: {
        latitude: legs.start_location.lat,
        longitude: legs.start_location.lng,
      },
      destination: {
        latitude: legs.end_location.lat,
        longitude: legs.end_location.lng, 
      },
      distance: legs.distance.value,
      duration: legs.duration.text,
      options: driversAvailableFormatedAndSorted,
      routeResponse: data,
    };

    return reponse;
  }

  public async create(input: TCreateRideInput) {
    const driver = await this._driverModel.getById(input.driver.id );

    if (!driver) throw new NotFoundError('Driver not found');

    if (+driver.minKm < input.distance) throw new NotAcceptable('Invalid mileage for the driver');

    const data: Ride = {
      origin: input.origin,
      destination: input.destination,
      duration: input.duration,
      value: input.value,
      date: new Date(),
      customerId: +input.customer_id,
      driverId: input.driver.id,
      distance: new Decimal(input.distance),
    } as  unknown as Ride;
  
    await this._model.create(data);

    return { success: true };
  }

}

export default RideService;