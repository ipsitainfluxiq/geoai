import { Component, OnInit, NgZone, EventEmitter } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {isNumber} from "ngx-bootstrap/chronos/utils/type-checks";
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';

declare var moment: any;
declare var google: any;
declare  var $;

@Component({
    selector: 'app-audiencelist',
    templateUrl: './audiencelist.component.html',
    styleUrls: ['./audiencelist.component.css'],
    providers: [Commonservices],
})
export class AudiencelistComponent implements OnInit {
    public serverurl: any;
    public datalist: any;
    public emailcookie: CookieService;
    public alldetailcookie: CookieService;
    public mailcookiedetails;
    public cookiedetailsforalldetails_type;
    public orderbyquery: any;
    public orderbytype: any;
    public id:any;
    public pageno;
    public pagestart;
    public pageinitation;
    public totalpage;
    public showrows;
    public audienceid;
    public isModalShown: boolean = false;
    public audienceModalShown: boolean = false;
    public p: number = 1;
    public filterval='';
    
    
    //AUDIENCE EDIT START
    public uploadurl;
    public consumer_value: any;
    public audiencedetails: any;
    public mainaudiencedetails: any;
    public tokenid: any;
    public topmenu1: boolean = true;
    public topmenu2: boolean = false;
    public statesubmenu: boolean = false;
    public agesubmenu: boolean = false;
    public incomesubmenu: boolean = false;
    public homevaluesubmenu: boolean = false;
    public residencevaluesubmenu: boolean = false;
    public medianincomesubmenu: boolean = false;
    public medianhomesubmenu: boolean = false;
    public maritalsubmenu: boolean = false;
    public networthsubmenu: boolean = false;
    public tabopen: any = 1;
    public  geodiv: any = 0;
    public  infodiv: any = 0;
    public  householddiv: any = 0;
    public  interestsdiv: any = 0;
    public  statediv: any = 0;
    public usstates: any = [];
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
    public editgetmapvalues: any;
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
    public  format: any;
    public openloader = true;
    public radiusaddressmenu: boolean = false;
    public  maptype: any;
    public  maporcsv_upload;
    public  maporcsv_uploadmain;
    public dataForm: FormGroup;
    public searchcriteriais: any;
    public fb;
    //AUDIENCE EDIT END
    
    
    constructor(private _commonservices: Commonservices, emailcookie: CookieService, private _http: HttpClient, private router: Router, alldetailcookie: CookieService, fb: FormBuilder) {
        console.log('constructor');
        this.emailcookie = emailcookie ;
        this.alldetailcookie = alldetailcookie ;
        this.mailcookiedetails = this.emailcookie.get('mailcookiedetails');
        this.cookiedetailsforalldetails_type = this.alldetailcookie.get('type');
        console.log('======== '+this.cookiedetailsforalldetails_type);
        this.serverurl = _commonservices.url;
        this.uploadurl = _commonservices.uploadurl;
        this.fb = fb;
    }

    ngOnInit() {
        if(this.cookiedetailsforalldetails_type=='admin'){
            this.getAudienceListbyemail(1);
        }else{
            this.getAudienceListbyemail(2);
        }
        /*AUDIENCE SEARCH START*/
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
        /*AUDIENCE SEARCH END*/
        this.dataForm = this.fb.group({
            audiencename: ['', Validators.required],
            audiencedescription: ['', Validators.required]
        });
    }
    getAudienceListbyemail(type) {
        let link = this.serverurl + 'getaudiencelist';
        let data;
        if(type==1){ //admin
            data = {
                emailid: null
            }
        }
        else{
            data = {
                emailid: this.mailcookiedetails
            }
        }

        this._http.post(link,data)
            .subscribe(res => {
                let result: any;
                result = res;
                console.log(result.items);
                this.datalist = result.items;
            }, error => {
                console.log('Oooops!');
            });
    }

    delConfirm(id) {
        this.id = id;
        this.isModalShown = true;
    }
    onHidden() {
        this.isModalShown = false;
        this.audienceModalShown = false;
    }
    onHiddenaudienceModal(){
        this.modalmapShown = false;
    }

    audiencedel() {
        console.log('admindel');
        this.isModalShown = false;
        console.log('id got' + this.id);
        let link = this.serverurl + 'deleteaudience';
        let data = {id: this.id};
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                console.log(result);
                console.log('Data Deleted');
                if(this.cookiedetailsforalldetails_type=='admin'){
                    this.getAudienceListbyemail(1);
                }else{
                    this.getAudienceListbyemail(2);
                }
            }, error => {
                console.log('Oooops!');
            });
        setTimeout(() => {
            if(this.cookiedetailsforalldetails_type=='admin'){
                this.getAudienceListbyemail(1);
            }else{
                this.getAudienceListbyemail(2);
            }
        }, 300);
    }
    showdate(dd){
        return moment(dd).format('Do MMM YYYY');
    }
    
    
    
    //AUDIENCE EDIT START
    editaudience(id){
        this.selected_locations = [];
        this.selected_locationsv = [];
        this.selected_locationscity = [];
        this.selected_locationscityv = [];
        this.selected_locationscountry = [];
        this.selected_locationscountryv = [];
        this.selected_zip = [];
        this.selected_income=[];
        this.selected_incomev=[];
        this.selected_homevalue=[];
        this.selected_homevaluev=[];
        this.selected_residence=[];
        this.selected_residencev=[];
        this.selected_marital=[];
        this.selected_maritalv=[];
        this.selected_networth=[];
        this.selected_networthv=[];
        this.selected_medianincome=[];
        this.selected_medianincomev=[];
        this.selected_medianhome=[];
        this.selected_medianhomev=[];
        this.addressval = null;
        this.geomiles = null;
        this.geoaddress = null;
        this.geozip = null;
        this.zipval = null;
        this.zipval1 = null;
        this.zipval2 = null;
        this.zipval3 = null;
        this.zipval4 = null;
        this.Ind_Gender_Code = '';
        this.headofhouseholdonly = null;
        this.statesubmenu = false;
        this.citysubmenu = false;
        this.countrysubmenu = false;
        this.zipsubmenu = false;
        this.addresssubmenu = false;
        this.radiusaddressmenu = false;
        this.mapsubmenu = false;
        this.residencevaluesubmenu = false;
        this.incomesubmenu = false;
        this.homevaluesubmenu = false;
        this.maritalsubmenu = false;
        this.networthsubmenu = false;
        this.medianincomesubmenu = false;
        this.medianhomesubmenu = false;
        this.totalshapesnew = [];
        this.editgetmapvalues = [];
        AudiencelistComponent.totalshapes = [];


        var flag = 0;
        this.editgetmapvalues = [];
        this.audienceid = id;
        this.audienceModalShown = true;
        let link = this.serverurl + 'editaudiencedetails';
        let data = {id: id};
      //  console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                let result : any;
                result = res;
                if(result.status=='success' && result.item!= null){
                    if(result.item.searchcriteriadata!=null){
                        this.mainaudiencedetails = result.item;
                       if( this.consumer_value!=null){ this.consumer_value.count.SearchCount=this.mainaudiencedetails.searchcount;}
                        this.audiencedetails = result.item.searchcriteriadata[0];
                        console.log(this.mainaudiencedetails);
                        if(this.audiencedetails!=null){
                            console.log(this.audiencedetails.searchtype);
                            if(this.audiencedetails.searchtype=='business') {
                                this.tabopen = 1;
                                this.topmenu1 = true;
                                this.topmenu2 = false;
                            }
                            else{
                                this.tabopen = 2;
                                this.topmenu2 = true;
                                this.topmenu1 = false;
                            }
                            if (this.audiencedetails.maporcsv_upload != null) {
                                if (this.audiencedetails.maporcsv_upload == 'map') this.maporcsv_upload = 'map';
                                if (this.audiencedetails.maporcsv_upload == 'csv') this.maporcsv_upload = 'csv';
                            }
                            if (this.audiencedetails.Physical_State != null) {

                                let selected_locationstemp = [];
                                selected_locationstemp = this.audiencedetails.Physical_State.split(',');
                                this.selected_locations=[];
                                this.selected_locationsv=[];
                                for(let i in selected_locationstemp){
                                    if(selected_locationstemp[i]!='null'){
                                        for(let j in this.usstates){
                                            if(this.usstates[j].attr_id==selected_locationstemp[i]){
                                                this.selected_locations.push({attr_id:selected_locationstemp[i], attr_name: this.usstates[j].attr_name});
                                                this.selected_locationsv.push(selected_locationstemp[i]);
                                            }
                                        }
                                    }
                                }
                                    this.statesubmenu = true;
                            }
                            if (this.audiencedetails.Physical_City != null) {

                                let selected_locationscitytemp = [];
                                selected_locationscitytemp = this.audiencedetails.Physical_City.split(',');
                                this.selected_locationscity=[];
                                this.selected_locationscityv=[];
                                for(let i in selected_locationscitytemp){
                                    if(selected_locationscitytemp[i]!='null'){
                                        this.selected_locationscity.push({city:selected_locationscitytemp[i]});
                                        this.selected_locationscityv.push(selected_locationscitytemp[i]);
                                    }
                                }
                                    this.citysubmenu = true;
                            }
                            if (this.audiencedetails.Vendor_State_County != null) {
                                let selected_locationscountrytemp = [];
                                selected_locationscountrytemp = this.audiencedetails.Vendor_State_County.split(',');
                                this.selected_locationscountry=[];
                                this.selected_locationscountryv=[];
                                for(let i in selected_locationscountrytemp){
                                    if(selected_locationscountrytemp[i]!='null'){
                                        this.selected_locationscountry.push({country:selected_locationscountrytemp[i]});
                                        this.selected_locationscountryv.push(selected_locationscountrytemp[i]);
                                    }
                                }
                                    this.countrysubmenu = true;
                            }
                            if (this.audiencedetails.Physical_Zip != null) {

                                let selected_ziptemp = [];
                                selected_ziptemp = this.audiencedetails.Physical_Zip.split(',');
                                this.selected_zip=[];
                                for(let i in selected_ziptemp){
                                    if(selected_ziptemp[i]!='null'){
                                        this.selected_zip.push(selected_ziptemp[i]);
                                        if(parseInt(i)==1) this.zipval=selected_ziptemp[i];
                                        if(parseInt(i)==2) this.zipval1=selected_ziptemp[i];
                                        if(parseInt(i)==3) this.zipval2=selected_ziptemp[i];
                                        if(parseInt(i)==4) this.zipval3=selected_ziptemp[i];
                                        if(parseInt(i)==5) this.zipval4=selected_ziptemp[i];
                                    }

                                }
                                this.zipsubmenu = true;
                            }
                            if (this.audiencedetails.Physical_Address != null) {
                                this.addressval = this.audiencedetails.Physical_Address;
                                    this.addresssubmenu = true;
                            }
                            if (this.audiencedetails.proximity != null){
                                let mapregex = /^#POLYGON#.*$/;
                                if (mapregex.test(this.audiencedetails.proximity)) {
                                   // if(this.audiencedetails.maporcsv_upload=='map'){
                                    console.log('matched');
                                    this.myLatLng = { lat: 40.785091, lng: -73.968285 };
                                    this.modalmapShown = true;
                                    this.maptype=1;
                                    setTimeout(() => {

                                        /* this.map = new google.maps.Map(document.getElementById('map'), {
                                    center: this.myLatLng,
                                    zoom: 8
                                });

                                this.drawingManager = new google.maps.drawing.DrawingManager({
                                    drawingMode: google.maps.drawing.OverlayType.POLYGON,
                                    drawingControl: true,
                                    drawingControlOptions: {
                                        position: google.maps.ControlPosition.TOP_CENTER,
                                        drawingModes: ['polygon']
                                    }
                                });
                                this.drawingManager.setMap(this.map);
                                google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
                                    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
                                        AudiencelistComponent.ctype = event.type;
                                        AudiencelistComponent.poly_arr = event.overlay.getPath().getArray();
                                    }
                                });*/
                                       AudiencelistComponent.totalshapes = [];
                                       let mapproximity = this.audiencedetails.proximity.split('|');
                                       mapproximity.splice(0,1);
                                       for (let i in mapproximity){
                                           let mapproximitylatlng = mapproximity[i].split(',');
                                           AudiencelistComponent.totalshapes.push({
                                               type: 'polygon',
                                               poly_arr: mapproximitylatlng
                                           });
                                       }
                                       this.totalshapesnew = AudiencelistComponent.totalshapes;
                                       console.log(AudiencelistComponent.totalshapes);
                                       this.editgetmapvalues = this.totalshapesnew;
                                        this.mapsubmenu = true;
                                       this.openmapdiv(1);
                         /*       if ((AudiencelistComponent.totalshapes.length) > 0) {
                                    for (let i in AudiencelistComponent.totalshapes) {
                                        var totalshapearr = [];
                                        for(let j in AudiencelistComponent.totalshapes[i].poly_arr){
                                            var spl = AudiencelistComponent.totalshapes[i].poly_arr[j].split(" ");
                                            var obj={
                                                lat:parseFloat(spl[0]),
                                                lng:parseFloat(spl[1]),
                                            }
                                            totalshapearr.push(obj);
                                        }
                                        this.callpolygon(totalshapearr);
                                    }
                                }*/
                            },300);
                                    /*}
                                    else{

                                    }*/
                        }
                        else{
                            console.log('not matched');
                            let address_radius_zip = this.audiencedetails.proximity.split('|');
                            this.geomiles = address_radius_zip[0];
                            this.geoaddress = address_radius_zip[1];
                            this.geozip = address_radius_zip[2];
                            this.radiusaddressmenu = true;
                            console.log(this.geomiles);
                            console.log(this.geoaddress);
                            console.log(this.geozip);
                        }
                        }
                            if (this.audiencedetails.Ind_Gender_Code != '') {
                                if(this.audiencedetails.Ind_Gender_Code=='M')this.Ind_Gender_Code='M';
                                if(this.audiencedetails.Ind_Gender_Code=='F')this.Ind_Gender_Code='F';
                                if(this.audiencedetails.Ind_Gender_Code=='U')this.Ind_Gender_Code='U';
                            }
                            if (this.audiencedetails.Ind_Age_Code != null) {
                                let selectedagetemp = [];
                                selectedagetemp = this.audiencedetails.Ind_Age_Code.split(',');
                                this.selected_age=[];
                                this.selected_agev=[];
                                for(let i in selectedagetemp){
                                    if(selectedagetemp[i]!='null'){
                                        for(let j in this.age_list){
                                            if(this.age_list[j].code==selectedagetemp[i]){
                                                this.selected_age.push({attr_id: selectedagetemp[i], attr_name: this.age_list[j].value});
                                                this.selected_agev.push(selectedagetemp[i]);
                                            }
                                        }
                                    }
                                }
                            }
                            if (this.audiencedetails.Ind_Household_Rank_Code != '') {
                                if(this.audiencedetails.Ind_Household_Rank_Code=='0, 1, 2, 3, 4, 5, 6, 7, 8, 9')this.headofhouseholdonly='0, 1, 2, 3, 4, 5, 6, 7, 8, 9';
                                if(this.audiencedetails.Ind_Household_Rank_Code=='1')this.headofhouseholdonly='1';
                            }
                            if (this.audiencedetails.Income_Code != null) {
                                let selected_incometemp = [];
                                selected_incometemp = this.audiencedetails.Income_Code.split(',');
                                this.selected_income=[];
                                this.selected_incomev=[];
                                for(let i in selected_incometemp){
                                    if(selected_incometemp[i]!='null'){
                                        for(let j in this.incomelist){
                                            if(this.incomelist[j].code==selected_incometemp[i]){
                                                this.selected_income.push({attr_id: selected_incometemp[i], attr_name: this.incomelist[j].value});
                                                this.selected_incomev.push(selected_incometemp[i]);
                                            }
                                        }
                                    }
                                }
                                this.incomesubmenu = true;
                            }
                            if (this.audiencedetails.Home_Market_Value != null) {
                                let selected_homevaluetemp = [];
                                selected_homevaluetemp = this.audiencedetails.Home_Market_Value.split(',');
                                this.selected_homevalue=[];
                                this.selected_homevaluev=[];
                                for(let i in selected_homevaluetemp){
                                    if(selected_homevaluetemp[i]!='null'){
                                        for(let j in this.home_value_list){
                                            if(this.home_value_list[j].code==selected_homevaluetemp[i]){
                                                this.selected_homevalue.push({attr_id: selected_homevaluetemp[i], attr_name: this.home_value_list[j].value});
                                                this.selected_homevaluev.push(selected_homevaluetemp[i]);
                                            }
                                        }
                                    }
                                }
                                this.homevaluesubmenu = true;
                            }
                            if (this.audiencedetails.Length_Of_Residence_Code != null) {
                                let selected_residencetemp = [];
                                selected_residencetemp = this.audiencedetails.Length_Of_Residence_Code.split(',');
                                this.selected_residence=[];
                                this.selected_residencev=[];
                                for(let i in selected_residencetemp){
                                    if(selected_residencetemp[i]!='null'){
                                        for(let j in this.residence_list){
                                            if(this.residence_list[j].code==selected_residencetemp[i]){
                                                this.selected_residence.push({attr_id: selected_residencetemp[i], attr_name: this.residence_list[j].value});
                                                this.selected_residencev.push(selected_residencetemp[i]);
                                            }
                                        }
                                    }
                                }
                                this.residencevaluesubmenu = true;
                            }
                            if (this.audiencedetails.Marital_Status_Code != null) {
                                let selected_maritaltemp = [];
                                selected_maritaltemp = this.audiencedetails.Marital_Status_Code.split(',');
                                this.selected_marital=[];
                                this.selected_maritalv=[];
                                for(let i in selected_maritaltemp){
                                    if(selected_maritaltemp[i]!='null'){
                                        for(let j in this.marital_list){
                                            if(this.marital_list[j].code==selected_maritaltemp[i]){
                                                this.selected_marital.push({attr_id: selected_maritaltemp[i], attr_name: this.marital_list[j].value});
                                                this.selected_maritalv.push(selected_maritaltemp[i]);
                                            }
                                        }
                                    }
                                }
                                this.maritalsubmenu = true;
                            }
                            if (this.audiencedetails.NetWorth_Code != null) {
                                let selected_networthtemp = [];
                                selected_networthtemp = this.audiencedetails.NetWorth_Code.split(',');
                                this.selected_networth=[];
                                this.selected_networthv=[];
                                for(let i in selected_networthtemp){
                                    if(selected_networthtemp[i]!='null'){
                                        for(let j in this.networth_list){
                                            if(this.networth_list[j].code==selected_networthtemp[i]){
                                                this.selected_networth.push({attr_id: selected_networthtemp[i], attr_name: this.networth_list[j].value});
                                                this.selected_networthv.push(selected_networthtemp[i]);
                                            }
                                        }
                                    }
                                }
                                this.networthsubmenu = true;
                            }
                            if (this.audiencedetails.Median_HseHld_Income_Code != null) {
                                let selected_medianincometemp = [];
                                selected_medianincometemp = this.audiencedetails.Median_HseHld_Income_Code.split(',');
                                this.selected_medianincome=[];
                                this.selected_medianincomev=[];
                                for(let i in selected_medianincometemp){
                                    if(selected_medianincometemp[i]!='null'){
                                        for(let j in this.median_income_list){
                                            if(this.median_income_list[j].code==selected_medianincometemp[i]){
                                                this.selected_medianincome.push({attr_id: selected_medianincometemp[i], attr_name: this.median_income_list[j].value});
                                                this.selected_medianincomev.push(selected_medianincometemp[i]);
                                            }
                                        }
                                    }
                                }
                                this.medianincomesubmenu = true;
                            }
                            if (this.audiencedetails.Median_Home_Value_Code != null) {
                                let selected_medianhometemp = [];
                                selected_medianhometemp = this.audiencedetails.Median_HseHld_Income_Code.split(',');
                                this.selected_medianhome=[];
                                this.selected_medianhomev=[];
                                for(let i in selected_medianhometemp){
                                    if(selected_medianhometemp[i]!='null'){
                                        for(let j in this.median_income_list){
                                            if(this.median_income_list[j].code==selected_medianhometemp[i]){
                                                this.selected_medianhome.push({attr_id: selected_medianhometemp[i], attr_name: this.median_income_list[j].value});
                                                this.selected_medianhomev.push(selected_medianhometemp[i]);
                                            }
                                        }
                                    }
                                }
                                this.medianhomesubmenu = true;
                            }
                        }
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    getjson() {
        this.totalshapesnew = [];
        AudiencelistComponent.totalshapes = [];
        AudiencelistComponent.totalshapesnew = [];
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
        this.openloader = true;
        for(let i in this.uploadarray){
            AudiencelistComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0 , 0.0099779328));
            AudiencelistComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , -0.0099779328 , 0.0099779328));
            AudiencelistComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , -0.0099779328 , -0.0099779328));
            AudiencelistComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0 , -0.0099779328));
            AudiencelistComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0.0099779328 , -0.0099779328));
            AudiencelistComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0.0099779328 , 0.0099779328));
            AudiencelistComponent.totalshapesnew.push(this.addressval_1(this.uploadarray[i][2] , this.uploadarray[i][1] , 0 , 0.0099779328));
            AudiencelistComponent.totalshapes.push({
                type: 'polygon',
                poly_arr: AudiencelistComponent.totalshapesnew
            });
            AudiencelistComponent.totalshapesdemo.push({
                type: 'polygon',
                poly_arr: AudiencelistComponent.totalshapesnew
            });

            AudiencelistComponent.totalshapesnew=[];
            if ((AudiencelistComponent.totalshapesdemo.length) > 0) {
                for (let i in AudiencelistComponent.totalshapesdemo) {
                    var totalshapearr = [];
                    for(let j in AudiencelistComponent.totalshapesdemo[i].poly_arr){
                        var spl = AudiencelistComponent.totalshapesdemo[i].poly_arr[j].split(" ");
                        var obj={
                            lat:parseFloat(spl[0]),
                            lng:parseFloat(spl[1]),
                        }
                        totalshapearr.push(obj);
                    }
                    console.log('this.callpolygon(totalshapearr11111111)' + i);
                    this.callpolygon(totalshapearr);
                }
                AudiencelistComponent.totalshapesdemo=[];
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
    callpolygon(path) {
        console.log('ji-----??????????????????????-------');
        var PolyCoords = [];
        for (let j in path) {
            PolyCoords.push({
                lat: path[j].lng,
                lng: path[j].lat
            });
        }
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
    showmappointer(item){
        this.myLatLng = { lat: item[1], lng: item[2] };
        this.map.setCenter(this.myLatLng);
        this.map.setZoom(19);
    }
    deletebeforeimport( item: any ) {
        let indexval: any = this.uploadarray.indexOf(item);
        this.uploadarray.splice(indexval, 1);
    }
    opengeodiv(val) {
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
        console.log(indexval);
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
        if(this.selected_residence.length>0){
            this.residencevaluesubmenu = true;
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
    addtolist(id, name , item) {
        this.statesubmenu = false;
        let tempvar= id;
        let indexval: any = this.selected_locationsv.indexOf(tempvar);
        if (indexval == -1) {
            this.selected_locations.push({attr_id: id, attr_name: name});
            this.selected_locationsv.push( id);
        }
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
    show_cities(id) {
        this.show_state_cities=[];
        for (let i in this.uscities) {
            if (this.uscities[i].short_state == id) {
                this.show_state_cities.push(this.uscities[i]);
            }
        }
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
        if(this.selected_locationscity.length>0){
            this.citysubmenu = true;
        }
    }
    removefromcitylist(city , item) {
        let tempvar= city;
        let indexval: any = this.selected_locationscityv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        this.selected_locationscity.splice(indexval, 1);
        this.selected_locationscityv.splice(indexval, 1);
        if(this.selected_locationscity.length==0){
            this.citysubmenu = false;
        }
    }
    show_countries(id) {
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
    zipvalidate(val){
        AudiencelistComponent.zipvalidation(val);
        if(AudiencelistComponent.invalidzip ==false){
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
            if(this.selected_zip>0){
                this.zipsubmenu = true;
            }
        }
    }
    static zipvalidation(val) {
        AudiencelistComponent.invalidzip = false;
        if( (!val.match(/^[0-9]{3}$/)) && (!val.match(/^[0-9]{5}$/)) && (val.length!=0) ){
            AudiencelistComponent.invalidzip = true;
        }
    }
    getzip(type: any) {
        if (type == 'invalid') {
            return AudiencelistComponent.invalidzip;
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
    removeaddress(){
        this.addressval = null;
    }
    removeradiusaddress(){
        this.geomiles = null;
        this.geoaddress = null;
        this.geozip = null;
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
        AudiencelistComponent.totalshapesnew=[];
        AudiencelistComponent.totalshapes=[];
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
        this.callforsearch();
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
        console.log('AudiencelistComponent.totalshapes just before search');
        console.log(AudiencelistComponent.totalshapes);
        if (AudiencelistComponent.totalshapes != null) {
            for (let i in AudiencelistComponent.totalshapes) {
                if (AudiencelistComponent.totalshapes[i].type == 'polygon') {
                    console.log('hi');
                    console.log(this.selected_geoshapes);
                    if (this.selected_geoshapes == null) {
                        this.selected_geoshapes = '#POLYGON#|' + AudiencelistComponent.totalshapes[i].poly_arr;
                    }
                    else {
                        this.selected_geoshapes = this.selected_geoshapes + '|' + AudiencelistComponent.totalshapes[i].poly_arr;
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
           // link = 'https://geofencedsp.com/assets/php/callconsumer.php?token=' + this.tokenid;
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
            Ind_Age_Code: this.Ind_Age_Codearr,
            Ind_Gender_Code: this.Ind_Gender_Code,
            Ind_Household_Rank_Code: this.headofhouseholdonly,
            Income_Code: this.selected_incomearr,
            Home_Market_Value: this.selected_homevaluearr,
            Median_HseHld_Income_Code: this.selected_medianincomearr,
            Median_Home_Value_Code: this.selected_medianhomearr,
            Length_Of_Residence_Code: this.selected_residencearr,
            Marital_Status_Code: this.selected_maritalarr,
            NetWorth_Code: this.selected_networtharr
        };
        console.log(data);
        if (AudiencelistComponent.invalidzip==false && this.geoerror == null && this.errorvalgeomiles == null && this.errorvalgeozip == null && this.tabopen!=null) {
            this.openloader = true;
            this._http.post(link, data)
                .subscribe(res => {
                    this.openloader = false;
                    this.consumer_value = res;
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    viewallsearch() {
        this.openloader = true;
        let timestampis = new Date().getTime();
        var link;
        if(this.tabopen==1){
          //  link = 'https://geofencedsp.com/assets/php/businesssearchresults.php?token=' + this.tokenid + '&v=' + timestampis;
            link = this._commonservices.businesssearchresults+ this.tokenid+ '&v=' + timestampis;
        }
        else{
           // link = 'https://geofencedsp.com/assets/php/searchresults.php?token=' + this.tokenid + '&v=' + timestampis;
            link = this._commonservices.searchresults+ this.tokenid+ '&v=' + timestampis;
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
                this.totalshapesnew = [];
                AudiencelistComponent.totalshapes = [];
                AudiencelistComponent.totalshapesnew = [];

                if(this.editgetmapvalues.length>0){
                this.totalshapesnew = this.editgetmapvalues;
                AudiencelistComponent.totalshapes= this.editgetmapvalues;
                }

                this.uploadarray = [];
                this.drawingManager = new google.maps.drawing.DrawingManager({
                    drawingMode: google.maps.drawing.OverlayType.POLYGON,
                    drawingControl: true,
                    drawingControlOptions: {
                        position: google.maps.ControlPosition.TOP_CENTER,
                        drawingModes: ['polygon']
                    }
                });
                this.drawingManager.setMap(this.map);
                google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
                    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
                        AudiencelistComponent.ctype = event.type;
                        AudiencelistComponent.poly_arr = event.overlay.getPath().getArray();
                        AudiencelistComponent.poly_arr1 = [];
                        AudiencelistComponent.poly_arr1 = event.overlay.getPath().getArray();
                        for (let i in AudiencelistComponent.poly_arr1) {
                            AudiencelistComponent.totalshapesnew.push(AudiencelistComponent.poly_arr1[i].lng() + ' ' + AudiencelistComponent.poly_arr1[i].lat());
                        }
                        AudiencelistComponent.totalshapesnew.push(AudiencelistComponent.poly_arr[0].lng() + ' ' + AudiencelistComponent.poly_arr[0].lat());
                        AudiencelistComponent.poly_arr = AudiencelistComponent.totalshapesnew;
                        AudiencelistComponent.totalshapes.push({
                            type: AudiencelistComponent.ctype,
                            poly_arr: AudiencelistComponent.totalshapesnew
                        });
                        AudiencelistComponent.totalshapesnew=[];
                    }
                    console.log('AudiencelistComponent.totalshapes++------+');
                    console.log(AudiencelistComponent.totalshapes);
                    this.totalshapesnew = AudiencelistComponent.totalshapes;
                    console.log('***********************************************************************');
                    this.maporcsv_upload = 'map';
                });
                if ((AudiencelistComponent.totalshapes.length) > 0) {
                    for (let i in AudiencelistComponent.totalshapes) {
                        var totalshapearr = [];
                        for(let j in AudiencelistComponent.totalshapes[i].poly_arr){
                            var spl = AudiencelistComponent.totalshapes[i].poly_arr[j].split(" ");
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
        let indexval: any = AudiencelistComponent.totalshapes.indexOf(item);
        AudiencelistComponent.totalshapes.splice(indexval, 1);
        if(AudiencelistComponent.totalshapes.length==0){
            this.maporcsv_upload = null;
        }
    }
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

    open_submit_audience_div(){
        this.Modal_submit_search_div = true;
        this.dataForm = this.fb.group({
            audiencename: [this.mainaudiencedetails.audiencename, Validators.required],
            audiencedescription: [this.mainaudiencedetails.audiencedescription, Validators.required]
        });
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
             //   link = 'https://geofencedsp.com/assets/php/businesssearchresults.php?token=' + this.tokenid + '&v=' + timestampis;
                link = this._commonservices.businesssearchresults+ this.tokenid+ '&v=' + timestampis;
            }
            else{
              //  link = 'https://geofencedsp.com/assets/php/searchresults.php?token=' + this.tokenid + '&v=' + timestampis;
                link = this._commonservices.searchresults+ this.tokenid+ '&v=' + timestampis;
            }
            this.openloader = true;
            this._http.get(link)
                .subscribe(res => {
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
        let link = this.serverurl + 'audienceedit';
        let data = {
            audienceid: this.audienceid,
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
                this.savesearchcriteriaofaudience(formval);
            }, error => {
                console.log('Oooops!');
            });

    }
    savesearchcriteriaofaudience(formval){
        let link = this.serverurl + 'searchcriteriaedit';
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
            audience_id: this.audienceid,
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
    showmappointer1(item){
       let mappoint = item.poly_arr[0].split(' ');
        this.myLatLng = { lat: parseFloat(mappoint[1]), lng: parseFloat(mappoint[0]) };
        this.map.setCenter(this.myLatLng);
        this.map.setZoom(19);
    }
}
