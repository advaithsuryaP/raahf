import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chapter } from 'src/app/learning/models/book.model';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  @Input() chapters!: Chapter[];
  @Output() selectedChapterEvent = new EventEmitter<Chapter>();
  selectedChapter!: Chapter;
  constructor() { }

  ngOnInit(): void {
  }

  emitSelectedChapter(chapter: Chapter) {
    this.selectedChapterEvent.emit(chapter);
  }

}
