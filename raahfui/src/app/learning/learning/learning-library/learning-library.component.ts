import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book.model';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-learning-library',
  templateUrl: './learning-library.component.html',
  styleUrls: ['./learning-library.component.css']
})
export class LearningLibraryComponent implements OnInit, OnDestroy {
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
