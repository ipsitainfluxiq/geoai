import { Component, NgZone, OnInit, EventEmitter } from '@angular/core';
//import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import {DomSanitizer} from '@angular/platform-browser';
declare var google: any;
declare  var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import {isNumber} from "ngx-bootstrap/chronos/utils/type-checks";

@Component({
  selector: 'app-searchnew',
  templateUrl: './searchnew.component.html',
  styleUrls: ['./searchnew.component.css'],
    providers: [Commonservices]
})
export class SearchnewComponent implements OnInit {
    public  addcookie: CookieService;
    public  cookiedetails;
    public  format: any;
    public  emailcookie: CookieService;
    public  mailcookiedetails;
    public serverurl: any;
    public tabopen: any = 1;
    public topmenu1: boolean = true;
    public statesubmenu: boolean = false;
    public topmenu2: boolean = false;
    public consumer_value: any;
    public  geodiv: any = 0;
    public  infodiv: any = 0;
    public  householddiv: any = 0;
    public  interestsdiv: any = 0;
    public  statediv: any = 0;
    public usstates: any = [];
    public openloader = true;
    public tokenid: any;
    public Physical_Statearr: any;
    public Physical_Cityarr: any;
    public selected_locations: any = [];
    public selected_locationsv: any = [];
    public show_state_cities: any = [];
    public uscities: any = [];
    public citydiv: any = 0;
    public selected_locationscityv: any = [];
    public selected_locationscity: any = [];
    public citysubmenu: boolean = false;
    public countrydiv: any = 0;
    public selected_locationscountry: any = [];
    public selected_locationscountryv: any = [];
    public Physical_Countryarr: any;
    public countrysubmenu: boolean = false;
    public show_state_countries: any = [];
    public zipval: any;
    public zipval1: any;
    public zipval2: any;
    public zipval3: any;
    public zipval4: any;
    public  zipdiv: any = 0;
    public selected_zip: any = [];
    public selected_ziparr: any;
    public ziplength: any;
    static invalidzip = false;
    public zipsubmenu: boolean = false;
    public addresssubmenu: boolean = false;
    public addressval: any;
    public addressdiv: any = 0;
    public radiusdiv: any = 0;
    public errorvalgeomiles: any;
    public geomiles: any;
    public geoaddress: any;
    public geozip: any;
    public geoerror: any;
    public selected_geoshapes: any;
    public errorvalgeozip: any;
    public geomilesorshapeslength: any;
    public radiussubmenu: boolean = false;
    public modalmapShown: boolean = false;
    map: any;
    drawingManager: any;
    static totalshapes = [];
    static totalshapesnew = [];
    static ctype;
    static cradius;
    static ccenter;
    static ne_lat;
    static ne_lng;
    static sw_lat;
    static sw_lng;
    static poly_arr = [];
    static poly_arr1 = [];
    public searchresult: any;
    public ModalShownforsearch: boolean = false;
    public ModalShownforbusinesssearch: boolean = false;
    public totalshapeslength: any;
    public mapsubmenu: boolean = false;
    public totalshapesnew: any;

    public uploadjson: any = 0;
    options: UploaderOptions;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    public zone: NgZone;
    public basicOptions: Object;
    public filenameis: any;
    public csverroris: any;
    public uploadarray: any;
    public lng: any;
    public lat: any;
    public pi: any;
    public r_earth: any;
    public myLatLng: any;


    constructor(addcookie: CookieService, emailcookie: CookieService,  private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, public _sanitizer: DomSanitizer) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log(this.mailcookiedetails);
        this.serverurl = _commonservices.url;
        this.uploadInput = new EventEmitter<UploadInput>();
        this.getusstates();
        this.searchcriteria();
        this.getuscities();
        this.lng = -81.74123564;
        this.lat = 25.96782579;
        this.pi = 3.14159;
        this.r_earth = 6378;
        this.csverroris = null;
        this.myLatLng = { lat: 40.785091, lng: -73.968285 };
    }
    ngOnInit() {
        /*this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.785091, lng: -73.968285 },
            zoom: 8
        });*/
        this.basicOptions = {
            url: this.serverurl + 'uploads',
            filterExtensions: false,
            allowedExtensions: ['jpg', 'png', 'jpeg']
        };
    }
    onUploadOutput(output: UploadOutput): void {
        if (output.type === 'allAddedToQueue') {
            const event: UploadInput = {
                type: 'uploadAll',
                url: this.serverurl + 'uploads',
                method: 'POST',
            };
            this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
            if (output.file.response != "") {
                this.files = [];
                this.files.push(output.file);
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
          //  console.log(this.files);
          //  const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
          //  this.files[index] = output.file;
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
        console.log('files??');
        console.log(this.files);
        this.filenameis= this.files[0].response;
      //  console.log(this.filenameis);
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
    getjson() {
        this.uploadjson = (1 - this.uploadjson);
    }

    callupload() {
       /* var geocoder;
        geocoder = new google.maps.Geocoder();*/
        this.uploadarray = [];
        this.csverroris = null;
        let link = this.serverurl + 'csvuploads';
        let data = {filenameis: this.filenameis};
        this._http.post(link, data)
            .subscribe(res => {
                this.openloader = true;
                    let result1: any;
                result1 = res;
                var result = result1.data;
                if (result1.status == 'Success') {
                    if (result[0][0] == 'Zip Code' && result[0][1] == 'Latitude' && result[0][2] == 'Longitude' && result[0][3] == 'City' && result[0][4] == 'State' && result[0][5] == 'County') {
                        this.format = 1;
                        for (let i in result) {
                            // removing 1st 0 index row as it's a heading so i>0 (&& result[i][k]%1!=0 && result[i][l]%1!=0)
                            if (parseInt(i) > 0 && result[i][1] != '' && result[i][2] != '') {
                                result[i][1] = parseFloat(result[i][1]);
                                   result[i][2] = parseFloat(result[i][2]);
                                if(isNumber(result[i][2]) == true && isNumber(result[i][1]) == true && isNaN(result[i][1]) == false && isNaN(result[i][2]) == false){
                                this.uploadarray.push(result[i]);
                            }
                            }
                        }
                        console.log('this.uploadarray');
                        console.log(this.uploadarray);
                    }
                    else if (result[0][0] == 'Address') {
                        this.codeaddress(result);
                        /*this.format = 2;
                        var uploadarray1 = [];
                        var errorgeo = [];
                        for (let i in result) {
                            setTimeout(() => {
                                if (parseInt(i) > 0) {
                                    var currentarrray = [];
                                    geocoder.geocode({'address': result[i][0]}, function (results, status) {
                                        console.log(i);
                                        if (status == 'OK') {
                                            currentarrray = [];
                                            currentarrray.push(result[i][0], results[0].geometry.location.lat(), results[0].geometry.location.lng());
                                            uploadarray1.push(currentarrray);
                                            /!*  this.map = new google.maps.Map(document.getElementById('map'), {
                                             center: results[0].geometry.location,
                                             zoom: 8
                                             });
                                             //  map.setCenter(results[0].geometry.location);
                                             var marker = new google.maps.Marker({
                                             map: map,
                                             position: results[0].geometry.location
                                             });*!/
                                        }
                                   /!*  else if (status === google.maps.status.OVER_QUERY_LIMIT) {
                                        setTimeout(function() {
                                            codeAddress(zip);
                                        }, 250 );
                                    }*!/
                                    else {
                                            // alert('Geocode was not successful for the following reason: ' + status);
                                            errorgeo.push('Geocode was not successful for the following reason: ' + status);
                                        }
                                    });

                                    /!* setTimeout(() => {
                                     console.log('6');
                                     console.log('currentarrray');
                                     console.log(currentarrray);
                                     this.uploadarray.push(currentarrray);
                                     /!*for(let i in result){
                                     result[i][1] = parseFloat(result[i][1]);
                                     result[i][2] = parseFloat(result[i][2]);
                                     if( result[i][1] != '' && result[i][2] != '' && isNumber(result[i][2]) == true && isNumber(result[i][1]) == true){
                                     this.uploadarray.push(result[i]);
                                     }
                                     }*!/
                                     }, 1000);*!/
                                }
                            }, 2000);
                            if (parseInt(i) + 1 == result.length) {
                                this.uploadarray = uploadarray1;
                            }
                        }
                        console.log('this.uploadarray in callupload');
                        console.log(this.uploadarray);
                        console.log('errorgeo');
                        console.log(errorgeo);*/
                    }
                    else {
                        this.csverroris = 'Wrong CSV Format uploaded!';
                        this.uploadarray = [];
                    }
                }
                else {
                    this.csverroris = result1.data;
                }
                this.openloader = false;
            }, error => {
                console.log('Oooops!');
            });
    }
    codeaddress(result){
        console.log('callown');
        var geocoder;
        geocoder = new google.maps.Geocoder();
        this.format = 2;
        var uploadarray1 = [];
        var errorgeo = [];
        for (let i in result) {
                if (parseInt(i) > 0 && result[i][0] != '') {
                    var currentarrray = [];
                    setTimeout(() => {
                    geocoder.geocode({'address': result[i][0]}, function (results, status) {
                        if (status == 'OK') {
                            currentarrray = [];
                            currentarrray.push(result[i][0], results[0].geometry.location.lat(), results[0].geometry.location.lng());
                            uploadarray1.push(currentarrray);
                        }
                        else {
                            errorgeo.push('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                    }, parseInt(i)* 1000);
                }
            if (parseInt(i) + 1 == result.length) {
                this.uploadarray = uploadarray1;
                console.log('this.uploadarray in callupload');
                console.log(this.uploadarray);
                console.log('errorgeo');
                console.log(errorgeo);
            }
        }
    }

    callimport(){
        console.log('this.uploadarray in callimport');
        console.log(this.uploadarray);
      //  bermudaTriangle.setMap(null);
        this.openloader = true;
        for(let i in this.uploadarray){
            SearchnewComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0 , 0.0099779328));
            SearchnewComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , -0.0099779328 , 0.0099779328));
            SearchnewComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , -0.0099779328 , -0.0099779328));
            SearchnewComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0 , -0.0099779328));
            SearchnewComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0.0099779328 , -0.0099779328));
            SearchnewComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0.0099779328 , 0.0099779328));
            SearchnewComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0 , 0.0099779328));
            SearchnewComponent.totalshapes.push({
                type: 'polygon',
                poly_arr: SearchnewComponent.totalshapesnew
            });
            SearchnewComponent.totalshapesnew=[];
            if ((SearchnewComponent.totalshapes.length) > 0) {
                for (let i in SearchnewComponent.totalshapes) {
                    var totalshapearr = [];
                    for(let j in SearchnewComponent.totalshapes[i].poly_arr){
                        var spl = SearchnewComponent.totalshapes[i].poly_arr[j].split(" ");
                        var obj={
                            lat:parseFloat(spl[0]),
                            lng:parseFloat(spl[1]),
                        }
                        totalshapearr.push(obj);
                    }
                    this.callpolygon(totalshapearr);
                }
                SearchnewComponent.totalshapes=[];
            }
        }
        this.openloader = false;
    }
    addressval_1(lat_new , lng_new , dy , dx) {
        let new_latitude  = lat_new + (dy / this.r_earth ) * (180 / this.pi);
        let new_longitude = lng_new + (dx / this.r_earth ) * (180 / this.pi) / Math.cos(this.lat * this.pi / 180);
        var a = new_latitude + ' ' + new_longitude;
        return  a;
    }

    showmappointer(item){
        this.myLatLng = { lat: item[1], lng: item[2] };
/*
        var marker = new google.maps.Marker({
            position: this.myLatLng,
            map: this.map,
            title: item[0] +','+item[3]+','+item[4]+','+item[5]
        });
        marker.setMap(this.map);*/
     //   marker.setMap(null);
        this.map.setCenter(this.myLatLng);
        this.map.setZoom(19);
    }

    deletebeforeimport( item: any ) {
        let indexval: any = this.uploadarray.indexOf(item);
        this.uploadarray.splice(indexval, 1);
    }
    addclasstopmenu(val){
        // VAL = 1 ; Business
        // VAL = 2 ; Consumer
        this.tabopen = val;
        if(val==1){
            this.topmenu1 = true;
            this.topmenu2 = false;
        }
        else{
            this.topmenu2 = true;
            this.topmenu1 = false;
        }
        this.geodiv = 0;
        this.infodiv = 0;
        this.householddiv = 0;
        this.interestsdiv = 0;
        this.statediv = 0;
        this.citydiv = 0;
        this.zipdiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
        this.statesubmenu = false;
        this.citysubmenu = false;
        this.countrysubmenu = false;
        this.zipsubmenu = false;
        this.addresssubmenu = false;
        this.radiussubmenu = false;
        this.mapsubmenu = false;

        this.Physical_Statearr = null;
        this.selected_locations = [];
        this.selected_locationsv = [];
        this.selected_locationscity = [];
        this.selected_locationscityv = [];
        this.show_state_cities = [];
        this.selected_locationscountryv = [];
        this.selected_locationscountry = [];
        this.selected_zip = [];
        this.ziplength = 0;
        this.zipval = null;
        this.zipval1 = null;
        this.zipval2 = null;
        this.zipval3 = null;
        this.zipval4 = null;
        this.addressval = null;
        this.selected_geoshapes = null;
        this.totalshapeslength = 0;
        SearchnewComponent.totalshapesnew=[];
        SearchnewComponent.totalshapes=[];
        this.totalshapesnew = null;
        /*for(let i in this.usstates) {
        $('#state_' +this.usstates[i].attr_id).removeClass('selectedclass');
        }*/
        //console.log('call');
        this.callforsearch();
    }
    opengeodiv(val) {
       /* if(val==1){
            this.businessgeodiv = (1 - this.businessgeodiv);
        }*/
       // else{
            this.geodiv = (1 - this.geodiv);
            if (this.geodiv == 1) {
                this.infodiv = 0;
                this.householddiv = 0;
                this.interestsdiv = 0;
         //   }
        }
    }
    openinfodiv() {
        this.infodiv = (1 - this.infodiv);
        if (this.infodiv == 1) {
            this.geodiv = 0;
            this.householddiv = 0;
            this.interestsdiv = 0;
        }
    }
    openhouseholddiv() {
        this.householddiv = (1 - this.householddiv);
        if (this.householddiv == 1) {
            this.geodiv = 0;
            this.infodiv = 0;
            this.interestsdiv = 0;
        }
    }
    openinterestsdiv() {
        this.interestsdiv = (1 - this.interestsdiv);
        if (this.interestsdiv == 1) {
            this.geodiv = 0;
            this.infodiv = 0;
            this.householddiv = 0;
        }
    }
    openstatediv() {
        this.statediv = 1;
        this.citydiv = 0;
        this.countrydiv = 0;
        this.zipdiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
    }
    opencitydiv() {
        this.citydiv = 1;
        this.statediv = 0;
        this.countrydiv = 0;
        this.zipdiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
    }
    opencountrydiv() {
        this.countrydiv = 1;
        this.statediv = 0;
        this.citydiv = 0;
        this.zipdiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
    }
    openzipdiv() {
        this.zipdiv = 1;
        this.statediv = 0;
        this.citydiv = 0;
        this.countrydiv = 0;
        this.addressdiv = 0;
        this.radiusdiv = 0;
    }
    openaddressdiv() {
        this.addressdiv = 1;
        this.zipdiv = 0;
        this.statediv = 0;
        this.citydiv = 0;
        this.countrydiv = 0;
        this.radiusdiv = 0;
    }
    openradiusdiv() {
        this.radiusdiv = 1;
        this.zipdiv = 0;
        this.statediv = 0;
        this.citydiv = 0;
        this.countrydiv = 0;
        this.addressdiv = 0;
    }

    getusstates() {
        let link = this.serverurl + 'getusastates';
        this._http.get(link)
            .subscribe(res => {
                let result1: any;
                 result1 = res;
                for (let i in result1) {
                    //  this.usstates[i] = result1[i].abbreviation;
                    this.usstates[i] = {
                        attr_id: result1[i].abbreviation,
                        attr_name: result1[i].name,
                    };
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    searchcriteria() {
        let link = this.serverurl + 'gettoken';
        this._http.get(link)
            .subscribe(res => {
                let tokenval: any;
                 tokenval = res;
                tokenval = tokenval.res;
                for (let i in tokenval) {
                    this.tokenid = tokenval[i].accesstoken;
                }
                console.log('tokenid is--' + this.tokenid);
                this. callforsearch();
            }, error => {
                console.log('Oooops!');
            });
    }
    callforsearch() {
        this.selected_geoshapes = null;
        this.zipsubmenu = false;
        this.addresssubmenu = false;
        this.radiussubmenu = false;
        this.mapsubmenu = false;
        this.Physical_Statearr = null;
        this.Physical_Cityarr = null;
        this.Physical_Countryarr = null;
        this.selected_ziparr = null;
        this.geomilesorshapeslength = null;
        this.totalshapeslength = 0;
        var flag = 0;
        console.log('SearchnewComponent.totalshapes just before search');
        console.log(SearchnewComponent.totalshapes);
        if (SearchnewComponent.totalshapes != null) {
            for (let i in SearchnewComponent.totalshapes) {
                if (SearchnewComponent.totalshapes[i].type == 'polygon') {
                    console.log('hi');
                    console.log(this.selected_geoshapes);
                    if (this.selected_geoshapes == null) {
                        this.selected_geoshapes = '#POLYGON#|' + SearchnewComponent.totalshapes[i].poly_arr;
                    }
                    else {
                        this.selected_geoshapes = this.selected_geoshapes + '|' + SearchnewComponent.totalshapes[i].poly_arr;
                    }
                    flag++;
                }
            }
            this.totalshapeslength = flag;
            if(this.totalshapeslength>0){
                this.mapsubmenu = true;
            }
        }
        if (this.selected_locations != null) {
            for (let i in this.selected_locations) {
                this.Physical_Statearr = this.Physical_Statearr + ',' + this.selected_locations[i].attr_id;
            }
        }
        if (this.selected_locationscity != null) {
            for (let i in this.selected_locationscity) {
                this.Physical_Cityarr = this.Physical_Cityarr + ',' + this.selected_locationscity[i].city;
            }
        }
        if (this.selected_locationscountry != null) {
            for (let i in this.selected_locationscountry) {
                this.Physical_Countryarr = this.Physical_Countryarr + ',' + this.selected_locationscountry[i].country;
            }
        }
        if (this.zipval != null &&  this.zipval != '') {
            this.selected_zip.push(this.zipval);
        }
        if (this.zipval1 != null &&  this.zipval1 != '') {
            this.selected_zip.push(this.zipval1);
        }
        if (this.zipval2 != null &&  this.zipval2 != '') {
            this.selected_zip.push(this.zipval2);
        }
        if (this.zipval3 != null &&  this.zipval3 != '') {
            this.selected_zip.push(this.zipval3);
        }
        if (this.zipval4 != null &&  this.zipval4 != '') {
            this.selected_zip.push(this.zipval4);
        }
        for (let i in this.selected_zip) {
            this.selected_ziparr = this.selected_ziparr + ',' + this.selected_zip[i];
        }
        if (((this.geomiles == null || this.geomiles == '') && (this.geoaddress == null || this.geoaddress == '') && (this.geozip == null  || this.geozip == '')) || (this.geomiles != null && this.geoaddress != null && this.geozip != null && this.geomiles != '' && this.geozip != '' && this.geoaddress != '')) {
            this.geoerror = null;
            console.log('geoerror should be null- ' + this.geoerror);
            if (this.geomiles != null && this.geoaddress != null && this.geozip != null && this.geomiles != '' && this.geozip != '' && this.geoaddress != '') {
                console.log('inside 1');
                console.log('geo miles val - '+this.geomiles);
                this.geomiles=parseFloat(this.geomiles);

                if (this.geomiles > 0 || this.geomiles < 150) {
                    this.errorvalgeomiles = null;
                    console.log('inside 2');
                }
                if (this.geomiles < 0 || this.geomiles > 150) {
                    this.errorvalgeomiles = 'The Number of Miles has to be between .1 and 150.0';
                    console.log('inside 3');
                }
                if (this.errorvalgeomiles == null) {
                    this.selected_geoshapes = this.geoaddress + '|' + this.geozip + '|' + this.geomiles;
                    this.geomilesorshapeslength = 1;
                    this.radiussubmenu = true;
                }
                let geozipvalid = /^[0-9]{5}$/;
                let geozipvalid1 = /^[0-9]{3}$/;
                if ((this.geozip.match(geozipvalid) || this.geozip.match(geozipvalid1)) || this.geozip.length == 0) {
                    this.errorvalgeozip = null;
                    console.log('inside 5');
                }
                else {
                    this.errorvalgeozip = 'Please enter a valid 3 or 5 ZIP code(s).';
                }
            }
        }
        else {
            this.geoerror = 'Please GIve all values';
        }
        if(this.tabopen == 1){
            var link;
             link = 'http://geofencedsp.com/assets/php/businesscall.php?token=' + this.tokenid;
        }
        else{
             link = 'http://geofencedsp.com/assets/php/callconsumer.php?token=' + this.tokenid;
        }
        this.searchresult = null;
        let data = {
            Physical_State: this.Physical_Statearr,
            Physical_City: this.Physical_Cityarr,
            Vendor_State_County: this.Physical_Countryarr,
            Physical_Zip: this.selected_ziparr,
            Physical_Address: this.addressval,
            proximity: this.selected_geoshapes,
        };
        console.log(data);

        if (SearchnewComponent.invalidzip==false && this.geoerror == null && this.errorvalgeomiles == null && this.errorvalgeozip == null && this.tabopen!=null) {
            this.ziplength = this.selected_zip.length;
            if(this.ziplength>0){
                this.zipsubmenu = true;
            }
            if(this.addressval!=null){
                this.addresssubmenu = true;
            }
            this.openloader = true;
            this._http.post(link, data)
                .subscribe(res => {
                    this.openloader = false;
                    this.consumer_value = res;
                    this.selected_zip = [];
                  //  this.geomiles = null;
                   // this.geoaddress = null;
                  //  this.geozip = null;
                  //  this.selected_geoshapes = null;
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

                                            /*For State*/

    addtolist(id, name , item) {
        this.statesubmenu = false;
        let tempvar= id;
        let indexval: any = this.selected_locationsv.indexOf(tempvar);
       // console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_locations.push({attr_id: id, attr_name: name});
            this.selected_locationsv.push( id);
        }
        else {
            this.selected_locations.splice(indexval, 1);
            this.selected_locationsv.splice(indexval, 1);
        }
        $('#state_' + id).toggleClass('selectedclass');
        if(this.selected_locations.length>0){
            this.statesubmenu = true;
        }
    }


                                                /*For City*/

    show_cities(id) { // here id is abbreviation
        this.show_state_cities=[];
        for (let i in this.uscities) {
            if (this.uscities[i].short_state == id) {
                this.show_state_cities.push(this.uscities[i]);
            }
        }
        /*for(let i in this.selected_locationscity) {
            for (let j in this.show_state_cities) {
                if (this.selected_locationscity[i].city == this.show_state_cities[j].city){
                    console.log('matched');
                    $('#city_' + this.selected_locationscity[i].city).toggleClass('selectedclass');
                }
                    }
        }*/
    }
    getuscities() {
        let link = this.serverurl + 'getus_cities1';
        this._http.get(link)
            .subscribe(res => {
                let result: any;
                result = res;
                for (let i in result) {
                    this.uscities[i] = {
                        city: result[i].city,
                        state: result[i].state,
                        short_state: result[i].short_state,
                        country: result[i].country,
                    };
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    addtocitylist(city , item) {
        this.citysubmenu = false;
        let tempvar= city;
        let indexval: any = this.selected_locationscityv.indexOf(tempvar);
        if (indexval == -1) {
            this.selected_locationscity.push({city: city});
            this.selected_locationscityv.push( city);
        }
        /*else {
            this.selected_locationscity.splice(indexval, 1);
            this.selected_locationscityv.splice(indexval, 1);
        }*/
        if(this.selected_locationscity.length>0){
            this.citysubmenu = true;
        }
    }

    removefromcitylist(city , item) {
        console.log('before');
        console.log(this.selected_locationscity);
        let tempvar= city;
        let indexval: any = this.selected_locationscityv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        this.selected_locationscity.splice(indexval, 1);
        this.selected_locationscityv.splice(indexval, 1);
        console.log('after');
        console.log(this.selected_locationscity);
        if(this.selected_locationscity.length==0){
            this.citysubmenu = false;
        }
    }


                                                    /*For County*/

    show_countries(id) { // here id is abbreviation
        this.show_state_countries = [];
        for (let i in this.uscities) {
            if (this.uscities[i].short_state == id) {
                console.log('inside');
                this.show_state_countries.push(this.uscities[i]);
            }
        }
    }
    addtocountrylist(country , item) {
        this.countrysubmenu = false;
        let tempvar= country;
        let indexval: any = this.selected_locationscountryv.indexOf(tempvar);
        if (indexval == -1) {
            this.selected_locationscountry.push({country: country});
            this.selected_locationscountryv.push( country);
        }
        if(this.selected_locationscountry.length>0){
            this.countrysubmenu = true;
        }
    }
    removefromcountrylist(country , item) {
        let tempvar= country;
        let indexval: any = this.selected_locationscountryv.indexOf(tempvar);
        this.selected_locationscountry.splice(indexval, 1);
        this.selected_locationscountryv.splice(indexval, 1);
        if(this.selected_locationscountry.length==0){
            this.countrysubmenu = false;
        }
    }


                                            /*For Zip*/
    zipvalidate(val){
        SearchnewComponent.zipvalidation(val);
    }

    static zipvalidation(val) {
        SearchnewComponent.invalidzip = false;
        if( (!val.match(/^[0-9]{3}$/)) && (!val.match(/^[0-9]{5}$/)) && (val.length!=0) ){
            SearchnewComponent.invalidzip = true;
        }
    }

    getzip(type: any) {
        if (type == 'invalid') {
            return SearchnewComponent.invalidzip;
        }
    }

    openmapdiv() {
        this.myLatLng = { lat: 40.785091, lng: -73.968285 };
        this.modalmapShown = true;
        setTimeout(() => {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: this.myLatLng,
                zoom: 8
            });
        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                // drawingModes: ['polygon','circle','rectangle']
                drawingModes: ['polygon']
            }
        });
            this.drawingManager.setMap(this.map);
            google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
                // Polygon drawn
                if (event.type === google.maps.drawing.OverlayType.POLYGON) {
                    // this is the coordinate, you can assign it to a variable or pass into another function.
                    SearchnewComponent.ctype = event.type;
                    SearchnewComponent.poly_arr = event.overlay.getPath().getArray();
                    SearchnewComponent.poly_arr1 = [];
                    SearchnewComponent.poly_arr1 = event.overlay.getPath().getArray();
                                        for (let i in SearchnewComponent.poly_arr1) {
                                            SearchnewComponent.totalshapesnew.push(SearchnewComponent.poly_arr1[i].lng() + ' ' + SearchnewComponent.poly_arr1[i].lat());
                                        }
                                        SearchnewComponent.totalshapesnew.push(SearchnewComponent.poly_arr[0].lng() + ' ' + SearchnewComponent.poly_arr[0].lat());
                  /*  console.log('SearchnewComponent ' +  SearchnewComponent.totalshapesnew) ;*/
                    SearchnewComponent.poly_arr = SearchnewComponent.totalshapesnew; // added new
                    SearchnewComponent.totalshapes.push({
                        type: SearchnewComponent.ctype,
                        poly_arr: SearchnewComponent.totalshapesnew
                    });
                    SearchnewComponent.totalshapesnew=[];
                }
                console.log('SearchnewComponent.totalshapes++------+');
                console.log(SearchnewComponent.totalshapes);
                this.totalshapesnew = SearchnewComponent.totalshapes;
               /* console.log('this.totalshapesnew++------+');
                console.log(this.totalshapesnew);*/
            });
            if ((SearchnewComponent.totalshapes.length) > 0) {
                  for (let i in SearchnewComponent.totalshapes) {
                      var totalshapearr = [];
                    for(let j in SearchnewComponent.totalshapes[i].poly_arr){
                        var spl = SearchnewComponent.totalshapes[i].poly_arr[j].split(" ");
                        var obj={
                            lat:parseFloat(spl[0]),
                            lng:parseFloat(spl[1]),
                        }
                        totalshapearr.push(obj);
                    }
                    this.callpolygon(totalshapearr);
                  }
            }
        },500);
    }
    deletepolyshape( item: any ) {
        let indexval: any = SearchnewComponent.totalshapes.indexOf(item);
        SearchnewComponent.totalshapes.splice(indexval, 1);

       /* console.log('delete polyshapre after SearchnewComponent.totalshapes');
        console.log(SearchnewComponent.totalshapes);*/

    /*    var totalshapearr1 = [];
        for(let j in item.poly_arr){
            var spl = item.poly_arr[j].split(" ");
            var obj={
                lat:parseFloat(spl[0]),
                lng:parseFloat(spl[1]),
            }
            totalshapearr1.push(obj);
        }
        var PolyCoords1 = [];
        for (let j in totalshapearr1) {
            PolyCoords1.push({
                lat: totalshapearr1[j].lng,
                lng: totalshapearr1[j].lat
            });
        }
        var bermudaTriangle = new google.maps.Polygon({
            paths: PolyCoords1,
        });
        bermudaTriangle.setMap(null);
        console.log('failed??');*/
    }
    callpolygon(path) {
        var PolyCoords = [];
        for (let j in path) {
            PolyCoords.push({
                lat: path[j].lng,
                lng: path[j].lat
            });
        }

      /*  console.log('PolyCoords');
        console.log(PolyCoords);*/
        var bermudaTriangle = new google.maps.Polygon({
            paths: PolyCoords,
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: '#0000FF',
            fillOpacity: 0.35
        });
        bermudaTriangle.setMap(this.map);
    }
    onHidden() {
        this.modalmapShown = false;
        this.ModalShownforsearch = false;
        this.ModalShownforbusinesssearch = false;
    }
    viewallsearch() {
        this.openloader = true;
        let timestampis = new Date().getTime();
        var link;
        if(this.tabopen==1){
             link = 'http://geofencedsp.com/assets/php/businesssearchresults.php?token=' + this.tokenid + '&v=' + timestampis;
        }
        else{
             link = 'http://geofencedsp.com/assets/php/searchresults.php?token=' + this.tokenid + '&v=' + timestampis;
        }
        this._http.get(link)
            .subscribe(res => {
                this.searchresult = res;
                console.log('this.searchresult');
                console.log(this.searchresult);
                this.openloader = false;
                if (this.searchresult != null) {
                    if(this.tabopen==1){
                        this.ModalShownforbusinesssearch = true;
                        this.ModalShownforsearch = false;
                    }
                    else{
                        this.ModalShownforsearch = true;
                        this.ModalShownforbusinesssearch = false;
                    }

                }
            }, error => {
                console.log('Oooops!');
            });
    }
}
