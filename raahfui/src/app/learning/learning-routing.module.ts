import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditComponent } from './learning/books/book-edit/book-edit.component';
import { BooksComponent } from './learning/books/books.component';
import { GeographyComponent } from './learning/geography/geography.component';
import { HistoryComponent } from './learning/history/history.component';
import { LearningComponent } from './learning/learning.component';

const routes: Routes = [
  { path: '', component: LearningComponent, children: [
    { path: '', component: BooksComponent },
    { path: 'add', component: BookEditComponent },
    { path: 'geography', component: GeographyComponent },
    { path: 'history', component: HistoryComponent },
    { path: ':id', component: BookEditComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
