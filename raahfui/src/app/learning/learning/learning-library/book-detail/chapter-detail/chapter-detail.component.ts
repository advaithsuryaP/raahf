import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/learning/models/book.model';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.css']
})
export class ChapterDetailComponent implements OnInit {
  @Input() selectedChapter!: Chapter | null;
  constructor() { }

  ngOnInit(): void {
    
  }

}
