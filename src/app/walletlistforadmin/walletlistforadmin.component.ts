import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
import {CookieService} from 'ngx-cookie-service';
declare var moment: any;

@Component({
  selector: 'app-walletlistforadmin',
  templateUrl: './walletlistforadmin.component.html',
  styleUrls: ['./walletlistforadmin.component.css'],
    providers: [Commonservices],
})
export class WalletlistforadminComponent implements OnInit {
    public datalist;
    public serverurl;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public userdetails;
    public typeis;
    public emailid;
    public filterval;
    public filterval1;
    public filterval2;
    public filterval3;
    public filterval4='';
    public filterval5;

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
        console.log(this.filterval5);
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
            this.filterval += this.filterval4 + '|';
        }
        if (this.filterval5 != '' && this.filterval5 != null) {
            this.filterval += this.filterval5+ '|';
        }
    }
    autocompleListFormatter = (data: any) => {
        return data.name;
    }
    valueChanged(data: any): string {
        console.log(data);
        return data;
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.emailid = params['emailid'];
            console.log(this.emailid);
            this.getalltransactionsofthisemail();
        });
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
                this.typeis=this.userdetails[0].type;
            }, error => {
                console.log('Oooops!');
            });
    }
    getalltransactionsofthisemail() {
        let link = this.serverurl + 'getalltransactionsofthisemail';
        let data = {
            added_by: this.emailid
        }
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.datalist = result.res;
            }, error => {
                console.log('Oooops!');
            });
    }

    showdate(dt){
        return moment(dt).format('Do MMM , YYYY');
    }
}
