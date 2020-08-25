import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userDetails: any = {username: '', password: ''};

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  signup() {
    console.log('client sending', this.userDetails);
    this.http.post('/users/signup', this.userDetails, {responseType: 'text'}).subscribe((result:any) => {
      // if (result.error.message) {
      //   console.log('error? ', result.error.message);
      // }
      console.log('sign up result from the server: ', result);
    });
  }

}
