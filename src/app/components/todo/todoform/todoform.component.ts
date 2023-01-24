import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../../../shared/todo'

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.scss']
})
export class TodoformComponent implements OnInit {
  @ViewChild('task', { read: ElementRef }) el!: ElementRef<HTMLInputElement>;

  @Output() todoItemCreated = new EventEmitter<{ userId: number; id: number; task: string; status: boolean }>();
  @Output() todoItemEdited = new EventEmitter<object>();

  task!: string;
  onSubmitValue: boolean = true;

  tform: any = {
    id: '',
    task: '',
    status: false
  };

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(todo: Todo) {
    this.el.nativeElement.focus();
    this.todoItemCreated.emit({ userId: todo.userId, id: todo.id, task: todo.task, status: todo.status });
  }

  edit(todo: Todo) {
    this.todoItemEdited.emit({ userId: todo.userId, id: this.tform.id, task: todo.task, status: this.tform.status });
    this.onSubmitValue = true;
  }
}
