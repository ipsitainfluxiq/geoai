import { Component, OnInit } from '@angular/core';
import { LatLngLiteral, MapsAPILoader, CircleManager} from '@agm/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import { ActivatedRoute, Params, Router } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-cicrlemap',
    templateUrl: './cicrlemap.component.html',
    styleUrls: ['./cicrlemap.component.css'],
    providers: [Commonservices],
})
export class CicrlemapComponent implements OnInit {

    public serverurl;
    public lat;
    public lng;
    public manager1: CircleManager;
    public mapval: any;
    public markers: Array<LatLngLiteral> = [];
    public temppath: Array<LatLngLiteral>= [];
    public temparrval: Array<LatLngLiteral>= [];
    public temparr: Array<LatLngLiteral>= [];
    public key: any;
    public searchaddress: any;
    public link;
    public result;

    constructor( private _http: HttpClient, private mapsAPILoader: MapsAPILoader, emailcookie: CookieService, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, manager: CircleManager) {
        this.serverurl = _commonservices.url;
        this.mapval = false;
        this.mapval = true;
        this.manager1 = manager;
        this.lat = 39.74943369178247;
        this.lng = -99.4921875;
    }

    ngOnInit() {
        // this.getBounds();
        /*  this.markers = [
              {
                  lat: 51.673858,
                  lng: 7.815982,
              },
              {
                  lat: 51.373858,
                  lng: 7.215982,
              },
              {
                  lat: 51.723858,
                  lng: 7.895982,
              }
          ];*/

    }
    getBounds() {
         // return this.manager1.getBounds(this.lat);
       // console.log(this.manager1.getBounds());
    }

    mapClicked($event: any) {
        this.temppath = [] ;
        console.log('mapclicked');
        this.temppath.push($event.coords);
       /* console.log(this.temppath);
        if (this.temppath.length != 0) {
            let temparr: Array<any> = [];
            let temparrval: Array<any> = [];
            let x: any;
            for (x in this.temppath) {
                console.log(this.temppath[x].lat);
                console.log(this.temppath[x].lng);
                console.log(temparr);
                temparrval = [];
                temparrval.push(this.temppath[x].lng);
                temparrval.push(this.temppath[x].lat);
                console.log('=======================temparrval==================');
                console.log(temparrval);
                temparr.push(temparrval);
            }
        }
        console.log(this.temppath);
*/

    }

    createsh() {
        console.log('this.temppath at start---------????????????????????????????????');
        if (this.temppath.length != 0) {
            let x: any;
            for (x in this.temppath) {
                console.log(this.temppath[x].lat);
                console.log(this.temppath[x].lng);
              //  this.temparrval = [];
                this.temparrval.push({
                    lat: this.temppath[x].lat,
                    lng: this.temppath[x].lng
                });
                console.log('=======================temparrval==================');
                console.log(this.temparrval);
            }

        }
        this.temppath = [] ;
    }

    searchlatlng(char) {
        this.key = char.keyCode;
        this.link = 'http://maps.google.com/maps/api/geocode/json?address=' + this.searchaddress;
        if (this.key == '13') {
            this._http.get(this.link)
                .subscribe(res => {
                    this.result = res;
                    console.log('this.result7777777777777777777777');
                    this.lat = this.result.results[0].geometry.location.lat;
                    this.lng = this.result.results[0].geometry.location.lng;
                }, err => {
                    console.log('Ooops');
                });
        }
    }
   /* mapClicked($event: any) {
        console.log('mapclicked');
        // console.log($event.coords.lat);
        // console.log($event.coords.lng);
        // this.temppath.push({lat:$event.coords.lat,lng:$event.coords.lng});
        this.temppath.push($event.coords);
        console.log(this.temppath);
        console.log('this.patharr');
        console.log(this.patharr);
        if (this.temppath.length == 2) {
            this.patharr.push(this.temppath);
        }
        if (this.temppath.length > 2) {
            // this.patharr.push(this.paths1);
            console.log('in 2>');
            this.patharr.pop();
            setTimeout(() => {
                // this.patharr=this.patharr.slice(0,1);
                this.patharr.push(this.temppath);
            }, 300);
        }
    }*/

}
