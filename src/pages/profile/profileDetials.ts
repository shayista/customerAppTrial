import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { mainHeader } from '../mainHeader/mainHeader';
import { Input } from '@angular/core/src/metadata/directives';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-profileDetails',
  templateUrl: 'profileDetials.html'
})
export class profileDetailsPage {
  attendeeDetails: any;
  attendeeId:any;
  editOption: boolean =false;
  attendeeName: any;
  email: any;
  attendeeTel: any;
  securityAnswer: any;
  securityQuestion: any;
  imageURI:string;
  imageFileName:any;
  profileEdit={
    'attendeeId'  :"",
    'client_Id'     : "",
    'name'          : "",
    'quesAns'       : {
      "Question":"",
      "answer":""
    },
    'email'         : "",
    'contactNumber' : "",
    'userUrl'       : "",
  }
  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private _dataservice :DataServiceProvider, private transfer: FileTransfer,
    private camera: Camera, public toastCtrl: ToastController,   public loadingCtrl: LoadingController) {
//  this.username=this.navParams.get("username");
this.attendeeId      = sessionStorage.getItem("attendeeId");



  }
  ngOnInit() {    
    this._dataservice.userDetails(this.attendeeId).subscribe(res => 
      {
       console.log(res.data[0]);
       this.attendeeDetails=res.data[0];
       if(this.attendeeDetails){
        
      this.attendeeName = this.attendeeDetails.name;
      this.email = this.attendeeDetails.email;
      this.attendeeTel = this.attendeeDetails.contactNumber;
      this.securityQuestion= this.attendeeDetails.quesAns.Question;
      this.securityAnswer = "";
      //this.profileEdit.userUrl = this.email;
       console.log(this.attendeeDetails);
      }
      else{
        console.log("no question found");
      }
     });
 
  }
  goBack(){
    this.navCtrl.pop();
    console.log(this.editOption);
  }
  enableEdit(){
    
    if( !this.editOption){
    
    var saveEdit =  document.getElementById("editOption").innerHTML="Save";
    var inputTangs = document.getElementsByTagName("input");
    var ionSelect = document.getElementsByName("ion-select");
    var i;
    for (i = 0; i < inputTangs.length; i++) {
      inputTangs[i].style.color ="#000";
      inputTangs[i].style.backgroundColor = "#fff";
      
      // ionSelect[i].style.backgroundColor = "#fff";
    }
    this.editOption = true;
    }
    else{
      this.profileEdit.attendeeId = this.attendeeId;
      this.profileEdit.client_Id = this.attendeeDetails.client_Id;
      this.profileEdit.name = this.attendeeName;
      this.profileEdit.email = this.email;
      this.profileEdit.contactNumber = this.attendeeTel;
      this.profileEdit.quesAns.Question = this.securityQuestion;
      this.profileEdit.quesAns.answer = this.securityAnswer;
      this.profileEdit.userUrl = this.email;
      console.log(this.profileEdit);
      
    this._dataservice.updateProfile(this.profileEdit).subscribe(
      res =>{
               console.log(res);
          });

      
            

      this.editOption = false;
      saveEdit =  document.getElementById("editOption").innerHTML="Edit";
      var inputTangs = document.getElementsByTagName("input");
      var i;
      for (i = 0; i < inputTangs.length; i++) {
    
        inputTangs[i].style.backgroundColor = "#f1f0f0";
      
      }
    }
  
  }
  getImage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      alert(typeof imageData);
  
      this.imageURI = imageData;
      alert(typeof this.imageURI);
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
    this.uploadFile(this.imageURI);
  }

  uploadFile(imageURI) {
   console.log(imageURI);
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: "ionicfile",
      fileName: this.attendeeId+"#",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(imageURI, "http://10.242.251.141:3100/api/uploadImage", options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = this.attendeeId+".jpeg";
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}

