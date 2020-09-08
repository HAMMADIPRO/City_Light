import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/retry";


@Injectable()
export class RemoteServiceProvider {
  // host: string = '10.0.2.2';
  host: string = 'localhost';
  port: string = ':5331';
  // host: string = 'trafficeye.herokuapp.com';
  // port: string = ':80';
  apiUrl: string = "http://"+this.host+this.port+"/track/";

  constructor(public http: HttpClient) {

  }

  getInfo() {
    return this.http.get(this.apiUrl);
  }

  // getInfo() {
  // this.http.get<Info>
  // (this.apiUrl).subscribe(data => {
  //   console.log(data);
  // });

  // return new Promise(resolve => {
  //   this.http.get(this.apiUrl).subscribe(data => {
  //     resolve(data);
  //   }, err => {
  //     console.log(err);
  //   });
  // });
  // }


}
