import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-devicetypes',
    templateUrl: './devicetypes.component.html',
    styleUrls: ['./devicetypes.component.css'],
    providers: [Commonservices]
})
export class DevicetypesComponent implements OnInit {
    public serverurl: any;
    public addcookie: CookieService;
    public cookiedetails;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public Mobile: any;
    public Desktops: any;
    public Tablets: any;
    public TV: any;
    public result: any;
    public datalist: any;
    public selected_devices: any = [];

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: HttpClient, private _commonservices: Commonservices) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
        this.getselecteddevices();
    }

    ngOnInit() {
    }
    getselecteddevices() {
        let link = this.serverurl + 'gettotallist';
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                this.datalist = result;
                console.log('this.datalist');
                console.log(this.datalist);
                console.log(this.datalist[0].selected_devices);
                if (typeof (this.datalist[0].selected_devices) != 'undefined') {
                    for (let x in this.datalist[0].selected_devices) {
                        if (this.datalist[0].selected_devices[x] == 'Mobile') {
                            this.Mobile = true;
                        }if (this.datalist[0].selected_devices[x] == 'Desktops') {
                            this.Desktops = true;
                        }if (this.datalist[0].selected_devices[x] == 'Tablets') {
                            this.Tablets = true;
                        }if (this.datalist[0].selected_devices[x] == 'TV') {
                            this.TV = true;
                        }
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    updatedevices() {
        if (this.Mobile == true) {
            this.selected_devices.push('Mobile');
        }
        if (this.Desktops == true) {
            this.selected_devices.push('Desktops');
        }
        if (this.Tablets == true) {
            this.selected_devices.push('Tablets');
        }
        if (this.TV == true) {
            this.selected_devices.push('TV');
        }

        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails,
            // createaudienceid: 703030,
            selected_devices: this.selected_devices,
        }
        console.log('updatedevices');
        console.log(data);
        this.doupdate(data);
    }

    doupdate(data: any) {
        this.selected_devices = [];
        let link = this.serverurl + 'devices';
        console.log(link);
        this._http.post(link, data)
            .subscribe(res => {
                this.result = res;
            }, error => {
                console.log('Oooops!');
            });
    }
}
