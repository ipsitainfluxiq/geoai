import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trial-airtory',
  templateUrl: './trial-airtory.component.html',
  styleUrls: ['./trial-airtory.component.css']
})
export class TrialAirtoryComponent implements OnInit {
public config;
  constructor() {
      this.config = {
          companyId : '78ba3cb8-e613-299e-832e-e6f402677f70',
          userName : 'Demo User',
          zindex : '99999',
          first_name : 'Fname',
          last_name : 'Lname',
      };
  }

  ngOnInit() {
  }
  call() {
    alert(4);
      /*air_embed.init(this.config, function(d){
          console.log(d.tag);
      });*/
  }
}
