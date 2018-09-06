import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";

@Component({
  selector: 'app-headernew',
  templateUrl: './headernew.component.html',
  styleUrls: ['./headernew.component.css'],
    providers: [Commonservices],
})
export class HeadernewComponent implements OnInit {
    public serverurl;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;
    public cookiedetailsforalldetails_type;

  constructor(alldetailcookie: CookieService, emailcookie: CookieService, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
      this.serverurl = _commonservices.url;
      this.emailcookie = emailcookie;
      this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
      this.alldetailcookie = alldetailcookie ;
      this.cookiedetailsforalldetails = this.alldetailcookie.get('cookiedetailsforalldetails');
      this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
     // console.log('this.cookiedetailsforalldetails from header');
    //  console.log(this.cookiedetailsforalldetails);
   //   console.log('this.mailcookiedetails from header');
   //   console.log(this.mailcookiedetails);
    //  console.log(this.alldetailcookie.get('fname'));
    //  console.log(this.alldetailcookie.get('type'));
      if (this.mailcookiedetails == null) {
          console.log('null---');
          this.router.navigateByUrl('/');
      }
  }

  ngOnInit() {
  }
    logout() {
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log('????? '+this.mailcookiedetails);
       // this.emailcookie.removeAll();
        this.emailcookie.deleteAll();
        this.alldetailcookie.deleteAll();
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log(this.mailcookiedetails);
        this.router.navigateByUrl('/');
    }
}
