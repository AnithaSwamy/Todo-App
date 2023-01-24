import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Todo } from '../../../shared/todo'
import { TodoService } from '../../../services/todo.service'
import { UserService } from '../../../services/user.service';
import { TodoformComponent } from '../todoform/todoform.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit {
  @ViewChild("fchild")
  public fComp!: TodoformComponent;

  task!: string;
  todo!: Todo[];
  errorMsg: string = "Loading Todo....";

  title: any = "Todo List";
  today: number = Date.now();

  completeTask: any;
  pendingTask: any;

  constructor(private service: TodoService, private toastr: ToastrService, private router: Router,
    private userApi: UserService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    console.log(this.userApi.getAccessToken().id);
    this.getItems();
  }

  getItems() {
    this.service.getTodoList().subscribe(
      (response) => {
        this.todo = response.filter(item => item.userId == this.userApi.getAccessToken().id);
        this.completeTask = this.todo.filter(item => item.status == true);
        this.pendingTask = this.todo.filter(item => item.status == false);
        console.log(this.todo);
      }, (error) => {
        console.log(error);
        this.errorMsg = error.status + " " + error.statusText;
        if (error.status == 0) { this.router.navigate(['/network-error']); }
      });
  }

  todoItemAdded(todo: { userId: number, id: number; task: string; status: boolean; }) {
    this.service.addTodoItem({
      userId: this.userApi.getAccessToken().id, id: todo.id, task: todo.task, status: false
    })
      .subscribe((todo) => {
        console.log(todo);
        this.toastr.success('Todo Item Has Been Added');
        this.getItems();
      },
        err => { console.log(err); });
  }

  onDeleteTodoItem(id: number) {
    if (confirm("Are you sure to delete ")) {
      this.service.deleteTodoById(id)
        .subscribe((resp) => {
          console.log(resp);
          this.getItems();
          this.toastr.success('Todo Item Has Been Deleted');
        },
          (err) => console.log(err)
        );
    }
  }

  onDeleteTodoItemCompleted() {
    const completedTasks = this.todo.filter(item => item.status == true);
    if (completedTasks.length <= 0) {
      this.toastr.success("No Completed Items Found");
    } else {
      const completedTasks = this.todo.filter(item => item.status == true);
      if (confirm("Are You Sure To Delete ")) {
        completedTasks.forEach((item) => {
          if (item.id) {
            this.service.deleteTodoById(item.id)
              .subscribe((resp) => {
                console.log(resp);
                this.getItems();
                this.toastr.success('Todo Items Has Been Deleted');
              },
                (err) => console.log(err)
              );
          }
        });
      }
    }
  }

  onUpdateTodoItem(todo: any) {
    this.service.updateTodoById(todo.id, { userId: todo.userId, id: todo.id, task: todo.task, status: todo.status == false ? true : false })
      .subscribe((_resp) => {
        this.toastr.success('Todo Item Status Has Been Updated');
        this.getItems();
      },
        (err) => console.log(err)
      );
  }

  onEditItem(todo: any) {
    this.fComp.tform.task = todo.task;
    this.fComp.tform.id = todo.id;
    this.fComp.onSubmitValue = false;
    this.fComp.el.nativeElement.focus();
  }

  onEditTodoItem(todo: any) {
    this.service.editTodoById(todo.id, { userId: this.userApi.getAccessToken().id, id: this.fComp.tform.id, task: todo.task, status: todo.status })
      .subscribe((_resp) => {
        this.toastr.success('Todo Item Has Been Updated');
        this.getItems();
      },
        (err) => console.log(err)
      );
  }

}


