import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LearningRoutingModule } from './learning-routing.module';

import { LearningComponent } from './learning/learning.component';
import { LearningHomeComponent } from './learning/learning-home/learning-home.component';
import { BookEditComponent } from './learning/learning-library/book-edit/book-edit.component';
import { LearningLibraryComponent } from './learning/learning-library/learning-library.component';
import { LearningGeographyComponent } from './learning/learning-geography/learning-geography.component';
import { LearningHistoryComponent } from './learning/learning-history/learning-history.component';
import { ChapterEditComponent } from './learning/learning-library/book-edit/chapter-edit/chapter-edit.component';
import { LearningHeaderComponent } from './learning/learning-header/learning-header.component';
import { BookListComponent } from './learning/learning-library/book-list/book-list.component';
import { BookFilterComponent } from './learning/learning-library/book-filter/book-filter.component';
import { BookDetailComponent } from './learning/learning-library/book-detail/book-detail.component';
import { ChapterListComponent } from './learning/learning-library/book-detail/chapter-list/chapter-list.component';
import { ChapterDetailComponent } from './learning/learning-library/book-detail/chapter-detail/chapter-detail.component';


@NgModule({
  declarations: [
    BookEditComponent,
    LearningComponent,
    ChapterEditComponent,
    LearningHomeComponent,
    LearningHeaderComponent,
    LearningHistoryComponent,
    LearningLibraryComponent,
    LearningGeographyComponent,
    BookListComponent,
    BookFilterComponent,
    BookDetailComponent,
    ChapterListComponent,
    ChapterDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LearningRoutingModule
  ]
})
export class LearningModule { }
