import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Book, Chapter } from 'src/app/learning/models/book.model';
import { LibraryService } from 'src/app/learning/services/library.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book!: Book;
  selectedChapter!: Chapter;
  isBookFetched: boolean = false;
  constructor(
    private libraryService: LibraryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.libraryService.getBook(params.get('bookId'));
      })
    ).subscribe((result) => {
      if(result.fetchedBook) {
        this.book = result.fetchedBook;
        this.isBookFetched = true;
      }
    });
  }

  handleSelectedChapter(chapter: Chapter) {
    this.selectedChapter = chapter;
  }

}
