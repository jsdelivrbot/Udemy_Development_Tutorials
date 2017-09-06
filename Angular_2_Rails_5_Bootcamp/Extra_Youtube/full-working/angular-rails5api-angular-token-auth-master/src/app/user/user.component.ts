import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({
      registerAccountPath: 'http://localhost:3000/auth'
    });
  }

  ngOnInit() {
  }

  register() {
    this._tokenService.registerAccount({
      email:                'test@example.com',
      password:             'password',
      passwordConfirmation: 'password'
      }).subscribe(
          res =>      console.log(res),
          error =>    console.log(error)
      );
  }

}
