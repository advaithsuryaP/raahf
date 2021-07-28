import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { apiUrls } from 'src/app/core/constants/apiUrls';
import { Book, Chapter } from '../models/book.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(private http: HttpClient) { }
  private booksSubject = new Subject<Book[]>();

  private library: Book[] = [];

  /*
  * Books Subject Listener
  */
  get booksListener() { return this.booksSubject.asObservable(); }

  /*
  * Adds new Book to the Book[] array
  * nexts() the Books subject with a copy of the Books[] array
  */
  addBook(book: Book) {
    this.http.post<{ message: string, addedBookId: string }>(apiUrls.library, book).subscribe(
      (response) => {
        book.bookId = response.addedBookId;
        this.library.push(book);
        this.booksSubject.next([...this.library]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeBook(bookId: string) {
    this.http.delete<{ message: string }>(`${apiUrls.library}/${bookId}`)
      .subscribe(
        (response) => {
          this.library = this.library.filter(book => book.bookId !== bookId);
          this.booksSubject.next([...this.library]);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateBook(bookId: string, updatedBook: Book) {
    this.http.put<{message: string}>(`${apiUrls.library}/${bookId}`, updatedBook)
      .subscribe(
        (response) => {
          const updatedLibrary = [...this.library];
          const oldBookIndex = updatedLibrary.findIndex(b => b.bookId === bookId);
          updatedLibrary[oldBookIndex] = updatedBook;
          this.library = updatedLibrary;
          this.booksSubject.next([...this.library]);
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
          return response.books.map((book: { _id: string; bookCategory: 'finance' | 'devotion' | 'entrepreneurship'; bookTitle: string; bookAuthor: string; bookTimeline: string; bookDescription: string; bookImage: string; bookStatus: number; chapters: Chapter[]; }) => {
            return new Book(
              book._id, book.bookCategory, book.bookTitle, book.bookAuthor, book.bookTimeline, book.bookDescription, book.bookImage, book.bookStatus,
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
    return this.http.get<{message: string, fetchedBook: Book | null}>(`${apiUrls.library}/${bookId}`);
  }
}
