import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskList, TasklistService } from '../shared/tasklist.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  TaskLists: Array<TaskList> = [];
  newList: string = "";
  newDescription: string = "";

  constructor(public tasklistService: TasklistService, public router: Router) { 
  }
  
  onSubmit(post){
    var temp = {
      Title: this.newList,
      Description: this.newDescription
    }

    this.tasklistService.createTaskList(temp)
    .subscribe((res: TaskList)=>{    
      this.TaskLists.push(res);
      this.newDescription = "";
      this.newList = ""
    })
  }

  navigate(id){
    this.router.navigate([`../journal/${id}`]);
  }

  fetchTaskLists(){
    return this.tasklistService.getTaskLists().subscribe((res: {})=>{
      this.TaskLists = <Array<TaskList>> res;      
    });
  }

  deleteTaskList(id: string){
    this.tasklistService.deleteTaskList(id)
    .subscribe(()=>{
      for (let i = 0; i < this.TaskLists.length; i++) {
        const element = this.TaskLists[i];
        if (element.id == id){
          this.TaskLists.splice(i, 1);
          return;
        }
      };
    });
  }

  ngOnInit(): void {    
    this.fetchTaskLists();
  }

}
