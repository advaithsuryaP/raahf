import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { apiUrls } from 'src/app/core/constants/apiUrls';
import { Book, Chapter } from '../models/book.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  private booksSubject = new Subject<Book[]>();

  private library: Book[] = [];

  /*
  * Books Subject Listener
  */
  get booksListener() { return this.booksSubject.asObservable(); }

  /*
  * Sends POST request with book:Book parameter as data
  * On success, the book is added to the library
  * nexts() a copy of library
  */
  addBook(book: Book) {
    this.http.post<{ message: string, addedBookId: string }>(apiUrls.library, book).subscribe(
      (response) => {
        book.bookId = response.addedBookId;
        this.library.push(book);
        this.booksSubject.next([...this.library]);
        this.router.navigate(['/learning/library']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /*
  * Sends DELETE request with bookId 
  * On success, the particular book is removed from local variable "library"
  * nexts() a copy of the library
  */
  removeBook(bookId: string) {
    this.http.delete<{ message: string }>(`${apiUrls.library}/${bookId}`)
      .subscribe(
        (_response) => {
          this.library = this.library.filter(book => book.bookId !== bookId);
          this.booksSubject.next([...this.library]);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /*
  * Sends a PUT request with bookId and updatedBook
  * On success, the book is updated in the library
  * nexts() a copy of the library
  */
  updateBook(bookId: string, updatedBook: Book) {
    this.http.put<{ message: string }>(`${apiUrls.library}/${bookId}`, updatedBook)
      .subscribe(
        (_response) => {
          const updatedLibrary = [...this.library]; // A copy of the library is taken into "updatedLibrary"
          const oldBookIndex = updatedLibrary.findIndex(b => b.bookId === bookId); // We find the index of the book to be updated
          updatedLibrary[oldBookIndex] = updatedBook; // New book is updated in the new index in "updatedLibrary"
          this.library = updatedLibrary;
          this.booksSubject.next([...this.library]);
          this.router.navigate(['/learning/library']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getBooks() {
    this.http.get<{ message: string, books: any }>(apiUrls.library)
      .pipe(
        map(response => {
          return response.books.map((book: {
            _id: string; bookCategory: 'finance' | 'devotion' | 'entrepreneurship';
            bookTitle: string;
            bookAuthor: string;
            bookTimeline: string;
            bookDescription: string;
            bookImage: string;
            bookStatus: number;
            isBookLiked: boolean,
            chapters: Chapter[];
          }) => {
            return new Book(
              book._id,
              book.bookCategory,
              book.bookTitle,
              book.bookAuthor,
              book.bookTimeline,
              book.bookDescription,
              book.bookImage,
              book.bookStatus,
              book.isBookLiked,
              book.chapters
            );
          });
        })
      )
      .subscribe(
        (response: Book[]) => {
          this.library = response;
          this.booksSubject.next([...this.library]);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getBook(bookId: string) {
    return this.http.get<{ message: string, fetchedBook: Book | null }>(`${apiUrls.library}/${bookId}`);
  }

  toggleFavourite(bookId: string) {
    this.http.put<{message: string, result: any}>(`${apiUrls.library}/${bookId}/toggleFavourite`, null)
    .subscribe(
      (_response) => {
        const updatedLibrary = [...this.library];
        const oldBookIndex = updatedLibrary.findIndex(b => b.bookId === bookId);
        updatedLibrary[oldBookIndex].isBookLiked = !updatedLibrary[oldBookIndex].isBookLiked;
        this.library = updatedLibrary; 
        this.booksSubject.next([...this.library]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
