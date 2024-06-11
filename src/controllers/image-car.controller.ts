import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Image,
  Car,
} from '../models';
import {ImageRepository} from '../repositories';

export class ImageCarController {
  constructor(
    @repository(ImageRepository)
    public imageRepository: ImageRepository,
  ) { }

  @get('/images/{id}/car', {
    responses: {
      '200': {
        description: 'Car belonging to Image',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Car),
          },
        },
      },
    },
  })
  async getCar(
    @param.path.number('id') id: typeof Image.prototype.id,
  ): Promise<Car> {
    return this.imageRepository.belongs(id);
  }
}
