import { Component } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  goodSending: boolean;
  goodResponse: any;
  goodError: any;

  badSending: boolean;
  badResponse: any;
  badError: any;

  constructor (private http: Http) {}

  goodRequest () {

      this.goodSending = true;
      this.goodResponse = null;
      this.goodError = null;

      this.http.post('http://localhost:3000/good', {})
          .map(res => res.json())
          .subscribe((response: any) => {
              // success
              this.goodResponse = response;
              this.goodSending = false;
          }, (err: any) => {
              this.goodSending = false;
              this.goodError = err;
          });
  }

  badRequest () {

      this.badSending = true;
      this.badResponse = null;
      this.badError = null;

      this.http.post('http://localhost:3000/bad', {})
          .map(res => res.json())
          .subscribe((response: any) => {
              // success
              this.badResponse = response;
              this.badSending = false;
          }, (err: any) => {
              this.badSending = false;
              this.badError = err;
          });
  }
}
