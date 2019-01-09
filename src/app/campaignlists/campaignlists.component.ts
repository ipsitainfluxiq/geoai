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
    public modalmarkuptype;
    public updatemarkupid;
    public update_markup_value;
    public showstartdate;
    public showenddate;
    public enddate;
    public statusid;
    public checkboxvalue = [];
    public audiencecheckboxvalue = [];
    public bannercheckboxvalue = [];
    public checkboxarr = [];
    public checkboxfullarr = [];
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
    public daterangegiven: any = 0;
    public datalist;
    public audiencelist;
    public isdate;
    public audienceid;
    public audiencearrid=[];
    public bannerarrid=[];
    public bannerid;
    public campaignid;
    public update_markup_error;
    public isModalShown: boolean = false;
    public modalmarkup: boolean = false;
    public isModalShown1: boolean = false;
    public note_for_campaign_status;
    public note_for_campaign_status_blank_error;
    public modalchangestatus: boolean = false;
    public modalchangestatusvalue;
    public itemperpagevar: any =30;
    public selected_length_for_campaignlist: any =3;
    public isModalShown2: boolean = false;

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
      //  this.enddate = moment().format('YYYY-MM-DD');
      //  this.startdate = moment().subtract(1, 'months').format('YYYY-MM-DD');
        this.startdate = moment().startOf('month').format('YYYY-MM-DD');
        this.enddate   = moment().endOf('month').format('YYYY-MM-DD');


        if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk' || this.cookiedetailsforalldetails_type == 'agency'){ //admin
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
    show_how_many_campaigns(arg){
        this.itemperpagevar = 30;
        if(arg==0) this.itemperpagevar = this.campaignlist.length;
        if(arg==1) this.itemperpagevar = 10;
        if(arg==2) this.itemperpagevar = 20;
        if(arg==3) this.itemperpagevar = 30;
        if(arg==4) this.itemperpagevar = 40;
        if(arg==5) this.itemperpagevar = 50;
        if(arg==6) this.itemperpagevar = 60;
        if(arg==7) this.itemperpagevar = 70;
        if(arg==8) this.itemperpagevar = 80;
        if(arg==9) this.itemperpagevar = 90;
        if(arg==10) this.itemperpagevar = 100;
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
                if(this.daterangegiven==0){
                    for(let i in this.campaignlist)
                    {
                        /*if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate ){*/
                        if (this.campaignlist[i].startdate>=this.startdate && this.campaignlist[i].enddate<=this.enddate ){
                            this.campaignlistarr.push(this.campaignlist[i]);
                        }
                    }
                }
                else{
                    this.campaignlistarr = this.campaignlist;
                }

                console.log('all campaigns');
                console.log(this.campaignlistarr);
            }, error => {
                console.log('Oooops!');
            });
    }

    showresult(type) {
        // 0 for daterange is there, 3 for daterange is not there.
        this.daterangegiven=type;
        if(type!=3 && this.startdate =='' && this.enddate ==''){
            this.isModalShown2 = true;
        }
        if(type!=3 && this.startdate !='' && this.enddate !=''){
        /*this.showstartdate =  moment(this.startdate).subtract(1, 'months').format('YYYY-MM-DD');
        this.showenddate =  moment(this.enddate).format('YYYY-MM-DD');*/
            this.showstartdate =  moment(this.startdate).format('YYYY-MM-DD');
            this.showenddate =  moment(this.enddate).format('YYYY-MM-DD');
        this.campaignlistarr = [];
        if(this.filterval1==2) {
            console.log('filterval 2');
            for (let i in this.campaignlist) {
                if (this.campaignlist[i].startdate >= this.showstartdate && this.campaignlist[i].enddate <= this.showenddate) {
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(this.filterval1==1){
            console.log('filterval 1');
            for(let i in this.campaignlist)
            {
                if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate && this.campaignlist[i].status==1){

                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(this.filterval1==0){
            console.log('filterval 0');
            for(let i in this.campaignlist)
            {
                if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate && this.campaignlist[i].status==0){
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        }
        if(type==3){
            for(let i in this.campaignlist)
            {
                this.campaignlistarr.push(this.campaignlist[i]);
            }
            this.startdate='';
            this.enddate='';
        }
        console.log('this.campaignlistarr');
        console.log(this.campaignlistarr);

    }
    showproperdateformat(dt){
      //  return  moment(dt).format('YYYY-MM-DD');
        return  moment(dt).format('MMM D, YYYY');
    }

    showcampaignlists(type) {
        console.log('this.campaignlist');
        console.log(this.campaignlist);
      /*  this.showstartdate =  moment(this.startdate).subtract(1, 'months').format('YYYY-MM-DD');
        this.showenddate =  moment(this.enddate).format('YYYY-MM-DD');*/
        this.showstartdate =  moment(this.startdate).format('YYYY-MM-DD');
        this.showenddate =  moment(this.enddate).format('YYYY-MM-DD');
        this.campaignlistarr = [];
        if(this.daterangegiven==0){
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
        if(type==2){ //all within date range
            console.log('all within date range');
            for(let i in this.campaignlist) {
                if ( this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate) {
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
    }
    else {
        if(type==1){ //active
            for(let i in this.campaignlist) {
                if(this.campaignlist[i].status==1) {
                    console.log('active');
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
         if(type==0){ //inactive
            for(let i in this.campaignlist) {
                if (this.campaignlist[i].status == 0) {
                    console.log('inactive');
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(type==3){ //pending
            for(let i in this.campaignlist) {
                if (this.campaignlist[i].status == 3) {
                    console.log('pendings');
                    this.campaignlistarr.push(this.campaignlist[i]);
                }
            }
        }
        if(type==2){ //all within date range
            console.log('all within date range');
                    this.campaignlistarr=this.campaignlist;
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
    checkboxid(i,itemid,checkboxvalue,item){
        console.log('===========');
        console.log(i);
        console.log(itemid);
        console.log(checkboxvalue);
        console.log(this.checkboxvalue);
        if(checkboxvalue==true){
            this.checkboxarr.push(itemid);
            this.checkboxfullarr.push(item);
        }
        if(checkboxvalue==false){
            let indexval: any = this.checkboxarr.indexOf(itemid);
            console.log('-----------------');
            console.log(indexval);
            this.checkboxarr.splice(indexval, 1);
            this.checkboxfullarr.splice(indexval, 1);

        }
        console.log('this.checkboxarr+++++++++++');
        console.log(this.checkboxarr);
    }
    modal_campaign_status(value){
        this.modalchangestatus = true;
        this.modalchangestatusvalue = value;
        this.note_for_campaign_status = null;
    }
    resumecampaigns(){
        console.log('resumecampaigns');
        // 1 - resume i .e. status = 1
        // 0 - pause i .e. status = 0
        let link = this.serverurl+'changeallcampaignstatus';
        var data;
        if (this.note_for_campaign_status != null && this.note_for_campaign_status != ''){
            this.note_for_campaign_status_blank_error = null;
        }
        else {
            this.note_for_campaign_status_blank_error = 'Give a proper note';
        }

        if(this.modalchangestatusvalue==1){
            data = {arrid:this.checkboxarr , statusid: 1, fullarr:this.checkboxfullarr, note:this.note_for_campaign_status};
        }
        else{
           data = {arrid:this.checkboxarr , statusid: 0, fullarr:this.checkboxfullarr, note:this.note_for_campaign_status};
        }
        if(this.note_for_campaign_status_blank_error==null) {
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                if(result.status=='success'){
                    this.modalchangestatus = false;
                    this.getcampaignlist();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
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
                this.checkboxfullarr=[];
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
                    this.checkboxfullarr.push(this.campaignlistarr[i]);
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
        console.log('this.daterangegiven');
        console.log(this.daterangegiven);
        console.log('this.startdate');
        console.log(this.startdate);
        this.campaignlistarr=[];
    /*    this.showstartdate =  moment(this.startdate).subtract(1, 'months').format('YYYY-MM-DD');
        this.showenddate =  moment(this.enddate).format('YYYY-MM-DD');*/
        this.showstartdate =  moment(this.startdate).format('YYYY-MM-DD');
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
                if(this.daterangegiven==0){
                    for(let i in this.campaignlist)
                    {
                        if (this.campaignlist[i].startdate>=this.showstartdate && this.campaignlist[i].enddate<=this.showenddate ){
                            this.campaignlistarr.push(this.campaignlist[i]);
                        }
                    }

                }
                else{
                    this.campaignlistarr = this.campaignlist;
                }
                console.log('campaigns under this user');
                console.log(this.campaignlistarr);
            }, error => {
                console.log('Oooops!');
            });
    }
    openaudiencelist(itemid){
        let campaigndetails;
      //  this.audienceid = null;
        this.audiencearrid = [];
        this.bannerarrid = [];
        this.isModalShown = true;
        this.campaignid = itemid;
        for(let i in this.campaignlist){
            if(this.campaignlist[i]._id == itemid){ //single value
                console.log(this.campaignlist[i]);
                 campaigndetails=this.campaignlist[i];
                if(this.campaignlist[i].audienceid != null){
                    //  this.audienceid = this.campaignlist[i].audienceid;
                    for(let k in this.campaignlist[i].audienceid){
                        this.audiencearrid.push(this.campaignlist[i].audienceid[k]);
                    }
                   // console.log(this.audiencearrid);
                }
            }
        }
        setTimeout(()=>{
            $('#audiencecampaignid').find('input[type="checkbox"]').each(function () {
                    $(this).prop('checked', false);
            });
            for(let k in this.audiencearrid) {
                $('#audiencecampaignid').find('input[type="checkbox"]').each(function () {
                    if (campaigndetails.audienceid[k] == $(this).val()) {
                        $(this).prop('checked', true);
                    }
                });
            }
        }, 100);
    }
    onHidden() {
        this.isModalShown = false;
        this.isModalShown1 = false;
        this.isModalShown2 = false;
        this.modalchangestatus = false;
        this.modalmarkup = false;
    }
    showdate(dd){
        return moment(dd).format('MM-DD-YY');
    }
  /*  audienceitem(id){
        this.audienceid = id;
    }*/
    audienceaddtovar(id,audiencecheckboxval){
            console.log(audiencecheckboxval);
            console.log('befr chng');
            console.log(this.audiencearrid);
            if(audiencecheckboxval==true){
                this.audiencearrid.push(id);
            }
            if(audiencecheckboxval==false){
                let indexval: any = this.audiencearrid.indexOf(id);
                this.audiencearrid.splice(indexval,1);
            }
            console.log('aftetr chng');
            console.log(this.audiencearrid);
    }

    add_audience_to_campaign(){
        let link = this.serverurl + 'addaudienceidtocampaign';
        var data={
          //  audienceid: this.audienceid,
            audienceid: this.audiencearrid,
            campaignid: this.campaignid
        };
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.isModalShown = false;
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
    get_audience_of_campaign(){
        let link = this.serverurl + 'addaudienceidtocampaign';
        var data={
           // audienceid: this.audienceid,
            audienceid: this.audiencearrid,
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
        let campaigndetails;
        this.bannerid = null;
        this.isModalShown1 = true;
        this.campaignid = itemid;
        for(let i in this.campaignlist){
            if(this.campaignlist[i]._id == itemid){
                campaigndetails=this.campaignlist[i];
                if(this.campaignlist[i].bannerid != null){
                   /* console.log(this.campaignlist[i]);
                    this.bannerid = this.campaignlist[i].bannerid;*/
                    for(let k in this.campaignlist[i].bannerid){
                        this.bannerarrid.push(this.campaignlist[i].bannerid[k]);
                    }
                 //   console.log(this.bannerarrid);
                }
            }
        }
        setTimeout(()=>{
            $('#bannercampaignid').find('input[type="checkbox"]').each(function () {
                $(this).prop('checked', false);
            });
            for(let k in this.bannerarrid) {
                $('#bannercampaignid').find('input[type="checkbox"]').each(function () {
                    if (campaigndetails.bannerid[k] == $(this).val()) {
                        $(this).prop('checked', true);
                    }
                });
            }
        }, 100);
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
        let link = this.serverurl + 'getbannerss';
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
         //   bannerid: this.bannerid,
            bannerid: this.bannerarrid,
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
    updatemarkupmodal(item,type){
        console.log(item);
        //1- role 2-smatoo
        if(type==1) this.update_markup_value = item.role_mark_up;
        if(type==2) this.update_markup_value = item.smatoo_mark_up;
        this.modalmarkup = true;
        this.modalmarkuptype = type;
        this.updatemarkupid = item._id;
       }
    updatemarkupvalue(){
        this.update_markup_error = null;
        if(this.update_markup_value== null || this.update_markup_value== ''){
            this.update_markup_error = 'Provide a value!';
        }
        else{
        let link = this.serverurl + 'updatemarkupvalue';
        let data;
             data = {
                _id: this.updatemarkupid,
                 update_markup_value: this.update_markup_value,
                 type: this.modalmarkuptype
            };
        this._http.post(link, data)
            .subscribe(res => {
                this.modalmarkup = false;
                if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk' || this.cookiedetailsforalldetails_type == 'agency'){
                    this.getcampaignlist();
                }
                else {
                    this.getcampaignlistunderthisid();
                }
            }, error => {
                console.log('Oooops!');
            });
       }
       }
    banneraddtovar(id,bannercheckboxvalue){
        console.log(bannercheckboxvalue);
        console.log('befr chng');
        console.log(this.bannerarrid);
        if(bannercheckboxvalue==true){
            this.bannerarrid.push(id);
        }
        if(bannercheckboxvalue==false){
            let indexval: any = this.bannerarrid.indexOf(id);
            this.bannerarrid.splice(indexval,1);
        }
        console.log('aftetr chng');
        console.log(this.bannerarrid);
    }
}
