import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices' ;
declare var moment: any;
@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css'],
    providers: [Commonservices],
})
export class UserlistComponent implements OnInit {
    public datalist;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public showrows;
    public totalpage;
    orderbyquery: any;
    orderbytype: any;
    public serverurl;
    public notedetails;
    public filterval;
    public filterval2;
    public filterval1;
    public idis;
    public mailis;
    public typeis;
    public note;
    public noteblankerror;
    public isModalShown: boolean = false;
    public isModalnoteShown: boolean = false;
    public p: number = 1;
    public p1: number = 1;

    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, emailcookie: CookieService, private _commonservices: Commonservices) {
        this.filterval2 = '';
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.showrows = 5;
        this.orderbyquery = 'firstname';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        console.log('mailcookiedetails');
        console.log(this.mailcookiedetails);

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
    showdate(dd){
        return moment(dd).format('Do MMM YYYY, HH:mm');
    }
    statuspopup(item,type){
        this.idis=item._id;
        this.mailis=item.email;
        this.typeis=type;
        this.isModalShown = true;
    }
    onHidden() {
        this.isModalShown = false;
        this.isModalnoteShown = false;
    }
    statuschange(){
        if (this.note != null){
            this.noteblankerror = null;
        }
        else {
            this.noteblankerror = 'Give a proper note';
        }
        let link = this.serverurl + 'statuschange';
        let data= {
            status : this.typeis,
            email : this.mailis,
            note : this.note,
            _id :  this.idis,
            addedby :  this.mailcookiedetails,
        }
        if(this.noteblankerror==null){
        this._http.post(link, data)
            .subscribe( res => {
                this.isModalShown = false;
                this.note = null;
                this.getUserList();
            }, error => {
                console.log("Ooops");
                });
    }
    }
    searchbyval() {
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.filterval2 != '' && this.filterval2 != null) {
            this.filterval += this.filterval2;
        }
    }
    shownotes(email){
        console.log('--------------------------------------------------------------------');
        console.log(email);
        this.isModalnoteShown = true;
        let link = this.serverurl + 'getnotedetails';
        let data= {
            email : email
        }
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.notedetails  = result;

            }, error => {
                console.log('Oooops!');
            });
    }

}
