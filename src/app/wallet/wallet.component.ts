import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
    providers: [Commonservices],
})
export class WalletComponent implements OnInit {
    public datalist;
    public serverurl;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public userdetails;
    public totalamt: any;

  constructor(emailcookie: CookieService, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
      this.serverurl = _commonservices.url;
      this.emailcookie = emailcookie;
      this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
      if (this.mailcookiedetails != null || this.mailcookiedetails != '' || typeof (this.mailcookiedetails) != 'undefined') {
          this.getdetails();
      }
      this.getwalletlistofthisid();
  }

    ngOnInit() {
    }
    getwalletlistofthisid() {
        this.totalamt = 0;
        let link = this.serverurl + 'walletlistofthisuserid';
        var data={
            email:this.mailcookiedetails
        };
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                 result = res;
                this.datalist = result.res;
                console.log('this.datalist--walletlist');
                console.log(this.datalist);
                for(let i in this.datalist) {
                    this.totalamt = parseFloat(this.totalamt) + parseFloat(this.datalist[i].amount);
                }
                console.log(this.totalamt);
            }, error => {
                console.log('Oooops!');
            });
    }
    getdetails() {
        let link = this.serverurl + 'accountdetails';
        let data = {emailid : this.mailcookiedetails};
        console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    this.userdetails = result.item;
                    console.log(this.userdetails);
                }else {
                }
            }, error => {
                console.log('Ooops');
            });
    }

}
