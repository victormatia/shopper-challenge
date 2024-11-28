export type TEstimateRequestInput = {
  customer_id: number;
  origin: string;
  destination: string;
};

export type TEstimateResponse = {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
  options: TDriver[];
  routeResponse: TRouteResponse;
};

export type TRouteResponse = {
  routes: {
    legs: {
      distance: {
        value: number;
      };
      duration: {
        text: string;
      };
      end_address: string;
      start_address: string;
    }[];
  }[];
};

export type TDriver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: TReview[];
  value: number;
};

export type TReview = {
  rating: number;
  comment: string;
};
