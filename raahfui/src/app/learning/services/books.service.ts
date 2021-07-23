import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { apiUrls } from 'src/app/core/constants/apiUrls';
import { Book } from '../models/book.model';
import { Chapter } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }
  private booksSubject = new Subject<Book[]>();

  private books: Book[] = [
    new Book('devotion', 'Bhagavad Gita', 'VedaVyas', '< Kaliyug', 'Lord Krishna talks to Arjuna',
      'https://c8.alamy.com/comp/E63190003/painting-depicting-the-scene-in-bhagavad-gita-where-lord-krishna-enters-E63003.jpg',
      20, [
      new Chapter('Chapter 1', 'Description 1', ['Verse 1', 'Verse 2', 'Verse 3']),
      new Chapter('Chapter 2', 'Description 2', ['Verse 1', 'Verse 2', 'Verse 3']),
      new Chapter('Chapter 3', 'Description 3', ['Verse 1', 'Verse 2', 'Verse 3']),
      new Chapter('Chapter 4', 'Description 4', ['Verse 1', 'Verse 2', 'Verse 3']),
      new Chapter('Chapter 5', 'Description 5', ['Verse 1', 'Verse 2', 'Verse 3']),
      new Chapter('Chapter 6', 'Description 6', ['Verse 1', 'Verse 2', 'Verse 3']),
    ]),
  ];

  /*
  * Books Subject Listener
  */
  get booksListener() { return this.booksSubject.asObservable(); } 

  /*
  * Adds new Book to the Book[] array
  * nexts() the Books subject with a copy of the Books[] array
  */
  addBook(book: Book) {
    this.http.post(apiUrls.postBook, {book: book}).subscribe(
      (response) => {
        console.log(response);    
      },
      (error) => {
        console.log(error);
      }
    );
    this.books.push(book);
    this.booksSubject.next([...this.books]);
  }

  deleteBook(index: number) {
    this.books.splice(index, 1);
  }

  updateBook(index: number, updatedBook: Book) {
    this.books[index] = updatedBook;
  }

  getBooks() {
    return [...this.books];
  }
}
