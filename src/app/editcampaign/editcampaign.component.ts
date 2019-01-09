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
    public audiencebannertype;
    public type;
    public resultis;
    public note;
    public noteblankerror;
    public notestatuserror;
    public notestatus;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public isModalShown: boolean = false;
    public isModalShown1: boolean = false;
    public editaudienceModal: boolean = false;
    public cookiedetailsforalldetails_type;
    public alldetailcookie: CookieService;

    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, emailcookie: CookieService, alldetailcookie: CookieService) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.alldetailcookie = alldetailcookie ;
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
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
            totalbudget: ['', Validators.required],
            cpa: [''],
            epc: [''],
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
        console.log(this.type);
    }
    getcampaigndetails() {
        let link = this.serverurl + 'campaigndetailsnew';
        let data = {_id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    this.resultis = result.item;
                    console.log(this.resultis);
                    this.dataForm = this.fb.group({
                        campaignname: [userdet.campaignname, Validators.required],
                        totalbudget: [userdet.totalbudget, Validators.required],
                        cpa: [userdet.cpa],
                        epc: [userdet.epc],
                        dailybudget: [userdet.dailybudget, Validators.required],
                        startingbid: [userdet.startingbid, Validators.required],
                        conversionvalue: [userdet.conversionvalue, Validators.required],
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
        var startdate = moment(formval.startdate).format('YYYY-MM-DD');
        var enddate = moment(formval.enddate).format('YYYY-MM-DD');
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
                totalbudget: formval.totalbudget,
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
    showdate(dd){
        return moment(dd).format('MM-DD-YY');
    }
    onHidden() {
        this.isModalShown = false;
        this.isModalShown1 = false;
        this.editaudienceModal = false;
    }
    openaudiencelist(type) {
        this.isModalShown = true;
        this.audiencebannertype = type;
    }
    openbannerlist(type){
        this.isModalShown1 = true;
        this.audiencebannertype = type;
    }
}