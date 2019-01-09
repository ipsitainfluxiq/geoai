import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from "../app.commonservices";
import {CookieService} from 'ngx-cookie-service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [Commonservices]
})
export class TestComponent implements OnInit {

  public serverurl;
  public users;
  public searchval;
  public showusersearch;
  public usernames: any;
  public filterlist: any;
  public selecteduserlist: any=[];

  constructor(private _commonservices: Commonservices,  private _http: HttpClient, private router: Router) {
    this.serverurl = _commonservices.url;
     this.usernames = [];
      let link = this.serverurl + 'getusers';
      let data = {type: 'user'};
      this._http.post(link, data)
          .subscribe(res => {
            this.users = res;
            console.log(this.users);
          }, error => {
            console.log('Oooops!');
          });
  }

  ngOnInit() {
  }

  addusers(event:any){
    this.filterlist=[];
    console.log('event');
    console.log(event);
    for(let c in this.users){
      if(this.users[c].email!=null && this.users[c].email.toLowerCase().indexOf(event.target.value.toLowerCase())>-1){
        this.filterlist.push(this.users[c]);
      }else if(this.users[c].firstname!=null && this.users[c].firstname.toLowerCase().indexOf(event.target.value.toLowerCase())>-1){
        this.filterlist.push(this.users[c]);
      }else if(this.users[c].lastname!=null && this.users[c].lastname.toLowerCase().indexOf(event.target.value.toLowerCase())>-1){
        this.filterlist.push(this.users[c]);
      }
    }
    let valLength:any;
    valLength = event.target.value.length;
    if(valLength > 0){
      this.showusersearch = 1;
    }else {
      this.showusersearch = 0;
    }

    console.log('this.filterlist');
    console.log(this.filterlist);
    console.log(event.target.value);
  }
  selecteduser(item){
    this.selecteduserlist.push(item);
  }
  removeuser(item){
    let indexval = this.selecteduserlist.indexOf(item);
    console.log(indexval);
    this.selecteduserlist.splice(indexval , 1);
    console.log(this.selecteduserlist);
  }
}