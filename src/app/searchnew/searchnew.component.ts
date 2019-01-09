import { Component, NgZone, OnInit } from '@angular/core';
//import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import {DomSanitizer} from '@angular/platform-browser';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
declare var google: any;
declare  var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    public  maptype: any;
    public  emailcookie: CookieService;
    public  mailcookiedetails;
    public serverurl: any;
    public tabopen: any = 1;
    public topmenu1: boolean = true;
    public statesubmenu: boolean = false;
    public agesubmenu: boolean = false;
    public incomesubmenu: boolean = false;
    public homevaluesubmenu: boolean = false;
    public residencevaluesubmenu: boolean = false;
    public medianincomesubmenu: boolean = false;
    public medianhomesubmenu: boolean = false;
    public maritalsubmenu: boolean = false;
    public networthsubmenu: boolean = false;
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
    public searchcriteriais: any;
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
    public radiusaddressmenu: boolean = false;
    public addressval: any;
    public addressdiv: any = 0;
    public agediv: any = 0;
    public incomediv: any = 0;
    public medianhomevaluediv: any = 0;
    public medianhomeincomediv: any = 0;
    public genderdiv: any = 0;
    public individualhouseholddiv: any = 0;
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
    public Modal_submit_search_div: boolean = false;
    map: any;
    drawingManager: any;
    static totalshapes = [];
    static totalshapesnew = [];
    static totalshapesdemo = [];
    static ctype;
    static cradius;
    static ccenter;
    static ne_lat;
    static ne_lng;
    static sw_lat;
    static sw_lng;
    static poly_arr = [];
    static poly_arr1 = [];
    public searchresult: any = null;
    public ModalShownforsearch: boolean = false;
    public ModalShownforbusinesssearch: boolean = false;
    public totalshapeslength: any;
    public mapsubmenu: boolean = false;
    public totalshapesnew: any;
    public selectedFile;
    public uploadjson: any = 0;
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
    public age_list: any = [];
    public selected_agev: any = [];
    public selected_age: any = [];
    public Ind_Age_Codearr: any;
    public Ind_Gender_Code: any = '';
    public headofhouseholdonly: any;
    /*#######################################*/
    public incomelist: any = [];
    public selected_income: any = [];
    public selected_incomev: any = [];
    public selected_incomearr: any;
    public homevaluediv: any = 0;
    public networthdiv: any = 0;
    public maritaliv: any = 0;
    public residencediv: any = 0;
    public selected_homevalue: any = [];
    public selected_homevaluev: any = [];
    public selected_homevaluearr: any;
    public selected_medianincome: any = [];
    public selected_medianincomev: any = [];
    public selected_medianincomearr: any;
    public selected_medianhome: any = [];
    public selected_medianhomev: any = [];
    public selected_medianhomearr: any;
    public median_income_list: any = [];
    public home_value_list: any = [];
    public median_home_value_list: any = [];
    public marital_list: any = [];
    public residence_list: any = [];
    public networth_list: any = [];
    public selected_residence: any = [];
    public selected_residencev: any = [];
    public selected_residencearr: any;
    public selected_marital: any = [];
    public selected_maritalv: any = [];
    public selected_maritalarr: any;
    public selected_networth: any = [];
    public selected_networthv: any = [];
    public selected_networtharr: any;
    public dataForm: FormGroup;
    public fb;
    public a;
    public count_loop;
    public i;
    public uploadurl;
    public  maporcsv_upload;
    public  maporcsv_uploadmain;

    constructor(addcookie: CookieService, emailcookie: CookieService,  private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, public _sanitizer: DomSanitizer, fb: FormBuilder) {
        this.uploadurl = _commonservices.uploadurl;
        this.fb = fb;
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.get('cookiedetails');
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        console.log(this.mailcookiedetails);
        this.serverurl = _commonservices.url;
        this.getusstates();
        this.searchcriteria();
        this.getuscities();
        this.lng = -81.74123564;
        this.lat = 25.96782579;
        this.pi = 3.14159;
        this.r_earth = 6378;
        this.csverroris = null;
        this.myLatLng = { lat: 40.785091, lng: -73.968285 };
        this.age_list = [
            {'code': 'A', 'value': 'Between 18 to 25'},
            {'code': 'B', 'value': 'Between 26 to 39'},
            {'code': 'C', 'value': 'Between 40 to 49'},
            {'code': 'D', 'value': 'Between 50 to 64'},
            {'code': 'E', 'value': 'Between 65 to 70'},
            {'code': 'F', 'value': 'Between 71 to 74'},
            {'code': 'G', 'value': 'Over 75'},
            {'code': 'U', 'value': 'Unknown'}
        ];
        /*###################################################################################*/
        this.incomelist = [
            {'code': '1', 'value': 'Up to $10,000'},
            {'code': '2', 'value': '$10,000 to $14,999'},
            {'code': '3', 'value': '$15,000 to $19,999'},
            {'code': '4', 'value': '$20,000 to $24,999'},
            {'code': '5', 'value': '$25,000 to $29,999'},
            {'code': '6', 'value': '$30,000 to $34,999'},
            {'code': '7', 'value': '$35,000 to $39,999'},
            {'code': '8', 'value': '$40,000 to $44,999'},
            {'code': '9', 'value': '$45,000 to $49,999'},
            {'code': 'A', 'value': '$50,000 to $54,999'},
            {'code': 'B', 'value': '$55,000 to $59,999'},
            {'code': 'C', 'value': '$60,000 to $64,999'},
            {'code': 'D', 'value': '$65,000 to $74,999'},
            {'code': 'E', 'value': '$75,000 to $99,999'},
            {'code': 'F', 'value': '$100,000 to $149,999'},
            {'code': 'G', 'value': '$150,000 to $174,999'},
            {'code': 'H', 'value': '$175,000 to $199,999'},
            {'code': 'I', 'value': '$200,000 to $249,999'},
            {'code': 'J', 'value': '$250,000 to $499,999'},
            {'code': 'K', 'value': '$500,000 to $999,999'},
            {'code': 'L', 'value': '$1,000,000 to $1,999,999'},
            {'code': 'M', 'value': '$2,000,000 to $4,999,999'},
            {'code': 'N', 'value': 'Over $5,000,000'},
        ];

        this.median_income_list = [
            {'code': '1', 'value': 'Up to $10,000'},
            {'code': '2', 'value': '$10,000 to $14,999'},
            {'code': '3', 'value': '$15,000 to $19,999'},
            {'code': '4', 'value': '$20,000 to $24,999'},
            {'code': '5', 'value': '$25,000 to $29,999'},
            {'code': '6', 'value': '$30,000 to $34,999'},
            {'code': '7', 'value': '$35,000 to $39,999'},
            {'code': '8', 'value': '$40,000 to $44,999'},
            {'code': '9', 'value': '$45,000 to $49,999'},
            {'code': 'A', 'value': '$50,000 to $54,999'},
            {'code': 'B', 'value': '$55,000 to $59,999'},
            {'code': 'C', 'value': '$60,000 to $64,999'},
            {'code': 'D', 'value': '$65,000 to $74,999'},
            {'code': 'E', 'value': '$75,000 to $99,999'},
            {'code': 'F', 'value': '$100,000 to $149,999'},
            {'code': 'G', 'value': '$150,000 to $174,999'},
            {'code': 'H', 'value': '$175,000 to $199,999'},
            {'code': 'I', 'value': '$200,000 to $249,999'},
            {'code': 'J', 'value': '$250,000 or More'}
        ];

        this.networth_list = [
            {'code': 'A', 'value': 'Up to $30,000'},
            {'code': 'B', 'value': '$30,001 to $100,000'},
            {'code': 'C', 'value': '$100,001 to $500,000'},
            {'code': 'D', 'value': '$500,001 to $1,500,000'},
            {'code': 'E', 'value': 'Over $1,500,000'}
        ];

        this.home_value_list = [
            {'code': 'A', 'value': 'Up to $24,999'},
            {'code': 'B', 'value': '$25,000 to $49,999'},
            {'code': 'C', 'value': '$50,000 to $74,999'},
            {'code': 'D', 'value': '$75,000 to $99,999'},
            {'code': 'E', 'value': '$100,000  to $124,999'},
            {'code': 'F', 'value': '$125,000 to $149,999'},
            {'code': 'G', 'value': '$150,000 to $174,999'},
            {'code': 'H', 'value': '$$175,000 to $199,999'},
            {'code': 'I', 'value': '$200,000 to $224,999'},
            {'code': 'J', 'value': '$225,000 to $249,999'},
            {'code': 'K', 'value': '$250,000 to $274,999'},
            {'code': 'L', 'value': '$275,000 to $299,999'},
            {'code': 'M', 'value': '$300,000 to $349,999'},
            {'code': 'N', 'value': '$350,000 to $399,999'},
            {'code': 'O', 'value': '$400,000 to $449,999'},
            {'code': 'P', 'value': '$450,000 to $449,999'},
            {'code': 'Q', 'value': '$500,000 to $749,999'},
            {'code': 'R', 'value': '$750,000 to $999,999'},
            {'code': 'S', 'value': '$1,000,000 to $1,499,999'},
            {'code': 'T', 'value': '$1,500,000 to $2,499,999'},
            {'code': 'U', 'value': '$2,500,000 to $4,999,999'},
            {'code': 'V', 'value': '$5,000,000 to $9,999,999'},
            {'code': 'W', 'value': 'Over $10,000,000'}
        ];
        this.median_home_value_list = [
            {'code': '1', 'value': 'Up to $10,000'},
            {'code': '2', 'value': '$10,000 to $24,999'},
            {'code': '3', 'value': '$25,000 to $49,999'},
            {'code': '4', 'value': '$50,000 to $74,999'},
            {'code': '5', 'value': '$75,000 to $99,999'},
            {'code': '6', 'value': '$100,000  to $124,999'},
            {'code': '7', 'value': '$125,000 to $149,999'},
            {'code': '8', 'value': '$150,000 to $174,999'},
            {'code': '9', 'value': '$$175,000 to $199,999'},
            {'code': 'A', 'value': '$200,000 to $224,999'},
            {'code': 'B', 'value': '$225,000 to $249,999'},
            {'code': 'C', 'value': '$250,000 to $274,999'},
            {'code': 'D', 'value': '$275,000 to $299,999'},
            {'code': 'E', 'value': '$300,000 to $349,999'},
            {'code': 'F', 'value': '$350,000 to $399,999'},
            {'code': 'G', 'value': '$400,000 to $449,999'},
            {'code': 'H', 'value': '$450,000 to $449,999'},
            {'code': 'I', 'value': '$500,000 to $749,999'},
            {'code': 'J', 'value': '$750,000 to $999,999'},
            {'code': 'K', 'value': '$1,000,000 or More'}
        ];
        this.marital_list = [
            {'code': 'A', 'value': 'Inferred Married'},
            {'code': 'B', 'value': 'Inferred Single'},
            {'code': 'M', 'value': 'Married'},
            {'code': 'S', 'value': 'Single'}
        ];

        this.age_list = [
            {'code': 'A', 'value': 'Between 18 to 25'},
            {'code': 'B', 'value': 'Between 26 to 39'},
            {'code': 'C', 'value': 'Between 40 to 49'},
            {'code': 'D', 'value': 'Between 50 to 64'},
            {'code': 'E', 'value': 'Between 65 to 70'},
            {'code': 'F', 'value': 'Between 71 to 74'},
            {'code': 'G', 'value': 'Over 75'},
            {'code': 'U', 'value': 'Unknown'}
        ];

        this.residence_list = [
            {'code': 'A', 'value': 'Up to 1 Year'},
            {'code': 'B', 'value': '1 to 2 Years'},
            {'code': 'C', 'value': '3 to 5 Years'},
            {'code': 'D', 'value': '6 to 9 Years'},
            {'code': 'E', 'value': '10 to 14 Years'},
            {'code': 'F', 'value': '15 Years or more'},
            {'code': 'U', 'value': 'Unknown'}
        ];

    }
    ngOnInit() {
        /*this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.785091, lng: -73.968285 },
            zoom: 8
        });*/
      /*  this.basicOptions = {
            url: this.serverurl + 'uploads',
            filterExtensions: false,
            allowedExtensions: ['jpg', 'png', 'jpeg']
        };*/
        this.dataForm = this.fb.group({
            audiencename: ['', Validators.required],
            audiencedescription: ['', Validators.required]
        });
    }


/*new upload process start*/
    onFileChanged(event) {
        console.log('event');
        console.log(event);
        this.csverroris = '';
        this.selectedFile = event.target.files[0];

        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile);

        this._http.post(this.uploadurl, uploadData)
            .subscribe(event => {
                var res :any;
                res = event;
                if(res.error_code == 0){
                    console.log('res');
                    console.log(res);
                    this.filenameis = {};
                    this.filenameis.generatedName= res.filename;
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
                                    this.uploadjson = 0;
                                }
                                else if (result[0][0] == 'Address') {
                                    this.codeaddress(result);
                                }
                                else {
                                    this.csverroris = 'Wrong CSV Format uploaded!';
                                    this.uploadarray = [];
                                }
                                console.log('###########################################################');
                                this.maporcsv_upload = 'csv';
                            }
                            else {
                                this.csverroris = result1.data;
                            }
                            this.openloader = false;
                        }, error => {
                            console.log('Oooops!');
                        });
                }
                else {
                    this.csverroris = res.msg;
                }
                this.openloader = false;
            }, error => {
                console.log('Oooops!');
            });
    }
    /*end*/


    getjson() {
        this.totalshapesnew = [];
        SearchnewComponent.totalshapes = [];
        SearchnewComponent.totalshapesnew = [];
        this.uploadjson = (1 - this.uploadjson);
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
        this.uploadjson = 0;
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
            SearchnewComponent.totalshapesdemo.push({
                type: 'polygon',
                poly_arr: SearchnewComponent.totalshapesnew
            });

            SearchnewComponent.totalshapesnew=[];
            if ((SearchnewComponent.totalshapesdemo.length) > 0) {
                for (let i in SearchnewComponent.totalshapesdemo) {
                    var totalshapearr = [];
                    for(let j in SearchnewComponent.totalshapesdemo[i].poly_arr){
                        var spl = SearchnewComponent.totalshapesdemo[i].poly_arr[j].split(" ");
                        var obj={
                            lat:parseFloat(spl[0]),
                            lng:parseFloat(spl[1]),
                        }
                        totalshapearr.push(obj);
                    }
                    console.log('this.callpolygon(totalshapearr11111111)' + i);
                    this.callpolygon(totalshapearr);
                }
                SearchnewComponent.totalshapesdemo=[];
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
        this.agesubmenu = false;
        this.incomesubmenu = false;
        this.homevaluesubmenu = false;
        this.residencevaluesubmenu = false;
        this.medianincomesubmenu = false;
        this.medianhomesubmenu = false;
        this.maritalsubmenu = false;
        this.networthsubmenu = false;
        this.citysubmenu = false;
        this.countrysubmenu = false;
        this.zipsubmenu = false;
        this.addresssubmenu = false;
        this.radiusaddressmenu = false;
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
        this.Ind_Gender_Code = '';
        this.headofhouseholdonly = null;
        this.selected_age = [];
        this.selected_income = [];
        this.selected_homevalue = [];
        this.selected_medianincome = [];
        this.selected_medianhome = [];
        this.selected_residence = [];
        this.selected_marital = [];
        this.selected_networth = [];
        this.geomiles = null;
        this.geoaddress = null;
        this.geozip = null;
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
    openagediv() {
        this.agediv = 1;
        this.genderdiv = 0;
        this.individualhouseholddiv = 0;
    }
    opengenderdiv() {
        this.genderdiv = 1;
        this.agediv = 0;
        this.individualhouseholddiv = 0;
    }
    openindhouseholddiv() {
        this.individualhouseholddiv = 1;
        this.genderdiv = 0;
        this.agediv = 0;
    }
    openincomediv() {
        this.incomediv = 1;
        this.homevaluediv = 0;
        this.medianhomeincomediv = 0;
        this.medianhomevaluediv = 0;
        this.residencediv = 0;
        this.maritaliv = 0;
        this.networthdiv = 0;
    }
    openhomevaluediv() {
        this.homevaluediv = 1;
        this.incomediv = 0;
        this.medianhomeincomediv = 0;
        this.medianhomevaluediv = 0;
        this.residencediv = 0;
        this.maritaliv = 0;
        this.networthdiv = 0;
    }
    openmedianhomeincomediv() {
        this.medianhomeincomediv = 1;
        this.incomediv = 0;
        this.homevaluediv = 0;
        this.medianhomevaluediv = 0;
        this.residencediv = 0;
        this.maritaliv = 0;
        this.networthdiv = 0;
    }
    openmedianhomevaluediv() {
        this.medianhomevaluediv = 1;
        this.incomediv = 0;
        this.homevaluediv = 0;
        this.medianhomeincomediv = 0;
        this.residencediv = 0;
        this.maritaliv = 0;
        this.networthdiv = 0;
    }
    openresidencediv() {
        this.residencediv = 1;
        this.medianhomevaluediv = 0;
        this.incomediv = 0;
        this.homevaluediv = 0;
        this.medianhomeincomediv = 0;
        this.maritaliv = 0;
        this.networthdiv = 0;
    }
    openmaritaldiv() {
        this.maritaliv = 1;
        this.residencediv = 0;
        this.medianhomevaluediv = 0;
        this.incomediv = 0;
        this.homevaluediv = 0;
        this.medianhomeincomediv = 0;
        this.networthdiv = 0;
    }
    opennetworthdiv() {
        this.networthdiv = 1;
        this.maritaliv = 0;
        this.residencediv = 0;
        this.medianhomevaluediv = 0;
        this.incomediv = 0;
        this.homevaluediv = 0;
        this.medianhomeincomediv = 0;
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
    /*genderaddnumber(){
        ind_Gender_Code
    }*/

    addtoagelist(id, name , item) {
        console.log('before');
        console.log(this.selected_age);
        let tempvar= id;
        let indexval: any = this.selected_agev.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_age.push({attr_id: id, attr_name: name});
            this.selected_agev.push( id);
        }
        if(this.selected_age.length>0){
            this.agesubmenu = true;
        }
       /* else {
            this.selected_age.splice(indexval, 1);
            this.selected_agev.splice(indexval, 1);
        }
        $('#age_' + id).toggleClass('selectedclass');*/
        console.log('after');
        console.log(this.selected_age);
    }
    removefromagelist(id, name , item){
        let tempvar= id;
        let indexval: any = this.selected_agev.indexOf(tempvar);
        this.selected_age.splice(indexval, 1);
        this.selected_agev.splice(indexval, 1);
        if(this.selected_age.length==0){
            this.agesubmenu = false;
        }
    }
    addtoincomelist(id, name, item) {
        console.log('before');
        console.log(this.selected_income);
        let tempvar= id;
        let indexval: any = this.selected_incomev.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_income.push({attr_id: id, attr_name: name});
            this.selected_incomev.push( id);
        }
        /*else {
            this.selected_income.splice(indexval, 1);
            this.selected_incomev.splice(indexval, 1);
        }*/
      //  $('#income_' + id).toggleClass('selectedclass');
       // console.log('after');
       // console.log(this.selected_income);
        if(this.selected_income.length>0){
            this.incomesubmenu = true;
        }
    }
    removefromincomelist(id, name , item){
        console.log(this.selected_income);
        console.log(this.selected_incomev);
        let tempvar= id;
        let indexval: any = this.selected_incomev.indexOf(tempvar);
        this.selected_income.splice(indexval, 1);
        this.selected_incomev.splice(indexval, 1);
        console.log('After splice');
        console.log(this.selected_income);
        console.log(this.selected_incomev);
        if(this.selected_income.length==0){
            this.incomesubmenu = false;
        }
    }
    addtohomevaluelist(id, name, item) {
        console.log('before');
        console.log(this.selected_homevalue);
        let tempvar= id;
        let indexval: any = this.selected_homevaluev.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_homevalue.push({attr_id: id, attr_name: name});
            this.selected_homevaluev.push( id);
        }
        if(this.selected_homevalue.length>0){
            this.homevaluesubmenu = true;
        }
        /* else {
            this.selected_homevalue.splice(indexval, 1);
            this.selected_homevaluev.splice(indexval, 1);
        }
        $('#homevalue_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_income);*/
    }
    removefromhomevaluelist(id, name , item){
        let tempvar= id;
        let indexval: any = this.selected_homevaluev.indexOf(tempvar);
        this.selected_homevalue.splice(indexval, 1);
        this.selected_homevaluev.splice(indexval, 1);
        if(this.selected_homevalue.length==0){
            this.homevaluesubmenu = false;
        }
    }

    addtoresidence_list(id, name, item) {
        console.log(this.selected_residence);
        let tempvar= id;
        let indexval: any = this.selected_residencev.indexOf(tempvar);
        if (indexval == -1) {
            this.selected_residence.push({attr_id: id, attr_name: name});
            this.selected_residencev.push( id);
        }


       /* else {
            this.selected_residence.splice(indexval, 1);
            this.selected_residencev.splice(indexval, 1);
        }
        $('#residence_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_residence);*/
    }

    removefromresidence_list(id, name , item){

        let tempvar= id;
        let indexval: any = this.selected_residencev.indexOf(tempvar);
        this.selected_residence.splice(indexval, 1);
        this.selected_residencev.splice(indexval, 1);
        if(this.selected_residence.length==0){
            this.residencevaluesubmenu = false;
        }
    }

    addtomedianincome_list(id, name, item) {
    //    console.log(this.selected_medianincome);
        let tempvar= id;
        let indexval: any = this.selected_medianincome.indexOf(tempvar);
      //  console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_medianincome.push({attr_id: id, attr_name: name});
            this.selected_medianincomev.push( id);
        }
       /* else {
            this.selected_medianincome.splice(indexval, 1);
            this.selected_medianincomev.splice(indexval, 1);
        }
        $('#medianincomevalue_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_medianincome);*/
        if(this.selected_medianincome.length>0){
            this.medianincomesubmenu = true;
        }
    }
    removefrommedianincome_list(id, name , item){
        let tempvar= id;
        let indexval: any = this.selected_medianincomev.indexOf(tempvar);
        this.selected_medianincome.splice(indexval, 1);
        this.selected_medianincomev.splice(indexval, 1);
        if(this.selected_medianincome.length==0){
            this.medianincomesubmenu = false;
        }
    }

    addtomedianhome_list(id, name, item) {
        let tempvar= id;
        let indexval: any = this.selected_medianhomev.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_medianhome.push({attr_id: id, attr_name: name});
            this.selected_medianhomev.push( id);
        }
      /*  else {
            this.selected_medianhome.splice(indexval, 1);
            this.selected_medianhomev.splice(indexval, 1);
        }
        $('#medianhomevalue_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_medianhome);*/
        if(this.selected_medianhome.length>0){
            this.medianhomesubmenu = true;
        }
    }
    removefrommedianhome_list(id, name , item){
        let tempvar= id;
        let indexval: any = this.selected_medianhomev.indexOf(tempvar);
        this.selected_medianhome.splice(indexval, 1);
        this.selected_medianhomev.splice(indexval, 1);
        if(this.selected_medianhome.length==0){
            this.medianhomesubmenu = false;
        }
    }
    addtomarital_list(id, name, item) {
        console.log(this.selected_marital);
        let tempvar= id;
        let indexval: any = this.selected_maritalv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_marital.push({attr_id: id, attr_name: name});
            this.selected_maritalv.push( id);
        }
        if(this.selected_marital.length>0){
            this.maritalsubmenu = true;
        }
       /* else {
            this.selected_marital.splice(indexval, 1);
            this.selected_maritalv.splice(indexval, 1);
        }
        $('#marital_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_marital);*/
    }
    removefrommarital_list(id, name , item){
        let tempvar= id;
        let indexval: any = this.selected_maritalv.indexOf(tempvar);
        this.selected_marital.splice(indexval, 1);
        this.selected_maritalv.splice(indexval, 1);
        if(this.selected_marital.length==0){
            this.maritalsubmenu = false;
        }
    }
    addtonetworth_list(id, name, item) {
        let tempvar= id;
        let indexval: any = this.selected_networthv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_networth.push({attr_id: id, attr_name: name});
            this.selected_networthv.push( id);
        }
       /* else {
            this.selected_networth.splice(indexval, 1);
            this.selected_networthv.splice(indexval, 1);
        }
        $('#networth_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_networth);*/
        if(this.selected_networth.length>0){
            this.networthsubmenu = true;
        }
    }
    removefromnetworth_list(id, name , item){
        let tempvar= id;
        let indexval: any = this.selected_networthv.indexOf(tempvar);
        this.selected_networth.splice(indexval, 1);
        this.selected_networthv.splice(indexval, 1);
        if(this.selected_networth.length==0){
            this.networthsubmenu = false;
        }
    }
    callforsearch() {
        this.maporcsv_uploadmain = this.maporcsv_upload;
        this.selected_geoshapes = null;
      //  this.zipsubmenu = false;
        this.addresssubmenu = false;
        this.radiusaddressmenu = false;
        this.radiussubmenu = false;
        this.mapsubmenu = false;
        this.Physical_Statearr = null;
        this.Physical_Cityarr = null;
        this.Physical_Countryarr = null;
        this.selected_ziparr = null;
        this.geomilesorshapeslength = null;
        this.totalshapeslength = 0;
        this.Ind_Age_Codearr = null;
        this.selected_incomearr = null;
        this.selected_homevaluearr = null;
        this.selected_medianincomearr = null;
        this.selected_medianhomearr = null;
        this.selected_residencearr = null;
        this.selected_maritalarr = null;
        this.selected_networtharr = null;

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

        for (let i in this.selected_zip) {
            this.selected_ziparr = this.selected_ziparr + ',' + this.selected_zip[i];
        }
        if (this.selected_age != null) {
            for (let i in this.selected_age) {
                this.Ind_Age_Codearr = this.Ind_Age_Codearr + ',' + this.selected_age[i].attr_id;
            }
        }
        if (this.selected_income != null) {
            for (let i in this.selected_income) {
                this.selected_incomearr = this.selected_incomearr + ',' + this.selected_income[i].attr_id;
            }
        }
        if (this.selected_homevalue != null) {
            for (let i in this.selected_homevalue) {
                this.selected_homevaluearr = this.selected_homevaluearr + ',' + this.selected_homevalue[i].attr_id;
            }
        }
        if (this.selected_medianincome != null) {
            for (let i in this.selected_medianincome) {
                this.selected_medianincomearr = this.selected_medianincomearr + ',' + this.selected_medianincome[i].attr_id;
            }
        }
        if (this.selected_medianhome != null) {
            for (let i in this.selected_medianhome) {
                this.selected_medianhomearr = this.selected_medianhomearr + ',' + this.selected_medianhome[i].attr_id;
            }
        }
        if (this.selected_residence != null) {
            for (let i in this.selected_residence) {
                this.selected_residencearr = this.selected_residencearr + ',' + this.selected_residence[i].attr_id;
            }
        }
        if (this.selected_marital != null) {
            for (let i in this.selected_marital) {
                this.selected_maritalarr = this.selected_maritalarr + ',' + this.selected_marital[i].attr_id;
            }
        }
        if (this.addtonetworth_list != null) {
            for (let i in this.selected_networth) {
                this.selected_networtharr = this.selected_networtharr + ',' + this.selected_networth[i].attr_id;
            }
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
        var link;
        if(this.tabopen == 1){

           //  link = 'https://geofencedsp.com/assets/php/businesscall.php?token=' + this.tokenid;
             link = this._commonservices.businesscall+ this.tokenid;
        }
        else{
           //  link = 'https://geofencedsp.com/assets/php/callconsumer.php?token=' + this.tokenid;
            link = this._commonservices.callconsumer+ this.tokenid;
        }
        this.searchresult = null;
        this.searchcriteriais=  null;
        let data =  this.searchcriteriais = {
            Physical_State: this.Physical_Statearr,
            Physical_City: this.Physical_Cityarr,
            Vendor_State_County: this.Physical_Countryarr,
            Physical_Zip: this.selected_ziparr,
            Physical_Address: this.addressval,
            proximity: this.selected_geoshapes,
            Ind_Age_Code: this.Ind_Age_Codearr, // done
            Ind_Gender_Code: this.Ind_Gender_Code, // done
            Ind_Household_Rank_Code: this.headofhouseholdonly,
            Income_Code: this.selected_incomearr, // done
            Home_Market_Value: this.selected_homevaluearr, // done
            Median_HseHld_Income_Code: this.selected_medianincomearr, // done
            Median_Home_Value_Code: this.selected_medianhomearr, // done
            Length_Of_Residence_Code: this.selected_residencearr, // done
            Marital_Status_Code: this.selected_maritalarr, // done
            NetWorth_Code: this.selected_networtharr
        };
        console.log(data);
        if (SearchnewComponent.invalidzip==false && this.geoerror == null && this.errorvalgeomiles == null && this.errorvalgeozip == null && this.tabopen!=null) {
           /* this.ziplength = this.selected_zip.length;
            if(this.ziplength>0){
                this.zipsubmenu = true;
            }*/
           /* if(this.addressval!=null){
                this.addresssubmenu = true;
            }*/

            this.openloader = true;
            this._http.post(link, data)
                .subscribe(res => {
                    this.openloader = false;
                    this.consumer_value = res;
                 //   this.selected_zip = [];
                  //  this.geomiles = null;
                   // this.geoaddress = null;
                  //  this.geozip = null;
                  //  this.selected_geoshapes = null;
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    addresscheck(){
        if(this.addressval!=null){
            this.addresssubmenu = true;
        }else{
            this.addresssubmenu = false;
        }
    }
    radiusaddresscheck(){
        if(this.geomiles!=null && this.geoaddress!=null && this.geozip!=null){
            this.radiusaddressmenu = true;
        }else{
            this.radiusaddressmenu = false;
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
       /* else {
            this.selected_locations.splice(indexval, 1);
            this.selected_locationsv.splice(indexval, 1);
        }
        $('#state_' + id).toggleClass('selectedclass');*/
        if(this.selected_locations.length>0){
            this.statesubmenu = true;
        }
    }
    removefromstatelist(id ,name,  item) {
        let tempvar= id;
        let indexval: any = this.selected_locationsv.indexOf(tempvar);
        this.selected_locations.splice(indexval, 1);
        this.selected_locationsv.splice(indexval, 1);
        if(this.selected_locations.length==0){
            this.statesubmenu = false;
        }
    }

                                                /*For City*/

    show_cities(id) { // here id is abbreviation
      //  console.log('call?');
       // console.log(this.uscities);
        this.show_state_cities=[];
        for (let i in this.uscities) {
//            console.log(this.uscities[i]);
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
        console.log(this.selected_locationscityv);
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
        if(SearchnewComponent.invalidzip ==false){
            this.selected_zip = [];
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
            /* this.ziplength = this.selected_zip.length;
             if(this.ziplength>0){
             this.zipsubmenu = true;
             }*/
            if(this.selected_zip>0){
                this.zipsubmenu = true;
            }
        }
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
    removefromziplist(item){
        console.log('this.selected_zip--before');
        console.log(this.selected_zip);
        let indexval: any = this.selected_zip.indexOf(item);
        this.selected_zip.splice(indexval, 1);
        if(this.selected_zip.length==0){
            this.zipsubmenu = false;
        }
        console.log('this.selected_zip--after');
        console.log(this.selected_zip);
        this.zipval = this.zipval1 = this.zipval2 = this.zipval3 = this.zipval4 = null;
        for(let i in this.selected_zip){
            if(parseInt(i)==0) this.zipval = this.selected_zip[0];
            if(parseInt(i)==1) this.zipval1 = this.selected_zip[1];
            if(parseInt(i)==2) this.zipval2 = this.selected_zip[2];
            if(parseInt(i)==3) this.zipval3 = this.selected_zip[3];
            if(parseInt(i)==4) this.zipval4 = this.selected_zip[4];
        }
    }
                                              /*For Address*/
    removeaddress(){
        this.addressval = null;
    }
                                              /*For Radius Address*/
    removeradiusaddress(){
        this.geomiles = null;
        this.geoaddress = null;
        this.geozip = null;
    }

    openmapdiv(type) {
        this.maptype=type;
        this.myLatLng = { lat: 40.785091, lng: -73.968285 };
        this.modalmapShown = true;
        setTimeout(() => {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: this.myLatLng,
                zoom: 8
            });
            if(type==1){

                // just to make csv upload blank -start
                this.totalshapesnew = [];
                SearchnewComponent.totalshapes = [];
                SearchnewComponent.totalshapesnew = [];
                this.uploadarray = [];
                // just to make csv upload blank -end

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
                console.log('***********************************************************************');
                this.maporcsv_upload = 'map';
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
                    console.log('this.callpolygon(totalshapearr11111111);');
                    this.callpolygon(totalshapearr);
                  }
            }
            }
        },500);
    }
    deletepolyshape( item: any ) {
        console.log('call delt');
        let indexval: any = SearchnewComponent.totalshapes.indexOf(item);
        SearchnewComponent.totalshapes.splice(indexval, 1);
        if(SearchnewComponent.totalshapes.length==0){
            this.maporcsv_upload = null;
        }

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
        console.log('ji------------');
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
        console.log('bermudaTriangle');
        console.log(bermudaTriangle);
        bermudaTriangle.setMap(this.map);
    }
    onHidden() {
        this.modalmapShown = false;
        this.ModalShownforsearch = false;
        this.ModalShownforbusinesssearch = false;
        this.Modal_submit_search_div = false;
    }
    viewallsearch() {
        this.openloader = true;
        let timestampis = new Date().getTime();
        var link;
        if(this.tabopen==1){
            // link = 'https://geofencedsp.com/assets/php/businesssearchresults.php?token=' + this.tokenid + '&v=' + timestampis;
            link = this._commonservices.businesssearchresults + this.tokenid + '&v=' + timestampis;
        }
        else{
           //  link = 'https://geofencedsp.com/assets/php/searchresults.php?token=' + this.tokenid + '&v=' + timestampis;
             link = this._commonservices.searchresults + this.tokenid + '&v=' + timestampis;
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

    open_submit_audience_div(){
        this.Modal_submit_search_div = true;
    }
    submit_audience_search_details(formval){
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if (this.dataForm.valid){
            let timestampis = new Date().getTime();
            let link;
            let type;
            if(this.maporcsv_upload=='map' || this.maporcsv_upload=='csv' )
            this.maporcsv_uploadmain = this.maporcsv_upload;
            if(this.tabopen==1){
              //  link = 'https://geofencedsp.com/assets/php/businesssearchresults.php?token=' + this.tokenid + '&v=' + timestampis;
                link = this._commonservices.businesssearchresults + this.tokenid + '&v=' + timestampis;
            }
            else{
               // link = 'https://geofencedsp.com/assets/php/searchresults.php?token=' + this.tokenid + '&v=' + timestampis;
                link = this._commonservices.searchresults + this.tokenid + '&v=' + timestampis;
            }
            this.openloader = true;
            this._http.get(link)
                .subscribe(res => {
                    this.count_loop=0;
                    this.searchresult = res;
                    this.openloader = false;
                    if(this.searchresult != null){
                    this.call_to_save_data_to_audience(formval);
                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
        else{
            console.log('validation error');
        }
    }
    call_to_save_data_to_audience(formval){
        let link = this.serverurl + 'audienceadd';
        let data = {
            audiencename: formval.audiencename,
            audiencedescription: formval.audiencedescription,
            searchcount: this.consumer_value.count.SearchCount,
            added_by: this.mailcookiedetails,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result.id);
                this.savesearchcriteriaofaudience(result.id,formval);
            }, error => {
                console.log('Oooops!');
            });

    }
    savesearchcriteriaofaudience(id,formval){
        let link = this.serverurl + 'searchcriteriaadd';
        let searchtype;
        console.log('this.tabopen '+this.tabopen);
        if(this.tabopen==1) {searchtype = 'business';}
        else {searchtype = 'consumer';}

        let data = {
            Physical_State: this.searchcriteriais.Physical_State,
            Physical_City: this.searchcriteriais.Physical_City,
            Vendor_State_County: this.searchcriteriais.Vendor_State_County,
            Physical_Zip: this.searchcriteriais.Physical_Zip,
            Physical_Address: this.searchcriteriais.Physical_Address,
            proximity: this.searchcriteriais.proximity,
            Ind_Age_Code: this.searchcriteriais.Ind_Age_Code,
            Ind_Gender_Code: this.searchcriteriais.Ind_Gender_Code,
            Ind_Household_Rank_Code: this.searchcriteriais.Ind_Household_Rank_Code,
            Income_Code: this.searchcriteriais.Income_Code,
            Home_Market_Value: this.searchcriteriais.Home_Market_Value,
            Median_HseHld_Income_Code: this.searchcriteriais.Median_HseHld_Income_Code,
            Median_Home_Value_Code: this.searchcriteriais.Median_Home_Value_Code,
            Length_Of_Residence_Code: this.searchcriteriais.Length_Of_Residence_Code,
            Marital_Status_Code: this.searchcriteriais.Marital_Status_Code,
            NetWorth_Code: this.searchcriteriais.NetWorth_Code,
            audience_id: id,
            searchtype: searchtype,
            maporcsv_upload:this.maporcsv_uploadmain
        };
        if(data!=null){
        this._http.post(link, data)
            .subscribe(res => {
                let result : any;
                result = res;
                if(result.status=='success'){
                    this.router.navigate(['/audiencelist']);
                    //  this.call_to_save_search_result(formval,id);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    }
    call_to_save_search_result(formval,id){
        if(this.searchresult!=null){
            if(this.searchresult.length%20==0){
                this.count_loop = this.searchresult.length/20;
            }
            else{
                this.count_loop = (this.searchresult.length/20)+1;
            }
            let j = 0;
            let k = 20;
            this.i = 1;
            console.log(this.count_loop);
            for(this.i=1;this.i<=this.count_loop;this.i++){
                this.a ='';
                for(j;j<k;j++){
                    this.a = this.a + JSON.stringify(this.searchresult[this.i]);
                    //break;
                }
                j=k;
                k=k+20;
                this.call_to_server(formval,id);
            }
        }
    }
    call_to_server(formval,id){
        let link = this.serverurl + 'audiencedataadd';
        let data = {
            audiencedata: this.a,
            audience_id: id,
        };
        // console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                this.a ='';
                if(this.i > this.count_loop){
                    this.router.navigate(['/audiencelist']);
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    showmappointer1(item){
        let mappoint = item.poly_arr[0].split(' ');
        this.myLatLng = { lat: parseFloat(mappoint[1]), lng: parseFloat(mappoint[0]) };
        this.map.setCenter(this.myLatLng);
        this.map.setZoom(10);
    }
}
