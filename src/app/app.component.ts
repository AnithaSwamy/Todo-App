import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  constructor(private service: UserService) {
  }

  ngOnInit() { }

  get user(): any {
    return this.service.getAccessToken();
  }

  logoutUser() {
    this.service.logout();
  }

}
