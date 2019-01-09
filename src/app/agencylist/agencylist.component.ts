import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
    selector: 'app-agencylist',
    templateUrl: './agencylist.component.html',
    styleUrls: ['./agencylist.component.css'],
    providers:[Commonservices],
})
export class AgencylistComponent implements OnInit {
    public fb;
    public datalist;
    public id;
    public orderbyquery: any;
    public orderbytype: any;
    public typeis: any;
    public is_user_employee_Modal: boolean = false;
    public isModalShown: boolean = false;
    public serverurl;
    public users;
    public employees;
    public agencyid;
    public list_length;
    public userdetails;
    public choiceval;
    public get_users_employees_has_this_agencyid;
    public p: number = 1;
    public formControluserValue = '';
    static namesearchvalues = [];
    static usernames = [];
    static employeenames = [];
    static autovalues = [];

    constructor(fb: FormBuilder, private _http: HttpClient,  private router: Router, private _commonservices: Commonservices,) {
        this.fb = fb;
        this.orderbyquery = 'firstname';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        this.getagencylist();
        this.getusers();
        this.getemployees();
    }

    ngOnInit() {
    }
    getagencylist() {
        let link = this.serverurl + 'agencylist';
        this._http.get(link)
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
        this.is_user_employee_Modal = false;
    }

    agencydel() {
        this.isModalShown = false;
        let link = this.serverurl+'deleteagency';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log('result');
                console.log(result);
                if(result.status=='success'){
                    setTimeout(() => {
                        this.getagencylist();
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

    openuseremployeemodal(item,type){
        if(type=='user'){
            this.typeis='Users';
        }
        if(type=='helpdesk'){
            this.typeis='Employees';
        }

        this.get_users_employees_has_this_agencyid = null;
        this.is_user_employee_Modal=true;
        this.agencyid=item._id;
        this.get_employees_users_who_has_this_agencyid(type);
    }
    get_employees_users_who_has_this_agencyid(type){
        let link = this.serverurl + 'getusers_who_has_this_agencyid';
        let data = {agencyid: this.agencyid,type:type};
        this._http.post(link, data)
            .subscribe(res => {
                let result : any;
                result = res;
                if(result.status=='success'){
                    this.get_users_employees_has_this_agencyid = result.id;
                    console.log('this.get_users_employees_has_this_agencyid');
                    console.log(this.get_users_employees_has_this_agencyid);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    shownumber(allitems,type){
        let j = 0;
        for(let i in allitems){
            if(allitems[i].type==type){
                j++;
            }
        }
        return j;
    }

    getusers(){
        AgencylistComponent.usernames = [];
        let link = this.serverurl + 'getusers';
        let data = {type: 'user'};
        this._http.post(link, data)
            .subscribe(res => {
                this.users = res;
                console.log(this.users);
                for(let i in this.users){
                    if(this.users[i].agencyid==null){
                        AgencylistComponent.usernames.push(this.users[i]);
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    getemployees(){
        AgencylistComponent.employeenames = [];
        let link = this.serverurl + 'getusers';
        let data = {type: 'helpdesk'};
        this._http.post(link, data)
            .subscribe(res => {
                this.employees = res;
                console.log('this.employees');
                console.log(this.employees);
                for(let i in this.employees){
                    if(this.employees[i].agencyid==null){
                        AgencylistComponent.employeenames.push(this.employees[i]);
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    findChoices(searchText: string) {
        let a= [];
        AgencylistComponent.namesearchvalues=[];
        a= AgencylistComponent.usernames.filter(item => item.firstname.toLowerCase().includes(searchText.toLowerCase()));
        for(let i in a){
            AgencylistComponent.namesearchvalues.push({val:a[i].email,label:a[i].firstname + ' '+ a[i].lastname+"("+a[i].email+")"});
        }
        return AgencylistComponent.namesearchvalues;
    }
    getChoiceLabel(choice: any) {
        console.log('choice-----------------');
        console.log(choice);
        let choiceval = choice.val;
        AgencylistComponent.autovalues.push(choice.val);
        //  AgencylistComponent.insert_agency_id_to_user(choiceval);
        return ``;
    }



    findChoices1(searchText: string) {
        // console.log('AgencylistComponent.employeenames');
        //  console.log(AgencylistComponent.employeenames);
        let a= [];
        AgencylistComponent.namesearchvalues=[];
        a= AgencylistComponent.employeenames.filter(item => item.firstname.toLowerCase().includes(searchText.toLowerCase()));
        for(let i in a){
            AgencylistComponent.namesearchvalues.push({val:a[i].email,label:a[i].firstname + ' '+ a[i].lastname+"("+a[i].email+")"});
        }
        //  console.log('AgencylistComponent.namesearchvalues');
        //  console.log(AgencylistComponent.namesearchvalues);
        return AgencylistComponent.namesearchvalues;
    }
    getChoiceLabel1(choice: any) {
        console.log('choice-----------------');
        console.log(choice);
        let choiceval = choice.val;
        AgencylistComponent.autovalues.push(choice.val);
        //  AgencylistComponent.insert_agency_id_to_user(choiceval);
        return ``;
    }




    getuseravl(){
        return AgencylistComponent.autovalues;
    }
    getlengthfval(){
        return AgencylistComponent.autovalues.length;
    }
    removeuser(item){
        let indexval = AgencylistComponent.autovalues.indexOf(item);
        AgencylistComponent.autovalues.splice(indexval, 1);
    }
    manageuser(type){
        console.log(AgencylistComponent.autovalues);
        let link = this.serverurl + 'insert_agency_id_to_user';
        let data = {useremail: AgencylistComponent.autovalues,agencyid: this.agencyid};
        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                console.log(result);
                if(result.status=='success'){
                    AgencylistComponent.autovalues = [];
                    AgencylistComponent.namesearchvalues = [];
                    this.get_employees_users_who_has_this_agencyid(type);
                    this.getagencylist();
                    this.getusers();
                    this.getemployees();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    remove_agencyid_from_this_user(userid){
        let link = this.serverurl+'remove_agencyid';
        let data = {userid: userid};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log('delete_agencyid');
                console.log(result);
                if(this.typeis=='Users'){
                    this.get_employees_users_who_has_this_agencyid('user');
                    this.getagencylist();
                    this.getusers();
                    this.getemployees();
                }
                else{
                    this.get_employees_users_who_has_this_agencyid('helpdesk');
                    this.getagencylist();
                    this.getusers();
                    this.getemployees();
                }
                this.getusers();
                this.getemployees();
            }, error => {
                console.log('Oooops!');
            });
    }
}
