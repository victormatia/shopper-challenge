import jwt from 'jsonwebtoken';

class JWT {
  private _sercret = process.env.SECRET as string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public createToken(payload: any) {
    return jwt.sign(payload, this._sercret, { algorithm: 'HS256', expiresIn: '7d' });

  }

  public verifyToken(token: string) {
    return jwt.verify(token, this._sercret);
  }
}

export default new JWT();