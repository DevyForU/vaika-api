import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {VaikaDataSource} from '../datasources';
import {Image, ImageRelations, Car} from '../models';
import {CarRepository} from './car.repository';

export class ImageRepository extends DefaultCrudRepository<
  Image,
  typeof Image.prototype.id,
  ImageRelations
> {

  public readonly belongs: BelongsToAccessor<Car, typeof Image.prototype.id>;

  constructor(
    @inject('datasources.vaika') dataSource: VaikaDataSource, @repository.getter('CarRepository') protected carRepositoryGetter: Getter<CarRepository>,
  ) {
    super(Image, dataSource);
    this.belongs = this.createBelongsToAccessorFor('belongs', carRepositoryGetter,);
    this.registerInclusionResolver('belongs', this.belongs.inclusionResolver);
  }
}
