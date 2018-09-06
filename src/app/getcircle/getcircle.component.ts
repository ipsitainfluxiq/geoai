import { Component, NgModule, VERSION, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
declare var google: any;
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import {CookieService} from 'angular2-cookie/core';

@Component({
    selector: 'app-getcircle',
    templateUrl: './getcircle.component.html',
    styleUrls: ['./getcircle.component.css'],
    providers: [Commonservices],
})
export class GetcircleComponent implements OnInit {
    map: any;
    drawingManager: any;
    public serverurl;
    public emailcookie: CookieService;
    public mailcookiedetails;

    constructor(emailcookie: CookieService, private _http: HttpClient, private router: Router, private route: ActivatedRoute, private _commonservices: Commonservices) {
        this.serverurl = _commonservices.url;
        this.emailcookie = emailcookie;
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        console.log(this.mailcookiedetails);
        if (typeof (this.mailcookiedetails) == 'undefined') {
            this.router.navigateByUrl('/');
        }
        this.getshapes();
    }

    ngOnInit() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -25.363882, lng: 131.044922},
            zoom: 10
        });

      /*  var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.CIRCLE,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.CIRCLE
                ]
            },
            circleOptions: {
                strokeColor: '#0099FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#0099FF',
                fillOpacity: 0.35,
                map: this.map,
                //  center: this.marker.getPosition(),
                editable: true,
                radius: 50
            }
        });*/

/*        drawingManager.setMap(this.map);
        google.maps.event.addListener(drawingManager, 'circlecomplete', function (event) {
            // Get circle center and radius
            var center = event.getCenter();
            var radius = event.getRadius();
            event.setMap(null);
             drawingManager.setDrawingMode(null);
            var circle = new google.maps.Circle({
                fillColor: '#ffffff',
                fillOpacity: .6,
                strokeWeight: 1,
                strokeColor: '#000000',
                draggable: true,
                editable: true,
                map: this.map,
                // center: center,
                center: new google.maps.LatLng(-24.821639356846607, 125.31005859375),
                radius: 59292.78407896499,
               // radius: radius
            });
        });*/


            /*google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
                drawingManager.setDrawingMode(null);

                    var radius = e.overlay.getRadius();
                    alert('Radius is ' + radius);
                    alert('Center point ' + e.overlay.getCenter());
            });*/

      /*  var draw_circle = null;
        draw_circle = new google.maps.Circle({
            fillColor: '#000000',
            fillOpacity: .6,
            strokeWeight: 1,
            strokeColor: '#000000',
            draggable: true,
            editable: true,
            map: this.map,
            // center: center,
            center: new google.maps.LatLng(-24.821639356846607, 125.31005859375),
            radius: 59292.78407896499,
            // radius: radius
        });*/

/*        var rectangle = new google.maps.Rectangle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            bounds: {
                north: -24.040820378919836,
                south: -24.27576061693095,
                east: 132.89955139160156,
                west: 132.7416229248047
            }
        });*/


/*        var PolyCoords = [
            {lat: -25.084355134867106 , lng: 130.6658935546875},
            {lat: -25.425912003292144, lng: 130.66177368164062},
            {lat: -25.41971046518043, lng: 131.37863159179688},
            {lat: -25.258358660862395, lng: 131.37863159179688},
            {lat: -25.263326537845106, lng: 130.75103759765625},
            {lat: -25.117932276583332, lng: 130.75103759765625}
        ];



        var bermudaTriangle = new google.maps.Polygon({
            paths: PolyCoords,
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: '#0000FF',
            fillOpacity: 0.35
        });

        bermudaTriangle.setMap(this.map);*/
        }
    getshapes() {
         let link = 'http://localhost:3004/getallshapes';
        // let link = this.serverurl + 'getallshapes';
        let data = {email: this.mailcookiedetails};
            this._http.post(link, data)
                .subscribe(res => {
                    let result: any;
                     result = res;
                    console.log(result);
                    for(let i in result.value) {
                        // console.log(result[i].type) ;
                        if (result.value[i].type == 'rectangle') {
                           this.callrectangle(result.value[i]);
                        }
                        if (result.value[i].type == 'polygon') {
                           this.callpolygon(result.value[i].path);
                        }
                        if (result.value[i].type == 'circle') {
                           this.callcircle(result.value[i].center, result.value[i].radius);
                        }
                    }
                }, error => {
                    console.log('Oooops!');
                });
    }

    callrectangle(latlangs) {
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

    logout() {
        this.mailcookiedetails = this.emailcookie.getObject('mailcookiedetails');
        this.emailcookie.removeAll();
        this.router.navigateByUrl('');
    }

}
