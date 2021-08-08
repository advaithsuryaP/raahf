import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/learning/models/book.model';
import { LibraryService } from 'src/app/learning/services/library.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
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

  toggleFavourite(bookId: string | null) {
    if(bookId) this.libraryService.toggleFavourite(bookId);
  }

  ngOnDestroy() {
    if(this.librarySubscription) this.librarySubscription.unsubscribe();
  }

}
