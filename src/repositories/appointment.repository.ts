import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {VaikaDataSource} from '../datasources';
import {Appointment, AppointmentRelations} from '../models';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.id,
  AppointmentRelations
> {
  constructor(
    @inject('datasources.vaika') dataSource: VaikaDataSource,
  ) {
    super(Appointment, dataSource);
  }
}
