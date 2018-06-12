import { Component, OnInit, ViewEncapsulation, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import { NgbModal , NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response,Headers } from '@angular/http';
import { Ionic2RatingModule } from 'ionic2-rating';
import { DataServiceProvider } from '../../../providers/data-service';

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
ratingData = [];
ratingDetails = {
    agendaId:'',
    ratingData:[]
         };

ratingObj ={
            'id':'',
            'name':'',
            'rating':null
            };
constructor( private eleRef: ElementRef, public activeModal: NgbActiveModal,private _http: Http,private _dataservice :DataServiceProvider) { 
 
}

ngOnInit() {
    this.ratingDetails.agendaId = this.resData._id;
    for(let poc of this.resData.agenda_POC){
        this.presenters.push(JSON.parse(JSON.stringify(poc))); 
        console.log(this.presenters);
    }
   

}



onModelChange(x,i){
  
      var star=document.getElementsByTagName("li");
    for(let i=0;i<star.length;i++){
            star[i].style.color ="#fda214";    
           
    }
    for(let poc=0;poc < this.presenters.length;poc++){
        // this.ratingObj.id="";
        // this.ratingObj.name="";
        // this.ratingObj.rating="";
        
        this.ratingObj.id = this.presenters[poc]._id;
        this.ratingObj.name = this.presenters[poc].name; 
        this.ratingObj.rating = this.rate[poc]; 
        console.log(this.ratingObj);  
        this.ratingData.push(this.ratingObj);  
       
        this.ratingObj ={
            'id':'',
            'name':'',
            'rating':''
            };     
            
    }
    console.log(this.ratingData,"data");  
    this.ratingDetails.ratingData = this.ratingData;
    console.log(this.ratingDetails,"final"); 
    this.ratingData=[]; 
  
}

addAttendees(f){
   
 
   
    this._dataservice.presentorRating(this.ratingDetails).subscribe(res =>
        {
            console.log(res);
            if(res.status == 200){
                this.activeModal.close('Close click');
            }
        }) 
}

skip(){
    this.activeModal.close('Close click')
}


}