import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-helpdesklist',
  templateUrl: './helpdesklist.component.html',
  styleUrls: ['./helpdesklist.component.css'],
    providers: [Commonservices],
})
export class HelpdesklistComponent implements OnInit {
    public fb;
    public datalist;
    public id;
    orderbyquery: any;
    orderbytype: any;
    public isModalShown: boolean = false;
    public serverurl;
    public list_length;
    public p: number = 1;

    constructor(fb: FormBuilder, private _http: HttpClient,  private router: Router, private _commonservices: Commonservices) {
        this.fb = fb;
        this.orderbyquery = 'firstname';
        this.orderbytype = 1;
        this.serverurl = _commonservices.url;
        this.gethelpdesklist();
    }

    ngOnInit() {
    }
    gethelpdesklist() {
        let link = this.serverurl + 'helpdesklist';
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
        console.log(this.isModalShown);
    }

    onHidden() {
        this.isModalShown = false;
    }

    hepdeskdel() {
        console.log('hepdeskdel');
        this.isModalShown = false;
        console.log('id got' + this.id);
        let link = this.serverurl+'deleteadmin';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                console.log(result);
                console.log('Data Deleted');
            }, error => {
                console.log('Oooops!');
            });
        setTimeout(() => {
            this.gethelpdesklist();
        }, 300);
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

}