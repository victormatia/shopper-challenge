import express, { Express, NextFunction, Request, Response } from 'express';
// import userRoutes from './routes/UserRoutes';
import { errorMiddleware } from './middlewares/ErrorMiddleware';
// import authMiddleware from './middlewares/authMiddleware';
import rideRouter from './routes/ride.routes';

class App {
  private _server: Express;

  constructor() {
    this._server = express();
    this.config();
    this.router();
  }
  
  private router() {
    // test route
    this._server.get('/test', (_req, res) => res.status(200).json({ status: 'OK test' }));

    // authenticate route
    // this._server.use(authMiddleware);
    
    // others routes here
    this._server.use('/ride', rideRouter);

    this._server.use(errorMiddleware);
  }

  private config():void {
    const accessControl = (_req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this._server.use(express.json());
    this._server.use(accessControl);
  }

  init(port: number | string): void {
    this._server.listen(port, () => console.log('Server running on port ' + port));
  } 
}

export default App;