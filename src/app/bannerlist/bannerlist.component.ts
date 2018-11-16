import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
declare  var $;
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-bannerlist',
    templateUrl: './bannerlist.component.html',
    styleUrls: ['./bannerlist.component.css'],
    providers: [Commonservices],
})

export class BannerlistComponent implements OnInit {
    public modalmapShown: boolean = false;
    public modaldeletedbanner: boolean = false;
    public modalconfirmdeletedbanner: boolean = false;
    public divnumber;
    public ad_text;
    public ad_text1;
    public ad_bannertext;
    public ad_btn;
    public ad_text_main;
    public ad_text1_main;
    public ad_img_main;
    public ad_img1_main;
    public ad_btn_main;
    options: UploaderOptions;
    files: UploadFile[];
    files1: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    private zone: NgZone;
    public basicOptions: Object;
    public serverurl;
    public divfortitle:any =false;
    public emailcookie: CookieService;
    public alldetailcookie: CookieService;
    public mailcookiedetails;
    public mybanners;
    public deletebannerid;
    public editbannerid;
    public editflag = 0;
    public cookiedetailsforalldetails_type;
    public checkboxvalue = [];
    public checkboxarr = [];
    public selectallmybanners = false;
    public p: number = 1;

    constructor(private _commonservices: Commonservices, emailcookie: CookieService, private _http: HttpClient, private router: Router, alldetailcookie: CookieService) {
        this.serverurl = _commonservices.url;
        this.files = []; // local uploading files array
        this.files1 = [];
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
        this.emailcookie = emailcookie ;
        this.alldetailcookie = alldetailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
        if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){
            this.getbanners();
        }
        else{
        this.getbannersbyemail();
        }
    }

    ngOnInit() {
    }

    getbannersbyemail(){
        let link = this.serverurl + 'getbannersbyemail';
        let data = {
            email: this.mailcookiedetails,
            page: 'bannerlist'
        };
        this._http.post(link, data)
            .subscribe(res => {
                this.mybanners = res;
                console.log(this.mybanners);
            }, error => {
                console.log('Oooops!');
            });
    }
    getbanners(){
        let link = this.serverurl + 'getbanners';
        let data = {
            page: 'bannerlist'
        }
        this._http.post(link,data)
            .subscribe(res => {
                this.mybanners = res;
                console.log(this.mybanners);
            }, error => {
                console.log('Oooops!');
            });
    }
    callduplicate(val){
        this.divnumber = val;
        this.modalmapShown = true;
        setTimeout(() => {
            $('#showbannerinmodal').append($('#bannermainblock'+val).html());
            $('#showhtmlinmodal').append($('#bannerlistsingleinfo'+val).html());

            $('#showbannerinmodal .bannermainblock'+val+'img').addClass('editableimg');
            $('#showbannerinmodal .bannermainblock'+val+'img2').addClass('editableimg2');
            $('#showbannerinmodal .bannermainblock'+val+'txt').addClass('editabletxt');
            $('#showbannerinmodal .bannermainblock'+val+'btn').addClass('editablebtn');

            $('#showbannerinmodal .bannermainblock'+val+'btn').click( function() {
                console.log('click btn');
                $( ".updatetext" ).addClass( "hide" );
                $( ".updateimg" ).addClass( "hide" );
                $( ".updateimg2" ).addClass( "hide" );
                $( ".updatetext2" ).addClass( "hide" );
                $( ".updatebtn" ).removeClass( "hide" );
            });

            $('#showbannerinmodal .bannermainblock'+val+'img').click( function() {
                console.log('click img');
                $( ".updatetext" ).addClass( "hide" );
                $( ".updatebtn" ).addClass( "hide" );
                $( ".updateimg2" ).addClass( "hide" );
                $( ".updatetext2" ).addClass( "hide" );
                $( ".updateimg" ).removeClass( "hide" );
            });

            $('#showbannerinmodal .bannermainblock'+val+'img2').click( function() {
                console.log('click img2');
                $( ".updatetext" ).addClass( "hide" );
                $( ".updatebtn" ).addClass( "hide" );
                $( ".updateimg" ).addClass( "hide" );
                $( ".updatetext2" ).addClass( "hide" );
                $( ".updateimg2" ).removeClass( "hide" );
            });

            $('#showbannerinmodal .bannermainblock'+val+'txt').click( function() {
                console.log('click txt');
                $( ".updatebtn" ).addClass( "hide" );
                $( ".updateimg" ).addClass( "hide" );
                $( ".updateimg2" ).addClass( "hide" );
                $( ".updatetext2" ).addClass( "hide" );
                $( ".updatetext" ).removeClass( "hide" );
            });

            $('#showbannerinmodal .bannermainblock'+val+'txt2').click( function() {
                console.log('click txt2');
                $( ".updatebtn" ).addClass( "hide" );
                $( ".updateimg" ).addClass( "hide" );
                $( ".updatetext" ).addClass( "hide" );
                $( ".updateimg2" ).addClass( "hide" );
                $( ".updatetext2" ).removeClass( "hide" );
            });
        },500);
    }
    getbannerstructure1(type,i,item){
        /*Get the structire of the block*/
        $('#showbannersinmodal'+i).append($('#bannermainblock'+type).html());
        $('#showhtmlsinmodal'+i).append($('#bannerlistsingleinfo'+type).html());
        setTimeout(() => {
        /*replace the structure elements with saved database values*/
        if(item.editablearea_1!=null && item.editablearea_1 !=''){
            $('#showbannersinmodal'+i+' .bannermainblock'+type+'txt').empty();
            $('#showbannersinmodal'+i+' .bannermainblock'+type+'txt').append(item.editablearea_1);
        }
        if(item.editablearea_2!=null && item.editablearea_2 !=''){
            console.log('----------------------------start-----------------------------');
            console.log($('#showbannersinmodal2 .bannermainblock2btn').text());
            $('#showbannersinmodal'+i+' .bannermainblock'+type+'btn').empty();
            $('#showbannersinmodal'+i+' .bannermainblock'+type+'btn').append(item.editablearea_2);
            console.log($('#showbannersinmodal'+i+' .bannermainblock'+type+'btn').text());
            console.log('---------------------end----------------');
        }
        if(item.editablearea_3!=null && item.editablearea_3 !=''){
            var imgpath = '../../assets/uploads/' + item.editablearea_3;
            var imgclass  = 'bannermainblock' + type + 'img';
            $('#showbannersinmodal'+i+' .bannermainblock'+type+'img').remove();
            $('#showbannersinmodal'+i+' .bannermainblock'+type).append("<img src="+imgpath+" class="+imgclass+">");
        }
        if(item.editablearea_4!=null && item.editablearea_4 !=''){
            var imgpath1 = '../../assets/uploads/' + item.editablearea_4;
            var imgclass1  = 'bannermainblock' + type + 'img2';
            $('#showbannersinmodal'+i+' .bannermainblock'+type+'img2').remove();
            $('#showbannersinmodal'+i+' .bannermainblock'+type).append("<img src="+imgpath1+" class="+imgclass1+">");
        }
        if(item.editablearea_5!=null && item.editablearea_5 !=''){
            $('#showbannersinmodal'+i+' .bannermainblock'+type+'txt2').empty();
            $('#showbannersinmodal'+i+' .bannermainblock'+type+'txt2').append(item.editablearea_5);
        }
        $('#showhtmlsinmodal'+i).empty();
        $('#showhtmlsinmodal'+i).append(item.banner_title);
    },500);
    }

    onUploadOutput(type,output: UploadOutput): void {
        //  setTimeout(() => {
        // alert(8);
        if (output.type === 'allAddedToQueue') { // when all files added in queue
            // uncomment this if you want to auto upload files when added
            const event: UploadInput = {
                type: 'uploadAll',
                url: this.serverurl + 'uploads',
                method: 'POST'
            };
            this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
            if (output.file.response != "") {
                if(type==1){
                    this.files = [];
                    this.files.push(output.file);
                }
                if(type==2){
                    this.files1 = [];
                    this.files1.push(output.file);
                }
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            //  console.log(this.files);
            // update current data in files array for uploading file
            //  const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            //  this.files[index] = output.file;
        } else if (output.type === 'removed') {
            // remove file from array when removed
            if(type==1){
                this.files = this.files.filter((file: UploadFile) => file !== output.file);
            }   if(type==2){
                this.files1 = this.files1.filter((file: UploadFile) => file !== output.file);
            }
        }
        else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
        if(type==1) {
            console.log('files??');
            console.log(this.files);
        }
        if(type==2) {
            console.log('files1??');
            console.log(this.files1);
        }

    }

    updateadvettise(type){
        this.ad_text_main = this.ad_text;
        this.ad_btn_main = this.ad_btn;
        this.ad_text1_main = this.ad_text1;
console.log(type);
        if(type==1){
            $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt').empty();
            $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt').append(this.ad_text);
            this.ad_text = null;
            $( ".updatetext" ).addClass( "hide" );
        }
        if(type==2){
            console.log('inside 2');
            console.log(this.ad_btn);
            console.log('#showbannerinmodal .bannermainblock'+this.divnumber+'btn');
            console.log($('#showbannerinmodal .bannermainblock'+this.divnumber+'btn').text());
            $('#showbannerinmodal .bannermainblock'+this.divnumber+'btn').empty();
            $('#showbannerinmodal .bannermainblock'+this.divnumber+'btn').append(this.ad_btn);
            console.log($('#showbannerinmodal .bannermainblock'+this.divnumber+'btn').text());
            this.ad_btn = null;
            $( ".updatebtn" ).addClass( "hide" );
        }
        if(type==3){
            var imgpath = '../../assets/uploads/' + this.files[0].response.generatedName;
            var imgclass  = 'bannermainblock' + this.divnumber + 'img';
            $('#showbannerinmodal .bannermainblock'+this.divnumber+'img').remove();
            $('#showbannerinmodal .bannermainblock'+this.divnumber).append("<img src="+imgpath+" class="+imgclass+">" );
        }
        if(type==4){
            var imgpath1 = '../../assets/uploads/' + this.files1[0].response.generatedName;
            var imgclass1  = 'bannermainblock' + this.divnumber + 'img2';
            $('#showbannerinmodal .bannermainblock'+this.divnumber+'img2').remove();
            $('#showbannerinmodal .bannermainblock'+this.divnumber).append("<img src="+imgpath1+" class="+imgclass1+">" );
        }
        if(type==5){
            $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt2').empty();
            $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt2').append(this.ad_text1);
            this.ad_text1 = null;
            $( ".updatetext2" ).addClass( "hide" );
        }
    }

    onHidden() {
        this.modalmapShown = false;
        this.modalconfirmdeletedbanner = false;
        this.modaldeletedbanner = false;
        this.files = [];
        this.editflag = 0;
    }
    highlighteditfunc(){
        var divimg = 'bannermainblock'+this.divnumber+'img';
        var divtxt = 'bannermainblock'+this.divnumber+'txt';
        var divbtn = 'bannermainblock'+this.divnumber+'btn';
        var divbtn2 = 'bannermainblock'+this.divnumber+'img2';
        var divtxt2 = 'bannermainblock'+this.divnumber+'txt2';

        $('#showbannerinmodal .'+divimg).addClass('editable');
        $('#showbannerinmodal .'+divtxt).addClass('editable');
        $('#showbannerinmodal .'+divbtn).addClass('editable');
        $('#showbannerinmodal .'+divbtn2).addClass('editable');
        $('#showbannerinmodal .'+divtxt2).addClass('editable');
        $('.editable').css('border','1px solid red');
    }
    gettitleBanner(){
        this.divfortitle = true;
        $('.button1').addClass('hide');
        $('.button2').removeClass('hide');
    }
    savebanner(){
        if(this.ad_text==null){
          //  this.ad_text_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt').text();
            this.ad_text_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt').text();
        }
        if(this.ad_btn==null){
            this.ad_btn_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'btn').text();
        }
        if(this.files.length==0){
            this.ad_img_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'img').attr('src');
            var pieces = this.ad_img_main.split(/[\s/]+/);
            this.ad_img_main = pieces[pieces.length-1];
        }
        else{
            this.ad_img_main = this.files[0].response.generatedName;
        }

        if(this.files1.length==0){
            this.ad_img1_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'img2').attr('src');
            if(this.ad_img1_main != null){ // if bannermainblock1img2 class is available then split
                var pieces = this.ad_img1_main.split(/[\s/]+/);
                this.ad_img1_main = pieces[pieces.length-1];
            }
        }
        else{
            this.ad_img1_main = this.files1[0].response.generatedName;
        }
        if(this.ad_text1==null){
            this.ad_text1_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt2').text();
        }

        let link = this.serverurl + 'addbanner';
        let data = {
            banner_type: this.divnumber,
            banner_title: this.ad_bannertext,
            editablearea_1: this.ad_text_main,
            editablearea_2: this.ad_btn_main,
            editablearea_3: this.ad_img_main,
            editablearea_4: this.ad_img1_main,
            editablearea_5: this.ad_text1_main,
            added_by: this.mailcookiedetails,
            added_by_fname: this.alldetailcookie.get('fname'),
            added_by_lname: this.alldetailcookie.get('lname'),
            status: 3, //pending
        };
        console.log(data);
        //let random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        let random =  Math.floor(Math.random() * (100 - 1 )) + 1;
        this._http.post(link, data)
            .subscribe(res => {
                console.log('kkkkkkkk');
               // this.router.navigate(['/bannerlist',random]);
                console.log(this.modalmapShown);
                this.modalmapShown = false;
                console.log(this.modalmapShown);
                this.divfortitle = false;
                this.ad_bannertext = null;
                if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){
                    this.getbanners();
                }
                else{
                    this.getbannersbyemail();
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    calltop(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    confirmdeletebanner(id) {
        this.modalconfirmdeletedbanner = true;
        this.deletebannerid = id;
    }

    deletebanner(){
        let link = this.serverurl + 'deletebanner';
        let data = {
            id:  this.deletebannerid
        };

        this._http.post(link, data)
            .subscribe(res => {
                console.log('?????');
                console.log(res);
                if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){
                    this.getbanners();
                }
                else{
                    this.getbannersbyemail();
                }
                this.modalconfirmdeletedbanner = false;
                this.modaldeletedbanner = true;
                setTimeout(() => {
                    this.modaldeletedbanner = false;
                },500);

            }, error => {
                console.log('Oooops!');
            });
    }
    editbanner(id){
        this.editflag = 1;
        console.log(id);
        this.editbannerid = id;
        let link = this.serverurl +'getbannerdetails';
        let data = {
            id: id
        }
        this._http.post(link, data)
            .subscribe(res =>{
                let result: any;
                result = res;
                console.log(result);
                console.log(result.item.banner_type);
                this.divnumber = result.item.banner_type;
                this.modalmapShown = true;
                setTimeout(() => {
                    $('#showbannerinmodal').append($('#bannermainblock'+result.item.banner_type).html());
                    $('#showhtmlinmodal').append($('#bannerlistsingleinfo'+result.item.banner_type).html());
                    if(result.item.editablearea_1!=null && result.item.editablearea_1 !=''){
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'txt').empty();
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'txt').append(result.item.editablearea_1);
                    }
                    if(result.item.editablearea_2!=null && result.item.editablearea_2 !=''){
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'btn').empty();
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'btn').append(result.item.editablearea_2);
                    }
                    if(result.item.editablearea_3!=null && result.item.editablearea_3 !=''){
                        console.log('==============');
                        console.log(result.item.editablearea_3);
                        var imgpath = '../../assets/uploads/' + result.item.editablearea_3;
                        var imgclass  = 'bannermainblock' + result.item.banner_type + 'img';
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'img').remove();
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type).append("<img src="+imgpath+" class="+imgclass+">");
                    }
                    if(result.item.editablearea_4!=null && result.item.editablearea_4 !=''){
                        var imgpath1 = '../../assets/uploads/' + result.item.editablearea_4;
                        var imgclass1  = 'bannermainblock' + result.item.banner_type + 'img2';
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'img2').remove();
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type).append("<img src="+imgpath1+" class="+imgclass1+">");
                    }
                    if(result.item.editablearea_5!=null && result.item.editablearea_5 !=''){
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'txt2').empty();
                        $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'txt2').append(result.item.editablearea_5);
                    }
                    $('#showhtmlinmodal').empty();
                    $('#showhtmlinmodal').append(result.item.banner_title);

                    /*EDIT START*/
                    $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'btn').click( function() {
                        console.log('click btn');
                        $( ".updatetext" ).addClass( "hide" );
                        $( ".updateimg" ).addClass( "hide" );
                        $( ".updateimg2" ).addClass( "hide" );
                        $( ".updatetext2" ).addClass( "hide" );
                        $( ".updatebtn" ).removeClass( "hide" );
                    });
                    $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'img').click( function() {
                        console.log('click img');
                        $( ".updatetext" ).addClass( "hide" );
                        $( ".updatebtn" ).addClass( "hide" );
                        $( ".updateimg2" ).addClass( "hide" );
                        $( ".updatetext2" ).addClass( "hide" );
                        $( ".updateimg" ).removeClass( "hide" );
                    });

                    $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'img2').click( function() {
                        console.log('click img2');
                        $( ".updatetext" ).addClass( "hide" );
                        $( ".updatebtn" ).addClass( "hide" );
                        $( ".updateimg" ).addClass( "hide" );
                        $( ".updatetext2" ).addClass( "hide" );
                        $( ".updateimg2" ).removeClass( "hide" );
                    });

                    $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'txt').click( function() {
                        console.log('click txt');
                        $( ".updatebtn" ).addClass( "hide" );
                        $( ".updateimg" ).addClass( "hide" );
                        $( ".updateimg2" ).addClass( "hide" );
                        $( ".updatetext2" ).addClass( "hide" );
                        $( ".updatetext" ).removeClass( "hide" );
                    });

                    $('#showbannerinmodal .bannermainblock'+result.item.banner_type+'txt2').click( function() {
                        console.log('click txt2');
                        $( ".updatebtn" ).addClass( "hide" );
                        $( ".updateimg" ).addClass( "hide" );
                        $( ".updatetext" ).addClass( "hide" );
                        $( ".updateimg2" ).addClass( "hide" );
                        $( ".updatetext2" ).removeClass( "hide" );
                    });
                },500);

            },error => {
                console.log('Oooops!');
            });
    }
    updateBanner(){
        if(this.ad_text==null){
            this.ad_text_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt').text();
        }
        if(this.ad_btn==null){
            this.ad_btn_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'btn').text();
        }
        if(this.files.length==0){
            this.ad_img_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'img').attr('src');
            var pieces = this.ad_img_main.split(/[\s/]+/);
            this.ad_img_main = pieces[pieces.length-1];
        }
        else{
            this.ad_img_main = this.files[0].response.generatedName;
        }

        if(this.files1.length==0){
            this.ad_img1_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'img2').attr('src');
            if(this.ad_img1_main != null){ // if bannermainblock1img2 class is available then split
                var pieces = this.ad_img1_main.split(/[\s/]+/);
                this.ad_img1_main = pieces[pieces.length-1];
            }
        }
        else{
            this.ad_img1_main = this.files1[0].response.generatedName;
        }
        if(this.ad_text1==null){
            this.ad_text1_main = $('#showbannerinmodal .bannermainblock'+this.divnumber+'txt2').text();
        }

        let link = this.serverurl + 'updatesbanner';
        let data = {
            banner_type: this.divnumber,
            banner_title: this.ad_bannertext,
            editablearea_1: this.ad_text_main,
            editablearea_2: this.ad_btn_main,
            editablearea_3: this.ad_img_main,
            editablearea_4: this.ad_img1_main,
            editablearea_5: this.ad_text1_main,
            added_by: this.mailcookiedetails,
            id: this.editbannerid,
        };
        console.log(data);
        let random =  Math.floor(Math.random() * (100 - 1 )) + 1;
        this._http.post(link, data)
            .subscribe(res => {
                console.log(this.modalmapShown);
                this.modalmapShown = false;
                console.log(this.modalmapShown);
                this.divfortitle = false;
                this.ad_bannertext = null;
                if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){
                    this.getbanners();
                }
                else{
                    this.getbannersbyemail();
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    addtdclass(status){
        if(status==1){
            return 'showgreen';
        }
        if(status==0){
            return 'showgrey';
        }
        if(status==3){
            return 'showred';
        }
        else{
            return '';
        }
    }

    allcheck() {
        this.checkboxvalue[0] = true;
        setTimeout(()=>{
            console.log('this.selectallmybanners--' + this.selectallmybanners);
            if (this.selectallmybanners == false) {
                for(let i in this.checkboxvalue){
                    this.checkboxvalue[i] = false;
                }
                this.checkboxarr=[];
            }
            if (this.selectallmybanners == true) {
                console.log($('.icheck').length);
                let cc = $('.icheck').length;
                console.log(this.checkboxvalue);
                for(let i=0 ; i<cc; i++){
                    this.checkboxvalue[i] = true;
                }
                for(let i in this.mybanners){
                    this.checkboxarr.push(this.mybanners[i]._id);
                }
            }
        }, 100);
    }
    checkboxid(i,itemid,checkboxvalue){
        console.log('===========');
        console.log(i);
        console.log(itemid);
        console.log(checkboxvalue);
        console.log(this.checkboxvalue);
        if(checkboxvalue==true){
            this.checkboxarr.push(itemid);
        }
        if(checkboxvalue==false){
            let indexval: any = this.checkboxarr.indexOf(itemid);
            console.log('-----------------');
            console.log(indexval);
            this.checkboxarr.splice(indexval, 1);

        }
        console.log('this.checkboxarr+++++++++++');
        console.log(this.checkboxarr);
    }
    resumebanners(value){
        console.log('resumemybanners');
        // 1 - resume i .e. status = 1
        // 0 - pause i .e. status = 0
        let link = this.serverurl+'changeallmybannersstatus';
        var data;
        if(value==1){
            data = {arrid:this.checkboxarr , statusid: 1};
        }
        else{
            data = {arrid:this.checkboxarr , statusid: 0};
        }
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                if(result.status=='success'){
                    if(this.cookiedetailsforalldetails_type == 'admin' || this.cookiedetailsforalldetails_type == 'helpdesk'){
                        this.getbanners();
                    }
                    else{
                        this.getbannersbyemail();
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }
}