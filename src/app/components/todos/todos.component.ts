import { Component, OnInit } from '@angular/core';
import { Todo } from './../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[] = [];

  inputTodo:string = "";

  sortTodoList:string="All"
  
  constructor() {}

  ngOnInit(): void {
      this.todos = [
        {
          content: 'First todo',
          completed: false,
          display: true
        },
        {
          content: 'Second todo',
          completed: true,
          display: true
        }
      ]
  }

  toggleDone (id:number) {
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;
      return v;
    })
    console.log(this.sortTodoList)
    this.sortTodo()
  }

  deleteTodo (id:number) {
    this.todos = this.todos.filter((v, i) => i !== id)
  }

  addTodo () {
    if(this.inputTodo != ''){
      this.todos.push({
        content: this.inputTodo,
        completed: false,
        display: true
      })
      this.inputTodo = ''
    }
  }

  sortTodo() {
    console.log('tut')
    switch(this.sortTodoList) {
      case 'Done':
        this.todos.forEach(el => {
          console.log(el.completed)
          el.completed ? el.display = true : el.display = false
        })
        break;
      case 'Open':
        this.todos.forEach(el => {
          console.log(el.completed)
          !el.completed ? el.display = true : el.display = false
        })
        break;
      case 'All':
        this.todos.forEach(el => {
          console.log(el.completed)
          el.display = true
        })
        break;
    }
  }

  deleteCompletedTodo() {
    this.todos = this.todos.filter((v) => ! v.completed)
  }
}
