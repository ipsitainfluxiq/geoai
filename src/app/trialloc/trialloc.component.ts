import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-trialloc',
  templateUrl: './trialloc.component.html',
  styleUrls: ['./trialloc.component.css'],
    providers: [Commonservices]
})
export class TriallocComponent implements OnInit {
    public datalist: any;
    public serverurl: any;
    public selected_locations: any;
    public count: any;

  constructor(private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
      this.serverurl = _commonservices.url;
      this.getLocation();
  }

  ngOnInit() {

  }
    getLocation() {
        let link = this.serverurl + 'locationlist';
        let data = {
            parentid: 0,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                this.datalist = result;
                console.log('this.datalist*************************');
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }
}
