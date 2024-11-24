import { USUARIO } from '@prisma/client';
import GenericModel from '../models/GenericModel';
import NotFoundError from '../Error/NotFoundError';
import NotAuthorizedError from '../Error/NotAuthorizedError';
import JWT from '../Auth/JWT';

class UserService {
  constructor(private _model: GenericModel<USUARIO>) {}

  public async  authenticate(user: USUARIO) {

    const userExists = await this._model.getBy({ NOME: user.NOME } as USUARIO);

    if (!userExists) throw new NotFoundError('User not found');

    else if (user.SENHA !== userExists.SENHA) throw new NotAuthorizedError('Incorrect password');

    const { NOME, NOMECOMPLETO, USUARIO } = userExists;

    return { token: JWT.createToken({ USUARIO, NOME, NOMECOMPLETO }) };
  }
}

export default UserService;