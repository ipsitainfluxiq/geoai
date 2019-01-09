import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
declare var $:any;

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
    public cookiedetailsforalldetails_name;

    constructor(alldetailcookie: CookieService, emailcookie: CookieService, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.alldetailcookie = alldetailcookie ;
        this.cookiedetailsforalldetails = this.alldetailcookie.get('cookiedetailsforalldetails');
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
        this.cookiedetailsforalldetails_name = this.alldetailcookie.get('fname')+' '+this.alldetailcookie.get('lname');
        console.log('this.router.url');
        console.log(this.router.url);
        console.log('this.mailcookiedetails from headernew');
        console.log(this.mailcookiedetails);
        if (this.mailcookiedetails == '') {
              this.router.navigateByUrl('/');
        }


    }

    ngOnInit() {
    }

    ngAfterViewChecked(){
        $('.ssd').removeClass('active');
        $('.btnblue').removeClass('active');
        $('.dropdownmenunew').removeClass('active');

        //main menu
        if(this.router.url=='/campaignlists'){
            $('.lidiv0').addClass('active');
        }
        if(this.router.url=='/bannerlist'){
            $('.lidiv2').addClass('active');
        }
        if(this.router.url=='/searchnew'){
            $('.lidiv3').addClass('active');
        }

        if(this.router.url=='/wallet'){
            $('.lidiv4').addClass('active');
        }
        if(this.router.url=='/allwalletlist'){
            $('.lidiv5').addClass('active');

        }
        /*    if(this.router.url=='/searchnew'){

         $('.lidiv3').addClass('active');
         }*/


        //seconday menu at right top

        if(this.router.url=='/bannerlist'){
            $('.header-bannerbtn-admin').addClass('active');
        }
        if(this.router.url=='/userlist'){
            $('.header-userbtn-admin').addClass('active');
        }
        if(this.router.url=='/helpdesklist'){
            $('.header-empbtn-admin').addClass('active');
        }

        if(this.router.url=='/agencylist'){
            $('.header-empbtn-btn-admin').addClass('active');
        }
        if(this.router.url=='/userinformation'){
            $('.header-empbtn-btn1-admin').addClass('active');
        }

        if(this.router.url=='/rolesettings'){
            $('.header-empbtn-btn2-admin').addClass('active');
        }
        if(this.router.url=='/audiencelist' || this.router.url=='/searchnew'){
            $('.header-audiencebtn-admin').addClass('active');
        }
        /*if(this.router.url=='/audiencelist'){
         $('.header-audiencelistbtn-admin').addClass('active');
         }*/
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
