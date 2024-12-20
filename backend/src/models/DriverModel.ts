import { Driver, PrismaClient } from '@prisma/client';
import GenericModel from './GenericModel';

class DriverModel extends GenericModel<Driver> {
  constructor(private _orm: PrismaClient) {
    super();
  }

  public async getById(id: string | number): Promise<Driver | null> {
    return await this._orm.driver.findUnique({ where: { id: +id } });
  }

  public async getMany(filter: Partial<Driver>): Promise<Driver[]> {
    console.log(filter);
    return await this._orm.driver.findMany({ 
      where: { minKm: { lte: filter.minKm  } },
      include: { 
        review: {
          select: {
            rating: true,
            comment: true, 
          },
        }, 
      },
    });
  }
}

export default DriverModel;