import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { DataServiceProvider } from '../../providers/data-service';
import { mainHeader } from '../mainHeader/mainHeader';
import { Input } from '@angular/core/src/metadata/directives';
import { FormControl, FormGroup, Validators,ValidatorFn,AbstractControl } from '@angular/forms';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { ImagePicker } from '@ionic-native/image-picker';

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
  imgPreview = '';
  regData = { avatar:'', email: '', password: '', fullname: '' };
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
  user: FormGroup;
  constructor( public navParams: NavParams,public viewCtrl: ViewController , public navCtrl: NavController, private _dataservice :DataServiceProvider, private transfer: FileTransfer,
    private camera: Camera, public toastCtrl: ToastController,   public loadingCtrl: LoadingController, private imagePicker: ImagePicker,private base64: Base64) {
//  this.username=this.navParams.get("username");
this.attendeeId      = sessionStorage.getItem("attendeeId");



  }
  ngOnInit() {    
    this.ionViewLoaded();
    }
  ionViewLoaded() {
    var loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      duration: 5000
    });

  
    loading.present().then(() => {
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
         console.log(this.attendeeDetails.attendee_path);
          sessionStorage.setItem("imageAttendee", this.attendeeDetails.attendee_path);
         this.imgPreview = this.attendeeDetails.attendee_path;
        
         
        }
        else{
          console.log("no question found");
        }
       });
      loading.dismiss();
    });
  

  }
  goBack(){
    this.navCtrl.pop();
    console.log(this.editOption);
  }
  enableEdit(){
    
    if(!this.editOption){
    
   // var saveEdit =  document.getElementById("editOption").innerHTML="Save";
    var inputTangs = document.getElementsByTagName("input");
    var ionSelect = document.getElementById("securityDropDown");
    ionSelect.style.backgroundColor ="#fff";
    ionSelect.style.color ="#000";
    var i;
    for (i = 0; i < inputTangs.length; i++) {
      inputTangs[i].style.color ="#000";
      inputTangs[i].style.backgroundColor = "#fff";
      
    
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
     // saveEdit =  document.getElementById("editOption").innerHTML="Edit";
      var inputTangs = document.getElementsByTagName("input");
      var i;
      for (i = 0; i < inputTangs.length; i++) {
    
        inputTangs[i].style.backgroundColor = "#f1f0f0";
      
      }
    }
  
  }
 
  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.imgPreview = results[i];
          this.base64.encodeFile(results[i]).then((base64File: string) => {
            this.regData.avatar = base64File;
          }, (err) => {
            console.log(err);
          });
      }
    }, (err) => { 
      alert(err);
    });
  }
}

