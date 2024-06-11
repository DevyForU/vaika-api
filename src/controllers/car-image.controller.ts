import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Car,
  Image,
} from '../models';
import {CarRepository} from '../repositories';

export class CarImageController {
  constructor(
    @repository(CarRepository) protected carRepository: CarRepository,
  ) { }

  @get('/cars/{id}/images', {
    responses: {
      '200': {
        description: 'Array of Car has many Image',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Image)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Image>,
  ): Promise<Image[]> {
    return this.carRepository.images(id).find(filter);
  }

  @post('/cars/{id}/images', {
    responses: {
      '200': {
        description: 'Car model instance',
        content: {'application/json': {schema: getModelSchemaRef(Image)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Car.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {
            title: 'NewImageInCar',
            exclude: ['id'],
            optional: ['car_id']
          }),
        },
      },
    }) image: Omit<Image, 'id'>,
  ): Promise<Image> {
    return this.carRepository.images(id).create(image);
  }

  @patch('/cars/{id}/images', {
    responses: {
      '200': {
        description: 'Car.Image PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {partial: true}),
        },
      },
    })
    image: Partial<Image>,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.carRepository.images(id).patch(image, where);
  }

  @del('/cars/{id}/images', {
    responses: {
      '200': {
        description: 'Car.Image DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.carRepository.images(id).delete(where);
  }
}
