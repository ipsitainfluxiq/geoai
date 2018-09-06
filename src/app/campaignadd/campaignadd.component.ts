import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import * as moment from 'moment';

@Component({
  selector: 'app-campaignadd',
  templateUrl: './campaignadd.component.html',
  styleUrls: ['./campaignadd.component.css'],
    providers: [Commonservices],
})
export class CampaignaddComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public dt: Date = new Date();
    public enddate: Date = new Date();
    public startdt;
    public enddt;
    public serverurl;
    public emailcookie: CookieService;
    public mailcookiedetails;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.mailcookiedetails);
    }

  ngOnInit() {
      this.dataForm = this.fb.group({
          campaignname: ['', Validators.required],
          dt: ['', Validators.required],
          enddate: ['', Validators.required],
          campaignbudget: ['', Validators.required],
          monthlybudget: ['', Validators.required],
          biddingamountnbudget: ['', Validators.required],
          dailyspendtarget: ['', Validators.required],
          bidding_type: ['', Validators.required],
      });
  }
    public getDate(): number {
        this.startdt = this.dt && this.dt.getTime() || new Date().getTime();
        return this.dt && this.dt.getTime() || new Date().getTime();
    }
    public getendDate(): number {
        this.enddt = this.enddate && this.enddate.getTime() || new Date().getTime();
        return this.enddate && this.enddate.getTime() || new Date().getTime();
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        if (this.dataForm.valid) {
            console.log(formval.dt);
            formval.dt = moment(formval.dt);
            formval.dt = (formval.dt.format('MM-DD-YYYY'));

            formval.enddate = moment(formval.enddate);
            formval.enddate = (formval.enddate.format('MM-DD-YYYY'));

            let link = this.serverurl + 'campaignadd';
            let data = {
                campaignname: formval.campaignname,
                startdate: formval.dt,
                enddate: formval.enddate,
                campaignbudget: formval.campaignbudget,
                monthlybudget: formval.monthlybudget,
                biddingamountnbudget: formval.biddingamountnbudget,
                dailyspendtarget: formval.dailyspendtarget,
                bidding_type: formval.bidding_type,
                added_by: this.mailcookiedetails,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    this.router.navigate(['/campaignlistnew']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}
