import { Repository, EntityRepository } from 'typeorm'
import { Compliment } from '../entities/Compliments'

@EntityRepository(Compliment)
class ComplimentRepository extends Repository<Compliment> {

}

export { ComplimentRepository }
