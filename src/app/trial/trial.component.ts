import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl,FormControl} from '@angular/forms';
declare var $: any;
declare var google: any;
import {Commonservices} from '../app.commonservices' ;
import * as moment from 'moment';
@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css'],
    providers: [Commonservices],
})
export class TrialComponent implements OnInit {
  /*public addcookie: CookieService;
  public cookiedetails;*/
 /*   public flightPath;
    public map;
    public stdt;
    public serverurl;*/
    public dataForm: FormGroup;
    public es;
    public is_error;
  constructor(private _http: HttpClient, private router: Router, private _commonservices: Commonservices, es: FormBuilder) {
      this.es = es;
   /* this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log('get id from saved cookie ->  '+this.cookiedetails);*/
    //  this.serverurl = _commonservices.url;
     // this.getdateist();

  }

  ngOnInit() {
      this.dataForm = this.es.group({
          fname: ['', Validators.required],
          lname: ['', Validators.required],
          email: ['', Validators.compose([Validators.required, TrialComponent.customValidator])],
          username:['',Validators.required],
          password:['',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15)])],
          confirmPassword:['',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(15),
              this.equalToPass('password')
          ])],
          address: ["",Validators.required],
          telephoneno: ["", Validators.required],
          mobileno: ["", Validators.required]
      });
 /*     this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: 0, lng: -180},
          mapTypeId: 'terrain'
      });

      var flightPathCoordinates = [
          {lat: 37.772, lng: -122.214},
          {lat: 21.291, lng: -157.821},
          {lat: -18.142, lng: 178.431},
          {lat: -27.467, lng: 153.027}
      ];
      this.flightPath = new google.maps.Polyline({
          path: flightPathCoordinates,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
      });

      this.addLine();*/

  }


    equalToPass(fieldname): ValidatorFn {                                 //password match custom function
        return (control: AbstractControl): { [key: string]: any } => {
            let input = control.value;
            console.log('control.value');
            console.log(control.value);
            console.log(control.root.value[fieldname]);
            let isValid = control.root.value[fieldname] == input;
            console.log('isValid');
            console.log(isValid);
            if (!isValid)
                return{
                    equalTo:true            //this value will be called
                };
        };
    }
    static customValidator(inputEmail): any{
        console.log('inputEmail');
        console.log(inputEmail);
        if(inputEmail.pristine){
            return null;
        }
        inputEmail.markAsTouched();
        let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        console.log( String(inputEmail.value).search (filter) != -1);
        if(String(inputEmail.value).search (filter) == -1){
            console.log('valid');
            return{
                invalidEmail:true
            };
        }
    }
  show(){
/*    $('#calender').datepicker();*/
  }

   /* addLine() {
        this.flightPath.setMap(this.map);
    }
*/
  /*  removeLine() {
        this.flightPath.setMap(null);
    }*/
  /*  sub(){
        let link = this.serverurl + 'adddate';
      //  YYYY-MM-DD hh:mm:ss
        this.stdt = moment(this.stdt).format('YYYY-MM-DD hh:mm:ss');
        let data = {
            startdate: this.stdt
        };

        this._http.post(link, data)
            .subscribe(res => {
            }, error => {
                console.log('Oooops!');
            });
    }*/

  /*  getdateist() {
        let link = this.serverurl + 'datelist';
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result);
                this.stdt = result.res.startdate;
            }, error => {
                console.log('Oooops!');
            });
    }*/
    dosubmit(formval) {
        console.log(formval);
        console.log(formval.fname);
        console.log(formval.lname);
        console.log(formval.email);
        console.log(formval.password);
        console.log(formval.confirmPassword);
        console.log(formval.address);
        console.log(formval.telephoneno);
        console.log(formval.mobileno);

        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
            console.log(this.dataForm.controls[x].valid);
        }
        console.log("this.dataForm.value");
        console.log(this.dataForm.value);
        console.log("this.dataForm.valid");
        console.log(this.dataForm.valid);

    }
}
