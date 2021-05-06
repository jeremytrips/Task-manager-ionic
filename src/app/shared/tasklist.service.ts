import { Injectable } from '@angular/core';

import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class TaskList {
  id?: string;
  Title: string;
  DateCreated?: Date;
  DateModified?: Date;
  Description: String;
};

export class Task {
  id: number;
  Description: string;
  DateCreated: Date;
  IsDone: boolean;
};

export class QueryStruct{
  taskLists: Array<TaskList>;
  tasks: Array<Task>;
}

@Injectable({
  providedIn: 'root'
})
export class TasklistService {
  // REST API
  endpoint = 'http://127.0.0.1:8000';
  taskLists: Array<TaskList> = null;

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
  }

  getTaskLists(): Observable<TaskList>{
    return this.httpClient.get<TaskList>(this.endpoint+"/api/journal")
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  deleteTaskList(id: string): Observable<void>{
    return this.httpClient.delete<void>(this.endpoint+`/api/journal/delete/${id}`)
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  deleteTask(id: number): Observable<void>{
    return this.httpClient.delete<void>(this.endpoint+`/api/task/delete/${id}`)
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  getDataOfATaskList(id: number): Observable<TaskList>{
    return this.httpClient.get<TaskList>(`${this.endpoint}/api/task/get/${id}`)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  getTasksOfaList(id: number): Observable<Array<Task>>{
    return this.httpClient.get<Array<Task>>(this.endpoint+`/api/tasks/${id}`)
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  createTaskList(taskList: TaskList){
    return this.httpClient.post(
      this.endpoint+"/api/journal/create",
      taskList
    ).pipe(
      retry(1),
      catchError(this.processError)
    );
  }

  createTask(id: number, desc: string): Observable<Task>{
    return this.httpClient.post<Task>(`${this.endpoint}/api/task/create/${id}`,{
      Description: desc,
    })
    .pipe(
      retry(1),
      catchError(this.processError)
    );
  }
 
  setResetTask(id: number): Observable<any>{
    return this.httpClient.put(
      `${this.endpoint}/api/task/set`,
      {
        "id": id
      }
    )
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  updateTask(id: number, desc: string): Observable<Task>{
    return this.httpClient.put<Task>(`${this.endpoint}/api/task/update`,{
        "id": id,
        "description": desc
      }
    )
  }

  query(toQuery: string): Observable<QueryStruct>{
    return this.httpClient.get<QueryStruct>(`${this.endpoint}/api/q/${toQuery}`)
    .pipe(
      retry(1),
      catchError(this.processError)
    )
  }

  processError(err) {
    console.error(err); 
    let message = '';
    if(err.error instanceof ErrorEvent) {
     message = err.error.message;
    } else {
     message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(message);
 }
}
