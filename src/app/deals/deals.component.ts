import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-deals',
    templateUrl: './deals.component.html',
    styleUrls: ['./deals.component.css'],
    providers: [Commonservices]
})
export class DealsComponent implements OnInit {
    public serverurl: any;
    public addcookie: CookieService;
    public cookiedetails;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public dealdetails: any;
    public pushdeals: any = [];
    public pushdeals1: any = [];
    public pushdealsnew: any = [];
    public deallen: any;
    public getdeal: any = [];
    public dealstatusval: any;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: HttpClient, private _commonservices: Commonservices) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
        this.pushdeals = [] ;
        this.pushdeals1 = [] ;
        this.pushdealsnew = [] ;
        this.getdeals();
    }

    ngOnInit() {
    }

    getdeals() {
        let link = this.serverurl + 'gettotallist';
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                this.getdeal = [];
                this.getdeal = res;
                if (typeof (this.getdeal[0].deals) != 'undefined') {
                    for (let i in this.getdeal[0].deals) {
                        this.pushdeals.push(this.getdeal[0].deals[i]);
                        this.pushdeals1.push(this.getdeal[0].deals[i]);
                    }
                    this.dealstatusval = 'Active';
                    this.deallen = this.getdeal[0].length;
                    console.log(this.deallen);
                    if (this.deallen == 0) {
                        this.deallen = 'None';
                    }
                    if (this.deallen == 1) {
                        this.deallen = '1 deal';
                    }
                    if (this.deallen > 1) {
                        this.deallen = this.deallen + ' deals';
                    }
                    console.log(this.deallen);
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    adddeals() {
        this.pushdealsnew.push(this.dealdetails);
        this.dealdetails = '';
    }

    deletedeals() {
        this.pushdealsnew = [];
        this.pushdeals = [];
        this.pushdeals1 = [];
        this.updatedeal();
    }
    updatedeal() {
        this.pushdeals = this.pushdeals.concat(this.pushdealsnew);
        let data = {
            emailid: this.mailcookiedetails,
            deals: this.pushdeals,
            createaudienceid: this.cookiedetails,
        }
        this.deallen = data.deals.length;
        if (this.deallen == 0) {
            this.deallen = 'None';
        }
        if (this.deallen == 1) {
            this.deallen = '1 deal';
        }
        if (this.deallen > 1) {
            this.deallen = this.deallen + ' deals';
        }

        let link = this.serverurl + 'updatedeal';
        this._http.post(link, data)
            .subscribe(res => {
                // this.result = res.json();
            }, error => {
                console.log('Oooops!');
            });

        let dealval = data.deals;
        this.pushdeals1 = dealval;
        this.pushdealsnew = [];
    }

    deletedeal(item) {
        let indexval: any = this.pushdeals.indexOf(item);
        let indexval2: any = this.pushdeals1.indexOf(item);
        console.log('-----------------');
        console.log('-----------------');
        console.log(indexval);
        console.log(indexval2);
        this.pushdeals.splice(indexval, 1);
        console.log('pushdeals');
        console.log(this.pushdeals);
        console.log('pushdeals1');
        console.log(this.pushdeals1);
    }
}
