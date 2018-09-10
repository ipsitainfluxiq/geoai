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
    public isdate;

    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices,  emailcookie: CookieService, alldetailcookie: CookieService) {
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.alldetailcookie = alldetailcookie ;
        this.cookiedetailsforalldetails = this.alldetailcookie.get('cookiedetailsforalldetails');
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
        console.log(this.cookiedetailsforalldetails);
        this.enddate = moment().format('MM-DD-YYYY');
        this.startdate = moment().subtract(1, 'months').format('MM-DD-YYYY');
        console.log( this.startdate);
        if(this.cookiedetailsforalldetails_type == 1 || this.cookiedetailsforalldetails_type == 2){ //admin
        this.getcampaignlist();
        }
        else{
            this.getcampaignlistunderthisid();
            this.getwalletlistofthisid();
        }

       /* date.setDate(date.getDate()-1);

        $('#date').bsDatepicker({
            startDate: date
        });*/
        console.log('campaignlists call-----------------------');
    }

    ngOnInit() {
        this.isdate = new Date();
    }

    getcampaignlist() {
        console.log(this.startdate);
        this.campaignlistarr=[];
        this.showstartdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.showenddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));
       // this.showstartdate = moment(this.startdate, "MM-DD-YYYY").format('x');
       // this.showenddate = moment(this.enddate, "MM-DD-YYYY").format('x');
        let link = this.serverurl + 'campaignlists';
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.campaignlist = result.res;
              /*  console.log('===================');
                if((new Date(this.campaignlist[39].startdate).getTime() / 1000).toFixed(0)>=this.showstartdate && this.campaignlist[39].enddate<=this.showenddate){
                    console.log('yes');
                }*/
                for(let i in this.campaignlist)
                {
                  //  console.log((new Date(this.campaignlist[39].startdate).getTime() / 1000).toFixed(0));

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
       // this.showstartdate = moment(this.startdate, "MM-DD-YYYY").format('x');
       // this.showenddate = moment(this.enddate, "MM-DD-YYYY").format('x');
      //  var day = 60 * 60 * 24 * 1000;
      //  console.log(this.startdate);
       // console.log(((new Date(this.startdate).getDate() + 1)));
      //  console.log(this.enddate);
        this.showstartdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.showenddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));
        this.campaignlistarr = [];
        if(this.filterval1==2) {
            for (let i in this.campaignlist) {
                //  console.log('from db '+this.campaignlist[i].enddate);
                //  console.log('search end date '+this.enddate);
                //  console.log('==============');
                if (this.campaignlist[i].startdate >= this.showstartdate && this.campaignlist[i].enddate <= this.showenddate) {
                    //  console.log('?');
                    // console.log(this.campaignlist[i]);
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
       /* this.startdate = this.showstartdate;
        this.enddate = this.showenddate;*/
       console.log('this.campaignlistarr');
       console.log(this.campaignlistarr);
}
    showproperdateformat(dt){
        return  moment(new Date(dt*1000)).format('MM-DD-YYYY');
    }

    showcampaignlists(type) {
        console.log('this.campaignlist');
        console.log(this.campaignlist);
        this.showstartdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.showenddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));

       // this.showstartdate = moment(this.startdate, "MM-DD-YYYY").format('x');
       // this.showenddate = moment(this.enddate, "MM-DD-YYYY").format('x');

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
       // this.showstartdate = moment(this.startdate, "MM-DD-YYYY").format('x');
      //  this.showenddate = moment(this.enddate, "MM-DD-YYYY").format('x');
        this.campaignlistarr=[];
        this.showstartdate = parseInt((new Date(this.startdate).getTime() / 1000).toFixed(0));
        this.showenddate = parseInt((new Date(this.enddate).getTime() / 1000).toFixed(0));
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
}
