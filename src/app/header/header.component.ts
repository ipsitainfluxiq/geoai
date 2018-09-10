import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [Commonservices],
})
export class HeaderComponent implements OnInit {
    public addcookie: CookieService;
    public cookiedetails;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public serverurl;
    public usernamedetail;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails;
    public cookiedetailsforalldetails_type;

    constructor(addcookie: CookieService, private _http: HttpClient, private router: Router, emailcookie: CookieService, private _commonservices: Commonservices, alldetailcookie: CookieService) {
        this.addcookie = addcookie ;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log('from header --------> ' + this.mailcookiedetails);
        console.log('from header cookiedetails --------> ' + this.cookiedetails);
        this.alldetailcookie = alldetailcookie ;
        this.cookiedetailsforalldetails = this.alldetailcookie.get('cookiedetailsforalldetails');
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');

        this.serverurl = _commonservices.url;

        /* this subscription will fire always when the url changes */
        this.router.events.subscribe(val=> {

            /* the router will fire multiple events */
            /* we only want to react if it's the final active route */
            if (val instanceof NavigationEnd) {

                /* the variable curUrlTree holds all params, queryParams, segments and fragments from the current (active) route */
                let curUrlTree = this.router.parseUrl(this.router.url);
                console.log(this.router.url);

                if ((typeof (this.mailcookiedetails) == 'undefined') && this.router.url!='/' && this.router.url!='/basicinformation' && this.router.url!='/confirmation'&& this.router.url!='/signup') {
                    this.router.navigateByUrl('/');
                }
            }
        });



    }

    ngOnInit() {
        if (typeof (this.mailcookiedetails) != 'undefined') {
            this.getdetails();
        }
    }
    getdetails() {
        let link = this.serverurl + 'accountdetails';
        let data = {emailid : this.mailcookiedetails};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    this.usernamedetail = result.item;
                    console.log(this.usernamedetail);
                }
            }, error => {
                console.log('Ooops');
            });
    }
    resetcookie() {
        console.log('create new campaign');
        console.log('reset cookie');

        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');

        this.addcookie.deleteAll('cookiedetails');
        this.cookiedetails = this.addcookie.get('cookiedetails'); // after remove you have to call the cookie again to update the value

        this.router.navigateByUrl('/campaignsettings');
    }

    resetcookie1() {
        console.log('create new campaign');
        console.log('reset cookie');

        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');

        this.addcookie.deleteAll('cookiedetails');
        this.cookiedetails = this.addcookie.get('cookiedetails'); // after remove you have to call the cookie again to update the value
        console.log('After remove '+this.cookiedetails);
        this.router.navigateByUrl('/viewability');
    }


    resetcookie2() {
        console.log('create new campaign');
        console.log('reset cookie');

        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');

        this.addcookie.deleteAll('cookiedetails');
        this.cookiedetails = this.addcookie.get('cookiedetails'); // after remove you have to call the cookie again to update the value
        console.log('After remove '+this.cookiedetails);
        this.router.navigateByUrl('/campaignadd');
    }


    logout() {
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.emailcookie.deleteAll();
        this.router.navigateByUrl('');
    }

}
