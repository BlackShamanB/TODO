import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { ModalWindow } from './components/modalWindow/modal-window.component';
import { RefDirecive } from './components/redDirective/ref.directive';
import './components/dragAndDrop/drag-and-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    ModalWindow,
    RefDirecive,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
