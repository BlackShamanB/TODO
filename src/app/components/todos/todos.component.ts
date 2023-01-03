import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from './../../models/Todo';
import { ModalWindow } from '../modalWindow/modal-window.component';
import { RefDirecive } from '../redDirective/ref.directive';
import { HttpService} from '../http/http.service';
import { Observable, fromEvent, map, switchMap, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [HttpService]
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  todo!: {
    inputTitle: string;
    inputTodo: string;
    inputDate: string;
  };

  sortTodoList: string = 'All';

  @ViewChild(RefDirecive, { static: false })
  refDir!: RefDirecive;

  constructor(
    private resolver: ComponentFactoryResolver,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    // this.todos = [
    //   {
    //     title: '1',
    //     content: 'First todo',
    //     date: Date.now().toString(),
    //     completed: false,
    //     display: true,
    //   },
    //   {
    //     title: '1',
    //     content: 'Second todo',
    //     date: Date.now().toString(),
    //     completed: true,
    //     display: true,
    //   },
    // ];
    this.httpService.getTodos().subscribe({next:(data: Todo[]) => this.todos = data})
  }
  ngAfterViewInit(): void {
    const draggableElement = document.querySelector('.todo');
    const mouseDown$: Observable<Event> = fromEvent(
      draggableElement as HTMLElement,
      'mousedown'
    );
    const mouseMove$: Observable<Event> = fromEvent(
      draggableElement as HTMLElement,
      'mousemove'
    );
    const mouseUp$: Observable<Event> = fromEvent(
      draggableElement as HTMLElement,
      'mouseup'
    );

    const dragStart$ = mouseDown$;
    const dragMove$ = dragStart$.pipe(
      // всякий раз, когда мы нажимаем на кнопку мышку
      switchMap(() =>
        mouseMove$.pipe(
          map((moveEvent) => ({
            originalEvent: moveEvent,
            // deltaX: moveEvent.target - start.pageX,
            // deltaY: moveEvent.pageY - start.pageY,
            // startOffsetX: start.offsetX,
            // startOffsetY: start.offsetY
          })),
          // каждый раз, когда мы перемещаем курсор
          takeUntil(mouseUp$) // но только пока мы не отпустим кнопку мыши
        )
      )
    );

    dragMove$.subscribe((move) => {
      console.log(move);
      // const offsetX = move.originalEvent.x - move.startOffsetX;
      // const offsetY = move.originalEvent.y - move.startOffsetY;
      // draggableElement.style.left = offsetX + 'px';
      // draggableElement.style.top = offsetY + 'px';
    });
  }

  toggleDone(id: number) {
    this.todos.map((v, i) => {
      if (i == id) v.completed = !v.completed;
      return v;
    });
    this.sortTodo();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }

  sortTodo() {
    switch (this.sortTodoList) {
      case 'Done':
        this.todos.forEach((el) => {
          el.completed ? (el.display = true) : (el.display = false);
        });
        break;
      case 'Open':
        this.todos.forEach((el) => {
          !el.completed ? (el.display = true) : (el.display = false);
        });
        break;
      case 'All':
        this.todos.forEach((el) => {
          el.display = true;
        });
        break;
    }
  }
  addTodo() {
    const modalFactory = this.resolver.resolveComponentFactory(ModalWindow);
    this.refDir.containerRef.clear();

    const component = this.refDir.containerRef.createComponent(modalFactory);
    component.instance.header = 'Добавить задачу';
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear();
    });
    component.instance.save.subscribe(() => {
      this.todos.push(component.instance.todo);
      this.refDir.containerRef.clear();
    });
  }

  deleteCompletedTodo() {
    this.todos = this.todos.filter((v) => !v.completed);
  }
}
