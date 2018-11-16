import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var moment: any;
@Component({
  selector: 'app-audiencelist',
  templateUrl: './audiencelist.component.html',
  styleUrls: ['./audiencelist.component.css'],
    providers: [Commonservices],
})
export class AudiencelistComponent implements OnInit {
    public serverurl: any;
    public datalist: any;
    public emailcookie: CookieService;
    public alldetailcookie: CookieService;
    public mailcookiedetails;
    public cookiedetailsforalldetails_type;
    public orderbyquery: any;
    public orderbytype: any;
    public id:any;
    public pageno;
    public pagestart;
    public pageinitation;
    public totalpage;
    public showrows;
    public isModalShown: boolean = false;
    public p: number = 1;
    public filterval='';

    constructor(private _commonservices: Commonservices, emailcookie: CookieService, private _http: HttpClient, private router: Router, alldetailcookie: CookieService) {
        console.log('constructor');
        this.emailcookie = emailcookie ;
        this.alldetailcookie = alldetailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
        this.serverurl = _commonservices.url;
    }

  ngOnInit() {
      this.getAudienceListbyemail();
  }
    getAudienceListbyemail() {
        let link = this.serverurl + 'getaudiencelist';
        let data = {
            emailid: this.mailcookiedetails
        }
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log(result.items);
                this.datalist = result.items;
            }, error => {
                console.log('Oooops!');
            });
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
                this.getAudienceListbyemail();
            }, error => {
                console.log('Oooops!');
            });
        setTimeout(() => {
            this.getAudienceListbyemail();
        }, 300);
    }
    showdate(dd){
        return moment(dd).format('Do MMM YYYY');
    }
}
