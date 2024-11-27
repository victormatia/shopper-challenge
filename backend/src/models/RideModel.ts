import { PrismaClient, Ride } from '@prisma/client';
import GenericModel from './GenericModel';

class RideModel extends GenericModel<Ride> {
  constructor(private _orm: PrismaClient) {
    super();
  }

  public async create(data: Ride): Promise<Ride> {
    return await this._orm.ride.create({ data });
  }

  public async getMany(filter: Partial<Ride>): Promise<Ride[]> {
    return await this._orm.ride.findMany({ 
      where: filter,
      select: {
        id: true,
        customerId: true,
        date: true,
        origin: true,
        destination: true,
        distance: true,
        duration: true,
        driver: { select: { id: true, name: true } },
        value: true,   
      },
    }) as unknown as Ride[];
  }
}

export default RideModel;