import { Component, Input } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';
import { DataServiceProvider } from '../../providers/data-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { sessionDetailsPage } from '../sessionDetails/sessionDeatisl';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-my-visit',
  templateUrl: 'my-visit.html',
})
export class MyVisitPage implements OnInit {
  cabDeatils: any;
  hotelDeatils: any;
  visitId: any;
  visitDetails: any;
  agendaStatus: boolean;
  agendaData: any;
  startSuperScript: any;
  agendaChoice: number = 0;
  checkStatus: boolean = true;
  flightDetails: any[] = [];
  hotelDetails: any[] = [];
  cabDetails: any[] = [];
  activeIds: string[] = [];
  loactionArray: any[]=[];
  flightDetailsFlag: boolean = false;
  hotelDetailsFlag: boolean = false;
  cabDetailsFlag: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private _dataservice: DataServiceProvider,public loadingCtrl: LoadingController) {
    this.visitId = navParams.get('visitId');
    this.visitDetails = navParams.get('visitDetails');
    console.log(this.visitDetails);

  }

  ngOnInit() {
  this.ionViewLoaded();
  }
  ionViewLoaded() {
    var loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      // content: `
      // <ion-spinner icon="bubbles"></ion-spinner>`,
      duration: 5000
    });

  
    loading.present().then(() => {
      this.getVisitAgendas();
      this.getItinearyDeatils();
      for(let location of this.visitDetails.visit_locations ){
        if(this.loactionArray.length){
          for(let oldLocation of this.loactionArray){
            console.log(oldLocation);
            if (oldLocation != location){
              this.loactionArray.push(location);
            } else{
               break;
            }
          }
        }
        else{
          this.loactionArray.push(location);
        }
      } 
      console.log( this.loactionArray);
    
      loading.dismiss();
    });
  

  }
  getItinearyDeatils() {
    // setInterval(
    //   () => {
        this._dataservice.visitIternary(this.visitDetails._id)
        .subscribe(res => {
          res;
          console.log(res);
          this.itinearyDeatials(res);
        }
  
        )
      
      // }
      //   , 500);
   
  }
  itinearyDeatials(itinearyData) {

    for (let itenary in itinearyData) {
      console.log(itinearyData[itenary]);

      if (itinearyData[itenary]['flightDetails']) {
        this.flightDetailsFlag = true;
        this.flightDetails = itinearyData[itenary]['flightDetails'];
        this.datesProcessing(this.flightDetails);
        console.log(this.flightDetails, "flight");
      }
      else {
        this.flightDetailsFlag = false;
      }
      if (itinearyData[itenary]['hotelDetails']) {
        //this.hotelDetailsFlag = true;
        this.hotelDetails = itinearyData[itenary]['hotelDetails'];
        this.datesProcessing(this.hotelDetails);
        console.log(this.hotelDetails, "hotel");

      }
      else {
        this.hotelDetailsFlag = false;
      }
      if (itinearyData[itenary]['cabDetails']) {
       // this.cabDetailsFlag = true;
        this.cabDetails = itinearyData[itenary]['cabDetails'];
        this.datesProcessing(this.cabDetails);
        console.log(this.cabDetails, "cab");
      }
      else {
        //this.cabDetailsFlag = false;
      }

    }
    console.log(this.flightDetails);
    this.hotelCabSorting();
  }
  datesProcessing(datesDetails) {
    console.log(datesDetails);
    for (let details of datesDetails) {
      console.log(details);
      if(details.arrivalDate){
        details.startSuperScript = this.daysSuperScript(details.arrivalDate);
        details.endSuperScript = this.daysSuperScript(details.departureDate);
      } else if(details.checkInDate) {
        details.startSuperScript = this.daysSuperScript(details.checkInDate);
        details.endSuperScript = this.daysSuperScript(details.checkOutDate);
      }  
       
      // this.flightDetails.endSuperScript = this.daysSuperScript(futureVisits[0].endDate);
    }

  }
  daysSuperScript(sDate) {
    var dateSuperScript = "th";
    var last = (new Date(sDate).getDate()) / 10;
    console.log(last,"last");
    var end = (new Date(sDate).getDate()) % 10;
    console.log(end,"end");
    if (Math.floor(last) == 1) {
      end = 4;
    }


    switch (end) {
      case 1: dateSuperScript = "st"; break;
      case 2: dateSuperScript = "nd"; break;
      case 3: dateSuperScript = "rd"; break;
      default: dateSuperScript = "th"; break;
    }
    return dateSuperScript;
  }

  hotelCabSorting() {
    //  console.log(this.hotelDetails.length);
    if (this.hotelDetails.length == 31) {
      this.hotelDetailsFlag = false;
    } else {
      this.hotelDetailsFlag = true;
      for (let hotel of this.hotelDetails) {
        for (let flight of this.flightDetails) {
          if ((flight.to).toUpperCase() == (hotel.location).toUpperCase()) {
            flight.hotel = hotel;

          }
        }
      }
    }
    if (this.cabDetails.length == 29) {
      this.cabDetailsFlag = false;
    } else {
      this.cabDetailsFlag = true;
      for (let cab of this.cabDetails) {
        for (let flight of this.flightDetails) {
          if ((flight.to).toUpperCase() == (cab.location).toUpperCase()) {
            flight.cab = cab;
          }
        }
      }
    }
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
    // setInterval(
    //   () => {
        this._dataservice.getCustVisitAgendas(this.visitId)
        .subscribe(res => {
          if (res.data.length > 0) {
            this.agendaData = res.data;
            this.agendaData.dayCount = this.displayAgenda(res.data);
            console.log(this.agendaData, "===agendaData");
          } else {
            alert("no agendas");
          }
        },
        error => console.log("Error :: " + error)
        );
        
      // }
      //   , 500);
  
  }

  displayAgenda(agendaData) {

    let dayCount: Array<number> = []
    if (agendaData.length > 0) {
      this.agendaStatus = true;
      for (let x = 0; x < agendaData.length; x++) {
        dayCount[x] = x + 1;
      }
    } else {
      this.agendaStatus = false;
    }
    return dayCount;
  }

  renderAgenda(dayValue) {
    this.agendaChoice = dayValue;
    document.getElementById('agendaDataIndex0').classList.remove("active");
    console.log(this.agendaChoice);
  }

  show() {
    console.log("show");
    this.checkStatus = true;
  }
  hide() {
    console.log("hide");
    this.checkStatus = false;
  }

  agendaTabsFunc(val) {
    if (val == 0) {
      this.checkStatus = true;
      document.getElementById('itenaryLink').removeAttribute('class');
      document.getElementById('agendaLink').classList.add("active");
    } else {
      this.checkStatus = false;
      document.getElementById('agendaLink').removeAttribute('class');
      document.getElementById('itenaryLink').classList.add("active");
    }
  }
  openSessionDetails(agendaData) {
    console.log(agendaData);
    this.navCtrl.push(sessionDetailsPage, { "agendaData": agendaData, "visitDetails": this.visitDetails })
  }
}
