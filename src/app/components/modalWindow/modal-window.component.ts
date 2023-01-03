import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
})
export class ModalWindow implements OnInit {
  ngOnInit(): void {
  }
  constructor() {

  }
  @Input() header: string = ""
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<void>()

  // inputTitle:string = ""
  // inputContent:string = ""
  // inputDate!: Date;

  todo: Todo = new Todo()

  // todo!: Todo;
}