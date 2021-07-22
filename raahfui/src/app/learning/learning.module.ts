import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LearningRoutingModule } from './learning-routing.module';

import { BooksComponent } from './learning/books/books.component';
import { LearningComponent } from './learning/learning.component';
import { HistoryComponent } from './learning/history/history.component';
import { GeographyComponent } from './learning/geography/geography.component';
import { BookEditComponent } from './learning/books/book-edit/book-edit.component';
import { LearningHeaderComponent } from './learning-header/learning-header.component';
import { BookDetailComponent } from './learning/books/book-detail/book-detail.component';
import { ChapterEditComponent } from './learning/books/book-edit/chapter-edit/chapter-edit.component';


@NgModule({
  declarations: [
    LearningComponent,
    LearningHeaderComponent,
    GeographyComponent,
    HistoryComponent,
    BooksComponent,
    BookEditComponent,
    BookDetailComponent,
    ChapterEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LearningRoutingModule
  ]
})
export class LearningModule { }
