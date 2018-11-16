import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'app-addcampaign',
  templateUrl: './addcampaign.component.html',
  styleUrls: ['./addcampaign.component.css'],
    providers: [Commonservices],
})
export class AddcampaignComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public id;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public daterangeerror = null;
    public isdate;

    constructor(fb: FormBuilder, addcookie: CookieService, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService, private route: ActivatedRoute) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.mailcookiedetails);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            if(this.id!=null){
                this.getcampaigndetails();
            }
        });
        this.dataForm = this.fb.group({
            campaignname: ['', Validators.required],
            totalcampaignspend: ['', Validators.required],
            cpa: ['', Validators.required],
            epc: ['', Validators.required],
            dailybudget: ['', Validators.required],
            startingbid: ['', Validators.required],
            conversionvalue: ['', Validators.required],
            startdate: ['', Validators.required],
            enddate: ['', Validators.required],
            fcap: ['', Validators.required],
        });
        this.isdate = new Date();
    }

    dosubmit(formval) {
        console.log(formval);
        this.daterangeerror = null;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('new Date(formval.enddate)');
        console.log('this.dataForm.valid');
        console.log(this.dataForm.valid);
        var startdate = moment(formval.startdate).format('YYYY-MM-DD');
        var enddate = moment(formval.enddate).format('YYYY-MM-DD');

        if(formval.startdate>=formval.enddate ){
            this.daterangeerror = 'Give Start date and End date properly';
            console.log('inside error');
        }
        if (this.dataForm.valid && this.daterangeerror == null) {
            let link = this.serverurl + 'addcampaign';
            let data = {
                campaignname: formval.campaignname,
                status: 3, //pending
                totalcampaignspend: formval.totalcampaignspend,
                cpa: formval.cpa,
                epc: formval.epc,
                dailybudget: formval.dailybudget,
                startingbid: formval.startingbid,
                conversionvalue: formval.conversionvalue,
                startdate: startdate,
                enddate: enddate,
                fcap: formval.fcap,
                added_by: this.mailcookiedetails,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    this.router.navigate(['/campaignlists']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

    getcampaigndetails() {
        let link = this.serverurl + 'campaigndetailsnew';
        let data = {_id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    userdet.campaignname = 'Copy of '+userdet.campaignname;
                    this.dataForm = this.fb.group({
                        campaignname: [userdet.campaignname, Validators.required],
                        totalcampaignspend: [userdet.totalcampaignspend, Validators.required],
                        cpa: [userdet.cpa, Validators.required],
                        epc: [userdet.epc, Validators.required],
                        dailybudget: [userdet.dailybudget, Validators.required],
                        startingbid: [userdet.startingbid, Validators.required],
                        conversionvalue: [userdet.conversionvalue, Validators.required],
                        startdate: [userdet.startdate, Validators.required],
                        enddate: [userdet.enddate, Validators.required],
                        fcap: [userdet.fcap, Validators.required],
                    });
                }else {
                    this.router.navigate(['/campaignlists']);
                }
            }, error => {
                console.log('Ooops');
            });
    }


}
