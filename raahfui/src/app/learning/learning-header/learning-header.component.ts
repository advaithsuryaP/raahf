import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learning-header',
  templateUrl: './learning-header.component.html',
  styleUrls: ['./learning-header.component.css']
})
export class LearningHeaderComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void { }
  
  goBack(): void {
    this.location.back();
  }
}