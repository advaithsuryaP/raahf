import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book, Chapter } from 'src/app/learning/models/book.model';
import { ChapterEditComponent } from './chapter-edit/chapter-edit.component';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/learning/services/library.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  isPanelOpen = true;
  bookForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.bookForm = this.fb.group({
      bookCategory: [null, [Validators.required]],
      bookTitle: [null, [Validators.required]],
      bookAuthor: [null, [Validators.required]],
      bookTimeline: [null, [Validators.required]],
      bookDescription: [null],
      bookImage: [null],
      bookStatus: [20], // Prepare UI for this
      chapters: new FormArray([])
    });
  }

  get chapters() { return (<FormArray>this.bookForm.get('chapters')).controls; }
  get formValues() { return this.bookForm.value };
  get chapterValues() { return (<FormArray>this.bookForm.get('chapters')).value; }

  /*
  * This function opens the ChapterEditComponent in a modal
  * The values filled in the modal gets added to the chapters Array
  */
  openChapterAddModal(event: MouseEvent): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ChapterEditComponent, {
      height: '450px',
      width: '550px',
    }); 
    dialogRef.afterClosed().subscribe((result) => {
      if(result instanceof FormGroup) (<FormArray>this.bookForm.get('chapters')).push(result)
    });
  }

  /*
  * This function opens the ChapterEditComponent in a modal with pre-filled values
  * The FormArray 'chapters' is then updated with the new value  
  */
  openChapterEditModal(control: AbstractControl, elemIndex: number) {
    const dialogRef = this.dialog.open(ChapterEditComponent, {
      data: control.value,
    });
    dialogRef.afterClosed().subscribe((result) => {
      const newChapterArr: Chapter[] = [];
      if(result instanceof FormGroup) {
        this.chapterValues.forEach((element: Chapter, index: number) => {
          if(index === elemIndex) newChapterArr.push(result.value);
          else newChapterArr.push(element);
        }); 
      }
      this.bookForm.get('chapters')?.patchValue(newChapterArr);
    });
  }

  /*
  * This function is called to delete the FormGroup Element from the 'chapters' FormArray using the index 
  */
  deleteChapter(index: number): void {
    (<FormArray>this.bookForm.get('chapters')).removeAt(index);
  }

  /*
  * This function submits the whole form and adds the book to the library
  */
  addBookToLibrary() {
    const book = new Book(
      null,
      this.formValues.bookCategory, 
      this.formValues.bookTitle,
      this.formValues.bookAuthor,
      this.formValues.bookTimeline,
      this.formValues.bookDescription,
      // this.formValues.bookImage,
      'https://c8.alamy.com/comp/E63190003/painting-depicting-the-scene-in-bhagavad-gita-where-lord-krishna-enters-E63003.jpg',
      this.formValues.bookStatus,
      this.formValues.chapters
    );
    this.libraryService.addBook(book);
    this.router.navigate(['/learning/library']);
  }
}
