import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-campaignlistnew',
  templateUrl: './campaignlistnew.component.html',
  styleUrls: ['./campaignlistnew.component.css'],
    providers: [Commonservices],
})
export class CampaignlistnewComponent implements OnInit {
    public datalist;
    public addcookie: CookieService;
    public cookiedetails;
    public showrows;
    public totalpage;
    public pageno;
    public campaignlist_length;
    public pagestart;
    public pageinitation;
    public isactionModalShown;
    public campaignname;
    public id;
    orderbyquery: any;
    public ModalaudienceShown: any;
    public ModalcreativeShown: any;
    orderbytype: any;
    public serverurl;
    public audiencelist;
    public creativelist;
    public campaignid;
    public getaudienceid;


    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, addcookie: CookieService,  private _commonservices: Commonservices) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.campaignname = 'Edit Campaign';
        this.showrows = 5;
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = 5;
        this.orderbyquery = 'campaignname';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        this.isactionModalShown = false;
    }

    ngOnInit() {
        this.getCampaignList();
    }

    getCampaignList() {
        let link = this.serverurl + 'campaignlist';
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.datalist = result.res;
                console.log('this.datalist--campaignlist');
                console.log(this.datalist);
                this.campaignlist_length = result.res.length;
                this.totalpage = this.campaignlist_length / this.showrows ;
                if (this.totalpage != parseInt(this.totalpage)) {   // it means if the totalpage is 1.4 or any values that is not round number
                    this.totalpage = parseInt(this.totalpage) + 1;
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    chagevalues() {
        this.totalpage = this.campaignlist_length / this.showrows ;
        if (this.campaignlist_length % this.showrows != 0) {
            this.totalpage = this.totalpage + 1;
        }
        this.pageno = 1;
        this.pagestart = 0;
        this.pageinitation = parseInt(this.pagestart) + parseInt(this.showrows);
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


    onHidden() {
        this.isactionModalShown = false;
        this.ModalaudienceShown = false;
        this.ModalcreativeShown = false;
    }
    delConfirm(id) {
        this.id = id;
        this.isactionModalShown = true;
        console.log(this.isactionModalShown);
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

    admindel() {
        console.log('admindel');
        this.isactionModalShown = false;
        console.log('id got' + this.id);
        let link = this.serverurl + 'deletecampaign';
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
            this.getCampaignList();
        }, 300);
    }

    openaudiencemodal(campaignid) {
        this.campaignid=campaignid;
/*        //$('#audiencename').val(this.getaudienceid);
       /!* console.log('campaignid '+campaignid);
        console.log('this.datalist--campaignlist');
        console.log(this.datalist);*!/
        for(let i in this.datalist){
            if(this.datalist[i]._id==campaignid){
                this.getaudienceid = this.datalist[i].audienceid;
            }
        }
        console.log(' selected audienceid is'+ this.getaudienceid);
        this.getaudiencelist();
        this.ModalaudienceShown = true;*/




        let link = this.serverurl + 'getaudiencevalue';
        let data = {campaignid:this.campaignid};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log('get Audience id');
                this.getaudienceid =result.item.audienceid;
                console.log(' selected audienceid is'+ this.getaudienceid);
            }, error => {
                console.log('Oooops!');
            });
        this.getaudiencelist();
        this.ModalaudienceShown = true;



    }
    addaudiencetocampaignlist(audienceid){
        console.log('audienceid is ' +audienceid);
        let link = this.serverurl + 'addaudiencevalue';
        let data = {audienceid: audienceid, campaignid:this.campaignid};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                console.log(result);
                console.log('Audience id is added to one particular campaign of the campignlist');
            }, error => {
                console.log('Oooops!');
            });
    }
    opencreativesmodal() {
        this.ModalcreativeShown = true;
        this.getcreativelist();
    }
    getaudiencelist() {
        let link = this.serverurl + 'getaudiencelist';
        this._http.get(link)
            .subscribe(res => {
                let result = res;
                this.audiencelist = result;
              /*  console.log('this.audiencelist============');
                console.log(this.audiencelist);*/
            }, error => {
                console.log('Oooops!');
            });
    }
    getcreativelist() {
        let link = this.serverurl + 'adbannerlist'; // now this banner is creatives
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.creativelist = result.res;
                console.log('this.creativelist============');
                console.log(this.creativelist);
            }, error => {
                console.log('Oooops!');
            });
    }
}
