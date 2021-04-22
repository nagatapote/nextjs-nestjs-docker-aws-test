import { NotFoundException } from "@nestjs/common"
import { Args, Int, Mutation, Query,Resolver } from '@nestjs/graphql';
import { Book } from "./book"
import { BooksService } from "./books.service"
import { newBookInput } from "./dto/newBook.input"

@Resolver((of) => Book)
export class BooksResolver {
    constructor(private booksService: BooksService){}

    @Query((returns) => [Book])
    books(): Promise<Book[]>{
        return this.booksService.findAll();
    }

    @Query((returns) => Book)
    async getBook(@Args({ name: "id", type: () => Int }) id: number) {
        const book = await this.booksService.findOneById(id);
        if(!book) {
            throw new NotFoundException(id);
        }
        return book;
    }

    @Mutation((returns) => Book)
    addBook(@Args("newBook") newBook: newBookInput): Promise<Book> {
        return this.booksService.create(newBook);
    }

    @Mutation((returns) => Boolean)
    async removeBook(@Args( {name: "id",type: () => Int }) id: number) {
        return this.booksService.remove(id)
    }
}
