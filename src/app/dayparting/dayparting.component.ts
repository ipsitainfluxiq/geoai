import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-dayparting',
    templateUrl: './dayparting.component.html',
    styleUrls: ['./dayparting.component.css'],
    providers: [Commonservices]
})
export class DaypartingComponent implements OnInit {
    public serverurl: any;
    public addcookie: CookieService;
    public cookiedetails;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public applyforall = true;
    public openonediv = true;
    public openalldiv = false;
    public daypartval: any = [];
    public showdaypartval: any;
    public string1: any;
    public string2: any;
    public string3: any;
    public responsedaypart: any;
    public flag= 0;

    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: HttpClient, private _commonservices: Commonservices) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.serverurl = _commonservices.url;
        this.showdaypartval = 'Anytime of day';
        this.daypartval[0] = {from : 0 , to: 24};
        this.daypartval[1] = {from : 0 , to: 24};
        this.daypartval[2] = {from : 0 , to: 24};
        this.daypartval[3] = {from : 0 , to: 24};
        this.daypartval[4] = {from : 0 , to: 24};
        this.daypartval[5] = {from : 0 , to: 24};
        this.daypartval[6] = {from : 0 , to: 24};
        this.calldaypartconstructor();
    }

    ngOnInit() {
    }

    calldaypartconstructor() {
        let link = this.serverurl + 'gettotallist';
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails
        }
        this._http.post(link, data)
            .subscribe(res => {
                this.responsedaypart = res;
                console.log('hhhhhhhhhhhhhhhhh');
                if (typeof (this.responsedaypart[0].dayparting) != 'undefined') {
                    console.log(this.responsedaypart[0].dayparting);
                    console.log(this.responsedaypart[0].dayparting[1]);
                    //  console.log(this.responsedaypart.campaigns[0].week_dayparting);
                    let lastvalfrom: any = '';
                    let lastvalto: any = '';
                    let tempval: any = [];
                    let j;
                    for (let i in this.responsedaypart[0].dayparting) {
                        tempval.from = this.responsedaypart[0].dayparting[i].from;
                        tempval.to = this.responsedaypart[0].dayparting[i].to;
                        if (parseInt(i) > 0) {
                            if (this.flag == 0) {
                                if (tempval.from == lastvalfrom && tempval.to == lastvalto) {
                                    this.openonediv = true;
                                    this.openalldiv = false;
                                    this.applyforall = true;
                                } else {
                                    this.openonediv = false;
                                    this.openalldiv = true;
                                    this.applyforall = false;
                                    this.flag = 1;
                                }
                            }
                        }
                        lastvalfrom = tempval.from;
                        lastvalto = tempval.to;
                        this.myOnChange(tempval, i);
                        /* if (i == '0') {   j = 'Mon';   }
                         if (i == '1') {   j = 'Tue';   }
                         if (i == '2') {   j = 'Wed';   }
                         if (i == '3') {   j = 'Thu';   }
                         if (i == '4') {   j = 'Fri';   }
                         if (i == '5') {   j = 'Sat';   }
                         if (i == '6') {   j = 'Sun';   }
                         if (tempval.from  == 0 && tempval.to == 24) {
                             this.showdaypart[j] = 'All';
                         } else {
                             this.showdaypart[j] = tempval.from;
                             this.showdaypart[j] = this.showdaypart[j] + ' - ' + tempval.to;
                         }*/
                    }
                    /*this.showdaypartval = '';
                    for (this.k in this.showdaypart) {
                        this.showdaypartval = this.showdaypartval + (this.k + ' : ' + this.showdaypart[this.k] + ' | ');
                    }*/
                }
            }, error => {
                console.log('Oooops!');
            });
    }


    opensinglediv() {
        setTimeout(() => {
            console.log(this.applyforall);
            if (this.applyforall == true) {
                this.openonediv = true;
                this.openalldiv = false;
            } else {
                this.openonediv = false;
                this.openalldiv = true;
            }

        }, 300);
    }


    myOnUpdateforone(val: any) {
    }
    myOnChangeforone(val: any) {
        for (let i = 0; i < 7; i++) {
            this.daypartval[i] = {from : val.from , to: val.to};
        }
        console.log('this.daypartval');
        console.log(this.daypartval);
    }
    myOnFinishforone(val: any ) {
    }


    myOnUpdate(val: any ) {
    }

    myOnChange(val: any, type ) {
        this.daypartval[type] = {from : val.from , to: val.to};
    }

    myOnFinish(val: any, type ) {
    }

    updatedaypart() {
        let y;
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails,
            dayparting: this.daypartval
        }
        console.log('updatedaypart');
        console.log(data);
        let link = this.serverurl + 'dayparts';
        this._http.post(link, data)
            .subscribe(res => {
                // this.calldaypartconstructor();

            }, error => {
                console.log('Oooops!');
            });

    }
}
