import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-addmoney',
  templateUrl: './addmoney.component.html',
  styleUrls: ['./addmoney.component.css'],
    providers: [Commonservices],
})
export class AddmoneyComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public currentdate;
    public expirydateerror;

    constructor(fb: FormBuilder,private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log(this.mailcookiedetails);
        this.currentdate = new Date();
        console.log(this.currentdate);
        console.log(this.currentdate.getMonth()+1); //as it starts from 0
        console.log(this.currentdate.getFullYear());
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            name: ['', Validators.required],
            cardno: ['', Validators.required],
            amount: ['', Validators.required],
            mm: ['', Validators.required],
            yyyy: ['', Validators.required],
          //  cvv: ['', Validators.required],
            cvv: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        });
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }

        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var currentDay = new Date(y, m, 1);
        var givenDay = new Date(formval.yyyy, formval.mm, 0);
        console.log('today '+currentDay);
        console.log('today mine '+this.currentdate);
        console.log('given day '+givenDay);
        if(givenDay < currentDay){
            this.expirydateerror='Give proper validation time';
        }
        else{
            this.expirydateerror = null;
        }
        if (this.dataForm.valid && this.expirydateerror == null) {
            let link = this.serverurl + 'addmoney';
            let data = {
                name: formval.name,
             //   cardno: formval.cardno,
                amount: formval.amount,
              //  mm: formval.mm,
              //  yyyy: formval.yyyy,
              //  cvv: formval.cvv,
                type:'card',
              //  transaction_id:'',
                added_by: this.mailcookiedetails
            };
            console.log('no error');
            this._http.post(link, data)
                .subscribe(res => {
                    this.router.navigate(['/wallet']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }


}