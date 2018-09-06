import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-audiencelist',
  templateUrl: './audiencelist.component.html',
  styleUrls: ['./audiencelist.component.css'],
    providers: [Commonservices],
})
export class AudiencelistComponent implements OnInit {
    public serverurl: any;
    public datalist: any;
    public datalist_length: any;
    public addcookie: CookieService;
    public cookiedetails;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public orderbyquery: any;
    public orderbytype: any;
    public id:any;
    public pageno;
    public pagestart;
    public pageinitation;
    public totalpage;
    public showrows;
    public isModalShown: boolean = false;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: HttpClient, private _commonservices: Commonservices, private router: Router, private route: ActivatedRoute, ) {
        console.log('constructir');
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.orderbyquery = 'dateofcreation';
        this.orderbytype = 1;
    }

  ngOnInit() {
      this.getAudienceList();
  }
    getAudienceList() {
        let link = this.serverurl + 'getaudiencelist';
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log(result);
                this.datalist = result;
                this.datalist_length = result.length;
                this.totalpage = this.datalist_length / this.showrows ;

            }, error => {
                console.log('Oooops!');
            });
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

    pageval(type) {

        if (type == 1 ) {       // for prev page
            if ((this.pagestart - this.showrows) >= 0) {
                this.pageno--;
                this.pagestart = (this.pageno - 1) * this.showrows;
            }
        }

        if ( type == 2 ) {      // for next page
            if (this.datalist_length - this.showrows - 1 >= this.pagestart) {
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
    chagevalues() {
        //   setTimeout(() => {
        this.totalpage = this.datalist_length / this.showrows ;
        if (this.datalist_length % this.showrows != 0) {
            this.totalpage = this.totalpage + 1;
        }
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);

        //  }, 700);
    }

    delConfirm(id) {
        this.id = id;
        this.isModalShown = true;
    }
    onHidden() {
        this.isModalShown = false;
    }
    audiencedel() {
        console.log('admindel');
        this.isModalShown = false;
        console.log('id got' + this.id);
        let link = this.serverurl + 'deleteaudience';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                console.log(result);
                console.log('Data Deleted');
                this.getAudienceList();
            }, error => {
                console.log('Oooops!');
            });
        setTimeout(() => {
            this.getAudienceList();
        }, 300);
    }
    calledit(id) {
        this.addcookie.putObject('cookiedetails', id);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('after putobject ' + this.cookiedetails);
        this.router.navigate(['/viewability']);
    }
}
