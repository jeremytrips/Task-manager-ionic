import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QueryComponent } from './query/query.component';
import { TasksRendererComponent } from './tasks-renderer/tasks-renderer.component';

const routes: Routes = [
  {
    path: 'journal',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'journal',
    pathMatch: 'full'
  },
  {
    path: 'journal/:id',
    component: TasksRendererComponent
    // loadChildren: () => import("../tasks-renderer/tasks-renderer.component").then(m=>m.TasksRendererComponent)
  }, 
  {
    path: 'query',
    // loadChildren: () => import('./query/query.component').then
    component: QueryComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
