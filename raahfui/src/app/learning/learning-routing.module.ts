import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningGeographyComponent } from './learning/learning-geography/learning-geography.component';
import { LearningHistoryComponent } from './learning/learning-history/learning-history.component';
import { LearningHomeComponent } from './learning/learning-home/learning-home.component';
import { BookDetailComponent } from './learning/learning-library/book-detail/book-detail.component';
import { BookEditComponent } from './learning/learning-library/book-edit/book-edit.component';
import { BookListComponent } from './learning/learning-library/book-list/book-list.component';
import { LearningLibraryComponent } from './learning/learning-library/learning-library.component';
import { LearningComponent } from './learning/learning.component';

const routes: Routes = [
  { path: '', component: LearningComponent, children: [
    { path: '', component: LearningHomeComponent },
    { path: 'library', component: LearningLibraryComponent, children: [
      { path: '', component: BookListComponent },
      { path: 'add', component: BookEditComponent },
      { path: 'edit/:bookId', component: BookEditComponent },
      { path: ':bookId', component:  BookDetailComponent }
    ] },
    { path: 'history', component: LearningHistoryComponent },
    { path: 'geography', component: LearningGeographyComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
