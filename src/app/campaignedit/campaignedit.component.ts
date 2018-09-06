import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import * as moment from 'moment';

@Component({
  selector: 'app-campaignedit',
  templateUrl: './campaignedit.component.html',
  styleUrls: ['./campaignedit.component.css'],
    providers: [Commonservices],
})
export class CampaigneditComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    public isSubmit;
    id: number;
    public serverurl;
    public getval;
    public dt: Date = new Date();
    public enddate: Date = new Date();

    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetails();
        });

        this.isSubmit = false;

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
        return this.getval.startdate;
    }
    public getendDate(): number {
        return this.getval.enddate;
    }
    getdetails() {
        let link = this.serverurl + 'campaigndetails';
        let data = {_id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    this.getval=result.item;
                    this.dataForm = this.fb.group({
                        campaignname: [userdet.campaignname, Validators.required],
                        dt: [userdet.startdate, Validators.required],
                        enddate: [userdet.enddate, Validators.required],
                        campaignbudget: [userdet.campaignbudget, Validators.required],
                        monthlybudget: [userdet.monthlybudget, Validators.required],
                        biddingamountnbudget: [userdet.biddingamountnbudget, Validators.required],
                        dailyspendtarget: [userdet.dailyspendtarget, Validators.required],
                        bidding_type: [userdet.bidding_type, Validators.required],

                    });
                }else {
                    this.router.navigate(['/adminlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        if (this.dataForm.valid) {
            formval.dt = moment(formval.dt);
            formval.dt = (formval.dt.format('MM-DD-YYYY'));

            formval.enddate = moment(formval.enddate);
            formval.enddate = (formval.enddate.format('MM-DD-YYYY'));

            let link = this.serverurl + 'campaignedit';
            let data = {
              id: this.id,
                campaignname: formval.campaignname,
                startdate: formval.dt,
                enddate: formval.enddate,
                campaignbudget: formval.campaignbudget,
                monthlybudget: formval.monthlybudget,
                biddingamountnbudget: formval.biddingamountnbudget,
                dailyspendtarget: formval.dailyspendtarget,
                bidding_type: formval.bidding_type,
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