import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login() {

  }
  facebookLogin() {
    console.log('triggered fb login');
    this.http.get('/users/login/facebook').subscribe(res => {
      console.log('got something back! ', res);
    });

  }
}
