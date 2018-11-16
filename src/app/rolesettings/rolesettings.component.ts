import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-rolesettings',
  templateUrl: './rolesettings.component.html',
  styleUrls: ['./rolesettings.component.css'],
  providers: [Commonservices],
})
export class RolesettingsComponent implements OnInit {
  public serverurl;
  public emailcookie: CookieService;
  public mailcookiedetails;
  public dataForm: FormGroup;
  public fb;
  public role_mark_up_error;
  public smatoo_mark_up_error;

  constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices,  emailcookie: CookieService) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.emailcookie = emailcookie ;
    this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
  }

  ngOnInit() {
      this.getroledetails();
    this.dataForm = this.fb.group({
      role_mark_up: ['', Validators.required],
      smatoo_mark_up: ['', Validators.required]
    });
  }

    dosubmit(formval) {
        this.role_mark_up_error = null;
        this.smatoo_mark_up_error = null;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if(formval.role_mark_up<0 || formval.role_mark_up>100){
            this.role_mark_up_error = 'Provide value in percentage';
        }
        if(formval.smatoo_mark_up<0 || formval.smatoo_mark_up>100){
            this.smatoo_mark_up_error = 'Provide value in percentage';
        }
        if (this.dataForm.valid && this.role_mark_up_error == null && this.smatoo_mark_up_error == null) {
            let link = this.serverurl + 'updaterole';
            let data = {role_mark_up:formval.role_mark_up , smatoo_mark_up:formval.smatoo_mark_up};
            this._http.post(link,data)
                .subscribe(res => {
                    this.role_mark_up_error = null;
                    this.smatoo_mark_up_error = null;
                    this.router.navigate(['/campaignlists']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

    getroledetails() {
        let link = this.serverurl + 'roledetails';
        let data = {_id : '5ba08dcdc2da31239d7808a1'};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
          console.log(result);
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            this.dataForm = this.fb.group({
              role_mark_up: [result.item.role_mark_up, Validators.required],
              smatoo_mark_up: [result.item.smatoo_mark_up, Validators.required]
            });
          }else {
            this.router.navigate(['/campaignlists']);
          }
        }, error => {
          console.log('Ooops');
        });
  }


}
