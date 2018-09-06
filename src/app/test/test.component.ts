import { Component, OnInit } from '@angular/core';
import {LatLngLiteral} from '@agm/core';
import {Http} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public addcookie: CookieService;
  public cookiedetails;
  public browserselect;
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
  public link1: any;
  public locationidforreverse: any;
  public locationnameforreverse: any;
  public lat1: any;
  public lng1: any;
  public mapval1: any;
  public searchaddress1: any;
  public checkuncheck1;
  public key: any;
  public link;
  public divshow21;
  public parent_locations: any = [];
  public selected_locations1: any = [];
  public details1: any = [];
  public getresult2: any;
  public result;
  public rand: any;
  public currentval: any = [];
  public nameval: any = [];
  public count1: any;
  public polyname: any;
  public polydelete1: any;
  patharr1: any = [];
  public fence1: any = [];
  public error11: any;
  public bounds1: any=[];
  public temppath1: Array<LatLngLiteral>= [];
  public allcoordinates1: Array<LatLngLiteral>= [];
  public polygonresult1: any;
  paths1: Array<LatLngLiteral> = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ]
  public values: any;
  public show_locations1: any = [];
  public fence_length1: string;
  constructor(addcookie: CookieService, private _http: Http, private mapsAPILoader: MapsAPILoader) {
    this.currentval.push(0);
    this.nameval.push(0);
    this.count1 = 0;
    // this.locationidforreverse = 'Selectable Locations';
    this.locationnameforreverse = 'Selectable Locations';
    this.divshow21 = 0;
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    console.log('cookiedetails');
    console.log('get id from saved cookie ->  ' + this.cookiedetails);
    this.link1 = 'http://simplyfi.influxiq.com/getgeoofence.php?id=' + this.cookiedetails ;
    this._http.get(this.link1)
        .subscribe(res => {
          this.getresult2 = res.json();
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
            for (let i = 0; i <  this.allcoordinates1.length; i++) {
              this.bounds1.extend( this.allcoordinates1[i]);
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
          this.parent_locations = res.json();
          for ( let c in this.parent_locations.geo_targets) {
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
          this.values = res.json();
          console.log('this.values');
          console.log(this.values);
          for (let v in this.values.geo_targets) {
            // this.selected_locations.push({attr_id: this.values.geo_targets.id, attr_name: this.values.geo_targets.name});
            this.addtolist(this.values.geo_targets[v].id,  this.values.geo_targets[v].name);
            console.log(this.values.geo_targets[v].id,  this.values.geo_targets[v].name);
          }
        }, error => {
          console.log('Oooops!');
        });
  }

  ngOnInit() {
  }
  addtolist(id, name) {
    this.selected_locations1.push({attr_id: id, attr_name: name});
    console.log(this.selected_locations1);
    if (this.selected_locations1.length > 6) {
      this.show_locations1= [];
      this.show_locations1.push({attr_name: this.selected_locations1.length +' Countries'}) ;
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
      this.show_locations1.push({attr_name: this.selected_locations1.length +' Countries'}) ;
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
    console.log('id of clildlist '+ id);
    this.locationidforreverse = id;
    this.locationnameforreverse = name;
    console.log('childlist');
    this.parent_locations = [];

    this.link = 'http://simplyfi.influxiq.com/getchildlist.php?parent_id=' + id;
    this._http.get(this.link)
        .subscribe(res => {
          this.parent_locations = res.json();
          console.log(this.parent_locations);
          console.log(this.parent_locations.geo_targets.length);
          if (this.parent_locations.geo_targets.length > 0) {
            this.details1 = [];
            for ( let c in this.parent_locations.geo_targets) {
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
          this.parent_locations = res.json();
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
            this.result = res.json();
            // console.log(this.result);
          }, error => {
            console.log('Oooops!');
          });
    }
  }
  sendtype(type) {
    if (type == 21) {
      this.divshow21 = (1 - this.divshow21);
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
            this.result = res.json();
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
      let temparr: Array<any> = [];
      let temparrval: Array<any> = [];
      let x: any;
      for (x in this.temppath1) {
        console.log(this.temppath1[x].lat);
        console.log(this.temppath1[x].lng);
        console.log(temparr);
        temparrval = [];
        temparrval.push(this.temppath1[x].lng);
        temparrval.push(this.temppath1[x].lat);
        console.log(temparrval);
        temparr.push(temparrval);
      }
      let polyshape: any = {
        fencename: this.polyname,
        fencecoordinates: temparr,
        fencecheckbox: false
      }
      console.log(polyshape);
      this.fence1.push(polyshape);
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
            this.polygonresult1 = res.json();
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
