import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { yugas } from 'src/app/core/constants/library/yugas';
import { Book, Chapter } from 'src/app/learning/models/book.model';
import { LibraryService } from 'src/app/learning/services/library.service';
import { ChapterEditComponent } from './chapter-edit/chapter-edit.component';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';


@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  private bookId!: string | null;
  private editableBook!: Book | undefined;
  isLoading!: boolean;
  isEditMode: boolean = false;
  isPanelOpen: boolean = true;
  isCategoryDevotion: boolean = false;
  bookForm!: FormGroup;
  oldTimelines: string[] = yugas;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        if (paramMap.has('bookId')) {
          this.isEditMode = true;
          this.bookId = paramMap.get('bookId');
          if (this.bookId) {
            this.libraryService.getBook(this.bookId).subscribe(
              (response) => {
                this.isLoading = false;
                if (response.fetchedBook) {
                  this.editableBook = new Book(
                    this.bookId,
                    response.fetchedBook.bookCategory,
                    response.fetchedBook.bookTitle,
                    response.fetchedBook.bookAuthor,
                    response.fetchedBook.bookTimeline,
                    response.fetchedBook.bookDescription,
                    response.fetchedBook.bookImage,
                    response.fetchedBook.bookStatus,
                    response.fetchedBook.chapters
                  );
                }
                this.initializeForm();
              },
              (error) => {
                console.log(error);
              }
            );
          }
        } else {
          this.isLoading = false;
          this.isEditMode = false;
          this.bookId = null;
          this.editableBook = undefined;
          this.initializeForm();
        }
      }
    );
    this.isCategoryDevotion = this.editableBook?.bookCategory === 'devotion' ? true : false;

  }  

  initializeForm() {
    console.log(this.editableBook);
    this.bookForm = this.fb.group({
      bookCategory: [this.isEditMode ? this.editableBook?.bookCategory : null, [Validators.required]],
      bookTitle: [this.isEditMode ? this.editableBook?.bookTitle : null, [Validators.required]],
      bookAuthor: [this.isEditMode ? this.editableBook?.bookAuthor : null, [Validators.required]],
      bookTimeline: [this.isEditMode ? this.editableBook?.bookTimeline : null, [Validators.required]],
      bookDescription: [this.isEditMode ? this.editableBook?.bookDescription : null],
      bookImage: [this.isEditMode ? this.editableBook?.bookImage : null],
      bookStatus: [this.isEditMode ? this.editableBook?.bookStatus : null],
      chapters: new FormArray([])
    });
    if (this.isEditMode && this.editableBook?.chapters) {
      for (const chapter of this.editableBook.chapters) {
        (<FormArray>this.bookForm.get('chapters')).push(
          new FormGroup({
            chapterName: new FormControl(chapter.chapterName, [Validators.required]),
            chapterDescription: new FormControl(chapter.chapterDescription),
            keyPoints: new FormControl(chapter.keyPoints)
          })
        )
      }
    }
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
      data: {
        isCategoryDevotion: this.isCategoryDevotion
      },
      height: '450px',
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result instanceof FormGroup) (<FormArray>this.bookForm.get('chapters')).push(result)
    });
  }

  /*
  * This function opens the ChapterEditComponent in a modal with pre-filled values
  * The FormArray 'chapters' is then updated with the new value  
  */
  openChapterEditModal(control: AbstractControl, elemIndex: number) {
    const dialogRef = this.dialog.open(ChapterEditComponent, {
      data: {
        chapter: control.value,
        isCategoryDevotion: this.isCategoryDevotion
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const newChapterArr: Chapter[] = [];
      if (result instanceof FormGroup) {
        this.chapterValues.forEach((element: Chapter, index: number) => {
          if (index === elemIndex) newChapterArr.push(result.value);
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
  saveBookToLibrary() {
    if (this.isEditMode && this.bookId) {
      const updatedBook = new Book(
        this.bookId,
        this.formValues.bookCategory,
        this.formValues.bookTitle,
        this.formValues.bookAuthor,
        this.formValues.bookTimeline,
        this.formValues.bookDescription,
        // this.formValues.bookImage,
        'https://c8.alamy.com/comp/E63190003/painting-depicting-the-scene-in-bhagavad-gita-where-lord-krishna-enters-E63003.jpg',
        this.formValues.bookStatus,
        this.formValues.chapters
      )
      this.libraryService.updateBook(this.bookId, updatedBook);
    } else {
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
    }
    this.router.navigate(['/learning/library']);
  }

  /*
  * This function is called when user selects a value from Book Category Dropdown  
  */
  onCategorySelect(event: MatSelectChange) {
    if (event.value === 'devotion') this.isCategoryDevotion = true;
    else {
      this.isCategoryDevotion = false;
      this.bookForm.get('bookTimeline')?.markAsUntouched();
    }
  }
}
