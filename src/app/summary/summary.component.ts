import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {LatLngBounds, LatLngLiteral} from '@agm/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
    public  addcookie: CookieService;
    public  cookiedetails;
    public link;
    public data;
    public checkuncheck;
    public id;
    public count1: any;
    public result;
    public updateresult;
    public getresult;
    public newcreatedcampaignid: any;
    public newcreatedcampaignname: any;
    public name: any;
    public error;
    public error1;
    public error2;
    public error3;
    public error4;
    public error5;
    public error6;
    public error7;
    public error8;
    public error9;
    public error10;
    public error11;
    public error12;
    public start_date;
    public end_date;
    public startdt;
    public enddt;

    public currentdate;
    public campaign_budget: any;
    public link1: any;
    public getresult1: any;
    public bidding_type: any;
    public monthly_budget: any;
    public daily_spend_target: any;
    public bidding_amount: any;
    public impressions_c: any;
    public monthly_impression: any;
    public daily_impression: any;
    public impressions_f: any;
    public p_hour: any;
    public calforcpc: any;
    public calforctr: any;
    public calforcpa: any;
    public impressions_goals: any;
    public goals: any;
    public disableokforcpc = false;
    public oba: any;
    public obaid: any;
    public divshow0: any;
    public divshow: any;
    public divshow2: any;
    public divshow3: any;
    public divshow4: any;
    public divshow5: any;
    public divshow6: any;
    public divshow7: any;
    public divshow21: any;
    public isokDisabled;
    public submitedval;
    public fee: any;
    public polydelete: any;
    public polyname: any;
    public m_name: any;
    public bymedia: any;
    public bycpm: any;
    public byspeed: any;
    public bidid: any;
    public bid_value: any;
    public geoid: any;
    public geoname: any;
    public valcpc: any;
    public auto: any;
    public rand: any;
    public lattitude: any;
    public loadervalue: any;
    public viewthrupercentage: any;
    public viewthrupercentage1: any;
    public clickthrupercentage: any;
    public clickthrupercentage1: any;
    public viewattrval: any;
    public clickattrval: any;
    public slidedisable = false;
    public disableconversions = true;
    public dateforstart;
    public dateforend;
    public obas: any = [];
    public dt: Date = new Date();
    public enddate: Date = new Date();
    public items: any = [];
    public isActive: any = [];
    public isDisabled: any = [];
    public fence: any = [];

    public show: any = [];
    title: string = 'My first AGM project';
    /* lat: number = 51.678418;
     lng: number = 7.809007;*/
    public lat: any;
    public lng: any;
    public mapval: any;
    public searchaddress: any;
    public key: any;
    public polyshapename: any;
    public geolocationtype: any;
    public fenceressult: any;
    // lat: number = 31.88725;
    // lng: number = -97.08026;
    patharr: any = [];
    paths: Array<LatLngLiteral> = [
        {lat: 25.774, lng: -80.190},
        {lat: 18.466, lng: -66.118},
        {lat: 32.321, lng: -64.757},
        {lat: 25.774, lng: -80.190}
    ]
    paths1: Array<LatLngLiteral> = [
        {lat: 24.774, lng: -81.190},
        {lat: 17.466, lng: -66.118},
        {lat: 31.321, lng: -65.757},
        {lat: 24.774, lng: -81.190}
    ]
    public temppath: Array<LatLngLiteral> = [];
    public allcoordinates: Array<LatLngLiteral> = [];
    public polygonresult: any;
    public sizeerrors: any;
    public fence_length: string;
    public bounds: any = [];
    public rand1: number;

    /*-----------------------------------------------------------------------------*/
    public browserselect;
    public locationidforreverse: any;
    public currentval: any = [];
    public nameval: any = [];
    public dayparting;
    public deals;
    public device_types;
    public locations;
    public operating_systems;
    public pacing;
    public third_party_segments;
    public viewability;
    public website_filtering;
    public select1 = false;
    public select2 = false;
    public select3 = false;
    public select4 = false;
    public select5 = false;
    public select6 = false;
    public select7 = false;
    public bounds1: any = [];
    public temppath1: Array<LatLngLiteral> = [];
    public allcoordinates1: Array<LatLngLiteral> = [];
    public parent_locations: any = [];
    public selected_locations1: any = [];
    public details1: any = [];
    public getresult2: any;
    public lat1: any;
    public lng1: any;
    public mapval1: any;
    public searchaddress1: any;
    public checkuncheck1;
    public polydelete1: any;
    patharr1: any = [];
    public fence1: any = [];
    public values: any;
    public show_locations1: any = [];
    public fence_length1: string;
    public locationnameforreverse: any;
    public polygonresult1: any;
    /*------------------------------------------------------------------------------*/


    constructor(addcookie: CookieService, private _http: HttpClient, private mapsAPILoader: MapsAPILoader) {
        this.addcookie = addcookie;
        this.cookiedetails = this.addcookie.getObject('cookiedetails');
        console.log('cookiedetails');
        this.locationnameforreverse = 'Selectable Locations';
        this.divshow21 = 0;
        console.log('get id from saved cookie ->  ' + this.cookiedetails);
        this.count1 = 0;
        this.link1 = 'http://simplyfi.influxiq.com/getgeoconversion.php?id=' + this.cookiedetails;
        this._http.get(this.link1)
            .subscribe(res => {
                this.getresult1 = res;
                console.log('getresult');
                console.log(this.getresult1);
                let y;
                this.patharr = [];

                for (y in this.getresult1.geo_fences) {
                    if (this.getresult1.geo_fences[y].geo_fence_type_name == 'Conversion') {
                        this.fence.push({
                            fencename: this.getresult1.geo_fences[y].name,
                            fencecheckbox: false,
                            fencecoordinates: this.getresult1.geo_fences[y].bid_area.coordinates[0]
                        });
                        console.log('is it complete?');
                        console.log(this.fence);
                        this.fence_length = this.fence.length + ' Geo Fence';
                        console.log(this.fence_length);
                        let a: any;
                        this.temppath = [];
                        for (a in this.getresult1.geo_fences[y].bid_area.coordinates[0]) {
                            console.log('geofencesss___lat');
                            this.temppath.push({
                                lat: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][1],
                                lng: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][0]
                            });

                            this.allcoordinates.push({
                                lat: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][1],
                                lng: this.getresult1.geo_fences[y].bid_area.coordinates[0][a][0]
                            });

                        }
                        this.patharr.push(this.temppath);
                        this.temppath = [];
                    }
                }
                /* ----------------------------------------------------------------------*/
               /* this.mapsAPILoader.load().then(() => {
                    this.bounds = new window['google'].maps.LatLngBounds();
                    for (let i = 0; i < this.allcoordinates.length; i++) {
                        this.bounds.extend(this.allcoordinates[i]);
                    }
                });*/
                /* -----------------------------------------------------------------------*/
            }, error1 => {
                console.log('Oooops!');
            });


        console.log('*******************allcoordinates in one array******************');
        console.log(this.allcoordinates);
        /* -----------------------------------------------------------------------*/
        this.link1 = 'http://simplyfi.influxiq.com/getgeoofence.php?id=' + this.cookiedetails;
        this._http.get(this.link1)
            .subscribe(res => {
                this.getresult2 = res;
                console.log('-------------getresult2');
                console.log(this.getresult2);
                let y;
                this.patharr1 = [];
                for (y in this.getresult2.geo_fences) {
                    if (this.getresult2.geo_fences[y].geo_fence_type_name == 'Target') {
                        this.fence1.push({
                            fencename: this.getresult2.geo_fences[y].name,
                            fencecheckbox: false,
                            fencecoordinates: this.getresult2.geo_fences[y].bid_area.coordinates[0]
                        });
                        console.log('is it complete?');
                        console.log(this.fence1);
                        this.fence_length1 = this.fence1.length + ' Geo Fence';
                        console.log(this.fence_length1);
                        let a: any;
                        this.temppath1 = [];
                        for (a in this.getresult2.geo_fences[y].bid_area.coordinates[0]) {
                            console.log('geofencesss___lat');
                            this.temppath1.push({
                                lat: this.getresult2.geo_fences[y].bid_area.coordinates[0][a][1],
                                lng: this.getresult2.geo_fences[y].bid_area.coordinates[0][a][0]
                            });

                            this.allcoordinates1.push({
                                lat: this.getresult2.geo_fences[y].bid_area.coordinates[0][a][1],
                                lng: this.getresult2.geo_fences[y].bid_area.coordinates[0][a][0]
                            });

                        }
                        this.patharr1.push(this.temppath1);
                        this.temppath1 = [];
                    }
                }
/*
                this.mapsAPILoader.load().then(() => {
                    this.bounds1 = new window['google'].maps.LatLngBounds();
                    for (let i = 0; i < this.allcoordinates1.length; i++) {
                        this.bounds1.extend(this.allcoordinates1[i]);
                    }
                });*/

            }, error1 => {
                console.log('Oooops!');
            });

        console.log('temppath1 null done??');
        console.log(this.temppath1.length);
        this.parent_locations = [];
        this.link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(this.link)
            .subscribe(res => {
                this.parent_locations = res;
                for (let c in this.parent_locations.geo_targets) {
                    this.details1[c] = this.parent_locations.geo_targets[c];
                }
            }, error => {
                console.log('Oooops!');
            });

        this.link = 'http://simplyfi.influxiq.com/get_geo_target.php';
        let data = {
            id: this.cookiedetails
        };
        this._http.post(this.link, data)
            .subscribe(res => {
                this.values = res;
                console.log('this.values');
                console.log(this.values);
                for (let v in this.values.geo_targets) {
                    // this.selected_locations.push({attr_id: this.values.geo_targets.id, attr_name: this.values.geo_targets.name});
                    this.addtolist(this.values.geo_targets[v].id, this.values.geo_targets[v].name);
                    console.log(this.values.geo_targets[v].id, this.values.geo_targets[v].name);
                }
            }, error => {
                console.log('Oooops!');
            });

        /* -----------------------------------------------------------------------*/
        this.link = 'http://simplyfi.influxiq.com/get_campaign.php?id=' + this.cookiedetails;
        this._http.get(this.link)
            .subscribe(res => {

                this.getresult = res;
                console.log('this.getresult');
                console.log(this.getresult);
                if ((typeof (this.getresult.campaigns[0].id) != 'undefined' && (this.getresult.campaigns[0].id) != null))
                    this.geoid = (this.getresult.campaigns[0].id);
                else {
                    this.geoid = '';
                }

                if ((typeof (this.getresult.campaigns[0].name) != 'undefined' && ( this.getresult.campaigns[0].name) != null )) {
                    this.name = this.getresult.campaigns[0].name;
                } else {
                    this.name = '';
                }

                if ((typeof (this.getresult.campaigns[0].daily_budget) != 'undefined' && ( this.getresult.campaigns[0].daily_budget) != null )) {
                    this.daily_spend_target = this.getresult.campaigns[0].daily_budget;
                } else {
                    this.daily_spend_target = '';
                }

                if ((typeof (this.getresult.campaigns[0].monthly_budget) != 'undefined' && ( this.getresult.campaigns[0].monthly_budget) != null )) {
                    this.monthly_budget = this.getresult.campaigns[0].monthly_budget;
                } else {
                    this.monthly_budget = '';
                }

                if ((typeof (this.getresult.campaigns[0].total_budget) != 'undefined' && ( this.getresult.campaigns[0].total_budget) != null )) {
                    this.campaign_budget = this.getresult.campaigns[0].total_budget;
                } else {
                    this.campaign_budget = '';
                }

                if ((typeof (this.getresult.campaigns[0].daily_impression_cap) != 'undefined' && ( this.getresult.campaigns[0].daily_impression_cap) != null )) {
                    this.daily_impression = this.getresult.campaigns[0].daily_impression_cap;
                } else {
                    this.daily_impression = '';
                }

                if ((typeof (this.getresult.campaigns[0].monthly_impression_cap) != 'undefined' && ( this.getresult.campaigns[0].monthly_impression_cap) != null )) {
                    this.monthly_impression = this.getresult.campaigns[0].monthly_impression_cap;
                } else {
                    this.monthly_impression = '';
                }
                if ((typeof (this.getresult.campaigns[0].impression_cap) != 'undefined' && ( this.getresult.campaigns[0].impression_cap) != null )) {
                    this.impressions_c = this.getresult.campaigns[0].impression_cap;
                } else {
                    this.impressions_c = '';
                }
                if ((typeof (this.getresult.campaigns[0].frequency_capping.how_many_times) != 'undefined' && ( this.getresult.campaigns[0].frequency_capping.how_many_times) != null )) {
                    this.impressions_f = this.getresult.campaigns[0].frequency_capping.how_many_times;
                } else {
                    this.impressions_f = '';
                }

                if ((typeof (this.getresult.campaigns[0].frequency_capping.hours) != 'undefined' && ( this.getresult.campaigns[0].frequency_capping.hours) != null )) {
                    this.p_hour = this.getresult.campaigns[0].frequency_capping.hours;
                } else {
                    this.p_hour = 'Select';
                }

                if ((typeof (this.getresult.campaigns[0].campaign_type) != 'undefined' && ( this.getresult.campaigns[0].campaign_type) != null )) {
                    this.geoname = this.getresult.campaigns[0].campaign_type.name;
                } else {
                    this.geoname = '';
                }

                if ((typeof (this.getresult.campaigns[0].start_date) != 'undefined' && ( this.getresult.campaigns[0].start_date) != null )) {
                    this.dateforstart = this.getresult.campaigns[0].start_date;
                } else {
                    this.dateforstart = '';
                }

                if ((typeof (this.getresult.campaigns[0].end_date) != 'undefined' && ( this.getresult.campaigns[0].end_date) != null )) {
                    this.dateforend = this.getresult.campaigns[0].end_date;
                } else {
                    this.dateforend = '';
                }

                if ((typeof (this.getresult.campaigns[0].oba_provider) != 'undefined' && ( this.getresult.campaigns[0].oba_provider) != null )) {
                    this.oba = this.getresult.campaigns[0].oba_provider.name;
                } else {
                    this.oba = 'Select';
                }

                if ((typeof (this.getresult.campaigns[0].bid) != 'undefined' && ( this.getresult.campaigns[0].bid) != null )) {
                    this.bidding_amount = this.getresult.campaigns[0].bid;
                } else {
                    this.bidding_amount = '';
                }

                if ((typeof (this.getresult.campaigns[0].bid_type) != 'undefined' && ( this.getresult.campaigns[0].bid_type) != null )) {
                    this.bid_value = this.getresult.campaigns[0].bid_type.name;
                } else {
                    this.bid_value = '';
                }

                if (this.bid_value == 'CPC') {
                    this.bidding_type = 'cpc_bidding';
                    this.valcpc = true;
                }

                if ((typeof (this.getresult.campaigns[0].campaign_goal) != 'undefined' && ( this.getresult.campaigns[0].campaign_goal) != null )) {
                    this.goals = this.getresult.campaigns[0].campaign_goal.goal_type;
                } else {
                    this.goals = '';
                }
                if (this.goals == 'cpc') {
                    this.calforcpc = true;
                }
                if (this.goals == 'ctr') {
                    this.calforctr = true;
                }
                if (this.goals == 'cpa') {
                    this.calforcpa = true;
                }
                if ((typeof (this.getresult.campaigns[0].campaign_goal) != 'undefined' && ( this.getresult.campaigns[0].campaign_goal) != null )) {
                    this.impressions_goals = this.getresult.campaigns[0].campaign_goal.goal_value;
                } else {
                    this.impressions_goals = '';
                }

                if ((typeof (this.getresult.campaigns[0].campaign_goal) != 'undefined' && ( this.getresult.campaigns[0].campaign_goal) != null )) {
                    this.clickthrupercentage = this.getresult.campaigns[0].campaign_goal.cpa_click_thru_per;
                    this.clickthrupercentage1 = (this.clickthrupercentage) * 100;
                } else {
                    this.clickthrupercentage = '';
                }
                if ((typeof (this.getresult.campaigns[0].campaign_goal) != 'undefined' && ( this.getresult.campaigns[0].campaign_goal) != null )) {
                    this.viewthrupercentage = this.getresult.campaigns[0].campaign_goal.cpa_view_thru_per;
                    this.viewthrupercentage1 = (this.viewthrupercentage) * 100;
                } else {
                    this.viewthrupercentage = '';
                }

                this.bid_value = this.getresult.campaigns[0].bid_type.name;

                if ((typeof (this.getresult.campaigns[0].campaign_goal) != 'undefined' && ( this.getresult.campaigns[0].campaign_goal) != null )) {
                    this.viewattrval = this.getresult.campaigns[0].view_attribution_window;

                } else {
                    this.viewattrval = '';
                }

                if ((typeof (this.getresult.campaigns[0].campaign_goal) != 'undefined' && ( this.getresult.campaigns[0].campaign_goal) != null )) {
                    this.clickattrval = this.getresult.campaigns[0].click_attribution_window;
                } else {
                    this.clickattrval = '';
                }
            }, error => {
                console.log('Oooops!');
            });
        for (let i = 0; i <= 1; i++) {
            this.isActive.push(false);
            this.isDisabled.push(true);
        }
        this.isokDisabled = true;
        this.divshow0 = 0;
        this.divshow = 0;
        this.divshow2 = 0;
        this.divshow3 = 0;
        this.divshow4 = 0;
        this.divshow5 = 0;
        this.divshow6 = 0;
        this.divshow7 = 0;
    }

    ngOnInit() {
        this.items = ['Select', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        this.p_hour = 'Select';
        this.bidding_type = 'cpm_bidding';
        this.obas = ['Select', 'Evidon', 'Truste', 'OBA Compliance already present'];
        this.oba = 'Select';
        this.m_name = 'by CPM';
    }

    public getDate(): number {
        this.startdt = this.dt && this.dt.getTime() || new Date().getTime();
        return this.dt && this.dt.getTime() || new Date().getTime();
    }

    public getendDate(): number {
        this.enddt = this.enddate && this.enddate.getTime() || new Date().getTime();
        return this.enddate && this.enddate.getTime() || new Date().getTime();
    }

    initializeval() {
        // console.log("set initialize val");
        this.lat = 51.678418;
        this.lng = -7.809007;
        this.mapval = false;
        this.mapval = true;
        // console.log(this.mapval);

    }

    searchlatlng(char) {
        // console.log('val' + char.keyCode);
        this.key = char.keyCode;
        // console.log('search' + this.searchaddress);
        // console.log('key  '+this.key);
        this.link = 'http://maps.google.com/maps/api/geocode/json?address=' + this.searchaddress;
        if (this.key == '13') {
            this._http.get(this.link)
                .subscribe(res => {
                    this.result = res;
                    // console.log('searchbox');
                    // console.log(this.result);
                    // console.log(this.result.results[0].geometry.location.lat);
                    // console.log(this.result.results[0].geometry.location.lng);
                    this.lat = this.result.results[0].geometry.location.lat;
                    this.lng = this.result.results[0].geometry.location.lng;
                    this.mapval = false;
                    this.mapval = true;
                }, err => {
                    console.log('Ooops');
                });
        }
    }

    createsh(type) {
        if (this.temppath.length != 0) {
            this.rand = Math.round((Math.random() * 10) * 10);
            this.polyname = 'polygon' + this.rand;
            // let temparr:Array<LatLngLiteral>=[];
            let temparr: Array<any> = [];
            let temparrval: Array<any> = [];
            let x: any;
            for (x in this.temppath) {
                console.log(this.temppath[x].lat);
                console.log(this.temppath[x].lng);
                console.log(temparr);
                temparrval = [];
                temparrval.push(this.temppath[x].lng);
                temparrval.push(this.temppath[x].lat);
                console.log(temparrval);

                // temparr.push({lng:this.temppath[x].lng,lat:this.temppath[x].lat});
                temparr.push(temparrval);
            }
            let polyshape: any = {
                fencename: this.polyname,
                fencecoordinates: temparr,
                fencecheckbox: false
            }
            console.log(polyshape);
            this.fence.push(polyshape);
            console.log('polyshape details ');
            console.log(this.fence);
            /* for (let j in this.fence) {
             console.log(this.fence[j]);
             this.show.push(this.fence[j]);
             }*/
            // this.polyshape = this.fence[0];
            // this.polyshapename = this.fence[0].fencename;
        }
        this.temppath = [];
        /* this.updatefence(data);*/
    }

    /* updatefence(data) {
     this.link = 'http://simplyfi.influxiq.com/putgeofence.php';
     console.log('updatefence');
     console.log(data);
     this._http.post(this.link, JSON.stringify(data))
     .subscribe(res => {
     this.fenceressult = res.json();
     console.log('res'+this.fenceressult);
     }, error => {
     console.log('Oooops!');
     });
     }*/
    createcampaign() {
        this.viewthrupercentage1 = 0;
        this.clickthrupercentage1 = 0;
        this.viewattrval = 30;
        this.clickattrval = 30;
        this.rand1 = Math.round((Math.random() * 10) * 10);
        this.link = 'http://simplyfi.influxiq.com/create_campaign1.php?v=' + this.rand1;
        this.data = {};
        this._http.get(this.link)
            .subscribe(res => {
                //    console.log(res);
                this.result = res;
                console.log('created');
                this.loadervalue = false;
                this.addcookie.putObject('cookiedetails', this.result.campaigns[0].id);
                console.log('id +++++++++++' + this.result.campaigns[0].id);
                this.cookiedetails = this.addcookie.getObject('cookiedetails');
                console.log('after putobject ' + this.cookiedetails);
                this.newcreatedcampaignid = this.result.campaigns[0].id;
                this.newcreatedcampaignname = this.result.campaigns[0].name;
                this.name = this.result.campaigns[0].name;
                // console.log(this.newcreatedcampaignname);
                console.log('id of new created campaign ->  ' + this.newcreatedcampaignid);
                console.log('nameof new created campaign ->  ' + this.newcreatedcampaignname);
            }, err => {
                console.log('Ooops');
            });
    }

    gettype(val) {
        // console.log(val);
        if (val == 1) {
            this.geoid = 1;
            this.geoname = 'Search';
        }
        if (val == 2) {
            this.geoid = 2;
            // $(this).attr('#con1').addClass('activetd');
            this.geoname = 'Contextual';
        }
        if (val == 3) {
            this.geoid = 3;
            this.geoname = 'Site Retargeting';
        }
        if (val == 4) {
            this.geoid = 4;
            this.geoname = 'IP Targeting';
        }
        if (val == 5) {
            this.geoid = 5;
            this.geoname = 'Geo Optimized';
        }

    }

    updategeo() {
        this.divshow7 = false;
        let data: any = {
            id: this.cookiedetails,
            campaigndetails: {
                /* campaign_type: {
                 id: this.geoid,
                 name: this.geoname,
                 }*/
                campaign_type_id: this.geoid,
            }
        }
        this.doupdate(data);
    }

    updatename() {
        if (this.name == null || this.name == '') {
            this.error = 'Sorry! Please provide a name.';
        } else {
            this.error = '';
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    name: this.name,
                }
            }
            this.doupdate(data);
        }
    }

    sendtype(type) {
        // console.log(type);
        if (type == 0) {
            this.divshow0 = (1 - this.divshow0);
        }
        if (type == 1) {
            this.divshow = (1 - this.divshow);
        }
        if (type == 2) {
            this.divshow2 = (1 - this.divshow2);
        }
        if (type == 3) {
            this.divshow3 = (1 - this.divshow3);
        }
        if (type == 4) {
            this.divshow4 = (1 - this.divshow4);
        }
        if (type == 5) {
            this.divshow5 = (1 - this.divshow5);
        }
        if (type == 6) {
            this.isDisabled[0] = false;
            this.isActive[0] = true;
        }
        if (type == 7) {
            this.divshow7 = (1 - this.divshow7);
        }
        if (type == 21) {
            this.divshow21 = (1 - this.divshow21);
        }
        /*setTimeout(() => {
         this.isDisabled[val] = false;
         this.isActive[val] = true;
         }, 100);*/
    }

    updatedate() {
        this.error1 = '';
        console.log('updatedate error ' + this.error1);
        console.log('startdate' + this.startdt);
        console.log('enddate ' + this.enddt);
        this.currentdate = new Date().getTime();
        // this.currentdate = this.currentdate.getTime();
        console.log('currentdate ' + this.currentdate);
        /* if (this.startdt < this.currentdate) {
         this.error1 = 'Provide a proper Start date..!';
         console.log("go");
         }*/
        if (this.startdt > this.enddt) {
            this.error1 = 'End date must be on or after start date..!';
            console.log('go');
        }
        if (this.startdt == this.enddt) {
            this.error1 = 'Start date & End date cannot be equal..!';
            console.log('go1');
        }
        /*  if (this.startdt > this.enddt || this.startdt == this.currentdate) {
         this.error1 = 'Provide a proper Start date..!';
         console.log("go1");
         }*/

        //  if (this.enddt < this.currentdate || this.enddt < this.startdt) {
        if (this.enddt < this.startdt) {
            console.log('go2');
            this.error1 = 'Please provide proper End date..!';
        }
        console.log('else part ' + this.error1);
        if (this.error1 == '') {
            this.divshow0 = false;
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    start_date: this.dt,
                    end_date: this.enddate,
                }
            }
            this.dateforstart = this.dt;
            this.dateforend = this.enddate;
            this.doupdate(data);
        }
    }

    selectm_name() {
        // console.log(this.m_name);
        if (this.m_name == 'by_CPM') {
            this.bycpm = '1';
            this.bymedia = '';
            this.byspeed = '';
        }
        if (this.m_name == 'by_Percent_Media') {
            this.bycpm = '';
            this.bymedia = '1';
            this.byspeed = '';
        }
        if (this.m_name == 'by_Percent_Speed') {
            this.bycpm = '';
            this.bymedia = '';
            this.byspeed = '1';
        }
    }

    updatebudget() {
        this.error2 = '';
        this.error3 = '';
        this.error4 = '';
        this.error5 = '';
        // console.log('amt'+this.bidding_amount);
        // console.log('auto'+this.auto);
        // console.log(this.bidding_type);
        // console.log(this.daily_spend_target);
        if ((this.bidding_type == 'cpm_bidding') && (this.bidding_amount == null )) {
            this.error2 = 'Max bid is not a number';
        }
        if (this.bidding_amount > 99) {
            this.error2 = 'Max bid must be less than or equal to 99';
        }
        if (this.campaign_budget < this.monthly_budget) {
            this.error3 = 'Total budget must be greater than or equal to monthly budget';
        }
        if (this.campaign_budget < this.daily_spend_target) {
            this.error4 = 'Total budget must be greater than or equal to daily spend target';
        }
        if (this.monthly_budget < this.daily_spend_target) {
            this.error5 = 'Monthly budget must be greater than or equal to daily spend target';
        }
        if (this.bidding_type == 'cpc_bidding' && (this.bidding_amount == null)) {
            this.error2 = 'Goal value cannot be blank';
        }
        if (this.error2 == '' && this.error3 == '' && this.error4 == '' && this.error5 == '') {
            this.divshow = false;
            // console.log("what is going on "+this.bidding_type);
            // console.log("what is going on "+this.bidding_amount);
            if (this.bidding_type == 'cpm_bidding') {
                this.bidid = 1;
                this.bid_value = 'CPM';
                this.valcpc = false;
            }
            if (this.bidding_type == 'cpc_bidding') {
                // console.log('inside');
                this.bidid = 2;
                this.bid_value = 'CPC';
                this.valcpc = true;

                if (this.valcpc == true && (this.goals == 'none' || this.goals == 'ctr')) {
                    // console.log('????????????????????????????');
                    this.disableokforcpc = true;
                }
            }

            this.submitedval = 1;
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    bid_type_id: this.bidid,
                    bid: this.bidding_amount,
                    monthly_budget: this.monthly_budget,
                    total_budget: this.campaign_budget,
                    daily_budget: this.daily_spend_target,
                    auto_adjust_daily_budget: this.auto,
                },
            }
            this.doupdate(data);
        }
    }

    updatecapping() {
        this.error6 = '';
        this.error7 = '';
        this.error8 = '';
        this.error9 = '';
        // console.log("call");
        // console.log("impresion_c "+this.impressions_c);
        // console.log("monthly "+this.monthly_impression);
        // console.log("daily "+this.daily_impression);
        // console.log("impressn f "+this.impressions_f);
        // console.log("hour "+this.p_hour);
        if (parseFloat(this.impressions_c) < parseFloat(this.monthly_impression)) {
            console.log('if-1');
            this.error7 = 'Impression cap must be greater than or equal to monthly impression cap';
        }
        if (parseFloat(this.impressions_c) < parseFloat(this.daily_impression)) {
            console.log('if-2');
            this.error8 = 'Impression cap must be greater than or equal to daily impression cap';
        }
        if (parseFloat(this.monthly_impression) < parseFloat(this.daily_impression)) {
            console.log('if-3');
            this.error9 = 'Monthly impression cap must be greater than or equal to daily impression cap';
        }

        console.log('p_hour' + this.p_hour);
        console.log('impressions_f' + this.impressions_f);

        if (( this.impressions_f == '' && this.p_hour != 'Select') || (this.impressions_f != '' && this.p_hour == 'Select')) {
            console.log('if-4');
            this.error6 = 'Frequency capping impressions and per hour must both be blank or non-zero';
        }
        if (this.error7 == '' && this.error6 == '' && this.error8 == '' && this.error9 == '') {
            console.log('done');
            this.divshow2 = false;
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    impression_cap: this.impressions_c,
                    daily_impression_cap: this.daily_impression,
                    monthly_impression_cap: this.monthly_impression,
                    frequency_capping: {
                        how_many_times: this.impressions_f,
                        hours: this.p_hour,
                    }
                }
            }
            this.doupdate(data);
        }
    }

    callfunction(type) {
        if (type == 0) {
            // console.log('type 0');
            this.slidedisable = true;
            // console.log("0");
            this.calforcpc = '';
            this.calforctr = '';
            this.calforcpa = '';
            this.impressions_goals = '';
            console.log(this.slidedisable);
        }
        if (type == 1) {
            this.slidedisable = false;
            // console.log("1");
            this.calforcpc = 1;
            this.calforcpa = '';
            this.calforctr = '';
            this.disableokforcpc = false;
            console.log(this.slidedisable);
        }
        if (type == 2) {
            this.slidedisable = false;
            // console.log("2");
            this.calforctr = 1;
            this.calforcpa = '';
            this.calforcpc = '';
        }
        if (type == 3) {
            this.slidedisable = false;
            // console.log("3");
            this.calforcpa = 1;
            this.calforcpc = '';
            this.calforctr = '';
            this.disableokforcpc = false;
        }
    }

    updategoal() {
        this.error10 = '';
        // console.log('goal val'+this.goals);
        // console.log('impresn goal val'+this.impressions_goals);
        if (this.goals != 'none' && (this.impressions_goals == null || this.impressions_goals == '')) {
            this.error10 = 'Goal value cannot be blank';
        }
        if (this.goals == 'ctr' && this.impressions_goals > 1) {
            this.error10 = 'Goal value must be less than or equal to 1.0';
        }
        if (this.goals == 'none') {
            this.error10 = '';
        }
        if (this.error10 == '') {
            this.divshow4 = false;
            let data: any = {
                id: this.cookiedetails,
                campaigndetails: {
                    campaign_goal: {
                        goal_type: this.goals,
                        goal_value: this.impressions_goals,
                    }
                }
            }
            this.doupdate(data);
        }
    }


    selectoba() {
        if (this.oba == 'Select') {
            this.isokDisabled = true;
        } else {
            this.isokDisabled = false;
        }
    }

    updateoba() {
        // console.log('oba val '+this.oba);
        if (this.oba == 'Evidon') {
            this.obaid = 2;
        }
        if (this.oba == 'Truste') {
            this.obaid = 1;
        }
        if (this.oba == 'OBA Compliance already present') {
            this.obaid = 3;
        }
        this.divshow5 = false;
        let data: any = {
            id: this.cookiedetails,
            campaigndetails: {
                oba_provider_id: this.obaid,
            }
        }
        this.doupdate(data);
    }

    updatemarkup() {
        if (this.fee == null || this.fee == '') {
            this.error11 = 'Name is too short (minimum is 1 character)';
        }
        if (this.m_name == null || this.m_name == '') {
            this.error12 = 'Markup is not a number';
        } else {
            // this.doupdate();
        }
        /*if(this.divshow6 == 0){
         this.isokDisabled1 = true;
         }
         else{
         this.isokDisabled1 = true;
         }*/
    }

    myOnUpdate(val: any) {
        // console.log('hey');
    }

    myOnChange(val: any, type) {
        this.disableconversions = false;
        if (type == 1) {
            this.viewthrupercentage = (val.from) / 100;
            // console.log('con'+this.viewthrupercentage);
        }
        if (type == 2) {
            this.clickthrupercentage = (val.from) / 100;
        }
        if (type == 3) {
            this.viewattrval = val.from;
        }
        if (type == 4) {
            this.clickattrval = val.from;
        }
    }

    myOnFinish(val: any, type) {
        // console.log('hello');
    }

    updateslider() {
        // console.log('call-slider');
        let data: any = {
            id: this.cookiedetails,
            campaigndetails: {
                click_attribution_window: this.clickattrval,
                view_attribution_window: this.viewattrval,
                campaign_goal: {
                    cpa_click_thru_per: this.clickthrupercentage,
                    cpa_view_thru_per: this.viewthrupercentage,
                }

            }
        }
        this.disableconversions = true;
        this.doupdate(data);
    }

    doupdate(data: any) {

        /*  let data: any = {
         id: this.cookiedetails,
         campaigndetails: {
         name: this.name,
         start_date: this.dt,
         end_date: this.enddate,
         campaign_budget: this.campaign_budget,
         bidding_type: this.bidding_type,
         monthly_budget: this.monthly_budget,
         bidding_amount: this.bidding_amount,
         daily_spend_target: this.daily_spend_target,
         impressions_c: this.impressions_c,
         monthly_impression: this.monthly_impression,
         daily_impression: this.daily_impression,
         impressions_f: this.impressions_f,
         p_hour: this.p_hour,
         goals: this.goals,
         impressions_goals: this.impressions_goals,
         oba: this.oba,
         fee: this.fee,
         m_name: this.m_name,
         m_cpm: this.m_cpm,
         m_media: this.m_media,
         m_speed: this.m_speed,
         },
         };*/
        this.link = 'http://simplyfi.influxiq.com/update_campaign.php';
        console.log('doupdatedata');
        console.log(data);
        this._http.post(this.link, JSON.stringify(data))
            .subscribe(res => {
                this.updateresult = res;
                // console.log(this.updateresult.errors[0]);
                //  this.resperr=this.updateresult.errors[0];
            }, error => {
                console.log('Oooops!');
            });
    }

    mapClicked($event: any) {

        // console.log($event.coords.lat);
        // console.log($event.coords.lng);
        // this.temppath.push({lat:$event.coords.lat,lng:$event.coords.lng});
        this.temppath.push($event.coords);
        console.log(this.temppath);
        console.log('this.patharr');
        console.log(this.patharr);
        if (this.temppath.length == 2) {
            // this.patharr.push(this.paths1);
            this.patharr.push(this.temppath);
        }
        if (this.temppath.length > 2) {
            // this.patharr.push(this.paths1);
            console.log('in 2>');
            this.patharr.pop();
            setTimeout(() => {
                // this.patharr=this.patharr.slice(0,1);
                this.patharr.push(this.temppath);
            }, 300);

            // this.patharr[this.patharr.length-1]=this.temppath;
        }
    }

    deletepolyshape(item: any) {
        console.log('fence total');
        console.log(this.fence);
        let indexval: any = this.fence.indexOf(item);
        console.log('-----------------');
        console.log('-----------------');
        console.log(indexval);
        this.fence.splice(indexval, 1);
        this.patharr.splice(indexval, 1);
        // console.log('fence after poprr');
        // console.log(this.fence);
    }

    mapdelete() {
        // console.log(this.polydelete);
        if (this.polydelete == 'removeall') {
            this.fence = [];
            this.patharr = [];
            this.polydelete = 'Actions';
        }
        if (this.polydelete == 'removeselected') {
            console.log('removeselected');
            for (let i in this.fence) {
                if (this.fence[i].fencecheckbox == true) {
                    this.fence.splice(i, 1);
                    this.patharr.splice(i, 1);
                }
                this.polydelete = 'Actions';
            }
        }

    }

    allcheck() {
        setTimeout(() => {
            console.log(this.checkuncheck);
            if (this.checkuncheck == true) {
                for (let i in this.fence) {
                    this.fence[i].fencecheckbox = true;
                }
            }
            if (this.checkuncheck == false) {
                for (let i in this.fence) {
                    this.fence[i].fencecheckbox = false;
                }
            }
        }, 400);
    }

    savepolygon() {

        this.link = 'http://simplyfi.influxiq.com/putgeoconversion.php';
        let data = {
            fence: JSON.stringify(this.fence),
            id: this.cookiedetails
        };
        // this._http.post(this.link, JSON.stringify(this.fence))
        this._http.post(this.link, data)
            .subscribe(res => {
                this.polygonresult = res;
                console.log('+++++++++++++++++++++++++++++++++++this.polygonresult+++++++++++++++++++++++++');
                console.log(this.polygonresult);
                console.log(this.polygonresult.errors);
                this.sizeerrors = this.polygonresult.errors;
            }, error => {
                console.log('Oooops!');
            });
        setTimeout(() => {
            console.log('after change');
            console.log(this.fence);
        }, 400);
    }

    /* ---------------------------------------------------------------------------------------------------------------------------  */

    addtolist(id, name) {
        this.selected_locations1.push({attr_id: id, attr_name: name});
        console.log(this.selected_locations1);
        if (this.selected_locations1.length > 6) {
            this.show_locations1 = [];
            this.show_locations1.push({attr_name: this.selected_locations1.length + ' Countries'});
        }
        else {
            // this.show_locations=[];
            this.show_locations1.push({attr_id: id, attr_name: name});
        }
        console.log('give me the values');
        console.log(this.show_locations1);
    }

    deletelocations1(id, name, item) {
        console.log('deletelocations1==================');
        console.log(this.selected_locations1);
        console.log(id);
        let indexval: any = this.selected_locations1.indexOf(item);
        console.log('-----------------');
        console.log(indexval);
        this.selected_locations1.splice(indexval, 1);
        console.log(this.selected_locations1);
        if (this.selected_locations1.length > 6) {
            this.show_locations1 = [];
            this.show_locations1.push({attr_name: this.selected_locations1.length + ' Countries'});
            // this.show_locations.splice(indexval, 1) + ' Countries';
        } else {
            // this.show_locations.push({attr_id: id, attr_name: name});
            this.show_locations1.splice(indexval, 1);
        }
    }

    childlist1(id, name, type) {
        if (type == 1) {
            this.count1++;
            this.currentval[this.count1] = id;
            this.nameval[this.count1] = name;
        }
        if (type == 2) {
            this.count1--;
            id = this.currentval[this.count1];
            name = this.nameval[this.count1];
            if (id == 0) {
                this.locationnameforreverse = 'Selectable locations';
                this.getbackparentlist();
                return;
            }
        }
        console.log('id of clildlist ' + id);
        this.locationidforreverse = id;
        this.locationnameforreverse = name;
        console.log('childlist');
        this.parent_locations = [];

        this.link = 'http://simplyfi.influxiq.com/getchildlist.php?parent_id=' + id;
        this._http.get(this.link)
            .subscribe(res => {
                this.parent_locations = res;
                console.log(this.parent_locations);
                console.log(this.parent_locations.geo_targets.length);
                if (this.parent_locations.geo_targets.length > 0) {
                    this.details1 = [];
                    for (let c in this.parent_locations.geo_targets) {
                        this.details1[c] = this.parent_locations.geo_targets[c];
                    }
                }
            }, error => {
                console.log('Oooops!');
            });

    }
    getbackparentlist(){
        this.parent_locations = [];
        this.details1 = [];
        this.link = 'http://simplyfi.influxiq.com/updateaudience.php';
        this._http.get(this.link)
            .subscribe(res => {
                this.parent_locations = res;
                console.log(this.parent_locations);
                for ( let c in this.parent_locations.geo_targets) {
                    this.details1[c] = this.parent_locations.geo_targets[c];
                }
            }, error => {
                console.log('Oooops!');
            });
    }

    submitlocation1(selected_locations1) {
        console.log('this.fence----------------------------------');
        console.log(this.fence1.length);
        if (this.fence1.length > 0) {
            this.error11= 'There were errors with your request: Geo targets Select either Location Targeting or Geo Fencing, but not both';
        } else {
            this.link = 'http://simplyfi.influxiq.com/add_geo_target.php';
            let data = {
                selected_locations1: JSON.stringify(selected_locations1),
                id: this.cookiedetails
            };
            this._http.post(this.link, data)
            //  this._http.post(this.link, selected_locations)
                .subscribe(res => {
                    this.result = res;
                    // console.log(this.result);
                }, error => {
                    console.log('Oooops!');
                });
        }
    }
    select(type) {
        if (type == 1) {
            this.browserselect = 1;
        }
        if (type == 2) {
            this.dayparting = 1;
        }
        if (type == 3) {
            this.deals = 1;
        }
        if (type == 4) {
            this.device_types = 1;
        }
        if (type == 5) {
            this.locations = 1;
        }
        if (type == 6) {
            this.operating_systems = 1;
        }
        if (type == 7) {
            this.pacing = 1;
        }
        if (type == 8) {
            this.third_party_segments = 1;
        }
        if (type == 9) {
            this.viewability = 1;
        }
        if (type == 9) {
            this.website_filtering = 1;
        }
    }

    updatebrowsers() {
        let j = 0 ;
        console.log(this.select1);
        console.log('total no ' + j);
    }
    initializeval1() {
        this.lat1 = 51.678418;
        this.lng1 = -7.809007;
        this.mapval1 = false;
        this.mapval1 = true;
    }

    searchlatlng1(char) {
        this.key = char.keyCode;
        this.link = 'http://maps.google.com/maps/api/geocode/json?address=' + this.searchaddress1;
        if (this.key == '13') {
            this._http.get(this.link)
                .subscribe(res => {
                    this.result = res;
                    // console.log('searchbox');
                    // console.log(this.result);
                    // console.log(this.result.results[0].geometry.location.lat);
                    // console.log(this.result.results[0].geometry.location.lng);
                    this.lat1 = this.result.results[0].geometry.location.lat;
                    this.lng1 = this.result.results[0].geometry.location.lng;
                    this.mapval1 = false;
                    this.mapval1 = true;
                }, err => {
                    console.log('Ooops');
                });
        }
    }

    createsh1(type) {
        console.log('this.temppath1 at start---------????????????????????????????????');
        console.log(this.temppath1);
        console.log(this.temppath1.length);
        // this.temppath = [];
        if (this.temppath1.length != 0) {
            this.rand = Math.round((Math.random() * 10) * 10);
            this.polyname = 'polygon' + this.rand;
            let temparr1: Array<any> = [];
            let temparrval1: Array<any> = [];
            let x: any;
            for (x in this.temppath1) {
                console.log(this.temppath1[x].lat);
                console.log(this.temppath1[x].lng);
                console.log(temparr1);
                temparrval1 = [];
                temparrval1.push(this.temppath1[x].lng);
                temparrval1.push(this.temppath1[x].lat);
                console.log(temparrval1);
                temparr1.push(temparrval1);
            }
            let polyshape1: any = {
                fencename: this.polyname,
                fencecoordinates: temparr1,
                fencecheckbox: false
            }
            console.log(polyshape1);
            this.fence1.push(polyshape1);
            console.log('polyshape details ');
            console.log(this.fence1);
        }
        this.temppath1 = [] ;
    }
    mapClicked1($event: any) {
        console.log('mapclicked');
        // console.log($event.coords.lat);
        // console.log($event.coords.lng);
        // this.temppath.push({lat:$event.coords.lat,lng:$event.coords.lng});
        this.temppath1.push($event.coords);
        console.log(this.temppath1);
        console.log('this.patharr1');
        console.log(this.patharr1);
        if (this.temppath1.length == 2) {
            this.patharr1.push(this.temppath1);
        }
        if (this.temppath1.length > 2) {
            // this.patharr.push(this.paths1);
            console.log('in 2>');
            this.patharr1.pop();
            setTimeout(() => {
                // this.patharr=this.patharr.slice(0,1);
                this.patharr1.push(this.temppath1);
            }, 300);
        }
    }

    mapdelete1() {
        // console.log(this.polydelete);
        if (this.polydelete1 == 'removeall') {
            this.fence1 = [];
            this.patharr1 = [];
            this.polydelete1 = 'Actions';
        }
        if (this.polydelete1 == 'removeselected') {
            console.log('removeselected');
            for (let i in this.fence1) {
                if ( this.fence1[i].fencecheckbox == true ) {
                    this.fence1.splice(i, 1);
                    this.patharr1.splice(i, 1);
                }
                this.polydelete1 = 'Actions';
            }
        }

    }
    savepolygon1() {
        this.fence_length1 = this.fence1.length+' Geo Fence';

        console.log('selected_locations1-------------------');
        console.log(this.selected_locations1.length);
        if (this.selected_locations1.length > 0) {
            this.error11 = 'There were errors with your request: Geo targets Select either Location Targeting or Geo Fencing, but not both';
        }
        else {
            this.link = 'http://simplyfi.influxiq.com/putgeofence.php';
            let data = {
                fence: JSON.stringify(this.fence1),
                id: this.cookiedetails
            };
            // this.link = 'http://simplyfi.influxiq.com/putgeoconversion.php';
            // this._http.post(this.link, JSON.stringify(this.fence))
            this._http.post(this.link, data)
                .subscribe(res => {
                    this.polygonresult1 = res;
                    console.log('this.polygonresult1++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.log(this.polygonresult1);
                }, error => {
                    console.log('Oooops!');
                });
            setTimeout(() => {
                console.log('after change');
                console.log(this.fence1);
            }, 400);
        }
    }

    allcheck1() {
        setTimeout(() => {
            console.log(this.checkuncheck1);
            if (this.checkuncheck1 == true) {
                for (let i in this.fence1) {
                    this.fence1[i].fencecheckbox = true;
                }
            }
            if (this.checkuncheck1 == false) {
                for (let i in this.fence1) {
                    this.fence1[i].fencecheckbox = false;
                }
            }
        }, 400);
    }

    deletepolyshape1( item: any ) {
        console.log('fence total');
        console.log(this.fence1);
        let indexval: any = this.fence1.indexOf(item);
        console.log('-----------------');
        console.log('-----------------');
        console.log(indexval);
        this.fence1.splice(indexval, 1);
        this.patharr1.splice(indexval, 1);
        // console.log('fence after poprr');
        // console.log(this.fence);
    }

}