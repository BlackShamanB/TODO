export class Todo {
  title: string = '';
  content: string = '';
  date: string = '';
  completed: boolean = false;
  display: boolean = true;

  constructor(
    title: string="",
    content: string="",
    date: string="",
    completed: boolean=false,
    display: boolean=true
  ) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.completed = completed;
    this.display = display;
  }
}
