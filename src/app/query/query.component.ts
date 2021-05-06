import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task, TaskList, TasklistService } from '../shared/tasklist.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  TaskLists: Array<TaskList> = [];
  tasks: Array<Task> = [];
  responseEmpty: boolean = false; 
  query: string = ""; 

  constructor(public tasklistService: TasklistService, public router: Router ) { }

  onSubmit(event){
    event.preventDefault()
    this.responseEmpty = false;
    if (this.query == "")
      return
    this.tasklistService.query(this.query)
    .subscribe((res)=>{
      if (res.taskLists.length == 0 && res.tasks.length == 0){
        this.responseEmpty = true
      }
      this.TaskLists = res.taskLists;
      this.tasks = res.tasks;
      console.log(this.TaskLists);
      console.log(this.tasks);
      this.query = "";
    });
  }

  SetResetTask(index){
    var task = this.tasks[index] 

    this.tasklistService.setResetTask(task.id).subscribe((res)=>{
      task.IsDone = res;      
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

  delete(id){
    this.tasklistService.deleteTask(id)
    .subscribe(()=>{
      // this.TaskLists.
      for (let i = 0; i < this.tasks.length; i++) {
        const element = this.tasks[i];
        if (element.id == id){
          this.tasks.splice(i, 1);
          return;
        }
      };
    });
  }

  navigate(tasklist){
    this.router.navigate([`../journal/${tasklist.id}`]);
  }

  ngOnInit(): void {
  }

}
