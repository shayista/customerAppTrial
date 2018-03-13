import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const API_ENDPOINT = "192.168.1.103:8080"

@Injectable()
export class DataServiceProvider {

  constructor(private _http: HttpClient) {

  }

  // getUser(): Observable<any> {
  //    return this.http.get("http://localhost:8080/api/users")
  //               .map((res: Response) => res)
  //               .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  /** Customer credentials validation and fetching related details
    * inputs are  username is emailID and password
   **/
  validateUser(name, password): Observable<any> {
    return this._http.post(API_ENDPOINT+"/api/loginAuthCust", {name: name, pflag: password})
                    .map((res: Response) => res)
                    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  /** Customer Future Visit details
    *inputs is login customerID
    *input future = 1 for future vists and 0 for past visits
  **/
  getCustFutureAndPastVisit(loginCustId, future): Observable<any> { console.log(loginCustId + "---loginCustId");
    return this._http.post(API_ENDPOINT+'/api/getCustFutureAndPastVisit', {"attendeeId": loginCustId,"future": future})
                     .map((res: Response) => res)
                     .catch((error:any) => Observable.throw(error || 'Server error'));
  }

   /** Fetched visit agendas for a particular visit
    *inputs is visitId
  **/
  getCustVisitAgendas(VisitId): Observable<any> {

    return this._http.post(API_ENDPOINT+'/api/getCustVisitAgendas', {"visitId": VisitId})
                     .map((res: Response) => res)
                     .catch((error:any) => Observable.throw(error || 'Server error'));
  }



}
