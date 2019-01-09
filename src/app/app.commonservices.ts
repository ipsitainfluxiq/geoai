/**
 * Created by kta pc on 7/25/2017.
 */

import {Injectable} from '@angular/core';
//import {Http, Response} from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
declare var moment: any;
import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices {
    items: Array<any>;
    url: any;
    imageurl: any;
    uploadurl: any;
    businesscall: any;
    callconsumer: any;
    businesssearchresults: any;
    searchresults: any;
    // constructor(private http: Http) {
    constructor(private http: HttpClient) {
        //this.url = 'https://geofencedsp.com/server.php?q=';
        //this.url = 'https://18.191.70.162/php/server.php?q=';
        this.url = 'https://geofencedsp.com/php/server.php?q=';
      //  console.log('this.url');
      //  console.log(this.url);
     //   this.imageurl = 'https://geofencedsp.com/assets/';
        this.imageurl = 'https://18.191.70.162/assets/';
     //   this.uploadurl = 'https://geofencedsp.com/assets/php/fileupload.php';
        this.uploadurl = 'https://18.191.70.162/assets/php/fileupload.php';
        this.businesscall = 'https://18.191.70.162/assets/php/businesscall.php?token=';
        this.callconsumer = 'https://18.191.70.162/assets/php/callconsumer.php?token=';
        this.businesssearchresults = 'https://18.191.70.162/assets/php/businesssearchresults.php?token=';
        this.searchresults = 'https://18.191.70.162/assets/php/searchresults.php?token=';
        /*  if (window.location.hostname == 'localhost') {
         this.url = 'http://localhost:3000/';
         } else {
         //  this.url = 'http://influxiq.com:3014/';
         this.url = 'http://geofencedsp.com:3000/';
         }*/
    }
    showdate(dd){
        return moment(dd).format('Do MMM YYYY, HH:mm');
    }
}
