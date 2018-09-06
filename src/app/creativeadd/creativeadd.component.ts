import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService, cookieServiceFactory} from 'angular2-cookie/core';
declare var $: any;
declare var $cookidetailfname: any;

@Component({
    selector: 'app-creativeadd',
    templateUrl: './creativeadd.component.html',
    styleUrls: ['./creativeadd.component.css'],
    providers: [Commonservices],
})
export class CreativeaddComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public ckeditorContent;
    public errckeditor;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;

    constructor( fb: FormBuilder, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService, alldetailcookie: CookieService) {
        this.alldetailcookie = alldetailcookie ;
        this.cookiedetailsforalldetails = this.alldetailcookie.getObject('cookiedetailsforalldetails');
        console.log('this.cookiedetailsforalldetails---------------');
        console.log(this.cookiedetailsforalldetails);
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            creativename: ['', Validators.required],
            description: [''],
            code: ['']
        });
    }
    onChange(event: any) {
        this.dataForm.patchValue({description: this.ckeditorContent});
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
       /* if (this.ckeditorContent == null) {
            this.errckeditor = false;
        }
        else {
            this.errckeditor = true;
        }*/
     //   if (this.dataForm.valid && this.ckeditorContent != null) {
        if (this.dataForm.valid ) {
            let link = this.serverurl + 'addcreative';
            let data = {
                emailid: this.mailcookiedetails,
                creativename: formval.creativename,
                description: this.ckeditorContent,
              //  code: Math.round((Math.random() * 100) * 100),
                code: $('#getcode').val(),
            };
            console.log(data);
          //  console.log( $('#getcode').val());
            this._http.post(link, data)
                .subscribe(res => {
                    let result: any;
                     result = res;
                    if (result.status == 'success') {
                        this.router.navigate(['/creativelist']);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    createad() {
        console.log(this.cookiedetailsforalldetails);
        console.log('.....add creatives ...');

        $('#airtory_widgetfname').val(this.cookiedetailsforalldetails.firstname);
        $('#airtory_widgetlname').val(this.cookiedetailsforalldetails.lastname);
        $('#airtory_widgetcompanyid').val(this.cookiedetailsforalldetails._id);
        setTimeout(() => {
            $('#airtory_widget').click();
        },500);
    }
}