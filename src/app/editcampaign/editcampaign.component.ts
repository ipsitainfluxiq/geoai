import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import * as moment from 'moment';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-editcampaign',
  templateUrl: './editcampaign.component.html',
  styleUrls: ['./editcampaign.component.css'],
    providers: [Commonservices],
})
export class EditcampaignComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    id: number;
    public serverurl;
    public daterangeerror = null;
    public isdate;
    public type;
    public resultis;
    public note;
    public noteblankerror;
    public notestatuserror;
    public notestatus;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;

    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, emailcookie: CookieService,  alldetailcookie: CookieService) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie ;
        this.alldetailcookie = alldetailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.cookiedetailsforalldetails = this.alldetailcookie.get('cookiedetailsforalldetails');
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getcampaigndetails();
        });
        this.route.params.subscribe(params => {
            this.type = params['type'];
        });
        this.dataForm = this.fb.group({
            campaignname: ['', Validators.required],
        /*    status: ['', Validators.required],*/
            totalcampaignspend: ['', Validators.required],
            cpa: ['', Validators.required],
            epc: ['', Validators.required],
            dailybudget: ['', Validators.required],
            startingbid: ['', Validators.required],
            conversionvalue: ['', Validators.required],
            startdate: ['', Validators.required],
            enddate: ['', Validators.required],
            fcap: ['', Validators.required]
        });
        this.isdate = new Date();
        // type==1 means its coming from mail,,admin/helpdesk to make it active/inactive
        if(this.type == 1 && (this.mailcookiedetails=='' || this.mailcookiedetails==null)){
            console.log('go to login page');
            this.router.navigate(['/login',this.id]);
        }
        console.log('==================');
        console.log(this.alldetailcookie.get('type'));
        console.log(this.type);
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
                    this.resultis = result.item;
                    this.dataForm = this.fb.group({
                        campaignname: [userdet.campaignname, Validators.required],
                      /*  status: [userdet.status, Validators.required],*/
                        totalcampaignspend: [userdet.totalcampaignspend, Validators.required],
                        cpa: [userdet.cpa, Validators.required],
                        epc: [userdet.epc, Validators.required],
                        dailybudget: [userdet.dailybudget, Validators.required],
                        startingbid: [userdet.startingbid, Validators.required],
                        conversionvalue: [userdet.conversionvalue, Validators.required],
                       /* startdate: [moment(userdet.startdate*1000).format('MM-DD-YYYY'), Validators.required],
                        enddate: [moment(userdet.enddate*1000).format('MM-DD-YYYY'), Validators.required],*/
                        startdate: [moment(userdet.startdate).format('YYYY-MM-DD'), Validators.required],
                        enddate: [moment(userdet.enddate).format('YYYY-MM-DD'), Validators.required],
                        fcap: [userdet.fcap, Validators.required],

                    });
                }else {
                    this.router.navigate(['/campaignlists']);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {
        console.log(formval);
        this.daterangeerror = null;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('new Date(formval.enddate)');
        var today= moment();
      /*  var startdate = moment(formval.startdate).format('MM-DD-YYYY');
        var enddate = moment(formval.enddate).format('MM-DD-YYYY');*/
        var startdate = moment(formval.startdate).format('YYYY-MM-DD');
        var enddate = moment(formval.enddate).format('YYYY-MM-DD');

        /*if(formval.startdate>=formval.enddate || formval.startdate < today || formval.enddate < today){
            this.daterangeerror = 'Give Start date and End date properly';
            console.log('inside error');
        }*/
        if(formval.startdate>=formval.enddate ){
            this.daterangeerror = 'Give Start date and End date properly';
            console.log('inside error');
        }
        if (this.dataForm.valid && this.daterangeerror == null) {
            let link = this.serverurl + 'editcampaign';
            let data = {
                id: this.id,
                campaignname: formval.campaignname,
               /* status: formval.status,*/
                totalcampaignspend: formval.totalcampaignspend,
                cpa: formval.cpa,
                epc: formval.epc,
                dailybudget: formval.dailybudget,
                startingbid: formval.startingbid,
                conversionvalue: formval.conversionvalue,
                startdate: startdate,
                enddate: enddate,
                fcap: formval.fcap,
            };
            this._http.post(link, data)
                .subscribe(res => {
                    this.router.navigate(['/campaignlists']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

    statuschange(){
    if (this.note != null){
        this.noteblankerror = null;
    }
    else {
        this.noteblankerror = 'Give a proper note';
    }
    if (this.notestatus != null){
        this.notestatuserror = null;
    }
    else {
        this.notestatuserror = 'Select Any one';
    }
    let link = this.serverurl + 'statuschangecampaign';
    let data= {
        status : this.notestatus,
        email : this.resultis.added_by,
        note : this.note,
        _id :  this.id,
        addedby :  this.mailcookiedetails,
        campaignname :  this.resultis.campaignname,
    }
    if(this.noteblankerror==null && this.notestatuserror==null){
        this._http.post(link, data)
            .subscribe( res => {
                this.note = null;
                this.router.navigate(['/campaignlists']);
            }, error => {
                console.log("Ooops");
            });
    }
}

}