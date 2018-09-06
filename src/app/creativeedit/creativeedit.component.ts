import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService, cookieServiceFactory} from 'angular2-cookie/core';
import {DomSanitizer} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-creativeedit',
  templateUrl: './creativeedit.component.html',
  styleUrls: ['./creativeedit.component.css'],
    providers: [Commonservices],
})
export class CreativeeditComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public id;
    public creativedetails;
    public ckeditorContent;
    public errckeditor;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;
    public editis;

    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService, private route: ActivatedRoute, alldetailcookie: CookieService, public _sanitizer: DomSanitizer) {
        this.alldetailcookie = alldetailcookie ;
        this.cookiedetailsforalldetails = this.alldetailcookie.getObject('cookiedetailsforalldetails');
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetails();
        });
        this.dataForm = this.fb.group({
            creativename: ['', Validators.required],
            description: [''],
            code: ['']
        });
        setTimeout(() => {
        if (this.creativedetails != null) {
            console.log('creativedetails settimeout');
            this.dataForm = this.fb.group({
                creativename: [this.creativedetails.creativename, Validators.required],
                description: [this.creativedetails.description],
                code: [this.creativedetails.code]
            });
            this.ckeditorContent = this.creativedetails.description;
        }
        }, 2000);
    }
    onChange(event: any) {
        this.dataForm.patchValue({description: this.ckeditorContent});
    }
    getdetails() {
        let link = this.serverurl + 'creativedetails';
        let data = {_id : this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    this.creativedetails = result.item;
                }else {
                    this.router.navigate(['/creativelist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }
    callunsafe(id) {
        var url = 'http://simplyfi.influxiq.com/showad.php?id=' + id;
       // console.log(url);
        return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log($('#getcode').val());
        console.log('getcode');
        console.log('inside submit');
        if (this.ckeditorContent == null) {
            this.errckeditor = false;
        }
        else {
            this.errckeditor = true;
        }
        if (this.dataForm.valid && this.ckeditorContent != null) {
            let link = this.serverurl + 'editcreative';
            let data = {
                id: this.id,
                creativename: formval.creativename,
                description: this.ckeditorContent,
                code: $('#getcode').val(),
            };
            console.log(data);
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