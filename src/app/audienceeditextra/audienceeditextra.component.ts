import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-audienceeditextra',
  templateUrl: './audienceeditextra.component.html',
  styleUrls: ['./audienceeditextra.component.css'],
  providers: [Commonservices]
})
export class AudienceeditextraComponent implements OnInit {
  @Input() campaignid: string;
  @Input() typeis: string;
  @Input() audiencebannertype: string;
  public dataForm: FormGroup ;
  public fb;
  public serverurl;
  public emailcookie: CookieService;
  public mailcookiedetails;
  public alldetailcookie: CookieService;
  public cookiedetailsforalldetails_type;
  public audiencelist;
  public bannerlist;
  public campaignlist;
  public checkboxvalue = [];
  public audiencecheckboxvalue = [];
  public bannercheckboxvalue = [];
  public audiencearrid=[];
  public bannerarrid=[];

  constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, emailcookie: CookieService, alldetailcookie: CookieService) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.emailcookie = emailcookie ;
    this.alldetailcookie = alldetailcookie ;
    this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
    this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
    this.getcampaignlist();
    if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){
      this.getbanners();
    }
    else{
      this.getAudienceListbyemail();
      this.getbannersbyemail();
    }
  }
  ngOnInit() {
    let campaigndetails;

  }
  getcampaignlist() {
    let link = this.serverurl + 'campaignlists';
    this._http.get(link)
        .subscribe(res => {
          let result: any;
          result = res;
          this.campaignlist = result.res;
          let campaigndetails;
          for(let i in this.campaignlist){
            if(this.campaignlist[i]._id == this.campaignid){ //single value
              campaigndetails=this.campaignlist[i];
              if(this.campaignlist[i].audienceid != null){
                for(let k in this.campaignlist[i].audienceid){
                  this.audiencearrid.push(this.campaignlist[i].audienceid[k]);
                }
              }
              if(this.campaignlist[i].bannerid != null){
                for(let k in this.campaignlist[i].bannerid){
                  this.bannerarrid.push(this.campaignlist[i].bannerid[k]);
                }
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
          }, 200);
        }, error => {
          console.log('Oooops!');
        });
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
          this.audiencelist = result.items;
        }, error => {
          console.log('Oooops!');
        });
  }
  showdate(dd){
    return moment(dd).format('MM-DD-YY');
  }
  audienceaddtovar(id,audiencecheckboxval){
    if(audiencecheckboxval==true){
      this.audiencearrid.push(id);
    }
    if(audiencecheckboxval==false){
      let indexval: any = this.audiencearrid.indexOf(id);
      this.audiencearrid.splice(indexval,1);
    }
  }
  add_audience_to_campaign(){
    let link = this.serverurl + 'addaudienceidtocampaign';
    var data={
      audienceid: this.audiencearrid,
      campaignid: this.campaignid
    };
    this._http.post(link,data)
        .subscribe(res => {
          let result: any;
          result = res;
          if(result !=null && result.status=='success'){
            this.router.navigate(['/editcampaign',this.campaignid]);
          }
        }, error => {
          console.log('Oooops!');
        });
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
        }, error => {
          console.log('Oooops!');
        });
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
  banneraddtovar(id,bannercheckboxvalue){
    if(bannercheckboxvalue==true){
      this.bannerarrid.push(id);
    }
    if(bannercheckboxvalue==false){
      let indexval: any = this.bannerarrid.indexOf(id);
      this.bannerarrid.splice(indexval,1);
    }
  }
  add_banner_to_campaign(){
    let link = this.serverurl + 'addbanneridtocampaign';
    var data={
      bannerid: this.bannerarrid,
      campaignid: this.campaignid
    };
    this._http.post(link,data)
        .subscribe(res => {
          let result: any;
          result = res;
          if(result !=null && result.status=='success'){
            this.router.navigate(['/editcampaign',this.campaignid]);
          }
        }, error => {
          console.log('Oooops!');
        });
  }
}
