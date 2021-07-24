import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chapter } from 'src/app/learning/models/book.model';

@Component({
  selector: 'app-chapter-edit',
  templateUrl: './chapter-edit.component.html',
  styleUrls: ['./chapter-edit.component.css']
})
export class ChapterEditComponent implements OnInit {
  chapterForm!: FormGroup;
  isEditMode: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ChapterEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {chapter: Chapter, isCategoryDevotion: boolean }
  ) { }

  ngOnInit(): void {
    if(this.data.chapter) this.isEditMode = true;
    this.chapterForm = new FormGroup({
      chapterName: new FormControl(this.isEditMode ? this.data.chapter.chapterName : null , [Validators.required]),
      chapterDescription: new FormControl(this.isEditMode ? this.data.chapter.chapterDescription : null),
      keyPoints: new FormControl(this.isEditMode ? this.data.chapter.keyPoints : null)
    });
  }

  onSubmit() {
    this.dialogRef.close(this.chapterForm);
  }

}
