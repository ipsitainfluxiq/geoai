import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-adbanneradd',
  templateUrl: './adbanneradd.component.html',
  styleUrls: ['./adbanneradd.component.css'],
    providers: [Commonservices],
})
export class AdbanneraddComponent implements OnInit {
    public emailcookie: CookieService;
    public mailcookiedetails;
    public dataForm: FormGroup;
    public fb;
    public passmatchvalidate;
    public serverurl;
    public zone: NgZone;
    public basicOptions: Object;
    public progress: number = 0;
    public response: any = {};
    public uploadedfilesrc: any;
    public imagename: any;
    public selectedimgheight: any;
    public selectedimgwidth: any;
    public showdivforimageupload: any;
    public imgsizeerror: any = null;

    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.mailcookiedetails);
    }

    ngOnInit() {
        this.passmatchvalidate = false;
        this.dataForm = this.fb.group({
            adbannername: ['', Validators.required],
            height_width: ['', Validators.required],
            priority: ['', Validators.required],
            status: [''],
            image: [''],
        });

        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url: this.serverurl + 'imguploads',
            filterExtensions: false,
            fieldReset: false,
            //allowedExtensions: ['image/png', 'image/jpg'],
            calculateSpeed: true
        };
    }
    adbannerheightwidth() {
      console.log(this.dataForm.value.height_width);
      if (this.dataForm.value.height_width == 1) {
        this.selectedimgheight = 50;
        this.selectedimgwidth = 320;
      }
      if (this.dataForm.value.height_width == 2) {
        this.selectedimgheight = 50;
        this.selectedimgwidth = 300;
      }
      if (this.dataForm.value.height_width == 3) {
        this.selectedimgheight = 36;
        this.selectedimgwidth = 216;
      }
      if (this.dataForm.value.height_width == 4) {
        this.selectedimgheight = 28;
        this.selectedimgwidth = 168;
      }
      if (this.dataForm.value.height_width == 5) {
        this.selectedimgheight = 20;
        this.selectedimgwidth = 120;
      }
      this.showdivforimageupload = true;
    }

    handleUpload(data: any): void // uploading the images and saving to particular folder
    {
      this.imgsizeerror = null;
        console.log('hi');
        console.log(data);
        this.zone.run(() => {
            this.response = data;
            this.progress = data.progress.percent;
            console.log(data.progress.percent);
            if (data.progress.percent == 100) {
                let resp = data.response;
                console.log('resp-----');
                console.log((resp));

                this.dataForm.patchValue({image1: ''});
                //angular.element("#control").value = "";
               // console.log((resp1.imgheight));
                //console.log(typeof(resp1));
                if (typeof(resp) != 'undefined') {
                    let resp1 = JSON.parse(resp);
                   // let result = (data.response);
                   // console.log('result');
                   // console.log(result);
                    console.log('inside');
                    console.log(resp1);
                    if (resp1.filename != 'undefined') {

                      if (resp1.imgheight == this.selectedimgheight && resp1.imgwidth == this.selectedimgwidth) {
                        // this.dataForm.patchValue({image: result.filename});
                        this.dataForm.patchValue({image: resp1.filename});
                        this.uploadedfilesrc = 'assets/uploads/' + resp1.filename.replace(/"/g, '');
                        console.log('upload file location' + this.uploadedfilesrc);
                        this.imagename = resp1.filename.replace(/"/g, '');
                        console.log('imagename');
                        console.log(this.imagename);
                      }
                      else {
                        console.log('image size is not proper');
                        this.imgsizeerror = 'Image size is not appropriate';
                          this.imagename = resp1.filename.replace(/"/g, '');
                          this.deleteimage(this.imagename);
                      }
                    }
                }
            }
        });
    }
    deleteimage(imagename: any) {
        console.log(imagename);
        var link = this.serverurl + 'deleteimage';
        // var link ='http://influxiq.com:3001/deleteimage';
        var data = {id: '', image: imagename};
        // console.log(data);

        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                // var result = res;

                if (result.status == 'success') {
                    console.log('Image Deleted');
                    this.uploadedfilesrc = '';
                    this.progress = 0;
                  //  this.is_error = 1;
                }

            }, error => {
                console.log('Oooops!');
            });


    }
    dosubmit(formval) {

        if(formval.status==''){
            formval.status = false;
        }
        formval.image = formval.image.replace(/"/g, '');
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        if (this.dataForm.valid && this.imgsizeerror == null) {
            let link = this.serverurl + 'adbanneradd';
            let data = {
                adbannername: formval.adbannername,
                imgheight: this.selectedimgheight,
                imgwidth: this.selectedimgwidth,
                priority: formval.priority,
                status: formval.status,
                image: formval.image,
                addedby: this.mailcookiedetails
            };
            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    this.router.navigate(['/adbannerlist']);
                }, error => {
                    console.log('Oooops!');
                });
        }
        else{
            console.log('validation error');
        }
    }


}