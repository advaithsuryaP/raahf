import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../../models/book.model';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-learning-library',
  templateUrl: './learning-library.component.html',
  styleUrls: ['./learning-library.component.css']
})
export class LearningLibraryComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { 
  }

}
