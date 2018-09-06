import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;
/*import {DatepickerModule} from 'ngx-bootstrap/datepicker';*/
declare  var $: any;
@Component({
  selector: 'app-basicinformation',
  templateUrl: './basicinformation.component.html',
  styleUrls: ['./basicinformation.component.css'],
  providers: [Commonservices],
})
export class BasicinformationComponent implements OnInit {

  public addcookie: CookieService;
  public cookiedetails;
  public basicdata: any = [];
  public basicinfo_advertisement_name: any;
  public basicinfo_campaigngoal: any;
  public basicinfo_sales_rep_name: any;
  public basicinfo_mediabudget: any;
  public basicinfo_maximumimpression: any;
  public basicinfo_spendevenly: any;
  public basicinfo_spend_particular: any;
  public basicinfo_uneven: any;
  public basicinfo_adjust: any;
  public basicinfo_reachh: any;
  public basicinfo_ctr: any;
  public adlink: any;
  public simplesolutionid: any;
  public basicinfo_cpa: any;
  public basicinfo_sales_rep_phone: any;
  public basicinfo_sales_rep_email: any;
  public basicinfo_property: any;
  public basicinfo_advertisement_identifier: any;
  public basicinfo_new_identifier: any;
  public basicinfo_facebook: any;
  public basicinfo_flight_start: any;
  public basicinfo_flight_end: any;
  public basicinfo_mediabudget_permonth: any;
  public basicinfo_mediabudget_total: any;
  public basicinfo_maximumimpression_total: any;
  public basicinfo_maximumimpression_permonth: any;
  public basicinfo_spend_particular_info: any;
  public basicinfo_ecpm: any;
  public basicinfo_ctrgoal: any;
  public basicinfo_cpagoal: any;
  public basicinfo_siteretargating_securepixel: any;
  public basicinfo_siteretargeting_nonsecurepixel: any;
  public basicinfo_conversion_securepixel: any;
  public basicinfo_conversion_nonsecurepixel: any;
  public basicinfo_notags: any;
  public basicinfo_simplifidata: any;
  public basicinfo_3rdpartydata: any;
  public basicinfo_misc_securepixel: any;
  public validation: boolean = false;
  public checkerrorradio1: boolean = false;
  public checkerrorradio2: boolean = false;
  public error: any;
  public serverurl;
  constructor(private _http: HttpClient, private router: Router, addcookie: CookieService,  private _commonservices: Commonservices/*private DatepickerModule: DatepickerModule*/) {
    this.serverurl = _commonservices.url;
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log(this.cookiedetails);
/*    console.log("constructr");
    console.log("this.checkerrorradio2");
    console.log(this.checkerrorradio2);*/

  }

  ngOnInit() {
  }


  haserrorcls(cntrlname) {
    if (cntrlname == 'Advertiser_Name__c') {
      if (this.basicinfo_advertisement_name != undefined && this.basicinfo_advertisement_name != null && this.basicinfo_advertisement_name != '') {
        return '';
      }
      else{
        return 'has-error';
      }
    }
    if (cntrlname == 'Brief_Description_of_Campaign_and_Goals__c') {
      if (this.basicinfo_campaigngoal != undefined && this.basicinfo_campaigngoal != null && this.basicinfo_campaigngoal != '') {
        return '';
      }
      else {
        return 'has-error';
      }
    }
    if (cntrlname == 'Destination_URL__c') {
      if (this.adlink != undefined && this.adlink != null && this.adlink != '') {
        return '';
      }
      else {
        return 'has-error';
      }
    }
    if (cntrlname == 'Budget_Impression_Goal__c') {

      if (this.basicinfo_mediabudget != undefined || this.basicinfo_maximumimpression != undefined) {
        return '';
      }
      else {
        return 'has-error';
      }
    }
    if (cntrlname == 'Budget_Allocation__c') {
      if (this.basicinfo_spendevenly != undefined || this.basicinfo_spend_particular != undefined || this.basicinfo_uneven != undefined || this.basicinfo_adjust != undefined) {
        return '';
      }
      else {
        return 'has-error';
      }
    }
    if (cntrlname == 'Campaign_Goal__c') {
      if (this.basicinfo_reachh != undefined || this.basicinfo_ctr != undefined || this.basicinfo_cpa != undefined) {
        return '';
      }
      else {
        return 'has-error';
      }
    }

    if (cntrlname == 'Media_budget_per_month__c') {
      if (this.basicinfo_mediabudget_permonth != undefined && this.basicinfo_mediabudget_permonth != '') {
        return '';
      }
      else {
        return 'has-error';
      }
    }
    if (cntrlname == 'Total_campaign_media_spend__c') {
      if (this.basicinfo_mediabudget_total != undefined && this.basicinfo_mediabudget_total != '') {
        return '';
      }
      else {
        return 'has-error';
      }
    }


    if (cntrlname == 'Maximum_impressions_per_month__c') {
      if (((this.basicinfo_maximumimpression_permonth != undefined) && (this.basicinfo_maximumimpression_permonth != '')) || ((this.basicinfo_maximumimpression_total != undefined) && (this.basicinfo_maximumimpression_total != ''))) {
        // if (this.basicinfo_maximumimpression_permonth != undefined || this.basicinfo_maximumimpression_total != undefined) {
        return '';
      }
      else {
        return 'has-error';
      }
    }

    return '';
  }

  showerrorcls(cntrlname) {

    if (this.validation == false) {
      return 'hide';
    }

    else {
      if (cntrlname == 'Advertiser_Name__c') {
        if (this.basicinfo_advertisement_name != undefined && this.basicinfo_advertisement_name != null && this.basicinfo_advertisement_name!= '') {
          return 'hide';
        }
        else {
          return '';
        }
      }

      if (cntrlname == 'Brief_Description_of_Campaign_and_Goals__c') {
        if(this.basicinfo_campaigngoal != undefined && this.basicinfo_campaigngoal != null && this.basicinfo_campaigngoal!= '') {
          return 'hide';
        }
        else {
          return '';
        }
      }
      if (cntrlname == 'Destination_URL__c') {
        if (this.adlink != undefined && this.adlink != null && this.adlink!= '') {
          return 'hide';
        }
        else {
          return '';
        }
      }
      if (cntrlname == 'Budget_Impression_Goal__c') {
        if (this.basicinfo_mediabudget != undefined || this.basicinfo_maximumimpression != undefined) {
          return 'hide';
        }
        else {
          return '';
        }
      }
      if (cntrlname == 'Budget_Allocation__c') {
        if (this.basicinfo_spendevenly != undefined || this.basicinfo_spend_particular != undefined || this.basicinfo_uneven != undefined || this.basicinfo_adjust != undefined) {
          return 'hide';
        }
        else {
          return '';
        }
      }
      if (cntrlname == 'Campaign_Goal__c') {
        if (this.basicinfo_reachh != undefined || this.basicinfo_ctr != undefined || this.basicinfo_cpa != undefined) {
          return 'hide';
        }
        else {
          return '';
        }

      }
      /*setTimeout(() =>  {*/

      /* if (this.checkerrorradio1 == false) {
        return 'hide';
      }*/
      if (this.checkerrorradio1 == true && this.checkerrorradio2 == false )  {
        if (cntrlname == 'Media_budget_per_month__c') {
          if (this.basicinfo_mediabudget_permonth != undefined && this.basicinfo_mediabudget_permonth != '') {
            return 'hide';
          }
          else {
            return '';
          }
        }
        if (cntrlname == 'Total_campaign_media_spend__c') {
          if (this.basicinfo_mediabudget_total != undefined && this.basicinfo_mediabudget_total != '') {
            return 'hide';
          }
          else {
            return '';
          }
        }
      }

      console.log(this.checkerrorradio2);
      if (this.checkerrorradio2 == true && this.checkerrorradio1 == false) {
        console.log('hey');
        if (cntrlname == 'Maximum_impressions_per_month__c') {
          if (((this.basicinfo_maximumimpression_permonth != undefined) && (this.basicinfo_maximumimpression_permonth != '')) || ((this.basicinfo_maximumimpression_total != undefined) && (this.basicinfo_maximumimpression_total != ''))) {
            return 'hide';
          }
          else {
            return '';
          }
        }
      }
      return 'hide';
      /* }, 10000);*/
    }

  }

  changeval(type) {
    if (type == 1) {
      this.checkerrorradio1 = true;
      this.checkerrorradio2 = false;

      /*---------------------------------------------------------------done(START)-----------------------------------------------------------*/
      $( '#Total_campaign_impressions__c').val('e.g. 1,000,000');
      $( '#Maximum_impressions_per_month__c').val('e.g. 1,000,000');
      $( '#Media_budget_per_month__c').val('');
      $( '#Total_campaign_media_spend__c').val('');
      /*---------------------------------------------------------------done(END)-------------------------------------------------------------*/

      $( '#Total_campaign_impressions__c').attr('disabled', 'disabled');
      $( '#Maximum_impressions_per_month__c').attr('disabled', 'disabled');
      $( '#Media_budget_per_month__c').removeAttr('disabled');
      $( '#Total_campaign_media_spend__c').removeAttr('disabled');
    }
    if (type == 2) {
      this.checkerrorradio2 = true;
      this.checkerrorradio1 = false;

      /*---------------------------------------------------------------done(START)-----------------------------------------------------------*/
      $( '#Media_budget_per_month__c').val('e.g. 5,000');
      $( '#Total_campaign_media_spend__c').val('e.g. 5,000');
      $( '#Total_campaign_impressions__c').val('');
      $( '#Maximum_impressions_per_month__c').val('');
      /*---------------------------------------------------------------done(END)-------------------------------------------------------------*/

      $( '#Media_budget_per_month__c').attr('disabled', 'disabled');
      $( '#Total_campaign_media_spend__c').attr('disabled', 'disabled');
      $( '#Total_campaign_impressions__c').removeAttr('disabled');
      $( '#Maximum_impressions_per_month__c').removeAttr('disabled');
    }
  }
  disablearea(type) {
    if (type == 1) {
      $('#Spend_particular_amount_per_month').attr('disabled', 'disabled');
    }
    if (type == 0) {
      $('#Spend_particular_amount_per_month').removeAttr('disabled');
    }
  }

  call1() {
    $('#from').datepicker().datepicker('show'); }
  call2() {
    $('#to').datepicker().datepicker('show'); }


  disableforcampaigngoal(type) {
    if (type == 1) {
      $('#Click_Through_Rate_CTR_value_c').attr('disabled', 'disabled');
      $('#CPA_goal__c').attr('disabled', 'disabled');
    }
    if (type == 0) {
      $('#CPA_goal__c').attr('disabled', 'disabled');
      $( '#Click_Through_Rate_CTR_value_c').removeAttr('disabled');
    }
    if (type == 2) {
      $('#Click_Through_Rate_CTR_value_c').attr('disabled', 'disabled');
      $( '#CPA_goal__c').removeAttr('disabled');
    }
  }


  callsubmit(flag) {
    console.log(flag);
    this.validation=true;
    this.basicinfo_flight_start = $('#from').val();
    this.basicinfo_flight_end = $('#to').val();
    console.log('end');

/*---------------------------------------------------------------done(START)-----------------------------------------------------------*/
    if (this.basicinfo_mediabudget == undefined) {
      this.basicinfo_mediabudget_permonth = '';
      this.basicinfo_mediabudget_total = '';
    }
    if (this.basicinfo_maximumimpression == undefined) {
      this.basicinfo_maximumimpression_permonth = '';
      this.basicinfo_maximumimpression_total = '';
    }
/*---------------------------------------------------------------done(END)-------------------------------------------------------------*/

    console.log('basicinfo_mediabudget_permonth  ' + this.basicinfo_mediabudget_permonth);
    console.log('basicinfo_mediabudget_total  ' + this.basicinfo_mediabudget_total);
    console.log('basicinfo_maximumimpression_permonth  ' + this.basicinfo_maximumimpression_permonth);
    console.log('basicinfo_maximumimpression_total  ' + this.basicinfo_maximumimpression_total);

    if(   (this.basicinfo_advertisement_name != undefined && this.basicinfo_advertisement_name != null && this.basicinfo_advertisement_name != '' && this.basicinfo_campaigngoal != undefined  && this.basicinfo_campaigngoal != null && this.basicinfo_campaigngoal != '' && this.adlink != undefined && this.adlink != null && this.adlink != '')
        &&
        ( ((this.basicinfo_mediabudget != undefined) && (((this.basicinfo_mediabudget_permonth != undefined)&& (this.basicinfo_mediabudget_permonth != '')) && ((this.basicinfo_mediabudget_total != undefined)&&(this.basicinfo_mediabudget_total != '')))) || ((this.basicinfo_maximumimpression != undefined) && (((this.basicinfo_maximumimpression_permonth != undefined) && (this.basicinfo_maximumimpression_permonth != '' )) || ((this.basicinfo_maximumimpression_total != undefined) && (this.basicinfo_maximumimpression_total != '' ))))  )
        &&
        (this.basicinfo_spendevenly != undefined || this.basicinfo_spend_particular != undefined || this.basicinfo_uneven != undefined || this.basicinfo_adjust != undefined)
        &&
        ( this.basicinfo_reachh != undefined || this.basicinfo_ctr != undefined || this.basicinfo_cpa != undefined)    )


/*    if(   (this.basicinfo_advertisement_name!=undefined && this.basicinfo_campaigngoal!=undefined && this.adlink!=undefined) &&( this.basicinfo_mediabudget != undefined || this.basicinfo_maximumimpression!=undefined) && (this.basicinfo_spendevenly != undefined || this.basicinfo_spend_particular!=undefined || this.basicinfo_uneven!=undefined || this.basicinfo_adjust!=undefined) &&( this.basicinfo_reachh != undefined || this.basicinfo_ctr!=undefined || this.basicinfo_cpa!=undefined)    ) */
    {
      var data = {
        simplesolutionid: this.cookiedetails,
        basicinfo_sales_rep_name: this.basicinfo_sales_rep_name,
        basicinfo_sales_rep_phone: this.basicinfo_sales_rep_phone,
        basicinfo_sales_rep_email: this.basicinfo_sales_rep_email,
        basicinfo_property: this.basicinfo_property,
        basicinfo_advertisement_name: this.basicinfo_advertisement_name,
        basicinfo_advertisement_identifier: this.basicinfo_advertisement_identifier,
        basicinfo_new_identifier: this.basicinfo_new_identifier,
        basicinfo_campaigngoal: this.basicinfo_campaigngoal,
        basicinfo_flight_start: this.basicinfo_flight_start,
        basicinfo_flight_end: this.basicinfo_flight_end,
        adlink: this.adlink,
        basicinfo_facebook: this.basicinfo_facebook,
        basicinfo_mediabudget: this.basicinfo_mediabudget,
        basicinfo_mediabudget_permonth: this.basicinfo_mediabudget_permonth,
        basicinfo_mediabudget_total: this.basicinfo_mediabudget_total,
        basicinfo_maximumimpression: this.basicinfo_maximumimpression,
        basicinfo_maximumimpression_permonth: this.basicinfo_maximumimpression_permonth,
        basicinfo_maximumimpression_total: this.basicinfo_maximumimpression_total,
        basicinfo_ecpm: this.basicinfo_ecpm,
        basicinfo_spendevenly: this.basicinfo_spendevenly,
        basicinfo_spend_particular: this.basicinfo_spend_particular,
        basicinfo_spend_particular_info: this.basicinfo_spend_particular_info,
        basicinfo_uneven: this.basicinfo_uneven,
        basicinfo_adjust: this.basicinfo_adjust,
        basicinfo_reachh: this.basicinfo_reachh,
        basicinfo_ctr: this.basicinfo_ctr,
        basicinfo_ctrgoal: this.basicinfo_ctrgoal,
        basicinfo_cpa: this.basicinfo_cpa,
        basicinfo_cpagoal: this.basicinfo_cpagoal,
        basicinfo_siteretargating_securepixel: this.basicinfo_siteretargating_securepixel,
        basicinfo_siteretargeting_nonsecurepixel: this.basicinfo_siteretargeting_nonsecurepixel,
        basicinfo_conversion_securepixel: this.basicinfo_conversion_securepixel,
        basicinfo_conversion_nonsecurepixel: this.basicinfo_conversion_nonsecurepixel,
        basicinfo_notags: this.basicinfo_notags,
        basicinfo_simplifidata: this.basicinfo_simplifidata,
        basicinfo_3rdpartydata: this.basicinfo_3rdpartydata,
        basicinfo_misc_securepixel: this.basicinfo_misc_securepixel,
      };
      for (let i in data) {
        if (typeof(data[i])!= 'undefined') {
          this.basicdata[i] = data[i];
          data[i] = data[i];
        } else {
          this.basicdata[i] = '';
          data[i] = '';
        }
      }

/*if(flag==1){
  this.router.navigate(['/']);
}
if(flag==0) {
  this.router.navigate(['/confirmation']);
}*/
      console.log('data');
      console.log(data);
      // let link = 'http://localhost:3004/basicinformation';
      // let link = 'http://influxiq.com:3014/basicinformation';
      let link = this.serverurl + 'basicinformation';
      this._http.post(link, data)
          .subscribe(res => {
            let result: any;
             result = res;
            console.log(result.status);
            if (result.status == 'success') {
              this.router.navigate(['/confirmation']);
            }
            else {
              this.error = result.status;
            }
          }, error => {
            console.log('Ooops');
          });


    }
  }
}
