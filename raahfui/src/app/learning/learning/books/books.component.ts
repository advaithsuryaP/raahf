import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book.model';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  library: Book[] = [];
  librarySubscription?: Subscription;
  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void { 
    this.libraryService.getBooks();
    this.librarySubscription = this.libraryService.booksListener
    .subscribe(
      (data) => {
        this.library = data;
      },
    );
  }

  onDelete(bookId: string | null) {
    if(bookId) this.libraryService.removeBook(bookId);
  }

  ngOnDestroy() {
    if(this.librarySubscription) this.librarySubscription.unsubscribe();
  }
}
