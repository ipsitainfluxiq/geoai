import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;
declare  var $;
@Component({
    selector: 'app-campaignlist',
    templateUrl: './campaignlist.component.html',
    styleUrls: ['./campaignlist.component.css'],
    providers: [Commonservices],
})

export class CampaignlistComponent implements OnInit {
    public datalist;
    public addcookie: CookieService;
    public cookiedetails;
    public showrows;
    /*public enablepause;
    public enableend;*/
    public totalpage;
    public pageno;
    public campaignlist_length;
    public pagestart;
    public pageinitation;
    public isactionModalShown;
    public campaignname;
    orderbyquery: any;
    public updatetoactivate: any;
    orderbytype: any;
    public serverurl;
    public result1;
    public errorstoactivate = [];
    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, addcookie: CookieService,  private _commonservices: Commonservices) {
        /*this.enablepause = true;
        this.enableend = true;*/
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.campaignname = 'Edit Campaign';
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.orderbyquery = 'id';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        this.isactionModalShown = false;
    }

    ngOnInit() {
        this.getAdminList();
    }

    getAdminList() {

        let link = 'http://simplyfi.influxiq.com/getcampaignlist.php';
        let data = {};
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log(result);
                console.log('result.campaigns--------------------');
                console.log(result.campaigns);
                this.datalist = result.campaigns;
                this.campaignlist_length = result.campaigns.length;
                this.totalpage = this.campaignlist_length / this.showrows ;
            }, error => {
                console.log('Oooops!');
            });
    }
    chagevalues() {
        //   setTimeout(() => {
        this.totalpage = this.campaignlist_length / this.showrows ;
        if (this.campaignlist_length % this.showrows != 0) {
            this.totalpage = this.totalpage + 1;
        }
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);

        //  }, 700);
    }

    pageval(type) {

        if (type == 1 ) {       // for prev page
            if ((this.pagestart - this.showrows) >= 0) {
                this.pageno--;
                this.pagestart = (this.pageno - 1) * this.showrows;
            }
        }

        if ( type == 2 ) {      // for next page
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

    calledit(id) {
        this.addcookie.putObject('cookiedetails', id);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('after putobject ' + this.cookiedetails);
        this.router.navigate(['/campaignsettings']);
    }

    callactive(id,type) {
        this.errorstoactivate = [];
        let data: any = {
            id: id,
        }

        if(type == 1) {   // to activate the campaign
            let link1 = 'http://simplyfi.influxiq.com/statuschange.php';
            this._http.post(link1, JSON.stringify(data))
                .subscribe(res => {
                    this.result1 = res;
                    console.log('this.result1====================');
                    if (typeof(this.result1.campaigns) == 'undefined') {
                        console.log('errors');
                        this.errorstoactivate.push(this.result1.errors);
                        this.isactionModalShown = true;
                        this.updatetoactivate = '';
                    }
                    else{
                        console.log('updated');
                        this.updatetoactivate = 'Successfully Updated....';
                        this.isactionModalShown = true;
                       /* setTimeout(() => {
                        this.getAdminList();
                    }, 3000);*/
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }

        if (type == 2) {         // to pause the campaign
            console.log('type 2 call');
            let link1 = 'http://simplyfi.influxiq.com/statuschangetopause.php';
            this._http.post(link1, JSON.stringify(data))
                .subscribe(res => {
                    this.result1 = res;
                    console.log('this.result1====================');
                    /* if (typeof(this.result1.campaigns) == 'undefined') {
                        console.log('errors');
                        this.errorstoactivate.push(this.result1.errors);
                        this.isactionModalShown = true;
                    }
                    else{*/
                    console.log('paused');
                    this.errorstoactivate = [];
                    this.updatetoactivate = 'Successfully Paused....';
                    this.isactionModalShown = true;
                    /*this.enablepause = false;
                    this.enableend = true;*/
                   /* setTimeout(() => {
                    this.getAdminList();
                    }, 3000);*/
                    //  }
                }, error => {
                    console.log('Oooops!');
                });
        }
        if (type == 3) {
            console.log('type 3 call'); // to end the campaign
            let link1 = 'http://simplyfi.influxiq.com/statuschangetoend.php';
            this._http.post(link1, JSON.stringify(data))
                .subscribe(res => {
                    this.result1 = res;
                    console.log('this.result1====================');
                    /* if (typeof(this.result1.campaigns) == 'undefined') {
                        console.log('errors');
                        this.errorstoactivate.push(this.result1.errors);
                        this.isactionModalShown = true;
                    }
                    else{*/
                    console.log('ended');
                    this.errorstoactivate = [];
                    this.updatetoactivate = 'Successfully Ended....';
                    this.isactionModalShown = true;
                    /*setTimeout(() => {
                    this.getAdminList();
                    }, 3000);*/
                    /* this.enablepause = false;
                        this.enableend = true;*/
                    //  }
                }, error => {
                    console.log('Oooops!');
                });
        }
        setTimeout(() => {
            this.getAdminList();
        }, 3000);
    }

    onHidden() {
        this.isactionModalShown = false;
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
