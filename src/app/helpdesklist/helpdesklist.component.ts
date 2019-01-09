import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-helpdesklist',
    templateUrl: './helpdesklist.component.html',
    styleUrls: ['./helpdesklist.component.css'],
    providers: [Commonservices],
})
export class HelpdesklistComponent implements OnInit {
    public fb;
    public datalist;
    public helpdeskid;
    public id;
    orderbyquery: any;
    orderbytype: any;
    public isModalShown: boolean = false;
    public is_user_Modal: boolean = false;
    public serverurl;
    public list_length;
    public get_users_has_this_helpdeskid;
    public p: number = 1;
    public formControluserValue = '';
    static namesearchvalues = [];
    static usernames = [];
    static autovalues = [];
    public users;
    public emailcookie: CookieService;
    public mailcookiedetails;

    constructor(fb: FormBuilder, private _http: HttpClient,  private router: Router, private _commonservices: Commonservices, emailcookie: CookieService,) {
        this.fb = fb;
        this.orderbyquery = 'firstname';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.gethelpdesklist();
        this.getusers();

    }

    ngOnInit() {
    }
    gethelpdesklist() {
        let link = this.serverurl + 'helpdesklist';
        let data = {userid:this.emailcookie.get('cookiedetailsforalldetails'),type:this.emailcookie.get('type')};
        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                this.datalist = result.res;
                this.list_length = result.res.length;
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }

    delConfirm(id) {
        this.id = id;
        this.isModalShown = true;
    }

    onHidden() {
        this.isModalShown = false;
        this.is_user_Modal = false;
    }

    hepdeskdel() {
        this.isModalShown = false;
        let link = this.serverurl+'deleteadmin';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log('result');
                console.log(result);
                if(result.status=='success'){
                    setTimeout(() => {
                        this.gethelpdesklist();
                    }, 300);
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    getSortClass(value: any) {
        if (this.orderbyquery == value && this.orderbytype == -1) {
            return 'caret-up';
        }

        if (this.orderbyquery == value && this.orderbytype == 1) {
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

    shownumber(allitems){
        let j = 0;
        for(let i in allitems){
                j++;
        }
        return j;
    }

    openusermodal(item){
        this.get_users_has_this_helpdeskid = null;
        this.is_user_Modal=true;
        this.helpdeskid=item._id;
        this.get_users_who_has_this_helpdeskid();
    }

    get_users_who_has_this_helpdeskid(){
        let link = this.serverurl + 'getusers_who_has_this_helpdeskid';
        let data = {helpdeskid: this.helpdeskid};
        this._http.post(link, data)
            .subscribe(res => {
                let result : any;
                result = res;
                if(result.status=='success'){
                    this.get_users_has_this_helpdeskid = result.id;
                    console.log('this.get_users_has_this_helpdeskid');
                    console.log(this.get_users_has_this_helpdeskid);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    getusers(){
        HelpdesklistComponent.usernames = [];
        let link = this.serverurl + 'getusers';
        let data = {type: 'user'};
        this._http.post(link, data)
            .subscribe(res => {
                this.users = res;
                console.log(this.users);
                for(let i in this.users){
                    if(this.users[i].helpdeskid==null){
                        HelpdesklistComponent.usernames.push(this.users[i]);
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    findChoices(searchText: string) {
        let a= [];
        HelpdesklistComponent.namesearchvalues=[];
        a= HelpdesklistComponent.usernames.filter(item => item.firstname.toLowerCase().includes(searchText.toLowerCase()));
        for(let i in a){
            HelpdesklistComponent.namesearchvalues.push({val:a[i].email,label:a[i].firstname + ' '+ a[i].lastname+"("+a[i].email+")"});
        }
        return HelpdesklistComponent.namesearchvalues;
    }
    getChoiceLabel(choice: any) {
        let choiceval = choice.val;
        HelpdesklistComponent.autovalues.push(choice.val);
        return ``;
    }
    getlengthfval(){
        return HelpdesklistComponent.autovalues.length;
    }
    getuseravl(){
        return HelpdesklistComponent.autovalues;
    }
    removeuser(item){
        let indexval = HelpdesklistComponent.autovalues.indexOf(item);
        HelpdesklistComponent.autovalues.splice(indexval, 1);
    }
    manageuser(type){
        console.log(HelpdesklistComponent.autovalues);
        let link = this.serverurl + 'insert_helpdesk_id_to_user';
        let data = {useremail: HelpdesklistComponent.autovalues,helpdeskid: this.helpdeskid};
        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                console.log(result);
                if(result.status=='success'){
                    HelpdesklistComponent.autovalues = [];
                    HelpdesklistComponent.namesearchvalues = [];
                    this.get_users_who_has_this_helpdeskid();
                    this.getusers();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    remove_helpdeskid_from_this_user(userid){
        let link = this.serverurl+'remove_helpdeskid';
        let data = {userid: userid};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log('remove_helpdeskid');
                console.log(result);
                    this.get_users_who_has_this_helpdeskid();
            }, error => {
                console.log('Oooops!');
            });
    }
}