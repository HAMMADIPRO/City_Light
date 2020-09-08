import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RemoteServiceProvider} from '../../providers/remote-service/remote-service';
import { Geolocation } from '@ionic-native/geolocation';
// import {Observable} from 'rxjs/Rx';
declare let google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any=null;
  message:any;

  constructor(public navCtrl: NavController,
              private remoteService: RemoteServiceProvider,
              public geolocation: Geolocation
  ) {

  }

  ionViewDidLoad() {
    this.loadMap();

  }


  loadMap() {



  // this.geolocation.getCurrentPosition().then((position) => {
  //   let UserCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let UserCoords = new google.maps.LatLng(33.980372, -6.866346);




    this.remoteService.getInfo().subscribe((data:Data) => {

if(data){

  console.log(data);
  if (google) {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: new google.maps.LatLng(data.center),

    });

    let UserMarker = new google.maps.Marker({
      position: UserCoords,
      title: "You"
    });
    UserMarker.setMap(this.map);
    let infoPopup = new google.maps.InfoWindow({
      content: `<b>Your Current Location</b>`
    });
    UserMarker.addListener('click', ()=> {
      infoPopup.open(this.map, UserMarker);
    });
    // infoPopup.open(Map, UserMarker);


    let destinationMarker = new google.maps.Marker({
      position: new google.maps.LatLng(34.021983, -6.840406),
      title: "Destination"
    });
    destinationMarker.setMap(this.map);
    let infoPopupDestination = new google.maps.InfoWindow({
      content: `<b>Destination</b>`
    });
    destinationMarker.addListener('click', ()=> {
      infoPopupDestination.open(this.map, destinationMarker);
    });
    // infoPopup.open(Map, destinationMarker);





    // let crossRoadMarker = new google.maps.Marker({
    //   position: new google.maps.LatLng(data.center),
    //   title: "Smart Traffic Light",
    //   icon:'assets/icon/traffic-light.png'
    // });
    // crossRoadMarker.setMap(this.map);
    // let infoPopupCrossRoad = new google.maps.InfoWindow({
    //   content: `<b>Smart Traffic Light</b>`
    // });
    // crossRoadMarker.addListener('click', ()=> {
    //   infoPopupCrossRoad.open(this.map, crossRoadMarker);
    // });
    // // infoPopup.open(Map, destinationMarker);



    directionsDisplay.setMap(this.map);

    let stopover=true;
    let status='neutral';
    if(data.X.status=='warning' || data.Y.status=='warning'){
      stopover=false;
      status='warning';
    }
let route={
  origin: UserCoords,
  destination: new google.maps.LatLng(34.021983, -6.840406),
  stopover:stopover
};
    this.calculateAndDisplayRoute(directionsService, directionsDisplay,route,this.map);
    directionsDisplay.setOptions( { suppressMarkers: true } );



// X path
    let xPath=[];
    xPath.push(new google.maps.LatLng(data.X.coords.start));
    xPath.push(new google.maps.LatLng(data.X.coords.end));
    let X = new google.maps.Polyline({
      path: xPath,
      geodesic: true,
      strokeColor: Utils.selectColor(data.X.status),
      strokeOpacity: 0.25,
      strokeWeight: 10
    });
    X.setMap(this.map);



    // Y path
    let yPath=[];
    yPath.push(new google.maps.LatLng(data.Y.coords.start));
    yPath.push(new google.maps.LatLng(data.Y.coords.end));
    let Y = new google.maps.Polyline({
      path: yPath,
      geodesic: true,
      strokeColor: Utils.selectColor(data.Y.status),
      strokeOpacity: 0.25,
      strokeWeight: 10
    });
    Y.setMap(this.map);




    let roundCircleOne = new google.maps.Circle({
      strokeOpacity: 0.8,
      strokeWeight: 0,
      fillColor: Utils.selectColor(status),
      fillOpacity: 0.75,
      map: this.map,
      center: new google.maps.LatLng(data.center),
      radius: 29
    });
    roundCircleOne.setMap(this.map);

    if(status=='warning'){
      let roundCircleOne = new google.maps.Circle({
        strokeOpacity: 0.8,
        strokeWeight: 0,
        fillColor: '#DB2828',
        fillOpacity: 0.25,
        map: this.map,
        center: new google.maps.LatLng(data.center),
        radius: 90
      });
      roundCircleOne.setMap(this.map);

    }

  }
}
    });

  // });
  }



  calculateAndDisplayRoute(directionsService, directionsDisplay,route,map) {
    let waypts = [];

    if(route.stopover){
      waypts.push({
        location: {lat: 33.990217, lng: -6.857190},
        stopover: true
      });
    }




    directionsService.route({
      origin: route.origin,
      destination: route.destination,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'DRIVING',
      // preserveViewport:true,
      // center:new google.maps.LatLng({lat: 33.990217, lng: -6.857190})
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        // map.setZoom(12);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }




}
interface Data{
  label:String,
  X: {
    coords: {
      start: {lat: String, lng: String},
      end: {lat: String, lng: String}
    },
    status: String,
    carCount:Number
  },
  Y: {
    coords: {
      start: {lat: String, lng: String},
      end: {lat: String, lng: String}
    },
    status: String,
    carCount:Number
  },
  center: {lat: String, lng: String},
  status:String
}


export class Utils{
  static selectColor(type){
    switch (type){
      case 'danger':{
        return '#DB2828'
      }
      case 'warning':{
        return '#F2711C'
      }
      case 'neutral':{
        return 'rgba(33,186,69,1)'
      }
      case 'positive':{
        return '#21BA45'
      }
      default:{
        return 'rgba(0,0,0,0)'
      }
    }
  }
}
