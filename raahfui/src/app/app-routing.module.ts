import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'finance', loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)},
  { path: 'goals', loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule)},
  { path: 'health', loadChildren: () => import('./health/health.module').then(m => m.HealthModule)},
  { path: 'learning', loadChildren: () => import('./learning/learning.module').then(m => m.LearningModule)},
  { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
