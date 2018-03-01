import { Component } from '@angular/core';
import {  NavController, NavParams ,PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';
import { DataServiceProvider } from '../../providers/data-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-my-visit',
  templateUrl: 'my-visit.html',
})
export class MyVisitPage implements OnInit {
  visitId: any;
  visitDetails:any;
  agendaStatus: boolean;
  agendaData: any;
  agendaChoice:number = 0;
  checkStatus: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams , public popoverCtrl: PopoverController, private _dataservice: DataServiceProvider) {
      this.visitId = navParams.get('visitId');
      this.visitDetails = navParams.get('visitDetails');
      console.log(this.visitDetails);
    }

    ngOnInit() { 
      this.getVisitAgendas();
    }

    goBack() {
      this.navCtrl.pop();   
    }

    presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(rootModulePage);
      popover.present({
        ev: myEvent
      });
    }

   

    getVisitAgendas() {
      console.log(this.visitId);
      this._dataservice.getCustVisitAgendas(this.visitId)
                        .subscribe(res=>
                                      {
                                        if (res.data.length > 0) {
                                            this.agendaData = res.data;  
                                            this.agendaData.dayCount = this.displayAgenda(res.data);  
                                            console.log(this.agendaData);
                                        } else {
                                            alert("no agendas");
                                        }
                                      },
                                  error => console.log("Error :: " + error)  
                                  );
    }

    displayAgenda(agendaData){
      let dayCount:Array<number> = []
      if(agendaData.length>0){
        this.agendaStatus = true;
        for( let x=0 ; x<agendaData.length; x++ ){
          dayCount[x]= x+1;
        }
      } else {
        this.agendaStatus = false;
      }
      return dayCount;
    }

    renderAgenda(dayValue){
      this.agendaChoice = dayValue;
      document.getElementById('agendaDataIndex0').classList.remove("active");
      console.log(this.agendaChoice );
    }

    show(){
     console.log("show");
      this.checkStatus = true;
  }
  hide(){
    console.log("hide");
      this.checkStatus = false;
  }

  agendaTabsFunc(val){
    if(val == 0 ){
      this.checkStatus = true;
      document.getElementById('itenaryLink').removeAttribute('class');
      document.getElementById('agendaLink').classList.add("active");
    } else {
      this.checkStatus = false;
      document.getElementById('agendaLink').removeAttribute('class');
      document.getElementById('itenaryLink').classList.add("active");
    }
  }

}
