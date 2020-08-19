import {
  controller, httpGet, httpPost, httpDelete, httpPatch, httpPut,
  BaseHttpController, requestParam, requestBody
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserRepository } from '../repositories/user.repository';
import { type } from '../config';
import { User } from '../models/user.model';
import { JsonResult } from 'inversify-express-utils/dts/results';
import { NotFoundException } from '../exceptions';

@controller('/users', type.AuthMiddleware)
export class UserController extends BaseHttpController {
  private readonly userRepository: UserRepository;

  constructor (@inject(type.UserRepository) userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  @httpGet('/')
  public async all (): Promise<JsonResult> {
    try {
      const users = await this.userRepository.all();
      return this.json(users);
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }

  @httpGet('/:id')
  public async find (@requestParam('id') id: number): Promise<JsonResult> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) throw new NotFoundException();
      return this.json(user);
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }

  @httpPost('/')
  public async create (@requestBody() data: User): Promise<JsonResult> {
    try {
      const user = await this.userRepository.create(data);
      return this.json(user, 201);
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }

  @httpPut('/:id')
  public async update (@requestParam('id') id: number, @requestBody() data: User): Promise<JsonResult> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) throw new NotFoundException();
      const updated = await this.userRepository.update(user, data);
      return this.json(updated);
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }

  @httpDelete('/:id')
  public async remove (@requestParam('id') id: number): Promise<JsonResult> {
    try {
      const user = await this.userRepository.remove(id);
      return this.json(user);
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }

  @httpPatch('/:id')
  public async restore (@requestParam('id') id: number): Promise<JsonResult> {
    try {
      const user = await this.userRepository.restore(id);
      return this.json(user);
    } catch (error) {
      return this.json({ status: error.status, message: error.message }, error.status);
    }
  }
}
