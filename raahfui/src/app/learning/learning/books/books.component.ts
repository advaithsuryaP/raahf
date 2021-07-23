import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  booksSubscription?: Subscription;
  constructor(private booksService: BooksService) { }

  ngOnInit(): void { 
    this.booksService.getBooks();
    this.booksSubscription = this.booksService.booksListener
    .subscribe(
      (books: Book[]) => {
        this.books = books;
      },
    );
  }

  onDelete(index: string | null) {
    if(index) this.booksService.removeBook(index);
  }

  ngOnDestroy() {
    if(this.booksSubscription) this.booksSubscription.unsubscribe();
  }
}
