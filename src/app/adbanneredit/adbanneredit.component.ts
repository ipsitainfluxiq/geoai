import { Component, OnInit , NgZone, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-adbanneredit',
  templateUrl: './adbanneredit.component.html',
  styleUrls: ['./adbanneredit.component.css'],
    providers: [Commonservices],
})
export class AdbannereditComponent implements OnInit {
    public emailcookie: CookieService;
    public mailcookiedetails;
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public zone: NgZone;
    public basicOptions: Object;
    public progress: number = 0;
    public response: any = {};
    public uploadedfilesrc: any;
    public imagename: any;
    public id: any;
    public selectedimgheight: any;
    public selectedimgwidth: any;
    public getheight_width: any;
    public showdivforimageupload: any;
    public getimageheight: any;
    public flag: any = 0;
    public getimagewidth: any;
    public imgsizeerror: any = null;

    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService,  private route: ActivatedRoute) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.mailcookiedetails);
    }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.id = params['id'];
          console.log(this.id);
          this.getdetailsofadbanner();
      });
      this.dataForm = this.fb.group({
          adbannername: ['', Validators.required],
          height_width: ['', Validators.required],
          priority: ['', Validators.required],
          status: [''],
          image: [''],
      });

      this.zone = new NgZone({enableLongStackTrace: false});
      this.basicOptions = {
          url: this.serverurl + 'imguploads'
      };
  }
    getdetailsofadbanner() {
        let link = this.serverurl + 'adbannerdetails';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log('result is  -');
                console.log(result);
                console.log(result.status);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    this.imgsizeerror = null;
                    this.showdivforimageupload = true;
                    this.imagename = userdet.image.replace(/"/g, '');
                    this.uploadedfilesrc = '../../assets/uploads/' + userdet.image;
                    console.log(userdet);
                    this.flag = 1;
                    this.getimagewidth = userdet.imgwidth;
                    this.getimageheight = userdet.imgheight;
                    if (userdet.imgwidth == 320 && userdet.imgheight == 50) {
                        this.getheight_width = 1;
                    }
                    if (userdet.imgwidth == 300 && userdet.imgheight == 50) {
                        this.getheight_width = 2;
                    }
                    if (userdet.imgwidth == 216 && userdet.imgheight == 36) {
                        this.getheight_width = 3;
                    }
                    if (userdet.imgwidth == 168 && userdet.imgheight == 28) {
                        this.getheight_width = 4;
                    }
                    if (userdet.imgwidth == 120 && userdet.imgheight == 20) {
                        this.getheight_width = 5;
                    }

                    this.dataForm = this.fb.group({
                        adbannername: [userdet.adbannername, Validators.required],
                        height_width: [this.getheight_width, Validators.required],
                        priority: [userdet.priority, Validators.required],
                        status: [userdet.status],
                        image: [userdet.image],
                    });
                } else {
                    this.router.navigate(['/adbannerlist']);
                }
            }, error => {
                console.log('Ooops');
            });
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
        console.log('this.getimagewidth ' + this.getimagewidth);
        console.log('this.getimageheight ' + this.getimageheight);
        console.log('this.this.selectedimgwidth ' + this.selectedimgwidth);
        console.log('this.this.selectedimgheight ' + this.selectedimgheight);
        if (this.flag == 1) {
          if (this.getimagewidth == this.selectedimgwidth && this.getimageheight == this.selectedimgheight) {
              this.imgsizeerror = null;
          }
          else {
            console.log('here?');
              this.imgsizeerror = 'Image size is not appropriate';
              this.deleteimage(this.imagename);
          }
        }
    }
    dosubmit(formval) {

        if (formval.status == '') {
            formval.status = false;
        }
        formval.image = formval.image.replace(/"/g, '');
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        console.log('this.imgsizeerror' + this.imgsizeerror);
        this.adbannerheightwidth();
        if (this.dataForm.valid && this.imgsizeerror == null) {
            let link = this.serverurl + 'editadbanner';
            let data = {
                id: this.id,
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
        else {
            console.log('validation error');
        }
    }


    handleUpload(data: any): void // uploading the images and saving to particular folder
    {
        this.adbannerheightwidth();
        console.log(this.selectedimgheight);
        console.log('selectedimgwidth - '+this.selectedimgwidth);
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
                let resp1 = JSON.parse(resp);
                // console.log((resp1.imgheight));
                console.log(typeof(resp1));
                if (typeof(resp1) != 'undefined') {
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
                    this.imagename = '';
                    this.progress = 0;
                    this.flag = 0;
                }

            }, error => {
                console.log('Oooops!');
            });


    }

}
