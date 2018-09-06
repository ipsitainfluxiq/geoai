import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';
import {DomSanitizer} from '@angular/platform-browser';
declare var google: any;
import { Router, ActivatedRoute, Params } from '@angular/router';
declare  var $;
@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.css'],
    providers: [Commonservices]
})
export class LocationsComponent implements OnInit {
    public selected_locations: any = [];
    public selected_locationsv: any = [];
    public selected_locationscityv: any = [];
    public selected_locationscountry: any = [];
    public selected_locationscountryv: any = [];
    public selected_agev: any = [];
    public selected_locationscity: any = [];
    public selected_age: any = [];
    public selected_income: any = [];
    public selected_zip: any = [];
    public selected_areacode: any = [];
    public selected_incomev: any = [];
    public selected_networth: any = [];
    public selected_networthv: any = [];
    public selected_homevalue: any = [];
    public selected_homevaluev: any = [];
    public selected_marital: any = [];
    public selected_maritalv: any = [];
    public selected_residence: any = [];
    public selected_residencev: any = [];
    public selected_medianhome: any = [];
    public selected_medianhomev: any = [];
    public selected_medianincome: any = [];
    public selected_medianincomev: any = [];
    public parent_locations: any = [];
    public child_locations: any = [];
    public child_locations_level2: any = [];
    public details: any = [];
    public details1: any = [];
    public details2: any = [];
    public addcookie: CookieService;
    public cookiedetails;
    public emailcookie: CookieService;
    public mailcookiedetails;
    public serverurl: any;
    public datalist: any;
    public count: any;
    public result: any;
    public http;
    map: any;
    type: any;
    datanew: any = [];
    drawingManager: any;
    static ctype;
    static cradius;
    static ccenter;
    static ne_lat;
    static ne_lng;
    static sw_lat;
    static sw_lng;
    static poly_arr = [];
    static totalshapes = [];
    static totalshapesnew = [];
    public currentval: any = [];
    public nameval: any = [];
    public locationnameforreverse: any;
    public locationidforreverse: any;
    public rand1: number;
    public uploadjson: any;
    public zone: NgZone;
    public basicOptions: Object;
    public uploadedfilesrc: any;
    public filenameis: any;
    public response: any = {};
    public  r_earth;
    public  lng;
    public  lat;
    public  pi;
    public  geodiv: any = 0;
    public  shapes: any = [];
    paths = [];
    public addressoflatlng = [];
    public inserttype: any;
    public showfencediv: any;
    public showlocationdiv: any;
    public error: any;
    public openloader: any;
    public loadervalue: any;
    public excessdataerror: any;
    public showsearchdiv: any;
    public Physical_State: any = '';
    public Ind_Ethnic_Code: any = '';
    public tokenid: any;
    public searchcriteriadiv: any = 0;
    public Income_Code: any = '';
    public Ind_Gender_Code: any = '';
    public Ind_Age_Code: any = '';
    public Home_Equity_Available_Code: any = '';
    public consumer_value: any;
    public searchresult: any;
    public Length_Of_Residence_Code: any = '';
    public Marital_Status_Code: any = '';
    public usstates: any = [];
    public uscities: any = [];
    public show_state_cities: any = [];
    public show_state_countries: any = [];
    public show_state_cities1: any = [];
    public ind_ethnic_allcodes: any = [];
    public incomelist: any = [];
    public median_income_list: any = [];
    public home_value_list: any = [];
    public median_home_value_list: any = [];
    public marital_list: any = [];
    public Physical_Statearr: any;
    public Physical_Cityarr: any;
    public Physical_Countryarr: any;
    public Ind_Age_Codearr: any;
    public Ziparr: any;
    public selected_incomearr: any;
    public selected_ziparr: any;
    public selected_areacodearr: any;
    public selected_geoaddressarr: any;
    public selected_networtharr: any;
    public selected_geoshapes: any;
    public selected_homevaluearr: any;
    public selected_maritalarr: any;
    public selected_residencearr: any;
    public selected_headofhouseholdall: any;
    public selected_medianhomearr: any;
    public selected_medianincomearr: any;
    public age_list: any = [];
    public selected_geoshapesarr: any = [];
    public networth_list: any = [];
    public residence_list: any = [];
    public isModalShownforsearch: boolean = false;
    public namediv: any = 0;
    public phonediv: any = 0;
    public infodiv: any = 0;
    public householddiv: any = 0;
    public interestsdiv: any = 0;
    public statediv: any = 0;
    public userphonediv: any = 0;
    public citydiv: any = 0;
    public countrydiv: any = 0;
    public agediv: any = 0;
    public genderdiv: any = 0;
    public incomediv: any = 0;
    public fullnamediv: any = 0;
    public networthdiv: any = 0;
    public homevaluediv: any = 0;
    public addressdiv: any = 0;
    public radiusdiv: any = 0;
    public mapdiv: any = 0;
    public individualhouseholddiv: any = 0;
    public maritaliv: any = 0;
    public residencediv: any = 0;
    public medianhomevaluediv: any = 0;
    public medianhomeincomediv: any = 0;
    public zipdiv: any = 0;
    public areacodediv: any = 0;
    public fname: any;
    public mname: any;
    public lname: any;
    public phoneval: any;
    public zipval: any;
    public zipval1: any;
    public zipval2: any;
    public zipval3: any;
    public zipval4: any;
    public areacodeval: any;
    public areacodeval1: any;
    public areacodeval2: any;
    public areacodeval3: any;
    public areacodeval4: any;
    public phoneerror: any;
    public geoerror: any;
    public ziperror: any;
    public errorvalgeomiles: any;
    public errorvalgeozip: any;
    public areacodeerror: any;
    public headofhouseholdonly: any;
    public addressval: any;
    public geomiles: any;
    public geoaddress: any;
    public geozip: any;
/*    selected :any;
    select(item) {
        this.selected = item;
    };
    isActive(item) {
        return this.selected === item;
    };*/
    constructor(addcookie: CookieService, emailcookie: CookieService, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices, public _sanitizer: DomSanitizer) {
      //  this.ind_ethnic_allcodes = ['A1', 'A2', 'A3', 'A4', 'A5', 'D1', 'D2', 'D3', 'D4', 'D5'];
        this.ind_ethnic_allcodes = [
            {'code': 'A1', 'value': 'African American - Arab Surname In Neighborhood With 80% Or Greater Concentration Of African Americans'},
            {'code': 'A2', 'value': 'African American - Arab Surname In Neighborhood With 70 To 79% Concentration Of African Americans'},
            {'code': 'A3', 'value': 'African American - Arab Surname In Neighborhood With 60 To 69% Concentration Of African Americans'},
            {'code': 'A4', 'value': 'African American - Arab Surname In Neighborhood With 50 To 59% Concentration Of African Americans'},
            {'code': 'A5', 'value': 'African American - Arab Surname In Neighborhood With 30 To 49% Concentration Of African Americans'},
            {'code': 'D1', 'value': 'African American - Dutch Surname In Neighborhood With 80% Or Greater Concentration Of African Americans'},
            {'code': 'D2', 'value': 'African American - Dutch Surname In Neighborhood With 70 To 79% Concentration Of African Americans'},
            {'code': 'D3', 'value': 'African American - Dutch Surname In Neighborhood With 60 To 69% Concentration Of African Americans'},
            {'code': 'D4', 'value': 'African American - Dutch Surname In Neighborhood With 50 To 59% Concentration Of African Americans'},
            {'code': 'D5', 'value': 'African American - Dutch Surname In Neighborhood With 30 To 49% Concentration Of African Americans'}
            ];

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

        console.log('length is ' + this.addressoflatlng.length);
        this.addcookie = addcookie;
        this.datanew = [];
        this.locationnameforreverse = 'Selectable Locations';
        this.count = 0;
        this.currentval.push(0);
        this.nameval.push(0);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log(this.mailcookiedetails);
        this.serverurl = _commonservices.url;
      /*  if (this.cookiedetails == null || this.cookiedetails == '' || typeof (this.cookiedetails) == 'undefined') {
            console.log('create it');
            this.createcampaign();
        } else {
            console.log('do nothing');*/
            this.getshapes();
       // }
        this.getLocation();
        this.uploadjson = false;
        this.showlocationdiv = 0;
        this.showfencediv = 1;
        this.showsearchdiv = 0;
        this.lng = -81.74123564;
        this.lat = 25.96782579;
        this.pi = 3.14159;
        this.r_earth = 6378;
        this.getusstates();
        this.searchcriteria();
        setTimeout(() => {
            this.callforsearch();
        }, 3000);
        this.getuscities();
    }
    hi() {
        this.showlocationdiv = (1 - this.showlocationdiv);
        this.showfencediv = (1 - this.showfencediv);
    }

    createcampaign() {
        console.log('Create called');
        this.rand1 = Math.round((Math.random() * 100) * 100);
        let link = this.serverurl + 'checkcreateaudienceid';
        let data = {
            randomvar: this.rand1,
        }
        this._http.post(link, data)
            .subscribe(res => {
                this.result = res;
                console.log(this.result.status);
                if (this.result.status == 'success') {
                    this.calltocreate();
                }
                else {
                    this.createcampaign();
                }
            }, err => {
                console.log('Ooops');
            } );
    }
    calltocreate() {
        console.log('created');
        this.addcookie.putObject('cookiedetails', this.rand1);
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('after putobject ' + this.cookiedetails);
        this.getshapes();
    }
    ngOnInit() {

        this.zone = new NgZone({enableLongStackTrace: false});
        this.basicOptions = {
            url: this.serverurl + 'uploads'
        };

        this.datanew = [];
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.785091, lng: -73.968285 },
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
                LocationsComponent.ctype = event.type;
                LocationsComponent.poly_arr = event.overlay.getPath().getArray();

                for (let i in LocationsComponent.poly_arr) {
                    console.log(LocationsComponent.poly_arr[i].lat());
                    console.log(LocationsComponent.poly_arr[i].lng());
                    LocationsComponent.totalshapesnew.push(LocationsComponent.poly_arr[i].lng() + ' ' + LocationsComponent.poly_arr[i].lat());
                }
                LocationsComponent.totalshapesnew.push(LocationsComponent.poly_arr[0].lng() + ' ' + LocationsComponent.poly_arr[0].lat());
                console.log('LocationsComponent ' +  LocationsComponent.totalshapesnew) ;
                LocationsComponent.poly_arr = LocationsComponent.totalshapesnew; // added new
                LocationsComponent.totalshapes.push({
                    type: LocationsComponent.ctype,
                    poly_arr: LocationsComponent.poly_arr
                });

            }

            if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
                // alert(event.overlay.getBounds());
            }
            if (event.type === google.maps.drawing.OverlayType.RECTANGLE) {
                LocationsComponent.ctype = event.type;
                LocationsComponent.ne_lat = event.overlay.getBounds().getNorthEast().lat();
                LocationsComponent.ne_lng = event.overlay.getBounds().getNorthEast().lng();
                LocationsComponent.sw_lat = event.overlay.getBounds().getSouthWest().lat();
                LocationsComponent.sw_lng = event.overlay.getBounds().getSouthWest().lng();
                LocationsComponent.totalshapes.push({
                    type: LocationsComponent.ctype,
                    ne_lat: LocationsComponent.ne_lat,
                    ne_lng: LocationsComponent.ne_lng,
                    sw_lat: LocationsComponent.sw_lat,
                    sw_lng: LocationsComponent.sw_lng,
                });
                console.log('LocationsComponent.totalshapes');
                console.log(LocationsComponent.totalshapes);
            }
            this.inserttype = 0;
        });

        google.maps.event.addListener(this.drawingManager, 'circlecomplete', function (circle) {
            var radius = circle.getRadius();
            //  alert(radius);

        });
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
            if (event.type == 'circle') {
                LocationsComponent.ctype = event.type;
                LocationsComponent.cradius = event.overlay.getRadius();
                LocationsComponent.ccenter = event.overlay.getCenter();
                LocationsComponent.totalshapes.push({
                    type: LocationsComponent.ctype,
                    cradius: LocationsComponent.cradius,
                    ccenter: LocationsComponent.ccenter,
                });
            }
            this.inserttype = 0;
        });
        //  this.addparentlocation();
        // this.callparentlocation();
    }



    deletelocations(id, name, item) {
        console.log('deletelocations==================');
        console.log(this.selected_locations);
        console.log(id);
        let indexval: any = this.selected_locations.indexOf(item);
        console.log('-----------------');
        console.log(indexval);
        this.selected_locations.splice(indexval, 1);
        console.log(this.selected_locations);
    }
    getjson() {
        this.uploadjson = (1 - this.uploadjson);
    }

    handleUpload(data: any): void
    {
        this.loadervalue = true;
        console.log('hi' + this.loadervalue);
        console.log(data);
        this.zone.run(() => {
            this.response = data;
            let resp = data.response;
            console.log('resp');
            console.log((resp));
            console.log(typeof(resp));
            if (typeof(resp) != 'undefined') {
                let result = (data.response);
                console.log('result');
                console.log(result);
                if (result.length > 1) {
                    this.uploadedfilesrc = '../../assets/uploads/' + resp.replace(/"/g, '');
                    console.log('upload file location' + this.uploadedfilesrc);
                    this.filenameis = resp.replace(/"/g, '');
                    let link1 = this.serverurl + 'readcsv';
                    //  let link1 = 'http://influxiq.com:3004/readcsv';
                    let datam = {
                        filenameis: this.filenameis
                    }
                    this._http.post(link1, datam)
                        .subscribe(res => {
                            let resultvalue: any;
                             resultvalue = res;
                            console.log('Success!');
                            console.log('lat lang of csv -');
                            console.log(resultvalue);
                            console.log('+++++++++');
                            if (resultvalue.flag == 1) {
                                for (let i in resultvalue.msg) {
                                    var ne = this.addressval_1(resultvalue.msg[i].lat, resultvalue.msg[i].lng, -0.0099779328 , -0.0099779328);
                                    var sw = this.addressval_1(resultvalue.msg[i].lat, resultvalue.msg[i].lng, 0.0099779328 , 0.0099779328);
                                    console.log('ne is: ');
                                    console.log(ne);
                                    console.log('sw is: ');
                                    console.log(sw);
                                    let latlngs = {
                                        ne_lat: ne.lat,
                                        sw_lat: sw.lat,
                                        ne_lng: sw.lng,
                                        sw_lng: ne.lng,
                                        address: resultvalue.msg[i].address,
                                        csvlat: resultvalue.msg[i].lat,
                                        csvlng: resultvalue.msg[i].lng
                                    };
                                    this.callrectangle(latlngs,1);
                                }
                                this.excessdataerror = '';
                            }
                            if (resultvalue.flag == 0) {
                                this.excessdataerror = resultvalue.msg;
                            }
                            if (resultvalue.flag == 2) {
                                this.excessdataerror = resultvalue.msg;
                            }
                          /*  for (let i in resultvalue) {
                                var ne = this.addressval_1(resultvalue[i].lat, resultvalue[i].lng, -0.0099779328 , -0.0099779328);
                                var sw = this.addressval_1(resultvalue[i].lat, resultvalue[i].lng, 0.0099779328 , 0.0099779328);
                                console.log('ne is: ');
                                console.log(ne);
                                console.log('sw is: ');
                                console.log(sw);
                                let latlngs = {
                                    ne_lat: ne.lat,
                                    sw_lat: sw.lat,
                                    ne_lng: sw.lng,
                                    sw_lng: ne.lng
                                };
                                this.callrectangle(latlngs,1);
                            }*/
                            this.inserttype = 1;
                            this.loadervalue = false;
                        }, error => {
                            console.log('Oooops!');
                        });
                }
            }
        });
    }
/*    getdetails() {
        console.log('getdetails');
        let link = this.serverurl + 'addresslist';
        console.log(link);
        this._http.get(link)
            .subscribe(res => {
                let result = res.json();
                this.userdetails = result.res;
                console.log('this.userdetails8888888');
                console.log(this.userdetails);
                for (let i in this.userdetails) {
                    this.temppath = [];
                    this.shapes = [];
                    this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , -0.0099779328 , -0.0099779328));
                    this.temppath.push(this.addressval_1(this.userdetails[i].Latitude , this.userdetails[i].Longitude , 0.0099779328 , 0.0099779328));
                //    this.shapes = { type:"rectangle", ne_lat: this.lat, ne_lng: this.lng};
                    this.paths.push(this.temppath);
                }
                console.log('this.paths++++++++++++++++++++');
                console.log(this.paths);
            /!*    for(let k in this.paths) {
                    for (let j in this.paths[k]) {
                        let latlngs = {
                            ne_lat:,
                            sw_lat:,
                            ne_lng:,
                            sw_lng:
                        };
                    }
                    this.callrectangle(this.paths[k]);
                }*!/
            }, error => {
                console.log('Ooops');
            });
    }*/


    addressval_1(lat_new , lng_new , dy , dx) {
        lat_new = parseFloat(lat_new);
        lng_new = parseFloat(lng_new);
        console.log('lat_new ' + lat_new);
        console.log('lng_new ' + lng_new);
        console.log('dy ' + dy);
        console.log('dx ' + dx);
        console.log('++++++');
        let new_latitude  = lat_new + ((dy / this.r_earth ) * (180 / this.pi));
        let new_longitude = lng_new + (dx / this.r_earth ) * (180 / this.pi) / Math.cos(lat_new * this.pi / 180);
        console.log(new_latitude);
        console.log(new_longitude);
        console.log('*****');
        return  {lat: new_latitude , lng: new_longitude};
    }



    getLocation() {
        let link = this.serverurl + 'locationlist';
        let data = {
            parentid: 0,
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                this.datalist = result;
                console.log('this.datalist*************************');
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }

    childlist(id, name, type) {
        if (type == 1) {
            this.count++;
            this.currentval[this.count] = id;
            this.nameval[this.count] = name;
        }
        if (type == 2) {
            this.count--;
            id = this.currentval[this.count];
            name = this.nameval[this.count];
            if (id == 0) {
                this.locationnameforreverse = 'Selectable locations';
                this.getLocation();
                return;
            }
        }
        console.log('id of clildlist ' + id);
        this.locationidforreverse = id;
        this.locationnameforreverse = name;
        console.log('childlist');
        this.parent_locations = [];


        let link = this.serverurl + 'locationlist';
        let data = {
            parentid: id,
        };
        console.log('data====0==');
        console.log(data);
        this._http.post(link, data)
            .subscribe(res => {
                let result = res;
                this.datalist=null;
                this.datalist = result;
                console.log('this.datalist-----------');
                console.log(this.datalist);
            }, error => {
                console.log('Oooops!');
            });
    }
    /*  addparentlocation() {
        this.parent_locations = [];
        let link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(link)
            .subscribe(res => {
                this.parent_locations = res.json();
                for (let c in this.parent_locations.geo_targets) {
                    this.details[c] = ({
                        id: this.parent_locations.geo_targets[c].id,
                        name: this.parent_locations.geo_targets[c].name
                    });
                }
                let link1 = this.serverurl + 'parentlocation';
                let data = {
                    alllocations: this.details
                }
                this._http.post(link1, data)
                    .subscribe(res => {

                    }, error => {
                        console.log('Oooops!');
                    });
            }, error => {
                console.log('Oooops!');
            });
    }*/


    /*  callparentlocation() {
        this.parent_locations = [];
        let link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(link)
            .subscribe(res => {
                this.parent_locations = res.json();
                for (let c in this.parent_locations.geo_targets) {
                    this.addchildlocation(this.parent_locations.geo_targets[c].id);
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/

    /* addchildlocation(parentid) {
        let link1 = 'http://simplyfi.influxiq.com/getchildlist.php?parent_id=' + parentid;
        this._http.get(link1)
            .subscribe(res1 => {
                this.child_locations = res1.json();
                if (this.child_locations.geo_targets.length > 0) {
                    this.details1 = [];
                    for (let c in this.child_locations.geo_targets) {
                        this.addit(this.child_locations.geo_targets[c].id);
                    }
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/

    calltoadddchildlcation() {
        let link1 = this.serverurl + 'childlocation';
        let data = {
            childlocations: this.details1
        }
        console.log('data-----fg----');
        console.log(data);
        this._http.post(link1, data)
            .subscribe(res2 => {
            }, error => {
                console.log('Oooops!');
            });
    }

    /* addit(newparentid) {
        let link1 = 'http://simplyfi.influxiq.com/getchildlist.php?parent_id=' + newparentid;
        this._http.get(link1)
            .subscribe(res1 => {
                this.child_locations_level2 = res1.json();
                if (this.child_locations_level2.geo_targets.length > 0) {
                    this.details2 = [];
                    for (let c in this.child_locations_level2.geo_targets) {
                        this.details2[c] = ({
                            parentid: newparentid,
                            id: this.child_locations_level2.geo_targets[c].id,
                            name: this.child_locations_level2.geo_targets[c].name
                        });
                    }
                    let link3 = this.serverurl + 'childlocation';
                    let data = {
                        childlocations: this.details2
                    };
                    console.log('data============================');
                    console.log(data);
                    this._http.post(link3, data)
                        .subscribe(res => {
                        }, error => {
                            console.log('Oooops!');
                        });
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/

    submitlocation(selected_locations) {
        console.log('this.fence----------------------------------');
        console.log(this.datanew.length);

        if (this.datanew.length > 0) {
            this.error = 'There were errors with your request: Geo targets Select either Location Targeting or Geo Fencing, but not both';
        } else {

            if (selected_locations < 1) {
                this.error = 'Geo targets Select at least 1 Location, Postal Code or Geo Fence';
            } else {
                this.error = '';
                console.log('this is here');
                let link = this.serverurl + 'locations';
                let data = {
                    selected_locations: selected_locations,
                    createaudienceid: this.cookiedetails,
                    email: this.mailcookiedetails,
                };
                this._http.post(link, data)
                    .subscribe(res => {
                        this.result = res;
                        // console.log(this.result);
                    }, error => {
                        console.log('Oooops!');
                    });
            }

        }
    }


    callforadd() {
        console.log('selected_locations-------------------');
        console.log(this.selected_locations.length);
        if (this.selected_locations.length > 0) {
            this.error = 'There were errors with your request: Geo targets Select either Location Targeting or Geo Fencing, but not both';
        }
        else {
            if (LocationsComponent.totalshapes.length < 1) {
                this.error = 'Geo targets Select at least 1 Location, Postal Code or Geo Fence';
            }
            else {
                this.error = '';
                if (this.inserttype == 0) {
                    this.datanew = [];
                    if ((LocationsComponent.totalshapes.length) > 0) {
                        for (let i in LocationsComponent.totalshapes) {
                            if (LocationsComponent.totalshapes[i].type == 'circle') {
                                this.datanew[i] = {
                                    email: this.mailcookiedetails,
                                    createaudienceid: this.cookiedetails,
                                    type: LocationsComponent.totalshapes[i].type,
                                    radius: LocationsComponent.totalshapes[i].cradius,
                                    center: LocationsComponent.totalshapes[i].ccenter
                                };
                            }
                            if (LocationsComponent.totalshapes[i].type == 'rectangle') {
                                this.datanew[i] = {
                                    email: this.mailcookiedetails,
                                    createaudienceid: this.cookiedetails,
                                    type: LocationsComponent.totalshapes[i].type,
                                    ne_lat: LocationsComponent.totalshapes[i].ne_lat,
                                    ne_lng: LocationsComponent.totalshapes[i].ne_lng,
                                    sw_lat: LocationsComponent.totalshapes[i].sw_lat,
                                    sw_lng: LocationsComponent.totalshapes[i].sw_lng
                                };
                            }
                            if (LocationsComponent.totalshapes[i].type == 'polygon') {
                                this.datanew[i] = {
                                    email: this.mailcookiedetails,
                                    createaudienceid: this.cookiedetails,
                                    type: LocationsComponent.totalshapes[i].type,
                                    path: LocationsComponent.totalshapes[i].poly_arr
                                };
                            }
                        }
                        console.log('this.datanew/////');
                        console.log(this.datanew);
                        let link = this.serverurl + 'insertshapes';
                        this._http.post(link, this.datanew)
                            .subscribe(res => {
                                let result11: any;
                                 result11 = res;
                                if (result11.status == 'success') {
                                }
                                else {
                                }
                            }, error => {
                                console.log('Oooops!');
                            });
                    }
                    else {
                        console.log('there is no shapes');
                    }
                }
                if (this.inserttype == 1) {
                    console.log('inserrype is 1 here,dat means upload files wll b saved');
                    if ((LocationsComponent.totalshapes.length) > 0) {
                        for (let i in LocationsComponent.totalshapes) {
                            this.datanew[i] = {
                                email: this.mailcookiedetails,
                                createaudienceid: this.cookiedetails,
                                type: LocationsComponent.totalshapes[i].type,
                                ne_lat: LocationsComponent.totalshapes[i].ne_lat,
                                ne_lng: LocationsComponent.totalshapes[i].ne_lng,
                                sw_lat: LocationsComponent.totalshapes[i].sw_lat,
                                sw_lng: LocationsComponent.totalshapes[i].sw_lng
                            };
                        }
                        console.log('this.datanew for uoploads from csv');
                        console.log(this.datanew);
                        let link = this.serverurl + 'insertshapes';
                        this._http.post(link, this.datanew)
                            .subscribe(res => {
                                let result11: any;
                                 result11 = res;
                                if (result11.status == 'success') {
                                }
                                else {
                                }
                            }, error => {
                                console.log('Oooops!');
                            });
                    }
                    else {
                        console.log('there is no shapes uploads from csv');
                    }
                }
            }
        }
    }

    getshapes() {
        console.log('call getshapes');
        // let link = 'http://localhost:3004/getallshapes';
        let link = this.serverurl + 'getallshapes';
        let data = {
            emailid: this.mailcookiedetails,
            createaudienceid: this.cookiedetails
        };
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                 result = res;
                console.log('result8888888988888888');
                console.log(result);
                console.log('result888888888888888');
                for(let i in result.value) {
                    if (result.value[i].type == 'rectangle') {
                        this.callrectangle(result.value[i], 0);
                    }
                    if (result.value[i].type == 'polygon') {
                        this.callpolygon(result.value[i].path);
                    }
                    if (result.value[i].type == 'circle') {
                        this.callcircle(result.value[i].center, result.value[i].radius);
                    }
                }
                console.log('go inside it');
                for (let j in result.locations) {
                    console.log(result.locations[j]);
                    this.addtolist(result.locations[j].attr_id,  result.locations[j].attr_name, result.locations[j]);
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    callrectangle(latlangs, type) {
        if (type == 0) {
            console.log('callit');
            console.log(latlangs);
            var rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                bounds: {
                    north: latlangs.ne_lat,
                    south: latlangs.sw_lat,
                    east: latlangs.ne_lng,
                    west: latlangs.sw_lng
                }
            });
        }
        if (type == 1) {
            console.log ('call rectangle type 1');
            var rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                bounds: {
                    north: latlangs.ne_lat,
                    south: latlangs.sw_lat,
                    east: latlangs.ne_lng,
                    west: latlangs.sw_lng
                }
            });
            LocationsComponent.totalshapes.push({
                type: 'rectangle',
                ne_lat: latlangs.ne_lat,
                ne_lng: latlangs.ne_lng,
                sw_lat: latlangs.sw_lat,
                sw_lng: latlangs.sw_lng,
            });
            this.addressoflatlng.push({
                type: 'rectangle',
                ne_lat: latlangs.ne_lat,
                ne_lng: latlangs.ne_lng,
                sw_lat: latlangs.sw_lat,
                sw_lng: latlangs.sw_lng,
                address: latlangs.address,
                csvlat: latlangs.csvlat,
                csvlng: latlangs.csvlng,
            });
            console.log('upoload location-------');
            console.log(LocationsComponent.totalshapes);
            console.log(this.addressoflatlng);
            console.log('length ixs '+this.addressoflatlng.length);
        }
         /*this.addressoflatlng = LocationsComponent.totalshapes;
        console.log(this.addressoflatlng);*/
    }
    callpolygon(path) {
        // console.log(path);
        var PolyCoords = [];
        for (let j in path) {
            PolyCoords.push({
                lat: path[j].lat,
                lng: path[j].lng
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
    callcenteraddress(csvlat, csvlng) {
        csvlat = parseFloat(csvlat);
        csvlng = parseFloat(csvlng);

        this.map.setCenter({lat: csvlat, lng: csvlng});
        this.map.setZoom(16);

    }
    callcircle(latlng , radius) {
        var draw_circle = null;
        draw_circle = new google.maps.Circle({
            fillColor: '#000000',
            fillOpacity: .6,
            strokeWeight: 1,
            strokeColor: '#000000',
            draggable: true,
            editable: true,
            map: this.map,
            center: new google.maps.LatLng(latlng.lat, latlng.lng),
            radius: radius,
        });
    }
    searchcriteria() {
        console.log('call searchcriteria');
        this.showsearchdiv = (1 - this.showsearchdiv);
      //  this.showfencediv = 0;
        let link = this.serverurl + 'gettoken';
        this._http.get(link)
            .subscribe(res => {
                let tokenval: any;
                 tokenval = res;
                tokenval = tokenval.res;
                console.log(tokenval[0]);
                console.log(tokenval[0].accesstoken);
                for (let i in tokenval) {
                    this.tokenid = tokenval[i].accesstoken;
                }
                console.log('tokenid is--' + this.tokenid);
            }, error => {
                console.log('Oooops!');
            });
        // this.hi();
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
                console.log( 'this.usstates++++++');
                console.log( this.usstates);
            }, error => {
                console.log('Oooops!');
            });
    }
    zipvalication(val) {
        this.ziperror = null;
        let phonenovalid = /^[0-9]{4,6}$/;
        if ((val.match(phonenovalid) && ((val.length == 3) || (val.length == 5))) || val.length == 0) {
            this.ziperror = null;
        }
        else {
            this.ziperror = 'Please enter a valid 3, 5 ZIP code(s).';
        }
    }

    areacodevalication(val) {
        this.areacodeerror = null;
        let phonenovalid = /^([0-9]{3})$/;
            if ((val.match(phonenovalid) && (val.length == 3)) || val.length == 0) {
                this.areacodeerror = null;
            }
            else {
                this.areacodeerror = 'Please enter valid Area codes (3 digits).';
            }
    }
    callforsearch() {
        this.selected_ziparr = null;
        this.selected_areacodearr = null;
        this.selected_geoaddressarr = null;
        this.Physical_Statearr = null;
        this.Physical_Cityarr = null;
        this.Physical_Countryarr = null;
        this.Ind_Age_Codearr = null;
        this.selected_incomearr = null;
        this.selected_ziparr = null;
        this.selected_homevaluearr = null;
        this.selected_maritalarr = null;
        this.selected_residencearr = null;
        this.selected_medianhomearr = null;
        this.selected_medianincomearr = null;
        this.selected_networtharr = null;
        console.log(LocationsComponent.totalshapes);
        if (LocationsComponent.totalshapes != null) {
            for (let i in LocationsComponent.totalshapes) {
             /*   if (LocationsComponent.totalshapes[i].type == 'circle') {
                    LocationsComponent.totalshapes[i].ccenter = LocationsComponent.totalshapes[i].ccenter.toString().substr(1);
LocationsComponent.totalshapes[i].ccenter = LocationsComponent.totalshapes[i].ccenter.substring(0, LocationsComponent.totalshapes[i].ccenter.length - 1);
                    alert(LocationsComponent.totalshapes[i].ccenter);
                    LocationsComponent.totalshapes[i].ccenter = LocationsComponent.totalshapes[i].ccenter.replace(/\s/g, ''); // space remove
                    alert(LocationsComponent.totalshapes[i].ccenter);
                    this.selected_geoshapes = '#LATLONG#|' + LocationsComponent.totalshapes[i].ccenter + '|' + LocationsComponent.totalshapes[i].cradius;
                }*/
                if (LocationsComponent.totalshapes[i].type == 'polygon') {
                    console.log('hi');
                    console.log(this.selected_geoshapes);
                    if (this.selected_geoshapes == null) {
                        this.selected_geoshapes = '#POLYGON#|' + LocationsComponent.totalshapes[i].poly_arr;
                    }
                    else {
                        this.selected_geoshapes = this.selected_geoshapes + '|' + LocationsComponent.totalshapes[i].poly_arr;
                    }

                   // this.selected_geoshapesarr.push(this.selected_geoshapes);
                }
            }
        }
        if (this.selected_locations != null) {
            for (let i in this.selected_locations) {
                // this.Physical_Statearr.push = this.selected_locations.attr_id;
                this.Physical_Statearr = this.Physical_Statearr + ',' + this.selected_locations[i].attr_id;
            }
        }
        /*added start*/
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
        if (this.addtonetworth_list != null) {
            for (let i in this.selected_networth) {
                this.selected_networtharr = this.selected_networtharr + ',' + this.selected_networth[i].attr_id;
            }
        }
        if (this.selected_homevalue != null) {
            for (let i in this.selected_homevalue) {
                this.selected_homevaluearr = this.selected_homevaluearr + ',' + this.selected_homevalue[i].attr_id;
            }
        }
        if (this.selected_marital != null) {
            for (let i in this.selected_marital) {
                this.selected_maritalarr = this.selected_maritalarr + ',' + this.selected_marital[i].attr_id;
            }
        }
        if (this.selected_residence != null) {
            for (let i in this.selected_residence) {
                this.selected_residencearr = this.selected_residencearr + ',' + this.selected_residence[i].attr_id;
            }
        }
        if (this.selected_medianhome != null) {
            for (let i in this.selected_medianhome) {
                this.selected_medianhomearr = this.selected_medianhomearr + ',' + this.selected_medianhome[i].attr_id;
            }
        }
        if (this.selected_medianincome != null) {
            for (let i in this.selected_medianincome) {
                this.selected_medianincomearr = this.selected_medianincomearr + ',' + this.selected_medianincome[i].attr_id;
            }
        }
       /* if (this.headofhouseholdall != null) {
                this.selected_headofhouseholdall = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9;
        }*/
        if (this.phoneval == null || this.phoneval == '') {
            this.phoneerror = null;
            console.log('phoneerror should be null- ' + this.phoneerror);
        }
        if (this.phoneval != null && this.phoneval != '') {
            this.phoneerror = null;
            let phonenovalid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (this.phoneval.match(phonenovalid)) {
                this.phoneerror = null;
            }
            else {
                this.phoneerror = 'Give valid phone no';
            }
            console.log('phoneerror- ' + this.phoneerror);
        }

      /*  if (this.zipval == null || this.zipval == '') {
            this.ziperror = null;
            console.log('ziperror should be null- ' + this.ziperror);
        }
        if (this.zipval != null && this.zipval != '') {
            this.ziperror = null;
            let phonenovalid = /^[0-9]{4,6}$/;
            if (this.zipval.match(phonenovalid) && ((this.zipval.length == 3) || (this.zipval.length == 5))) {
                this.ziperror = null;
            }
            else {
                this.ziperror = 'Please enter a valid 3, 5 ZIP code(s).';
            }
            console.log('ziperror- ' + this.ziperror);
        }*/
        /*added end*/

        if (this.selected_income != null) {
            for (let i in this.selected_income) {
                this.selected_incomearr = this.selected_incomearr + ',' + this.selected_income[i].attr_id;
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

        if (this.areacodeval != null &&  this.areacodeval != '') {
            this.selected_areacode.push(this.areacodeval);
        }
        if (this.areacodeval1 != null &&  this.areacodeval1 != '') {
            this.selected_areacode.push(this.areacodeval1);
        }
        if (this.areacodeval2 != null &&  this.areacodeval2 != '') {
            this.selected_areacode.push(this.areacodeval2);
        }
        if (this.areacodeval3 != null &&  this.areacodeval3 != '') {
            this.selected_areacode.push(this.areacodeval3);
        }
        if (this.areacodeval4 != null &&  this.areacodeval4 != '') {
            this.selected_areacode.push(this.areacodeval4);
        }
        for (let i in this.selected_areacode) {
            this.selected_areacodearr = this.selected_areacodearr + ',' + this.selected_areacode[i];
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
                  //  this.selected_geoaddressarr = this.geoaddress + '|' + this.geozip + '|' + this.geomiles;
                    this.selected_geoshapes = this.geoaddress + '|' + this.geozip + '|' + this.geomiles;
                }
                let geozipvalid = /^[0-9]{4,6}$/;
                if ((this.geozip.match(geozipvalid) && ((this.geozip.length == 3) || (this.geozip.length == 5))) || this.geozip.length == 0) {
                    this.errorvalgeozip = null;
                    console.log('inside 5');
                }
                else {
                    this.errorvalgeozip = 'Please enter a valid 3, 5 ZIP code(s).';
                }
            }
        }
        else {
            this.geoerror = 'Please GIve all values';
        }
        this.searchresult = null;
        console.log('search result after clicked to search');
        console.log(this.searchresult);
        console.log('tokenid in callconsumer func ' + this.tokenid);
        let link = 'http://simplyfi.influxiq.com/callconsumer.php?token=' + this.tokenid;
        let data = {
            Physical_State: this.Physical_Statearr, // done
            Income_Code: this.selected_incomearr, // done
            Home_Equity_Available_Code: this.Home_Equity_Available_Code,
            Home_Market_Value: this.selected_homevaluearr, // done
            Ind_Ethnic_Code: this.Ind_Ethnic_Code,
            Ind_Gender_Code: this.Ind_Gender_Code, // done
            Ind_Age_Code: this.Ind_Age_Codearr, // done
            Marital_Status_Code: this.selected_maritalarr, // done
            Length_Of_Residence_Code: this.selected_residencearr, // done
            Physical_City: this.Physical_Cityarr, // done
            Median_Home_Value_Code: this.selected_medianhomearr, // done
            Median_HseHld_Income_Code: this.selected_medianincomearr, // done
            First_Name: this.fname, // done
            Middle_Initial: this.mname, // done
            Last_Name: this.lname, // done
            NetWorth_Code: this.selected_networtharr,
            Phone: this.phoneval,
            Physical_Zip: this.selected_ziparr,
            Vendor_State_County: this.Physical_Countryarr,
            Ind_Household_Rank_Code: this.headofhouseholdonly,
            Area_Code: this.selected_areacodearr,
            Physical_Address: this.addressval,
           // proximity: this.selected_geoaddressarr,
            proximity: this.selected_geoshapes,
        };
        console.log(data);
        console.log(this.geoerror);
        console.log(this.phoneerror);
        console.log(this.ziperror);
        /* newly added */
        this.geomiles = null;
        this.geoaddress = null;
        this.geozip = null;
        this.selected_geoshapes = null;
        /* newly added */
        if (this.phoneerror == null && this.ziperror == null && this.geoerror == null && this.errorvalgeomiles == null && this.errorvalgeozip == null) {
            console.log('insdide -');
            this.openloader = true;
            this._http.post(link, data)
                .subscribe(res => {
                    this.openloader = false;
                    this.consumer_value = res;
                    this.selected_zip = [];
                    this.selected_areacode = [];
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    onHidden() {
        this.isModalShownforsearch = false;
    }
    viewallsearch() {
        this.openloader = true;
        let timestampis = new Date().getTime();
       // let link = 'http://simplyfi.influxiq.com/searchresults.php?token=' + this.tokenid + '&v=232345';
        let link = 'http://simplyfi.influxiq.com/searchresults.php?token=' + this.tokenid + '&v=' + timestampis;
        this._http.get(link)
            .subscribe(res => {
                this.searchresult = res;
                console.log('this.searchresult++++++++++++++++++++++++');
                console.log(this.searchresult);
                this.openloader = false;
                if (this.searchresult != null) {
                    this.isModalShownforsearch = true;
                }
            }, error => {
                console.log('Oooops!');
            });
    }
    importlatlng() {
        this.isModalShownforsearch = false;
        for (let i in this.searchresult) {
            var ne = this.addressval_1(this.searchresult[i].Latitude , this.searchresult[i].Longitude, -0.0099779328 , -0.0099779328);
            var sw = this.addressval_1(this.searchresult[i].Latitude , this.searchresult[i].Longitude, 0.0099779328 , 0.0099779328);
            let latlngs = {
                ne_lat: ne.lat,
                sw_lat: sw.lat,
                ne_lng: sw.lng,
                sw_lng: ne.lng,
                address: this.searchresult[i].Physical_State,
                csvlat: this.searchresult[i].Latitude, // search lat
                csvlng: this.searchresult[i].Longitude // search lng
            };
            this.inserttype = 1;
            this.callrectangle(latlngs, 1);
        }
    }
    opensearchcriteriadiv() {
        this.searchcriteriadiv = (1 - this.searchcriteriadiv);
    }
    opengeodiv() {
        this.geodiv = (1 - this.geodiv);
        if (this.geodiv == 1) {
            this.namediv = 0;
            this.phonediv = 0;
            this.infodiv = 0;
            this.householddiv = 0;
            this.interestsdiv = 0;
        }
    }
    opennamediv() {
        this.namediv = (1 - this.namediv);
        if (this.namediv == 1) {
            this.geodiv = 0;
            this.phonediv = 0;
            this.infodiv = 0;
            this.householddiv = 0;
            this.interestsdiv = 0;
        }
    }
    openphonediv() {
        this.phonediv = (1 - this.phonediv);
        if (this.phonediv == 1) {
            this.geodiv = 0;
            this.namediv = 0;
            this.infodiv = 0;
            this.householddiv = 0;
            this.interestsdiv = 0;
        }
    }
    openinfodiv() {
        this.infodiv = (1 - this.infodiv);
        if (this.infodiv == 1) {
            this.geodiv = 0;
            this.phonediv = 0;
            this.namediv = 0;
            this.householddiv = 0;
            this.interestsdiv = 0;
        }
    }
    openhouseholddiv() {
        this.householddiv = (1 - this.householddiv);
        if (this.householddiv == 1) {
            this.geodiv = 0;
            this.phonediv = 0;
            this.infodiv = 0;
            this.namediv = 0;
            this.interestsdiv = 0;
        }
    }
    openinterestsdiv() {
        this.interestsdiv = (1 - this.interestsdiv);
        if (this.interestsdiv == 1) {
            this.geodiv = 0;
            this.phonediv = 0;
            this.infodiv = 0;
            this.householddiv = 0;
            this.namediv = 0;
        }
    }
    openstatediv() {
        this.statediv = 1;
    }
    opencitydiv() {
        this.citydiv = 1;
    }
    openagediv() {
        this.agediv = 1;
    }
    opengenderdiv() {
        this.genderdiv = 1;
    }
    openincomediv() {
        this.incomediv = 1;
    }
    openhomevaluediv() {
        this.homevaluediv = 1;
    }
    openmaritaldiv() {
        this.maritaliv = 1;
    }
    openresidencediv() {
        this.residencediv = 1;
    }
    openmedianhomevaluediv() {
        this.medianhomevaluediv = 1;
    }
    openmedianhomeincomediv() {
        this.medianhomeincomediv = 1;
    }
    openfullnamediv() {
        this.fullnamediv = 1;
    }
    opennetworthdiv() {
        this.networthdiv = 1;
    }

    openuserphonediv() {
        this.userphonediv = 1;
    }
    openzipdiv() {
        this.zipdiv = 1;
    }
    opencountrydiv() {
        this.countrydiv = 1;
    }
    openindhouseholddiv() {
        this.individualhouseholddiv = 1;
    }
    openareacodediv() {
        this.areacodediv = 1;
    }
    openaddressdiv() {
        this.addressdiv = 1;
    }
    openradiusdiv() {
        this.radiusdiv = 1;
    }
    openmapdiv() {
        this.mapdiv = 1;
    }
                                                                 /*--------today-------*/
    addclickedclass(item) {
        return 'selectedclass';
    }
    addtolist(id, name , item) {
        let tempvar= id;
        let indexval: any = this.selected_locationsv.indexOf(tempvar);
        console.log(' indexval is ' + indexval); // -1 means no value matched ...
        if (indexval == -1) {
            this.selected_locations.push({attr_id: id, attr_name: name});
            this.selected_locationsv.push( id);
        }
        else {
            this.selected_locations.splice(indexval, 1);
            this.selected_locationsv.splice(indexval, 1);
        }
        $('#state_' + id).toggleClass('selectedclass');
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
        else {
            this.selected_age.splice(indexval, 1);
            this.selected_agev.splice(indexval, 1);
        }
        $('#age_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_age);
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
        else {
            this.selected_income.splice(indexval, 1);
            this.selected_incomev.splice(indexval, 1);
        }
        $('#income_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_income);
    }
    addtonetworth_list(id, name, item) {
        let tempvar= id;
        let indexval: any = this.selected_networthv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_networth.push({attr_id: id, attr_name: name});
            this.selected_networthv.push( id);
        }
        else {
            this.selected_networth.splice(indexval, 1);
            this.selected_networthv.splice(indexval, 1);
        }
        $('#networth_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_networth);
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
        else {
            this.selected_homevalue.splice(indexval, 1);
            this.selected_homevaluev.splice(indexval, 1);
        }
        $('#homevalue_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_income);
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
        else {
            this.selected_marital.splice(indexval, 1);
            this.selected_maritalv.splice(indexval, 1);
        }
        $('#marital_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_marital);
    }

    addtoresidence_list(id, name, item) {
        console.log(this.selected_residence);
        let tempvar= id;
        let indexval: any = this.selected_residencev.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_residence.push({attr_id: id, attr_name: name});
            this.selected_residencev.push( id);
        }
        else {
            this.selected_residence.splice(indexval, 1);
            this.selected_residencev.splice(indexval, 1);
        }
        $('#residence_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_residence);
    }
    addtomedianhome_list(id, name, item) {
        let tempvar= id;
        let indexval: any = this.selected_medianhomev.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_medianhome.push({attr_id: id, attr_name: name});
            this.selected_medianhomev.push( id);
        }
        else {
            this.selected_medianhome.splice(indexval, 1);
            this.selected_medianhomev.splice(indexval, 1);
        }
        $('#medianhomevalue_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_medianhome);
    }
    addtomedianincome_list(id, name, item) {
        let tempvar= id;
        let indexval: any = this.selected_medianincome.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_medianincome.push({attr_id: id, attr_name: name});
            this.selected_medianincomev.push( id);
        }
        else {
            this.selected_medianincome.splice(indexval, 1);
            this.selected_medianincomev.splice(indexval, 1);
        }
        $('#medianincomevalue_' + id).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_medianincome);
    }
    addtocitylist(city , item) {
        console.log('before');
        console.log(this.selected_locationscity);
        let tempvar= city;
        let indexval: any = this.selected_locationscityv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_locationscity.push({city: city});
            this.selected_locationscityv.push( city);
        }
     //   else {
     //       this.selected_locationscity.splice(indexval, 1);
     //       this.selected_locationscityv.splice(indexval, 1);
     //   }
      //  $('#city_' + city).toggleClass('selectedclass');
        console.log('after');
        console.log(this.selected_locationscity);
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
    }
    show_cities(id) { // here id is abbreviation
        this.show_state_cities=[];
        console.log(id);
        for (let i in this.uscities) {
            if (this.uscities[i].short_state == id) {
                console.log('inside');
                this.show_state_cities.push(this.uscities[i]);
             //   this.show_state_cities1.push(this.uscities[i]);
            }
        }
        console.log(this.show_state_cities);
      //  $('#showcity_' + id).toggleClass('selectedclass');
    }
    show_countries(id) { // here id is abbreviation
        this.show_state_countries = [];
        console.log(id);
        for (let i in this.uscities) {
            if (this.uscities[i].short_state == id) {
                console.log('inside');
                this.show_state_countries.push(this.uscities[i]);
             //   this.show_state_cities1.push(this.uscities[i]);
            }
        }
        console.log(this.show_state_countries);
      //  $('#showcity_' + id).toggleClass('selectedclass');
    }
    addtocountrylist(country , item) {
        console.log('before');
        console.log(this.selected_locationscountry);
        let tempvar= country;
        let indexval: any = this.selected_locationscountryv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        if (indexval == -1) {
            this.selected_locationscountry.push({country: country});
            this.selected_locationscountryv.push( country);
        }
        console.log('after');
        console.log(this.selected_locationscountry);
    }
    removefromcountrylist(country , item) {
        console.log('before');
        console.log(this.selected_locationscountry);
        let tempvar= country;
        let indexval: any = this.selected_locationscountryv.indexOf(tempvar);
        console.log(' indexval is ' + indexval);
        this.selected_locationscountry.splice(indexval, 1);
        this.selected_locationscountryv.splice(indexval, 1);
        console.log('after');
        console.log(this.selected_locationscountry);
    }
    getuscities() {
        let link = this.serverurl + 'getus_cities1';
        this._http.get(link)
            .subscribe(res => {
                var result = res;
                for (let i in result) {
                    this.uscities[i] = {
                        city: result[i].city,
                        state: result[i].state,
                        short_state: result[i].short_state,
                        country: result[i].country,
                    };
                }
                console.log( 'this.uscities++++++');
                console.log( this.uscities);
            }, error => {
                console.log('Oooops!');
            });
    }
}
