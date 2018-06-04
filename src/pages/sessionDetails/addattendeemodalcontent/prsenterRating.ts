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
ratingData: any[] = [];
ratingDetails = {
    agendaId:''
  
         };

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
    console.log(typeof this.rate);
    console.log(typeof this.ratingData);
for(let poc=0;  poc<this.resData.agenda_POC.length;poc++){
        console.log(poc);
        this.ratingObj.id="";
        this.ratingObj.name="";
        this.ratingObj.id = this.resData.agenda_POC[poc]._id;
        this.ratingObj.name = this.resData.agenda_POC[poc].name; 
        console.log(typeof this.ratingData);
        this.ratingData[poc]=this.ratingObj;
      
       
        console.log(this.ratingData);
        
}
   
}


skip(){
    this.activeModal.close('Close click')
}


}