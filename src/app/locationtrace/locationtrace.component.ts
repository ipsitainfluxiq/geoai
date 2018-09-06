import { Component, OnInit } from '@angular/core';
import {LatLngLiteral, MapsAPILoader} from '@agm/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import { ActivatedRoute, Params, Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-locationtrace',
    templateUrl: './locationtrace.component.html',
    styleUrls: ['./locationtrace.component.css'],
    providers: [Commonservices],
})
export class LocationtraceComponent implements OnInit {
    public serverurl;
    public  emailcookie: CookieService;
    public  mailcookiedetails;
    public  userdetails;
    public pi;
    public j;
    public  r_earth;
    public  add_val: any = [];
    public  temppath: any = [];
    public  patharray: any = [];
    patharr:  Array<LatLngLiteral> = [];
    ad:  Array<LatLngLiteral> = [];
    ad1 = [];
    polys:  Array<LatLngLiteral> = [];
    public lat: any;
    public lng: any;
    public mapval: any;
    paths: Array<LatLngLiteral> = [];
    // paths: Array<LatLngLiteral> = [
/*    {lat: 25.918157, lng: -81.6725852054},
    {lat: 25.9172586647, lng: -81.6725852054},
    {lat: 25.9172586647, lng: -81.6745827946},
    {lat: 25.918157, lng: -81.6745827946},
    {lat: 25.9190553353, lng: -81.6745827946},
    {lat: 25.9190553353, lng: -81.6725852054},
    {lat: 25.918157, lng: -81.6725852054}*/
/*    {lat: 33.1387952, lng: -96.8625107348},
    {lat: 33.137898847, lng: -96.8625107348},
    {lat: 33.137898847, lng: -96.8646516652},
    {lat: 33.1387952, lng: -96.8646516652},
    {lat: 33.139691553, lng: -96.8646516652},
    {lat: 33.139691553, lng: -96.8625107348},
    {lat: 33.1387952, lng: -96.8625107348}*/
/*    {lat: 33.1387952, lng: -96.8635801295},
    {lat: 33.1387943036, lng: -96.8635801295},
    {lat: 33.1387943036, lng: -96.8635822705},
    {lat: 33.1387952, lng: -96.8635822705},
    {lat: 33.1387960964, lng:  -96.8635822705},
    {lat: 33.1387960964, lng: -96.8635801295},
    {lat: 33.1387952, lng: -96.8635801295},*/
/*    {lat: 33.1387952, lng: -96.8635704953},
    {lat: 33.1387862365, lng: -96.8635704953},
    {lat: 33.1387862365, lng: -96.8635919047},
    {lat: 33.1387952, lng: -96.8635919047},
    {lat: 33.1388041635, lng:  -96.8635919047},
    {lat: 33.1388041635, lng: -96.8635704953},
    {lat: 33.1387952, lng: -96.8635704953},*/
/*    {lat: 33.1392977, lng: -96.8639528529},
    {lat: 33.1392080647, lng: -96.8639528529},
    {lat: 33.1392080647, lng: -96.8641669471},
    {lat: 33.1392977, lng: -96.8641669471},
    {lat: 33.1393873353, lng:  -96.8641669471},
    {lat: 33.1393873353, lng: -96.8639528529},
    {lat: 33.1392977, lng: -96.8639528529},*/
/*    {lat: 33.1392816, lng: -96.8641853529},
    {lat: 33.1391919647, lng: -96.8641853529},
    {lat: 33.1391919647, lng: -96.8643994471},
    {lat: 33.1392816, lng: -96.8643994471},
    {lat: 33.1393712353, lng:  -96.8643994471},
    {lat: 33.1393712353, lng: -96.8641853529},
    {lat: 33.1392816, lng: -96.8641853529},*/
/*{lat: 25.918157, lng: -81.6734843409},
    {lat: 25.9180673647, lng: -81.6734843409},
    {lat: 25.9180673647, lng: -81.6736836591},
    {lat: 25.918157, lng: -81.6736836591},
    {lat: 25.9182466353, lng:  -81.6736836591},
    {lat: 25.9182466353, lng: -81.6734843409},
    {lat: 25.918157, lng: -81.6734843409},*/
    /* {lat: 25.96782579, lng: -81.7411359389},
    {lat: 25.9677361547, lng: -81.7411359389},
    {lat: 25.9677361547, lng: -81.7413353411},
    {lat: 25.96782579, lng: -81.7413353411},
    {lat: 25.9679154253, lng: -81.7413353411},
    {lat: 25.9679154253, lng: -81.7411359389},
    {lat: 25.96782579, lng: -81.7411359389},
  ];
*/
    constructor( private _http: HttpClient, private mapsAPILoader: MapsAPILoader, emailcookie: CookieService, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.mapval = false;
        this.mapval = true;
        this.lng = -81.74123564;
        this.lat = 25.96782579;
        this.pi = 3.14159;
        this.r_earth = 6378;
        // this.patharr=['',''];
        /*  this.patharr = [
      {lat: -81.6725852054, lng: 25.918157},
      {lat: -81.6725852054, lng: 25.9172586647},
      {lat: -81.6725852054, lng: 25.918157}
    ];
*/
//    console.log(this.patharr);
    }

    ngOnInit() {
        this.getdetails();
    }
    getdetails() {
        let link = this.serverurl + 'addresslist';
        // var link = 'http://localhost:3004/addresslist';
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.userdetails = result.res;
                console.log('length is ' + this.userdetails.length);
                for (let i in this.userdetails) {
                    if ( parseInt(i) > 100 ) {
                        this.j = 1000;
                    }
                    else {
                        this.j = 0;
                    }
                    setTimeout(() => {
                        //   console.log(i);
                        //   console.log('tofixed log ...');
                        /* let x=this.userdetails[i].Latitude.toFixed(5);
                let y=this.userdetails[i].Longitude.toFixed(5);
              console.log(this.userdetails[i].Latitude.toFixed(5));*/
                        this.temppath = [];
                        this.ad = [];
                        this.ad.push({lat: this.userdetails[i].Latitude , lng: this.userdetails[i].Longitude});
                        this.ad1.push(this.ad);
                        this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , 0 , 0.0099779328));
                        this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , -0.0099779328 , 0.0099779328));
                        this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , -0.0099779328 , -0.0099779328));
                        this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , 0 , -0.0099779328));
                        this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , 0.0099779328 , -0.0099779328));
                        this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , 0.0099779328 , 0.0099779328));
                        this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , 0 , 0.0099779328));
                        //  console.log(this.temppath);
                        this.paths.push(this.temppath);
                    }, this.j);
                }
/*  console.log('paths ....');
            console.log(this.paths);
            console.log(this.paths.length);
            console.log('ad1....');
            console.log(this.ad1);*/
            }, error => {
                console.log('Ooops');
            });
    }

    addressval_1(lat_new , lng_new , dy , dx) {
        // console.log(lat_new);
        /*lat_new=(lat_new).toString().substr(0, 5);
      lng_new=(lng_new).toString().substr(0, 5);*/
        // console.log(lng_new);
        let new_latitude  = lat_new + (dy / this.r_earth ) * (180 / this.pi);
        let new_longitude = lng_new + (dx / this.r_earth ) * (180 / this.pi) / Math.cos(this.lat * this.pi / 180);
        /* this.temppath.push({
            lat: new_latitude,
            lng: new_longitude
        });*/
        // this.temppath.push(new_latitude , new_longitude);
        // console.log('lat val');
        // console.log(new_latitude);
        // console.log('lng val');
        // console.log(new_longitude);
        return  {lat: new_latitude , lng: new_longitude};
    }
}
