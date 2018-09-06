import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-os',
    templateUrl: './os.component.html',
    styleUrls: ['./os.component.css'],
    providers: [Commonservices]
})
export class OsComponent implements OnInit {
    public serverurl: any;
    public addcookie: CookieService;
    public cookiedetails;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public allos: any = [];
    public alloslist: any = [];
    public selected_os: any = [];
    public oslen: any;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: HttpClient, private _commonservices: Commonservices) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
        this.allos = ['IOS 4 And Earlier', 'OS X', 'Linux', 'Windows', 'Windows 7', 'Windows 8', 'Windows 8.1', 'Windows 10', 'Windows Other', 'Windows Vista', 'IOS', 'IOS 5', 'IOS 6', 'IOS 7', 'IOS 8', 'IOS 9', 'Other'];
        this.getos();
    }

    ngOnInit() {
    }
    getos() {
        let link = this.serverurl + 'gettotallist';
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.getos = result;
                if (typeof(this.getos[0].operating_system) != 'undefined') {
                    for (let x in this.getos[0].operating_system) {
                        this.alloslist[this.getos[0].operating_system[x]] = true;
                    }
                    this.oslen = this.getos[0].operating_system.length;
                    if (this.oslen == 0) {
                        this.oslen = 'None';
                    }
                    if (this.oslen == 1) {
                        this.oslen = '1 Operating System';
                    }
                    if (this.oslen > 1 && this.oslen < 17) {
                        this.oslen = this.oslen + ' Operating Systems';
                    }
                    if (this.oslen == 17) {
                        this.oslen = 'Any';
                    }
                }
                else {
                    this.oslen = 'None';
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    updateos() {
        console.log(this.alloslist);
        for (let x in this.alloslist) {
            if (this.alloslist[x] == true) {
                this.selected_os.push(x);
            }
        }
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails,
            operating_system: this.selected_os
        }
        console.log('updateos');
        console.log(data);
        this.doupdate(data);
    }

    doupdate(data: any) {
        let link = this.serverurl + 'updateos';
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
            }, error => {
                console.log('Oooops!');
            });

        this.oslen = this.selected_os.length;
        if (this.oslen == 0) {
            this.oslen = 'None';
        }
        if (this.oslen == 1) {
            this.oslen = '1 Operating System';
        }
        if (this.oslen > 1 && this.oslen < 17) {
            this.oslen = this.oslen + ' Operating Systems';
        }
        if (this.oslen == 17) {
            this.oslen = 'Any';
        }
        this.selected_os = [];
    }
}
