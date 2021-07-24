import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningGeographyComponent } from './learning/learning-geography/learning-geography.component';
import { LearningHistoryComponent } from './learning/learning-history/learning-history.component';
import { LearningHomeComponent } from './learning/learning-home/learning-home.component';
import { BookEditComponent } from './learning/learning-library/book-edit/book-edit.component';
import { LearningLibraryComponent } from './learning/learning-library/learning-library.component';
import { LearningComponent } from './learning/learning.component';

const routes: Routes = [
  { path: '', component: LearningComponent, children: [
    { path: '', component: LearningHomeComponent },
    { path: 'library', component: LearningLibraryComponent },
    { path: 'history', component: LearningHistoryComponent },
    { path: 'geography', component: LearningGeographyComponent },
    { path: 'add', component: BookEditComponent },
    { path: ':id', component: BookEditComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule { }
