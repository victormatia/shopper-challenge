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
}

export default RideController;