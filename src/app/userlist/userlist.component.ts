import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css'],
    providers: [Commonservices],
})
export class UserlistComponent implements OnInit {
    public datalist;
    public addcookie: CookieService;
    public cookiedetails;
    public showrows;
    public totalpage;
    public pageno;
    public campaignlist_length;
    public pagestart;
    public pageinitation;
    orderbyquery: any;
    orderbytype: any;
    public serverurl;

    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, addcookie: CookieService, private _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.orderbyquery = 'firstname';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.getUserList();
    }
    getUserList() {
        let link = this.serverurl + 'userlist';
       // let link = 'http://localhost:3004/userlist';
        let data = {};
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log(result);
                this.datalist = result;
                this.campaignlist_length = result.length;
                this.totalpage = this.campaignlist_length / this.showrows ;

            }, error => {
                console.log('Oooops!');
            });
    }

    chagevalues() {
        setTimeout(() => {

            this.totalpage = this.campaignlist_length / this.showrows ;
            if (this.campaignlist_length % this.showrows != 0) {
                this.totalpage = this.totalpage + 1;
            }
            this.pageno = 1;
            this.pagestart = 0;
            this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);

        }, 300);

    }

    pageval(type) {
        if (type == 1 ) {  // for prev page
            if ((this.pagestart - this.showrows) >= 0) {
                this.pageno--;
                this.pagestart = (this.pageno - 1) * this.showrows;
            }
        }

        if ( type == 2 ) {  // for next page
            if (this.campaignlist_length - this.showrows - 1 >= this.pagestart) {
                this.pagestart = this.pageno * this.showrows;
                this.pageno++;
            }
        }

        if ( type == 3 ) {    // for goto input type
            if ( (this.pageno >0) && (this.pageno <= this.totalpage) ) {
                this.pagestart = (this.pageno - 1) * this.showrows;
            } else {
                this.pageno = 1;
                this.pagestart = 0;
            }
        }
        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
    }

    getSortClass(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            return 'caret-up';
        }

        if (this.orderbyquery == value && this.orderbytype == 1) {
            // console.log('caret-up');
            return 'caret-down';
        }
        return 'caret-up-down';
    }

    manageSorting(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            this.orderbytype = 1;
            return;
        }
        if (this.orderbyquery == value && this.orderbytype == 1) {
            this.orderbytype = -1;
            return;
        }
        this.orderbyquery = value;
        this.orderbytype = 1;
    }
}
