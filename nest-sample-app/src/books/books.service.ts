import { Injectable } from '@nestjs/common';
import { Book } from './book';
import { newBookInput } from './dto/newBook.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOneById(id: number): Promise<Book> {
    return this.booksRepository.findOne(id);
  }

  async create(data: newBookInput): Promise<Book> {
    const book = this.booksRepository.create(data);
    await this.booksRepository.save(book);
    return book;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepository.delete(id);
    return result.affected > 0;
  }
}
