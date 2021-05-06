import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task, TaskList, TasklistService } from '../shared/tasklist.service';

@Component({
  selector: 'app-tasks-renderer',
  templateUrl: './tasks-renderer.component.html',
  styleUrls: ['./tasks-renderer.component.scss'],
})
export class TasksRendererComponent implements OnInit {
  id: number = null;
  tasks: Array<Task> = null;
  tasklist: TaskList = {
    id: "",
    Title: "wait a moment..",
    DateCreated: null,
    DateModified: null,
    Description: ""
  }
  newTask: string = "";


  constructor(private route: ActivatedRoute, public tasklistService: TasklistService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = params["id"]       
      this.fetchTaskListData();
      this.fetchTasks()      
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

  setText(text){
    this.newTask = text;
  }

  SetResetTask(index){
    var task = this.tasks[index] 

    this.tasklistService.setResetTask(task.id).subscribe((res)=>{
      task.IsDone = res;      
    });
  }


  onSubmit(event){
    event.preventDefault();    
    this.tasklistService.createTask(this.id, this.newTask).subscribe((res)=>{      
      this.tasks.push(<Task>res);
      this.newTask = "";
    })
  }

  fetchTaskListData(){
    return this.tasklistService.getDataOfATaskList(this.id).subscribe((res: TaskList)=>{
      this.tasklist = res
    })
  }

  fetchTasks(){
    return this.tasklistService.getTasksOfaList(this.id).subscribe((res: {})=>{
      this.tasks = <Array<Task>> res;
      console.log(this.tasks);

    });
  }
}
