import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Car extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  engine: string;

  @property({
    type: 'number',
    required: true,
  })
  placeNumber: number;

  @property({
    type: 'number',
    required: true,
  })
  power: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Car>) {
    super(data);
  }
}

export interface CarRelations {
  // describe navigational properties here
}

export type CarWithRelations = Car & CarRelations;
