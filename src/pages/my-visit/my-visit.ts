import { Component, Input } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { rootModulePage } from '../rootModule/rootModule';
import { DataServiceProvider } from '../../providers/data-service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { sessionDetailsPage } from '../sessionDetails/sessionDeatisl';
import { LoadingController } from 'ionic-angular';
import { concat } from 'rxjs/operators/concat';

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
  flightDetailsFlag: boolean = true;
  hotelDetailsFlag: boolean = true;
  cabDetailsFlag: boolean = true;
  arrowUp : boolean = true;
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
      if (itinearyData[itenary]['flightDetails']) {
           this.flightDetails = itinearyData[itenary]['flightDetails'];
       
        if(typeof this.flightDetails == "string" ){
          this.flightDetailsFlag = false;
        }
        else {
          this.flightDetailsFlag = true;
          this.datesProcessing(this.flightDetails);
        }
        
        }
    

      if (itinearyData[itenary]['hotelDetails']) {
        this.hotelDetailsFlag = true;
        this.hotelDetails = itinearyData[itenary]['hotelDetails'];
        if(typeof this.hotelDetails == "string" ){
          this.hotelDetailsFlag = false;
        }
        else {
          this.hotelDetailsFlag = true;
          this.datesProcessing(this.hotelDetails);
        }
   
        console.log(this.hotelDetails, "hotel");

      }
      else {
        this.hotelDetailsFlag = false;
      }
      if (itinearyData[itenary]['cabDetails']) {
       // this.cabDetailsFlag = true;
        this.cabDetails = itinearyData[itenary]['cabDetails'];
        if(typeof this.cabDetails == "string" ){
          this.cabDetailsFlag = false;
        }
        else {
          this.cabDetailsFlag = true;
          this.datesProcessing(this.cabDetails);
        }
      
        console.log(this.cabDetails, "cab");
      }
      else {
        this.cabDetailsFlag = false;
      }

    }
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
        } else{
          details.startSuperScript = this.daysSuperScript(details.startDate);
          
        }
      
   
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
    if (typeof this.hotelDetails == "string") {
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
    if (typeof this.cabDetails == "string") {
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
            this.agendaData.forEach((element,index) => {
              element.records.forEach((element1,index1) => {
                    this.agendaData[index].records[index1].from = this.tConvert(element1.from);
                    this.agendaData[index].records[index1].to= this.tConvert(element1.to);
                });
            });
           
          } else {
            // alert("no agendas");
            this.agendaData = false;
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
 tConvert (time) {
    // Check correct time format and split into components
    if(time != undefined) {
      var timeSplit = time.split(':'),
          hours,
          minutes,
          meridian;
          hours = timeSplit[0];
          minutes = timeSplit[1];

      if (hours > 12) {
          meridian = 'PM';
          hours -= 12;
      } else if (hours < 12) {
          meridian = 'AM';
          if (hours == 0) {
              hours = 12;
          }
      } else {
          meridian = 'PM';
      }
      return (hours + ':' + minutes + ' ' + meridian);
    }
  }

  arrowFlag(){
    if(this.arrowUp){
      this.arrowUp = false; 
      console.log(this.arrowUp);
    }
  
    else
{this.arrowUp = true; 
console.log(this.arrowUp);}
  }
  
 
}
