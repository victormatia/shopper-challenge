export type TEstimateRequestInput = {
  customer_id: string,
  origin: string,
  destination: string
}

export type TCreateRideInput = {
  // o requisito não especifica qual padrão o id do usuário terá. 
  // Encontra ponto com os ids dos motoristas, que são em autoincremento(number),
  // esse da-se a entender que é um uuid
  'customer_id': string,
  'origin': string,
  'destination': string,
  'distance': number,
  'duration': string,
  'driver': {
    'id': number,
    'name': string
  },
  'value': number
 }

export type TGetRidesInput = { customerId: number, driverId?: number}
 