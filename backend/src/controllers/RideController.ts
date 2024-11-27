import { TEstimateRequestInput } from '../types';
import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../Error/BadRequestError';
import RideService from '../services/RideService';

class RideController {
  constructor(private _service: RideService) {}

  public async estimate(req: Request, res: Response, next: NextFunction) {
    try {
      const { customer_id, origin, destination } = req.body;

      if (!customer_id || !origin || !destination) {
        throw new BadRequestError('The data provided is invalid');
      }

      const estimateInput: TEstimateRequestInput = {
        customer_id,
        origin,
        destination: destination,
      };

      const response = await this._service.estimate(estimateInput);

      res.status(200).json(response);

    } catch(e) {
      console.log(e);
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { customer_id, origin, destination } = req.body;

      if (!customer_id || !origin || !destination) {
        throw new BadRequestError('The data provided is invalid');
      }

      if (origin === destination) {
        throw new BadRequestError('The data provided is invalid');
      }

      const response = await this._service.create(req.body);

      res.status(200).json(response);

    } catch(e) {
      console.log(e);
      next(e);
    }
  }

  public async getMany(req: Request, res: Response, next: NextFunction) {
    try {
      const { customer_id } = req.params;
      const { driver_id } = req.query;

      if (!customer_id || isNaN(Number(customer_id))) throw new BadRequestError('The data provided is invalid');

      if (driver_id && !isNaN(Number(driver_id))) {
        const response = await this._service.getMany({ customerId: +customer_id, driverId: +driver_id });

        return res.status(200).json(response);
      } 
      const response = await this._service.getMany({ customerId: +customer_id });

      res.status(200).json(response);
    } catch(e) {
      next(e);
    }
  }
}

export default RideController;