import { Component, NgModule, VERSION, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
declare var google: any;
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-polyintersect',
    templateUrl: './polyintersect.component.html',
    styleUrls: ['./polyintersect.component.css'],
    providers: [Commonservices],
})
export class PolyintersectComponent implements OnInit {
    public emailcookie: CookieService;
    public mailcookiedetails;
    public serverurl;
    public http;
    map: any;
    type: any;
    data: any = [];
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

    constructor( emailcookie: CookieService, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log(this.mailcookiedetails);
        if (typeof (this.mailcookiedetails) == 'undefined') {
            this.router.navigateByUrl('/');
        }
    }
    ngOnInit() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -25.363882, lng: 131.044922 },
            zoom: 8
        });
       /* var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(-25.307252348874915, 131.03496551513672),
            map: this.map
        });
        var marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(-25.30042393869032, 131.05504989624023),
            map: this.map
        });
        var marker3 = new google.maps.Marker({
            position: new google.maps.LatLng(-24.264956471103403, 131.10220649096823),
            map: this.map
        });
        var marker4 = new google.maps.Marker({
            position: new google.maps.LatLng(-23.93830951568981, 131.46004936840677),
            map: this.map
        });*/

        this.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon','circle','rectangle']
            }
        });
        this.drawingManager.setMap(this.map);
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
            // Polygon drawn
            if (event.type === google.maps.drawing.OverlayType.POLYGON) {
                // this is the coordinate, you can assign it to a variable or pass into another function.
                PolyintersectComponent.ctype = event.type;
              //  alert(event.overlay.getPath().getArray());
                PolyintersectComponent.poly_arr = event.overlay.getPath().getArray();
                PolyintersectComponent.totalshapes.push({
                    type: PolyintersectComponent.ctype,
                    poly_arr: PolyintersectComponent.poly_arr
                });

               // console.log('PolyintersectComponent ' +  PolyintersectComponent.poly_arr) ;
            }

            if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
                // alert(event.overlay.getBounds());
            }
            if (event.type === google.maps.drawing.OverlayType.RECTANGLE) {
                PolyintersectComponent.ctype = event.type;
                PolyintersectComponent.ne_lat = event.overlay.getBounds().getNorthEast().lat();
                PolyintersectComponent.ne_lng = event.overlay.getBounds().getNorthEast().lng();
                PolyintersectComponent.sw_lat = event.overlay.getBounds().getSouthWest().lat();
                PolyintersectComponent.sw_lng = event.overlay.getBounds().getSouthWest().lng();
               /* console.log('Northeast lat   ' + event.overlay.getBounds().getNorthEast().lat());
                console.log('Northeast lng   ' + event.overlay.getBounds().getNorthEast().lng());
                console.log('SouthWest lat   ' + event.overlay.getBounds().getSouthWest().lat());
                console.log('SouthWest lng   ' + event.overlay.getBounds().getSouthWest().lng());*/
                PolyintersectComponent.totalshapes.push({
                    type: PolyintersectComponent.ctype,
                    ne_lat: PolyintersectComponent.ne_lat,
                    ne_lng: PolyintersectComponent.ne_lng,
                    sw_lat: PolyintersectComponent.sw_lat,
                    sw_lng: PolyintersectComponent.sw_lng,
                });
            }
        });


        google.maps.event.addListener(this.drawingManager, 'circlecomplete', function (circle) {
            var radius = circle.getRadius();
            //   alert(radius);

        });
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function (event) {
            if (event.type == 'circle') {
                PolyintersectComponent.ctype = event.type;
                PolyintersectComponent.cradius = event.overlay.getRadius();
                PolyintersectComponent.ccenter = event.overlay.getCenter();
                PolyintersectComponent.totalshapes.push({
                    type: PolyintersectComponent.ctype,
                    cradius: PolyintersectComponent.cradius,
                    ccenter: PolyintersectComponent.ccenter,
                });
                //   this.callforadd(type, radius, center);
            }
        });

        /* setTimeout(() => {
           alert('type is '+ this.type);
        }, 4000);*/
    }
    callforadd() {
        if ((PolyintersectComponent.totalshapes.length) > 0 ) {

            for (let i in PolyintersectComponent.totalshapes) {
                if (PolyintersectComponent.totalshapes[i].type == 'circle') {
                    this.data[i] = {
                        email: this.mailcookiedetails,
                        type: PolyintersectComponent.totalshapes[i].type, radius: PolyintersectComponent.totalshapes[i].cradius,
                        center: PolyintersectComponent.totalshapes[i].ccenter
                    };
                }

                if (PolyintersectComponent.totalshapes[i].type == 'rectangle') {
                    this.data[i] = {
                        email: this.mailcookiedetails,
                        type: PolyintersectComponent.totalshapes[i].type, ne_lat: PolyintersectComponent.totalshapes[i].ne_lat,
                        ne_lng: PolyintersectComponent.totalshapes[i].ne_lng, sw_lat: PolyintersectComponent.totalshapes[i].sw_lat,
                        sw_lng: PolyintersectComponent.totalshapes[i].sw_lng
                    };
                }

                if (PolyintersectComponent.totalshapes[i].type == 'polygon') {
                    this.data[i] = {
                        email: this.mailcookiedetails,
                        type: PolyintersectComponent.totalshapes[i].type,
                        path: PolyintersectComponent.totalshapes[i].poly_arr
                    };
                }


            }
            console.log('this.data/////');
            console.log(this.data);
             let link = 'http://localhost:3004/insertshapes';
           // let link = this.serverurl + 'insertshapes';
            this._http.post(link, this.data)
                .subscribe(res => {
                    let result11: any;
                     result11 = res;
                    if (result11.status == 'success') {
                        //  alert('added successfully');
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
       // this.drawingManager.setMap(null);
    }

/*    callforadd(type, radius, center) {
        let link = 'http://localhost:3004/insertshapes';
        let data = {type: type, radius: radius, center: center};
        this._http.post(link, data)
            .subscribe(res => {
                let result11 = res.json();
                if (result11.status == 'success') {
                    alert("added successfully");
                }
                else {
                }
            }, error => {
                console.log('Oooops!');
            });
    }*/

    logout() {
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.emailcookie.removeAll();
        this.router.navigateByUrl('');
    }

}
