import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import { Platform, ModalController } from "ionic-angular";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { MessageAgentProvider } from "../../providers/chatbot-agent";

declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
 
  messages: any = [];
  chatBox: string = "";
  user: "";
  from: {
    user:any;
    Bot: "Bot";
  };
  attendees: any[];
  @ViewChild(Content) content: Content;
  @ViewChild('map') mapElement: ElementRef;
  currentDate = Date.now();

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public MessageAgentProvider: MessageAgentProvider,
    public modalCtrl: ModalController,
    private nativeGeocoder: NativeGeocoder,
    public navParams: NavParams    
  ) {

   this.user = navParams.get('user');
  
    this.MessageAgentProvider.conversation.subscribe(res => {
      this.messages = [...this.messages, ...res];
      this.scrollToBottom();
    });

  }
  send(chatBox ) {

     this.MessageAgentProvider.talk(chatBox).then(() => {
     this.chatBox = "";
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  keyPressHandler(keyCode, chatBox) {
    //console.log("keyPressHandler", keyCode);
    // Pressed enter key.
    if (keyCode == 13) {
      this.MessageAgentProvider.talk(chatBox).then(() => {
        this.chatBox = "";
      });
    }
  }

  // onClickWeatherIcon() {
  //   console.log("onClickWeatherIcon");
  //   let modal = this.modalCtrl.create(WeatherAnimationModalPage);
  //   modal.present();
  // }
//   geoLocator(){
//   this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
//   .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
//   .catch((error: any) => console.log(error));

// this.nativeGeocoder.forwardGeocode('India')
//   .then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude))
//   .catch((error: any) => console.log(error));
//   }
  // initMap() {
  //   navigator.geolocation.getCurrentPosition((location) => {
  //     console.log(location);
  //     map = new google.maps.Map(this.mapElement.nativeElement, {
  //       center: {lat: location.coords.latitude, lng: location.coords.longitude},
  //       zoom: 15
  //     });
  
  //     infowindow = new google.maps.InfoWindow();
  //     var service = new google.maps.places.PlacesService(map);
  //     service.nearbySearch({
  //       location: {lat: location.coords.latitude, lng: location.coords.longitude},
  //       radius: 1000,
  //       type: ['store']
  //     }, (results,status) => {
  //       if (status === google.maps.places.PlacesServiceStatus.OK) {
  //         for (var i = 0; i < results.length; i++) {
  //           this.createMarker(results[i]);
  //         }
  //       }
  //     });
  //   }, (error) => {
  //     console.log(error);
  //   }, options);
  //   var myplace = {lat: -33.8665, lng: 151.1956};
  // }
  // createMarker(place) {
  //   var placeLoc = place.geometry.location;
  //   var image = {
  //     url: place.icon,
  //     size: new google.maps.Size(71, 71),
  //     origin: new google.maps.Point(0, 0),
  //     anchor: new google.maps.Point(17, 34),
  //     scaledSize: new google.maps.Size(25, 25)
  //   };
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: placeLoc,
  //     icon: image
  //   });
  //   console.log(place);
  //   google.maps.event.addListener(marker, 'click', function() {
  //     // infowindow.setContent(place.name);
  //     // infowindow.open(map, this);
  //     infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
  //       'Place ID: ' + place.place_id + '<br>' +
  //       place.vicinity + '</div>');
  //     infowindow.open(map, this);
  //   });
  // }
  goBack(){
    this.navCtrl.pop();
  }
}
