import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-adminedit',
  templateUrl: './adminedit.component.html',
  styleUrls: ['./adminedit.component.css'],
    providers: [Commonservices],
})
export class AdmineditComponent implements OnInit {
    public dataForm: FormGroup ;
    public fb;
    public isSubmit;
    id: number;
    public serverurl;


    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getdetails();
        });

        this.isSubmit = false;

        this.dataForm = this.fb.group({
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
                    this.router.navigate(['/adminlist']);
                }
            }, error => {
                console.log('Ooops');
            });
    }

    dosubmit(formval) {
        this.isSubmit = true;
        if (this.dataForm.valid) {
            let link= this.serverurl + 'editadmin';
            let data = {id: this.id, firstname: formval.firstname, lastname: formval.lastname, email: formval.email, password: formval.password
                /*phone: formval.phone, address: formval.address, city: formval.city, state: formval.state, zip: formval.zip*/
            };
            console.log(data);
            this._http.post(link, data)
                .subscribe(data => {
                    this.router.navigate(['/adminlist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
}