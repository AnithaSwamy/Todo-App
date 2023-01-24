import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../../shared/todo'

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.scss']
})
export class TodoitemComponent implements OnInit {

  @Input() todolist: any;
  @Output() updateItem = new EventEmitter<{ userId: number; id: number; task: string; status: boolean }>();
  @Output() deleteItem = new EventEmitter();
  @Output() editItem = new EventEmitter();

  constructor() { }
  
  ngOnInit() {
  }

  update(todo: Todo) {
    this.updateItem.emit({ userId: todo.userId, id: todo.id, task: todo.task, status: todo.status });
  }

  edit(todo: Todo) {
    this.editItem.emit(todo);
  }

  delete(id: number) {
    console.log(id);
    this.deleteItem.emit(id);
  }
}
