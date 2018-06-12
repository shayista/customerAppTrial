import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

const API_ENDPOINT = "http://10.242.251.141:3100"
// const API_ENDPOINT = "http://localhost:3100"
// 
@Injectable()
export class DataServiceProvider {

  constructor(private _http: HttpClient,private transfer: FileTransfer,
    private camera: Camera, public toastCtrl: ToastController,   public loadingCtrl: LoadingController) {

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
  getCustFutureAndPastVisit(loginCustId, future): Observable<any> { 
    console.log(loginCustId + "---loginCustId");
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
  saveCustomerFeedback(customerFeedback): Observable<any> { 
    
    return this._http.post(API_ENDPOINT+"/api/saveCustomerFeedback", {"customerFeedback": customerFeedback}) 
                     .map((res: Response) => res)
                     .catch((error:any) => Observable.throw(error || 'Server error')); 
}

updatePassword(userPasswordChange): Observable<any> { 
  
  return this._http.post(API_ENDPOINT+"/api/updatePassword", {"userPasswordChange": userPasswordChange}) 
                   .map((res: Response) => res)
                   .catch((error:any) => Observable.throw(error || 'Server error')); 
}
updateUserQnsAns(qnsAnsObj): Observable<any> { 
  
  return this._http.post(API_ENDPOINT+"/api/updateUserQnsAns", {"qnsAnsObj": qnsAnsObj}) 
                   .map((res: Response) => res)
                   .catch((error:any) => Observable.throw(error || 'Server error')); 
}
changePassword(passwordObj): Observable<any> {
  console.log('changePassword',passwordObj);
   return this._http.post(API_ENDPOINT+"/api/changePassword", passwordObj) 
                  .map((res: Response) => res)
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }
 visitIternary(visitData): Observable<any> {
  console.log('visitIternary',visitData);
   return this._http.post(API_ENDPOINT+"/api/visitIternary", {"visitData": {"visitId" : visitData}}) 
                  .map((res: Response) => res)
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }
 updateProfile(profileEdit):Observable<any>{
   console.log(profileEdit);
  return this._http.post(API_ENDPOINT+"/api/updateProfile", profileEdit) 
  .map((res: Response) => res)
  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }
 forgotPassword(email):Observable<any>{
   console.log(email);
  return this._http.post(API_ENDPOINT+"/api/forgotPassword", {"email":email}) 
  .map((res: Response) => res)
  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }

 userDetails(attendeeId):Observable<any>{
   return this._http.post(API_ENDPOINT+"/api/userDetails", {"_id":attendeeId})
   .map((res:Response) => res)
   .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }
 presentorRating(ratingDetails): Observable<any>{
   console.log(ratingDetails);
  return this._http.post(API_ENDPOINT+"/api/presentorRating", {"ratingDetails":ratingDetails})
  .map((res:Response) => res)
  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
 }
}
