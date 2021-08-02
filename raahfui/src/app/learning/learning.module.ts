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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LearningRoutingModule
  ]
})
export class LearningModule { }
