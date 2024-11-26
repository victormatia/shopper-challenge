import { PrismaClient, Ride } from '@prisma/client';
import GenericModel from './GenericModel';

class RideModel extends GenericModel<Ride> {
  constructor(private _orm: PrismaClient) {
    super();
  }

  public async create(data: Ride): Promise<Ride> {
    return await this._orm.ride.create({ data });
  }

  // public async getAll(): Promise<Ride[]> {
  //   return await this._orm.ride.findMany({include: { driver: true }});
  // }
}

export default RideModel;