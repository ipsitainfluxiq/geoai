import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
declare var $: any;
declare var google: any;

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {
  public addcookie: CookieService;
  public cookiedetails;
    public flightPath;
    public map;

  constructor(private _http: HttpClient, private router: Router, addcookie: CookieService) {
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log('get id from saved cookie ->  '+this.cookiedetails);
  }

  ngOnInit() {
      this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: 0, lng: -180},
          mapTypeId: 'terrain'
      });

      var flightPathCoordinates = [
          {lat: 37.772, lng: -122.214},
          {lat: 21.291, lng: -157.821},
          {lat: -18.142, lng: 178.431},
          {lat: -27.467, lng: 153.027}
      ];
      this.flightPath = new google.maps.Polyline({
          path: flightPathCoordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
      });

      this.addLine();

  }
  show(){
/*    $('#calender').datepicker();*/
  }

    addLine() {
        this.flightPath.setMap(this.map);
    }

    removeLine() {
        this.flightPath.setMap(null);
    }
}
