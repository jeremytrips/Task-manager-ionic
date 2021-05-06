import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksRendererComponent } from '../tasks-renderer/tasks-renderer.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
