import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-adbannereditnew',
  templateUrl: './adbannereditnew.component.html',
  styleUrls: ['./adbannereditnew.component.css'],
    providers: [Commonservices],
})
export class AdbannereditnewComponent implements OnInit {
    public emailcookie: CookieService;
    public mailcookiedetails;
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public id: any;
    public selectedimgheight: any;
    public putimageval: any;
    public selectedimgwidth: any;
    public getheight_width: any;
    public showdivforimageupload: any;
    public getimageheight: any;
    public flag: any = 0;
    public getimagewidth: any;
    public objectofimage: any;
    public objectofimage1: any;
    public imgsizeerror: any = null;
    options: UploaderOptions;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    public zone: NgZone;
    public basicOptions: Object;

    constructor(fb: FormBuilder, private _http: HttpClient, private router: Router, private _commonservices: Commonservices, emailcookie: CookieService,  private route: ActivatedRoute) {
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log('cookiedetails');
        console.log('get id from saved cookie ->  ' + this.mailcookiedetails);
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
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
            url: this.serverurl + 'imguploads',
            filterExtensions: false,
            allowedExtensions: ['jpg', 'png', 'jpeg']
        };
    }
    getdetailsofadbanner() {
        let link = this.serverurl + 'adbannerdetails';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                // console.log('result is  -');
                //   console.log(result);
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    this.imgsizeerror = null;
                    this.showdivforimageupload = true;
                    //  this.imagename = userdet.image.replace(/"/g, '');
                    // this.uploadedfilesrc = '../../assets/uploads/' + userdet.image;
                    this.objectofimage = {
                        response:
                            {
                                filename : userdet.image,
                                imgheight : userdet.imgheight,
                                imgwidth : userdet.imgwidth
                            }
                    }
                    this.files.push(this.objectofimage);
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
             //   this.deleteimage(this.imagename);
            }
        }
    }
    dosubmit(formval) {
        let img= formval.image;
        console.log('++++++++++++++++');
        console.log(img);
        if (formval.status == '') {
            formval.status = false;
        }
        if (typeof(img) == 'object') {
            this.putimageval = img.response.filename;
        }
        else {
            this.putimageval = img;
        }
        // formval.image = formval.image.replace(/"/g, '');
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        console.log('inside submit');
        console.log('this.imgsizeerror' + this.imgsizeerror);
        this.adbannerheightwidth();
        console.log('this.dataForm');
        console.log(this.dataForm.value);
        console.log('this.imgsizeerror');
        console.log(this.imgsizeerror);

          if (this.dataForm.valid && this.imgsizeerror == null) {
            let link = this.serverurl + 'editadbanner';
            let data = {
                id: this.id,
                adbannername: formval.adbannername,
                imgheight: this.selectedimgheight,
                imgwidth: this.selectedimgwidth,
                priority: formval.priority,
                status: formval.status,
                image: this.putimageval,
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

    onUploadOutput(output: UploadOutput): void {
        this.imgsizeerror = null;
        setTimeout(()=> {
            // alert(8);
            if (output.type === 'allAddedToQueue') { // when all files added in queue
                // uncomment this if you want to auto upload files when added
                setTimeout(()=> {
                    const event: UploadInput = {
                        type: 'uploadAll',
                        url: this.serverurl + 'imguploads',
                        method: 'POST',
                        // data: {foo: output.file}
                    };
                    this.uploadInput.emit(event);

                },200);
            } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added

                setTimeout(()=> {    // <<<---    using ()=> syntax
                    console.log(output.file);
                    setTimeout(()=> {
                        if (output.file.response != '') {
                          //  this.uploadedimgheight = output.file.response.imgheight;
                          //  this.uploadedimgwidth = output.file.response.imgwidth;
                            this.flag=1;
                            this.getimagewidth = output.file.response.imgwidth;
                            this.getimageheight = output.file.response.imgheight;
                            if (output.file.response.imgheight == this.selectedimgheight && output.file.response.imgwidth == this.selectedimgwidth) {
                                this.files = [];
                                this.files.push(output.file);
                                console.log('this.files');
                                console.log(this.files);
                                console.log(this.files[0].name);
                                console.log('this.files[0].response');
                                console.log(this.files[0].response);
                                // this.dataForm.patchValue({image: this.files[0].response.filename});
                                this.dataForm.patchValue({image: this.files[0]});
                                console.log('this.dataForm.value_____________');
                                console.log(this.dataForm.value);

                            }
                            else {
                                console.log('image size is not proper');
                                this.imgsizeerror = 'Image size is not appropriate';
                                this.deleteimage1(0, output.file.response.filename);
                            }
                        }
                    }, 500);
                }, 300);
            }/* else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
                // alert(9);
                console.log(this.files);
                // update current data in files array for uploading file
                const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
                this.files[index] = output.file;
            }*/ else if (output.type === 'removed') {
                // remove file from array when removed
                this.files = this.files.filter((file: UploadFile) => file !== output.file);
            } else if (output.type === 'dragOver') {
                this.dragOver = true;
            } else if (output.type === 'dragOut') {
                this.dragOver = false;
            } else if (output.type === 'drop') {
                this.dragOver = false;
            }
            /*console.log('files??');
            console.log(this.files);*/
        }, 200);
    }


    startUpload(): void {
        const event: UploadInput = {
            type: 'uploadAll',
            url: 'http://ngx-uploader.com/upload',
            method: 'POST',
            data: { foo: 'bar' }
        };

        this.uploadInput.emit(event);
    }

    deleteimage1(counter: any, imagename) {
        this.files.splice(counter, 1);
        var link = this.serverurl + 'deleteimage';
        var data = {id: '', image: imagename};
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                if (result.status == 'success') {
                    console.log('Image Deleted');
                 //   this.uploadedfilesrc = '';
                 //   this.progress = 0;
                }

            }, error => {
                console.log('Oooops!');
            });


    }
}
