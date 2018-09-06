import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import * as moment from 'moment';

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
    
    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getcampaigndetails();
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
                    this.dataForm = this.fb.group({
                        campaignname: [userdet.campaignname, Validators.required],
                      /*  status: [userdet.status, Validators.required],*/
                        totalcampaignspend: [userdet.totalcampaignspend, Validators.required],
                        cpa: [userdet.cpa, Validators.required],
                        epc: [userdet.epc, Validators.required],
                        dailybudget: [userdet.dailybudget, Validators.required],
                        startingbid: [userdet.startingbid, Validators.required],
                        conversionvalue: [userdet.conversionvalue, Validators.required],
                        startdate: [moment(userdet.startdate*1000).format('MM-DD-YYYY'), Validators.required],
                        enddate: [moment(userdet.enddate*1000).format('MM-DD-YYYY'), Validators.required],
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
        var startdate = moment(formval.startdate).format('MM-DD-YYYY');
        var enddate = moment(formval.enddate).format('MM-DD-YYYY');


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

}