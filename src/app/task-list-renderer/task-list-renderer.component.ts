import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskList, TasklistService } from '../shared/tasklist.service';

@Component({
  selector: 'app-task-list-renderer',
  templateUrl: './task-list-renderer.component.html',
  styleUrls: ['./task-list-renderer.component.scss'],
})
export class TaskListRendererComponent implements OnInit {
  
  @Input() tasklist: TaskList;
  @Input() index: number;

  @Output() deleteEvent = new EventEmitter<string>();


  constructor(public tasklistService: TasklistService, private router: Router, private route: ActivatedRoute) {
  }

  onDelete() {
    this.deleteEvent.emit(this.tasklist.id);
  }

  navigate(){
    this.router.navigate([`../journal/${this.tasklist.id}`]);
  }

  ngOnInit(): void {
  }
}
