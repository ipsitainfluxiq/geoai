import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
import {CookieService} from 'ngx-cookie-service';
declare var moment: any;

@Component({
    selector: 'app-walletlist',
    templateUrl: './walletlist.component.html',
    styleUrls: ['./walletlist.component.css'],
    providers: [Commonservices],
})
export class WalletlistComponent implements OnInit {
    public datalist;
    public serverurl;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public userdetails;
    public typeis;
    public filterval;
    public filterval1;
    public filterval2;
    public filterval3;
    public filterval4='';

    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices,  emailcookie: CookieService) {
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log(this.mailcookiedetails);
        if(this.mailcookiedetails != null){
            this.getuserdetails();
        }

    }
    searchbyval() {

console.log('searchbyval');
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.filterval2 != '' && this.filterval2 != null) {
            this.filterval2 = moment(this.filterval2).unix();
            this.filterval += this.filterval2 + '|';
        }
        if (this.filterval3 != '' && this.filterval3 != null) {
            this.filterval3 = moment(this.filterval3).unix();
            this.filterval += this.filterval3 + '|';
        }
        if (this.filterval4 != '' && this.filterval4 != null) {
            this.filterval += this.filterval4;
        }
    }
    ngOnInit() {
    }
    getuserdetails() {
        let link = this.serverurl + 'userdetails';
        let data={
            email: this.mailcookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.userdetails = result.res;
                console.log('this.userdetails.type');
                console.log(this.userdetails[0].type);
                this.typeis=this.userdetails[0].type;
              /*  /!*admin*!/
                if(this.userdetails[0].type==1){
                    this.getwalletlist();
                }*/
                /*others*/
              /*  else{*/
                    this.getwalletlistofthisuserid();
               /* }*/
            }, error => {
                console.log('Oooops!');
            });
    }

    getwalletlistofthisuserid() {
        let link = this.serverurl + 'walletlistofthisuserid';
        let data={
            email: this.mailcookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.datalist = result.res;
                console.log('this.datalist--walletlist');
            }, error => {
                console.log('Oooops!');
            });
    }

    showdate(dt){
    return moment(dt).format('Do MMM , YYYY');
}
}
