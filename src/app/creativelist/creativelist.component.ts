import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-creativelist',
  templateUrl: './creativelist.component.html',
  styleUrls: ['./creativelist.component.css'],
    providers: [Commonservices],
})
export class CreativelistComponent implements OnInit {
    public datalist;
    public showrows;
    public id;
    public totalpage;
    public pageno;
    public campaignlist_length;
    public pagestart;
    public pageinitation;
    orderbyquery: any;
    orderbytype: any;
    public serverurl;
    public isModalShown: boolean = false;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;

    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, addcookie: CookieService, private _commonservices: Commonservices, public _sanitizer: DomSanitizer, emailcookie: CookieService, alldetailcookie: CookieService) {
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.orderbyquery = 'creativename';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.alldetailcookie = alldetailcookie ;
        this.cookiedetailsforalldetails = this.alldetailcookie.getObject('cookiedetailsforalldetails');
    }

    ngOnInit() {
        this.getCreativeList();
    }
    getCreativeList() {
        let link = this.serverurl + 'creativelist';
        let data = { emailid: this.mailcookiedetails, type: this.cookiedetailsforalldetails.type};
        this._http.post(link , data)
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

    delConfirm(id) {
        this.id = id;
        this.isModalShown = true;
        console.log(this.isModalShown);
    }

    onHidden() {
        this.isModalShown = false;
    }
    callunsafe(id) {
        var url = 'http://simplyfi.influxiq.com/showad.php?id=' + id;
      //  return url;
       // console.log(url);
        //console.log(this._sanitizer.bypassSecurityTrustHtml(url));
      //  return this._sanitizer.bypassSecurityTrustUrl(url);
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
        //return this._sanitizer.bypassSecurityTrustHtml(url);
    }
    creativedel() {
        console.log('creativedel');
        this.isModalShown = false;
        console.log('id got' + this.id);
        let link = this.serverurl + 'deletecreative';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                console.log(result);
                console.log('Data Deleted');
            }, error => {
                console.log('Oooops!');
            });
        setTimeout(() => {
            this.getCreativeList();
        }, 300);
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