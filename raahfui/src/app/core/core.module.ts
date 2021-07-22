import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { PageNotFoundComponent } from './view/page-not-found/page-not-found.component';
import { SidebarComponent } from './view/sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [
    SidebarComponent,
    PageNotFoundComponent,
  ]
})
export class CoreModule { }
