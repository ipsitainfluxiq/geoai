import { Component, OnInit } from '@angular/core';
declare  var $;
@Component({
  selector: 'app-bannerlist',
  templateUrl: './bannerlist.component.html',
  styleUrls: ['./bannerlist.component.css']
})

export class BannerlistComponent implements OnInit {
    public modalmapShown: boolean = false;
  constructor() { }

  ngOnInit() {
  }
    callduplicate(val){
        this.modalmapShown = true;
      /*  console.log($('#bannermainblock'+val).html());
        console.log($('#bannerlistsingleinfo'+val).find('h2').html());*/
    //    $('#showdetails') = $('#bannermainblock'+val).html();
        setTimeout(() => {
        $('#showbannerinmodal').append($('#bannermainblock'+val).html());
        $('#showhtmlinmodal').append($('#bannerlistsingleinfo'+val).html());
        },500);
    }
    onHidden() {
        this.modalmapShown = false;
    }
}
