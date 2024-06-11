import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {VaikaDataSource} from '../datasources';
import {Car, CarRelations, Image} from '../models';
import {ImageRepository} from './image.repository';

export class CarRepository extends DefaultCrudRepository<
  Car,
  typeof Car.prototype.id,
  CarRelations
> {

  public readonly images: HasManyRepositoryFactory<Image, typeof Car.prototype.id>;

  constructor(
    @inject('datasources.vaika') dataSource: VaikaDataSource, @repository.getter('ImageRepository') protected imageRepositoryGetter: Getter<ImageRepository>,
  ) {
    super(Car, dataSource);
    this.images = this.createHasManyRepositoryFactoryFor('images', imageRepositoryGetter,);
    this.registerInclusionResolver('images', this.images.inclusionResolver);
  }
}
