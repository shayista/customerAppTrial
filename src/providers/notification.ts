import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const API_ENDPOINT = "http://10.242.251.141:8080"

@Injectable()
export class NotificationService {

  constructor(private _http: HttpClient) {
  }

  /** Fetch customer notifications
    * input is attendeeId
   **/
  getCustomerNotifications(attLoginId): Observable<any> {
    return this._http.post(API_ENDPOINT+'/api/fetchCustomerNotifications', {"attendeeId": attLoginId})
                     .map((res: Response) => res)
                     .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  /** modifies notification status
    * input notification Id array
  **/
  updateNotificationStatus(notificationIds): Observable<any> {
     return this._http.post(API_ENDPOINT+'/api/updateNotificationStatus', {"notificationIds": notificationIds})
                      .map((res: Response) => res)
                      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  getCustFutureAndPastVisit(loginCustId, future): Observable<any> {
    let reqObj;
    if ( future == -1) {
       reqObj = {"visitId" : loginCustId};
    } else {
       reqObj = {"attendeeId": loginCustId,"future": future};
    }
    return this._http.post(API_ENDPOINT+'/api/getCustFutureAndPastVisit', reqObj)
                   .map((res: Response) => res)
                   .catch((error:any) => Observable.throw(error || 'Server error'));
}
}
