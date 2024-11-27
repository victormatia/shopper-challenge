import { Ride } from '@prisma/client';
import GenericModel from '../models/GenericModel';
import { TEstimateRequestInput } from '../types';
import { TravelMode } from '@googlemaps/google-maps-services-js';
import InternalServerError from '../Error/InternalServerError';
import ApiError from '../Error/ApiError';
import DriverModel from '../models/DriverModel';
import prisma from '../libs/PrismaClient';
import { Decimal } from '@prisma/client/runtime/library';
import mapsClient from '../libs/mapsClients';

class RideService {
  private GOOGLE_API_KEY?: string;

  constructor(private _model: GenericModel<Ride>) {
    this.GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  }
  
  public async estimate(input: TEstimateRequestInput) {
    try {
      if (!this.GOOGLE_API_KEY) {
        throw new InternalServerError('Google api key are missing');
      }

      const params = {
        origin: input.origin,
        destination: input.destination,
        mode: TravelMode.driving,
        key: this.GOOGLE_API_KEY,
      };

      const { data } = await mapsClient.directions({ params });

      const driverModel = new DriverModel(prisma);

      const legs = data.routes[0].legs[0];

      const distanceInKilometers = new Decimal(legs.distance.value / 1000);

      const driversAvailable = await driverModel.getMany({ minKm: distanceInKilometers });

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
        duration: legs.duration.value,
        options: driversAvailableFormatedAndSorted,
        routeResponse: data,
      };

      return reponse;
    } catch(e) {
      if (e instanceof ApiError) {
        throw new InternalServerError(e.message);
      } else {
        throw new InternalServerError('Some internal error has occurred');
      }
    }
  }
}

export default RideService;