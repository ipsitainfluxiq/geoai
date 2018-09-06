import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
//declare var $;
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
    public url;

    constructor(private router: Router) {}

ngOnInit() {
    this.router.events.subscribe(val=> {
        if (val instanceof NavigationEnd) {
            let curUrlTree = this.router.parseUrl(this.router.url);
          //  console.info(this.router.url);
            this.url=this.router.url;
         /*   $('.ssd ').removeClass('active');
            if (this.url=='/campaignlists'){
                $('.ssd ').eq(0).addClass('active');
            }
            if (this.url=='/reporting'){
                $('.ssd ').eq(1).addClass('active');
            }
            if (this.url=='/rules'){
                $('.ssd ').eq(2).addClass('active');
            }
            if (this.url=='/wallet'){
                $('.ssd ').eq(3).addClass('active');
            }
            if (this.url=='/wallet'){
                $('.ssd ').eq(4).addClass('active');
            }*/
        }
    });
}
}