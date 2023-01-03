import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from './../../models/Todo';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
   
@Injectable()
export class HttpService{
    
    constructor(private http: HttpClient){ }
        
    getTodos() : Observable<Todo[]> {
        return this.http.get('./assets/todos.json').pipe(map((data:any)=>{
            let todosList = data["todosList"];
            return todosList.map(function(todo: any): Todo {
                return new Todo(todo.title, todo.content, todo.date, todo.completed, todo.display);
              });
        }));
    }
}