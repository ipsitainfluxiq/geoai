import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices' ;
declare var moment: any;
@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css'],
    providers: [Commonservices],
})
export class UserlistComponent implements OnInit {
    public datalist;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public showrows;
    public totalpage;
    orderbyquery: any;
    orderbytype: any;
    public serverurl;
    public notedetails;
    public filterval;
    public filterval2;
    public filterval1;
    public idis;
    public mailis ;
    public typeis;
    public note;
    public noteblankerror;
    public isModalShown: boolean = false;
    public isModalnoteShown: boolean = false;
    public ismodalshown3:boolean=false;
    public ismodalshown4:boolean=false;
    public p: number = 1;
    public p1: number = 1;
    public allcookiedetails:any;
    public usertype: string;
    private addrolemarkupval: string;
    private smaatomarkupval: string;
    private selecteduser: string;
    public agencyhelpdeskid:any;
    public oldagencyhelpdeskid:any;
    public useridis:any;
    public agencyhelpdesklist:any;
    public agencyhelpdesktype:any;
    public agencyhelpdesk_assign_to_user_modal_shown:boolean=false;
    public alldetailcookie: CookieService;
    public cookiedetailsforalldetails_type;

    constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, emailcookie: CookieService, private _commonservices:Commonservices,alldetailcookie: CookieService ) {
        this.filterval2 = '';
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.usertype = this.emailcookie.get('type');
        this.allcookiedetails=this.emailcookie.get('cookiedetailsforalldetails');
        this.alldetailcookie = alldetailcookie ;
        this.showrows = 5;
        this.orderbyquery = 'firstname';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        console.log('mailcookiedetails');
        console.log(this.mailcookiedetails);
        console.log('this.allcookiedetails');
        console.log(this.allcookiedetails);
        console.log(this.alldetailcookie.get('fname'));
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');

    }

    ngOnInit() {
        this.getUserList();
    }
    getUserList() {
        let link = this.serverurl + 'userlist';
        // let link = 'http://localhost:3004/userlist';
        let data = {userid:this.emailcookie.get('cookiedetailsforalldetails'),type:this.emailcookie.get('type')};
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.datalist = result;

            }, error => {
                console.log('Oooops!');
            });
    }

    getSortClass(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            return 'caret-up';
        }

        if (this.orderbyquery == value && this.orderbytype == 1) {
            // console.log('caret-up');
            return 'caret-down';
        }
        return 'caret-up-down';
    }

    manageSorting(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            this.orderbytype = 1;
            return;
        }
        if (this.orderbyquery == value && this.orderbytype == 1) {
            this.orderbytype = -1;
            return;
        }
        this.orderbyquery = value;
        this.orderbytype = 1;
    }
    showdate(dd){
        return moment(dd).format('Do MMM YYYY, HH:mm');
    }
    statuspopup(item,type){
        this.idis=item._id;
        this.mailis=item.email;
        this.typeis=type;
        this.isModalShown = true;
    }

    editmodal(val:any){
        this.selecteduser=val;
        this.addrolemarkupval=val.role_mark_up;
        this.smaatomarkupval=val.smaato_mark_up;

        this.ismodalshown3=true;

    }
    editmodal1(val:any)
    {
        this.selecteduser=val;
        this.addrolemarkupval=val.role_mark_up;
        this.smaatomarkupval=val.smatoo_mark_up;
        this.ismodalshown4=true;
        console.log('val');
        console.log(val);
        console.log('this.smaatomarkupval');
        console.log(this.smaatomarkupval);
    }
    onHidden() {
        this.isModalShown = false;
        this.isModalnoteShown = false;
        this.ismodalshown3=false;
        this.ismodalshown4=false;
        this.agencyhelpdesk_assign_to_user_modal_shown=false;
    }

    updateaddrolemarkupval() {

        let link = this.serverurl + 'updateaddrolemarkupval';
        let data= {
            user : this.selecteduser,
            role_mark_up : this.addrolemarkupval,
        };
        console.log('data');
        console.log(data);
        this._http.post(link, data)
            .subscribe( res => {
                this.ismodalshown3 = false;
                this.getUserList();
            }, error => {
                console.log("Ooops");
            });
    }
    updateaddrolemarkupval1(){
        let link = this.serverurl + 'updatesmaatomarkupval';
        let data= {
            user : this.selecteduser,
            smaato_mark_up : this.smaatomarkupval,
        };
        console.log('data');
        console.log(data);
        this._http.post(link, data)
            .subscribe( res => {
                this.ismodalshown4 = false;
                this.getUserList();
            }, error => {
                console.log("Ooops");
            });
    }

    statuschange(){
        if (this.note != null){
            this.noteblankerror = null;
        }
        else {
            this.noteblankerror = 'Give a proper note';
        }
        let link = this.serverurl + 'statuschange';
        let data= {
            status : this.typeis,
            email : this.mailis,
            note : this.note,
            _id :  this.idis,
            addedby :  this.mailcookiedetails,
        };
        if(this.noteblankerror==null){
            this._http.post(link, data)
                .subscribe( res => {
                    this.isModalShown = false;
                    this.note = null;
                    this.getUserList();
                }, error => {
                    console.log("Ooops");
                });
        }
    }
    searchbyval() {
        this.filterval = '';
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.filterval2 != '' && this.filterval2 != null) {
            this.filterval += this.filterval2;
        }
    }
    shownotes(email){
        console.log('--------------------------------------------------------------------');
        console.log(email);
        this.isModalnoteShown = true;
        let link = this.serverurl + 'getnotedetails';
        let data= {
            email : email
        }
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.notedetails  = result;

            }, error => {
                console.log('Oooops!');
            });
    }
    agencyhelpdeskupdate(userid,id,type){
        this.agencyhelpdesklist = null;
        this.useridis = userid;
        this.oldagencyhelpdeskid = this.agencyhelpdeskid = id;
        this.agencyhelpdesktype = type;
        this.agencyhelpdesk_assign_to_user_modal_shown = true;
        let link = this.serverurl + 'getagencyhelpdesklist';
        let data= {
            type : this.agencyhelpdesktype
        }
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                if(result.status=='success' && result.items!=null){
                    this.agencyhelpdesklist = result.items;
                }
                console.log(this.agencyhelpdesklist);
            }, error => {
                console.log('Oooops!');
            });
    }
    update_agencyhelpdeskid_to_user(){
        let link = this.serverurl + 'update_agencyhelpdeskid_for_user';
        let data;
        if(this.oldagencyhelpdeskid != this.agencyhelpdeskid){
            data= {
                useridis : this.useridis,
                agencyhelpdeskidis : this.agencyhelpdeskid,
                type : this.agencyhelpdesktype,
                adminname: this.alldetailcookie.get('fname') + ' '+this.alldetailcookie.get('lname'),
                oldagencyhelpdeskid : this.oldagencyhelpdeskid,
            }
        }
        else{
            data= {
                useridis : this.useridis,
                agencyhelpdeskidis : this.agencyhelpdeskid,
                type : this.agencyhelpdesktype,
                adminname: this.alldetailcookie.get('fname') + ' '+this.alldetailcookie.get('lname')
            }
        }
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                if(result.status=='success'){
                    this.agencyhelpdesk_assign_to_user_modal_shown = false;
                    this.getUserList();
                }
            }, error => {
                console.log('Oooops!');
            });
    }

}
