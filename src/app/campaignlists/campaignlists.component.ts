import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
import {CookieService} from 'ngx-cookie-service';
import {Validators} from '@angular/forms';
declare var moment: any;
declare  let $;
@Component({
  selector: 'app-campaignlists',
  templateUrl: './campaignlists.component.html',
  styleUrls: ['./campaignlists.component.css'],
    providers: [Commonservices],
})
export class CampaignlistsComponent implements OnInit {
    public campaignlist;
    public bannerlist;
    public serverurl;
    public startdate;
    public showstartdate;
    public showenddate;
    public enddate;
    public statusid;
    public checkboxvalue = [];
    public checkboxarr = [];
    public campaignlistarr = [];
    public emailcookie: CookieService;
    public mailcookiedetails;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;
    public cookiedetailsforalldetails_type;
    public filterval1=2;
    public selectallcampaign = false;
    public p: number = 1;
    public totalamt: any;
    public datalist;
    public audiencelist;
    public isdate;
    public audienceid;
    public bannerid;
    public campaignid;
    public isModalShown: boolean = false;
    public isModalShown1: boolean = false;

    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices,  emailcookie: CookieService, alldetailcookie: CookieService) {
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.alldetailcookie = alldetailcookie ;
        this.cookiedetailsforalldetails = this.alldetailcookie.get('cookiedetailsforalldetails');
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
        console.log('=================================');
        console.log(this.cookiedetailsforalldetails);
        console.log(this.cookiedetailsforalldetails_type);
        this.enddate = moment().format('YYYY-MM-DD');
        this.startdate = moment().subtract(1, 'months').format('YYYY-MM-DD');
        if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){ //admin
        this.getcampaignlist();
        }
        else{
            this.getcampaignlistunderthisid();
            this.getwalletlistofthisid();
            this.getAudienceListbyemail();
        }
        console.log('campaignlists call-----------------------');
        if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){
            this.getbanners();
        }
        else{
            this.getbannersbyemail();
        }
    }

    ngOnInit() {
        this.isdate = new Date();
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
                console.log('getaudiencelist');
                console.log(result.items);
                this.audiencelist = result.items;
            }, error => {
                console.log('Oooops!');
            });
    }
    getcampaignlist() {
        console.log(this.startdate);
        this.campaignlistarr=[];
        this.showstartdate =  moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD');
        this.showenddate =  moment(new Date()).format('YYYY-MM-DD');
        let link = this.serverurl + 'campaignlists';
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.campaignlist = result.res;
                console.log(' campaignlist');
                console.log(this.campaignlist);
              console.log(this.startdate);
              console.log(this.enddate);
                for(let i in this.campaignlist)
                {
                        if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate ){
                        this.campaignlistarr.push(this.campaignlist[i]);
                    }
                }
                console.log('all campaigns');
                console.log(this.campaignlistarr);
            }, error => {
                console.log('Oooops!');
            });
    }

    showresult() {
        this.showstartdate =  moment(this.startdate).subtract(1, 'months').format('YYYY-MM-DD');
        this.showenddate =  moment(this.enddate).format('YYYY-MM-DD');
        this.campaignlistarr = [];
        if(this.filterval1==2) {
            for (let i in this.campaignlist) {
                if (this.campaignlist[i].startdate >= this.showstartdate && this.campaignlist[i].enddate <= this.showenddate) {
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(this.filterval1==1){
        for(let i in this.campaignlist)
        {
            if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate && this.campaignlist[i].status==1){
                this.campaignlistarr.push(this.campaignlist[i]);
            }
        }
        }
        if(this.filterval1==0){
        for(let i in this.campaignlist)
        {
            if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate && this.campaignlist[i].status==0){
                this.campaignlistarr.push(this.campaignlist[i]);
            }
        }
        }
       console.log('this.campaignlistarr');
       console.log(this.campaignlistarr);
}
    showproperdateformat(dt){
        return  moment(dt).format('YYYY-MM-DD');
    }

    showcampaignlists(type) {
        console.log('this.campaignlist');
        console.log(this.campaignlist);
        this.showstartdate =  moment(this.startdate).subtract(1, 'months').format('YYYY-MM-DD');
        this.showenddate =  moment(this.enddate).format('YYYY-MM-DD');
        this.campaignlistarr = [];
        if(type==1){ //active
            console.log('type 1');
            for(let i in this.campaignlist) {
                if(this.campaignlist[i].status==1 && this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate) {
                    console.log('active');
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
         if(type==0){ //inactive
            console.log('type 0');
            for(let i in this.campaignlist) {
                if (this.campaignlist[i].status == 0 && this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate) {
                    console.log('inactive');
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(type==3){ //pending
            console.log('type 3');
            for(let i in this.campaignlist) {
                console.log(this.campaignlist[i].status);
                console.log(this.campaignlist[i].startdate>=this.showstartdate);
                console.log(this.campaignlist[i].enddate<=this.showenddate);
                if (this.campaignlist[i].status == 3 && this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate) {
                    console.log('pendings');
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(type==2){ //all
            console.log('all');
            for(let i in this.campaignlist) {
                if ( this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate) {
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
    }
    addtdclass(status){
        if(status==1){
            return 'showgreen';
        }
        if(status==0){
            return 'showgrey';
        }
        if(status==3){
            return 'showred';
        }
        else{
            return '';
        }
    }
    checkboxid(i,itemid,checkboxvalue){
        console.log('===========');
        console.log(i);
        console.log(itemid);
        console.log(checkboxvalue);
        console.log(this.checkboxvalue);
        if(checkboxvalue==true){
            this.checkboxarr.push(itemid);
        }
        if(checkboxvalue==false){
            let indexval: any = this.checkboxarr.indexOf(itemid);
            console.log('-----------------');
            console.log(indexval);
            this.checkboxarr.splice(indexval, 1);

        }
        console.log('this.checkboxarr+++++++++++');
        console.log(this.checkboxarr);
    }

    resumecampaigns(value){
        console.log('resumecampaigns');
        // 1 - resume i .e. status = 1
        // 0 - pause i .e. status = 0
        let link = this.serverurl+'changeallcampaignstatus';
        var data;
        if(value==1){
            data = {arrid:this.checkboxarr , statusid: 1};
        }
        else{
           data = {arrid:this.checkboxarr , statusid: 0};
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                if(result.status=='success'){
                    this.getcampaignlist();
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    changestatus(item){
        if(item.status == 1){
            this.statusid = 0;
        }
        else{
            this.statusid = 1;
        }
        let link = this.serverurl+'changecampaignstatus';
        let data = {id:item._id , statusid: this.statusid};
        console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                    this.getcampaignlist();
            }, error => {
                console.log('Oooops!');
            });
    }

    allcheck() {
        this.checkboxvalue[0] = true;
        setTimeout(()=>{
        console.log('this.selectallcampaign--' + this.selectallcampaign);
            if (this.selectallcampaign == false) {
                for(let i in this.checkboxvalue){
                    this.checkboxvalue[i] = false;
                }
                this.checkboxarr=[];
            }
            if (this.selectallcampaign == true) {
                console.log($('.icheck').length);
                let cc = $('.icheck').length;
                console.log(this.checkboxvalue);
                for(let i=0 ; i<cc; i++){
                    this.checkboxvalue[i] = true;
                }
                for(let i in this.campaignlistarr){
                    this.checkboxarr.push(this.campaignlistarr[i]._id);
                }

            }
        }, 100);

    }
    getwalletlistofthisid() {
        this.totalamt = 0;
        let link = this.serverurl + 'walletlistofthisuserid';
        var data={
            email:this.mailcookiedetails
        };
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.datalist = result.res;
                console.log('this.datalist--walletlist');
                console.log(this.datalist);
                for(let i in this.datalist) {
                    this.totalamt = parseFloat(this.totalamt) + parseFloat(this.datalist[i].amount);
                }
                console.log(this.totalamt);
            }, error => {
                console.log('Oooops!');
            });
    }

    getcampaignlistunderthisid() {
        console.log('this.startdate');
        console.log(this.startdate);
        this.campaignlistarr=[];
        this.showstartdate =  moment(this.startdate).subtract(1, 'months').format('YYYY-MM-DD');
        this.showenddate =  moment(this.enddate).format('YYYY-MM-DD');
        let link = this.serverurl + 'getcampaignlistunderthisid';
        var data={
            email:this.mailcookiedetails
        };
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.campaignlist = result.res;
                for(let i in this.campaignlist)
                {
                    if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate ){
                        this.campaignlistarr.push(this.campaignlist[i]);
                    }
                }
                console.log('campaigns under this user');
                console.log(this.campaignlistarr);
            }, error => {
                console.log('Oooops!');
            });
    }
    openaudiencelist(itemid){
        this.audienceid = null;
        this.isModalShown = true;
        this.campaignid = itemid;
      //  this.get_audience_of_campaign();
        for(let i in this.campaignlist){
            if(this.campaignlist[i]._id == itemid){
                if(this.campaignlist[i].audienceid != null){
                    console.log(this.campaignlist[i]);
                    console.log('2');
                    this.audienceid = this.campaignlist[i].audienceid;
                }
            }
        }
    }
    onHidden() {
        this.isModalShown = false;
        this.isModalShown1 = false;
    }
    showdate(dd){
        return moment(dd).format('MM-DD-YY');
    }
  /*  audienceitem(id){
        this.audienceid = id;
    }*/
    add_audience_to_campaign(){
        let link = this.serverurl + 'addaudienceidtocampaign';
        var data={
            audienceid: this.audienceid,
            campaignid: this.campaignid
        };
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.isModalShown = false;
                if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){ //admin
                    this.getcampaignlist();
                }
                else{
                    this.getcampaignlistunderthisid();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    get_audience_of_campaign(){
        let link = this.serverurl + 'addaudienceidtocampaign';
        var data={
            audienceid: this.audienceid,
            campaignid: this.campaignid
        };
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.isModalShown = false;
            }, error => {
                console.log('Oooops!');
            });
    }

    openbannerlist(itemid){
        this.bannerid = null;
        this.isModalShown1 = true;
        this.campaignid = itemid;
        console.log('1');
        for(let i in this.campaignlist){
            if(this.campaignlist[i]._id == itemid){
                if(this.campaignlist[i].bannerid != null){
                    console.log(this.campaignlist[i]);
                    console.log('2');
                    this.bannerid = this.campaignlist[i].bannerid;
                }
            }
        }
    }
    getbannersbyemail(){
        let link = this.serverurl + 'getbannersbyemail';
        let data = {
            email: this.mailcookiedetails,
            page: 'campaignlists'
        };
        this._http.post(link, data)
            .subscribe(res => {
                this.bannerlist = res;
                console.log(this.bannerlist);
            }, error => {
                console.log('Oooops!');
            });
    }
    getbanners(){
        let link = this.serverurl + 'getbanners';
        let data = {
            page: 'campaignlists'
        }
        this._http.post(link,data)
            .subscribe(res => {
                this.bannerlist = res;
                console.log(this.bannerlist);
            }, error => {
                console.log('Oooops!');
            });
    }
    add_banner_to_campaign(){
        let link = this.serverurl + 'addbanneridtocampaign';
        var data={
            bannerid: this.bannerid,
            campaignid: this.campaignid
        };
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.isModalShown1 = false;
                if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){
                    this.getcampaignlist();
                }
                else{
                    this.getcampaignlistunderthisid();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
}
