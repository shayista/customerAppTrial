import { Component, OnInit, ViewEncapsulation, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import { NgbModal , NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response,Headers } from '@angular/http';
import { Ionic2RatingModule } from 'ionic2-rating';

@Component({
selector: 'ngbd-modal-content',
templateUrl: 'prsenterRating.html'

})

export class prsenterRating {
    
@Input() resData : any;
@Input() visitPurpose : any;
presenters = [];
@Output() attendeeEmit = new EventEmitter<any>();
rate:any[] = [];
ratingDetails = {
    'agendaId':'',
    'ratingData':[]
         };
xyz=[];
ratingObj ={
            'id':'',
            'name':''
            ,'rating':null
            };
constructor( private eleRef: ElementRef, public activeModal: NgbActiveModal,private _http: Http) { 
 
}

ngOnInit() {
    this.ratingDetails.agendaId= this.resData._id;
    for(let poc of this.resData.agenda_POC){
        this.presenters.push(JSON.parse(JSON.stringify(poc))); 
        console.log(this.resData);
    }
   

}



onModelChange(x,i){
 
    console.log(x);
    var star=document.getElementsByTagName("li");
    for(let i=0;i<star.length;i++){
            star[i].style.color ="#fda214";
        
    }
    console.log(this.rate);
for(let poc of this.resData.agenda_POC){
        console.log(poc);
        this.ratingObj.id="";
        this.ratingObj.name="";
        this.ratingObj.id = poc._id;
        this.ratingObj.name = poc.name; 
        // console.log(typeof this.ratingDetails.ratingData);
        this.xyz.push(this.ratingObj);
        this.ratingDetails.ratingData = this.xyz;
      
        console.log(this.xyz);
}
   
}





}