import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {appRoutingProviders, routing} from '../route';
import { AppComponent } from './app.component';
import { OrderformComponent } from './orderform/orderform.component';
import { SimplesolutionComponent } from './simplesolution/simplesolution.component';
import { BasicinformationComponent } from './basicinformation/basicinformation.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { TrialComponent } from './trial/trial.component';
import { CampaignsettingsComponent } from './campaignsettings/campaignsettings.component';
import { HelpdeskaddComponent } from './helpdeskadd/helpdeskadd.component';
import { HelpdesklistComponent } from './helpdesklist/helpdesklist.component';
import {DatepickerModule} from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
 // import {UiSwitchModule} from 'angular2-ui-switch';
 //import {UiSwitchModule} from 'angular2-ui-switch/src';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieService } from 'ngx-cookie-service';
import { CreateAudienceComponent } from './create-audience/create-audience.component';
import { OnlyNumberDirective } from './directives/only_number';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CampaignlistComponent } from './campaignlist/campaignlist.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import {AgmCircle, AgmCoreModule, CircleManager, GoogleMapsAPIWrapper} from '@agm/core';
import { HeaderComponent } from './header/header.component';
import { SummaryComponent } from './summary/summary.component';
import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserlistComponent } from './userlist/userlist.component';
import { OrderBy } from './orderby';
import { UsersearchPipe } from './search.pipe';
//import { Ng2UploaderModule } from 'ng2-uploader';
//import { NgUploaderModule } from 'ngx-uploader';

import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LocationtraceComponent } from './locationtrace/locationtrace.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AccesscodeComponent } from './accesscode/accesscode.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import { CicrlemapComponent } from './cicrlemap/cicrlemap.component';
import { PolyintersectComponent } from './polyintersect/polyintersect.component';
import { GetcircleComponent } from './getcircle/getcircle.component';
import { BrowserComponent } from './browser/browser.component';
import { PacingComponent } from './pacing/pacing.component';
import { LocationsComponent } from './locations/locations.component';
import { ViewabilityComponent } from './viewability/viewability.component';
import { DevicetypesComponent } from './devicetypes/devicetypes.component';
import { DealsComponent } from './deals/deals.component';
import { OsComponent } from './os/os.component';
import { DaypartingComponent } from './dayparting/dayparting.component';
import { AudiencelistComponent } from './audiencelist/audiencelist.component';
import { TriallocComponent } from './trialloc/trialloc.component';
import { TrialAirtoryComponent } from './trial-airtory/trial-airtory.component';
import { CreativeaddComponent } from './creativeadd/creativeadd.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CreativelistComponent } from './creativelist/creativelist.component';
import { CreativeeditComponent } from './creativeedit/creativeedit.component';
import { AdminaddComponent } from './adminadd/adminadd.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AdmineditComponent } from './adminedit/adminedit.component';
import { AdbanneraddComponent } from './adbanneradd/adbanneradd.component';
import { AdbannerlistComponent } from './adbannerlist/adbannerlist.component';
import { AdbannereditComponent } from './adbanneredit/adbanneredit.component';
import { AdbanneraddnewComponent } from './adbanneraddnew/adbanneraddnew.component';
import { AdbannereditnewComponent } from './adbannereditnew/adbannereditnew.component';
import { CampaignaddComponent } from './campaignadd/campaignadd.component';
import { CampaignlistnewComponent } from './campaignlistnew/campaignlistnew.component';
import { CampaigneditComponent } from './campaignedit/campaignedit.component';
import { AddmoneyComponent } from './addmoney/addmoney.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletlistComponent } from './walletlist/walletlist.component';
import { HeadernewComponent } from './headernew/headernew.component';
import { FooternewComponent } from './footernew/footernew.component';
import { MissioncontrolComponent } from './missioncontrol/missioncontrol.component';
import { CampaignlistsComponent } from './campaignlists/campaignlists.component';
import { WalletlistforadminComponent } from './walletlistforadmin/walletlistforadmin.component';
import { AllwalletlistComponent } from './allwalletlist/allwalletlist.component';
import { AddcampaignComponent } from './addcampaign/addcampaign.component';
import { EditcampaignComponent } from './editcampaign/editcampaign.component';
import { SignupnewComponent } from './signupnew/signupnew.component';
import { UserinformationComponent } from './userinformation/userinformation.component';
import { SearchnewComponent } from './searchnew/searchnew.component';
import { BannerlistComponent } from './bannerlist/bannerlist.component';
import {TooltipModule} from "ngx-tooltip";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxUploaderModule } from 'ngx-uploader';
import { RolesettingsComponent } from './rolesettings/rolesettings.component';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
//import { NgxDateRangePickerModule } from 'ngx-daterangepicker';

@NgModule({
  declarations: [
    AppComponent,
    OrderformComponent,
    SimplesolutionComponent,
    BasicinformationComponent,
    ConfirmationComponent,
    TrialComponent,
    CampaignsettingsComponent,
    CreateAudienceComponent,
    OnlyNumberDirective,
    CampaignlistComponent,
    HeaderComponent,
    SummaryComponent,
    TestComponent,
    SignupComponent,
    LoginComponent,
    UserlistComponent,
    OrderBy,
    UsersearchPipe,
    AccountdetailsComponent,
    UpdateprofileComponent,
    ChangepasswordComponent,
    LocationtraceComponent,
    ForgetpasswordComponent,
    AccesscodeComponent,
    NewpasswordComponent,
    CicrlemapComponent,
    PolyintersectComponent,
    GetcircleComponent,
    BrowserComponent,
    PacingComponent,
    LocationsComponent,
    ViewabilityComponent,
    DevicetypesComponent,
    DealsComponent,
    OsComponent,
    DaypartingComponent,
    AudiencelistComponent,
    TriallocComponent,
    TrialAirtoryComponent,
    CreativeaddComponent,
    CreativelistComponent,
    CreativeeditComponent,
    AdminaddComponent,
    AdminlistComponent,
    AdmineditComponent,
    AdbanneraddComponent,
    AdbannerlistComponent,
      AdbannereditComponent,
      AdbanneraddnewComponent,
      AdbannereditnewComponent,
      CampaignaddComponent,
      CampaignlistnewComponent,
      CampaigneditComponent,
      AddmoneyComponent,
      WalletComponent,
      WalletlistComponent,
      FooternewComponent,
      HeadernewComponent,
      MissioncontrolComponent,
      CampaignlistsComponent,
      WalletlistforadminComponent,
      AllwalletlistComponent,
      AddcampaignComponent,
      EditcampaignComponent,
      SignupnewComponent,
      UserinformationComponent,
      SearchnewComponent,
      BannerlistComponent,
      HelpdeskaddComponent,
      HelpdesklistComponent,
      RolesettingsComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
     //   HttpModule,
      HttpClientModule,
        routing,
        DatepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        IonRangeSliderModule,
        //UiSwitchModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        //Ng2UploaderModule,
        CKEditorModule,
        //NgUploaderModule,
        TooltipModule,
        NgxPaginationModule,
        Ng2AutoCompleteModule,
        AgmCoreModule.forRoot({
            // apiKey: 'AIzaSyA2_vmiwMYMoLIAyN5Bb1C8XZYOyQwIq8U'
            apiKey: 'AIzaSyC7rd1BpaO2BEgfQMD7ekZ4dQ9gFsKIod4'
        }),
      NgxUploaderModule,
      TextInputAutocompleteModule,
     // NgxDateRangePickerModule
    ],
    providers: [CookieService, CircleManager, AgmCircle,  GoogleMapsAPIWrapper],
    bootstrap: [AppComponent]
})
export class AppModule { }
