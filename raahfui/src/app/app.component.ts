import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  title = 'Raahf';
  isSidenavOpen: boolean = false;
  constructor(public observer: BreakpointObserver) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if(res.matches) this.sidenav.mode = 'over';
      else this.sidenav.mode = 'side';
    });
  }
}
