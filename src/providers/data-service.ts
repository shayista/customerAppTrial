import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataServiceProvider {

  constructor(public http: HttpClient) {
   
  }

  // getUser(): Observable<any> {
  //    return this.http.get("http://localhost:8080/api/users")
  //               .map((res: Response) => res)
  //               .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  validateUser(name, password): Observable<any> {
    return this.http.post("http://localhost:8080/api/loginAuthCust", {name: name, pflag: password})
                    .map((res: Response) => res)
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
