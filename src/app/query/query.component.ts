import { Component, OnInit } from '@angular/core';
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

  constructor(public tasklistService: TasklistService ) { }

  onSubmit(post){
    this.responseEmpty = false;
    if (post.value.query == "")
      return
    this.tasklistService.query(post.value.query)
    .subscribe((res)=>{
      if (res.taskLists.length == 0 && res.tasks.length == 0){
        this.responseEmpty = true
      }
      this.TaskLists = res.taskLists;
      this.tasks = res.tasks;
    });
  }


  ngOnInit(): void {
  }

}
