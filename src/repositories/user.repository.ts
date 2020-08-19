import { Repository, getRepository, DeepPartial, UpdateResult } from 'typeorm';
import { User } from '../models/user.model';
import { injectable } from 'inversify';

@injectable()
export class UserRepository {
  private repository: Repository<User>

  constructor () {
    this.repository = getRepository(User);
  }

  public async all (): Promise<User[]> {
    return this.repository.find();
  }

  public async findByEmail (email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }

  public async findById (id: number | string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  public async create (user: DeepPartial<User>): Promise<User> {
    const created = this.repository.create(user);
    return this.repository.save(created);
  }

  public async update (user: User, updatedData: DeepPartial<User>): Promise<User> {
    return this.repository.save({ ...user, ...updatedData });
  }

  public async remove (id: number | string): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }

  public async restore (id: number | string): Promise<UpdateResult> {
    return this.repository.restore(id);
  }
}
