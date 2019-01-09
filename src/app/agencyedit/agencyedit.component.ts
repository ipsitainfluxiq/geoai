import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;


@Component({
  selector: 'app-agencyedit',
  templateUrl: './agencyedit.component.html',
  styleUrls: ['./agencyedit.component.css'],
  providers: [Commonservices],
})
export class AgencyeditComponent implements OnInit {

  public dataForm: FormGroup ;
  public eb;
  public isSubmit;
  id: number;
  public serverurl;


  constructor(eb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {

    this.eb=eb;
    this.serverurl=_commonservices.url;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.getdetails();
    });

    this.isSubmit = false;

    this.dataForm = this.eb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      /*  address: ['', Validators.required],
       city: ['', Validators.required],
       state: ['', Validators.required],
       zip: ['', Validators.required],
       phone: ['', Validators.required],
       */
    });
  }

  getdetails() {
    let link = this.serverurl + 'details';
    let data = {_id : this.id};
    this._http.post(link, data)
        .subscribe(res => {
          let result: any;
          result = res;
          console.log(result);
          console.log(result.status);
          if (result.status == 'success' && typeof(result.item) != 'undefined') {
            // console.log(result);
            let userdet = result.item;
            (<FormControl>this.dataForm.controls['firstname']).setValue(userdet.firstname);
            (<FormControl>this.dataForm.controls['lastname']).setValue(userdet.lastname);
            (<FormControl>this.dataForm.controls['email']).setValue(userdet.email);
            /* (<FormControl>this.dataForm.controls['phone']).setValue(userdet.phone);
             (<FormControl>this.dataForm.controls['address']).setValue(userdet.address);
             (<FormControl>this.dataForm.controls['city']).setValue(userdet.city);
             (<FormControl>this.dataForm.controls['state']).setValue(userdet.state);
             (<FormControl>this.dataForm.controls['zip']).setValue(userdet.zip);*/
          }else {
            this.router.navigate(['/agencylist']);
          }
        }, error => {
          console.log('Ooops');
        });
  }

  dosubmit(formval) {
    this.isSubmit = true;
    if (this.dataForm.valid) {
      let link= this.serverurl + 'editagency';
      let data = {id: this.id, firstname: formval.firstname, lastname: formval.lastname
        /*phone: formval.phone, address: formval.address, city: formval.city, state: formval.state, zip: formval.zip*/
      };
      console.log(data);
      this._http.post(link, data)
          .subscribe(data => {
            this.router.navigate(['/agencylist']);
          }, error => {
            console.log('Oooops!');
          });
    }
  }

}
