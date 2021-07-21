import { Component, OnInit } from '@angular/core';
import { SidebarRouteInfo } from '../../models/sidebar-routes.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  routeInfo!: SidebarRouteInfo[];
  constructor() { }

  ngOnInit(): void {
    this.routeInfo = [
      { path: 'dashboard', title: 'Dashboard', icon: 'desktop_windows', color: 'crimson' },
      { path: 'finance', title: 'Finance', icon: 'account_balance', color: 'dodgerblue'},
      { path: 'goals', title: 'Goals', icon: 'check_circle', color: 'coral' },
      { path: 'health', title: 'Health', icon: 'verified_user', color: 'blueviolet' },
      { path: 'learning', title: 'Learning', icon: 'school', color: 'turquoise' },
      { path: 'security', title: 'Security', icon: 'fingerprint', color: 'forestgreen' },
    ];
  }
}
