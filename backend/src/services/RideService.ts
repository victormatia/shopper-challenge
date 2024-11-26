import { Ride } from '@prisma/client';
import GenericModel from '../models/GenericModel';
import { TEstimateRequestInput } from '../types';
import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import InternalServerError from '../Error/InternalServerError';
import ApiError from '../Error/ApiError';

const mapsClient = new Client();

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

      const legs = data.routes[0].legs[0];

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
        options: [],
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