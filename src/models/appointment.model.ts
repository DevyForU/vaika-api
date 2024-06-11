import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Appointment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @property({
    type: 'date',
    default: now(),
  })
  appointment_date?: string;

  @property({
    type: 'string',
    default: 'unknow',
  })
  status?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}

export interface AppointmentRelations {
  // describe navigational properties here
}

export type AppointmentWithRelations = Appointment & AppointmentRelations;
function now(): String {
  return new Date().toISOString();
}

