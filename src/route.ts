/**
 * Created by kta pc on 6/1/2017.
 */
/**
 * Created by ipsita on 7/4/17.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrderformComponent} from  '../src/app/orderform/orderform.component'
///import {OrderformComponent} from '../src//orderform/orderform.component';
import {SimplesolutionComponent} from '../src/app/simplesolution/simplesolution.component';
import {BasicinformationComponent} from '../src/app/basicinformation/basicinformation.component';
import {ConfirmationComponent} from '../src/app/confirmation/confirmation.component';
import {TrialComponent} from '../src/app/trial/trial.component';
import {CampaignsettingsComponent} from '../src/app/campaignsettings/campaignsettings.component';
import {CreateAudienceComponent} from '../src/app/create-audience/create-audience.component';
import {CampaignlistComponent} from '../src/app/campaignlist/campaignlist.component';
import {HeaderComponent} from '../src/app/header/header.component';
import {SummaryComponent} from '../src/app/summary/summary.component';
import {TestComponent} from '../src/app/test/test.component';
import {SignupComponent} from '../src/app/signup/signup.component';
import {LoginComponent} from '../src/app/login/login.component';
import {UserlistComponent} from '../src/app/userlist/userlist.component';
import {AccountdetailsComponent} from '../src/app/accountdetails/accountdetails.component';
import {UpdateprofileComponent} from '../src/app/updateprofile/updateprofile.component';
import {ChangepasswordComponent} from '../src/app/changepassword/changepassword.component';
import {LocationtraceComponent} from '../src/app/locationtrace/locationtrace.component';
import {ForgetpasswordComponent} from '../src/app/forgetpassword/forgetpassword.component';
import {AccesscodeComponent} from '../src/app/accesscode/accesscode.component';
import {NewpasswordComponent} from '../src/app/newpassword/newpassword.component';
import {CicrlemapComponent} from '../src/app/cicrlemap/cicrlemap.component';
import {PolyintersectComponent} from '../src/app/polyintersect/polyintersect.component';
import {GetcircleComponent} from '../src/app/getcircle/getcircle.component';
import {LocationsComponent} from '../src/app/locations/locations.component';
import {AgencyaddComponent} from '../src/app/agencyadd/agencyadd.component';
import {AgencylistComponent} from '../src/app/agencylist/agencylist.component';
import {AgencyeditComponent} from '../src/app/agencyedit/agencyedit.component';
/*------------------------------------------
    --------------------------------------*/
import {BrowserComponent} from '../src/app/browser/browser.component';
import {PacingComponent} from '../src/app/pacing/pacing.component';
import {ViewabilityComponent} from '../src/app/viewability/viewability.component';
import {DevicetypesComponent} from '../src/app/devicetypes/devicetypes.component';
import {DealsComponent} from '../src/app/deals/deals.component';
import {OsComponent} from '../src/app/os/os.component';
import {DaypartingComponent} from '../src/app/dayparting/dayparting.component';
import {AudiencelistComponent} from '../src/app/audiencelist/audiencelist.component';
import {TriallocComponent} from '../src/app/trialloc/trialloc.component';
import {TrialAirtoryComponent} from '../src/app/trial-airtory/trial-airtory.component';
import {CreativeaddComponent} from '../src/app/creativeadd/creativeadd.component';
import {CreativelistComponent} from '../src/app/creativelist/creativelist.component';
import {CreativeeditComponent} from '../src/app/creativeedit/creativeedit.component';
import { AdminlistComponent } from '../src/app/adminlist/adminlist.component';
import { AdminaddComponent } from '../src/app/adminadd/adminadd.component';
import { AdmineditComponent } from '../src/app/adminedit/adminedit.component';
import { AdbanneraddComponent } from '../src/app/adbanneradd/adbanneradd.component';
import { AdbannerlistComponent } from '../src/app/adbannerlist/adbannerlist.component';
import { AdbannereditComponent } from '../src/app/adbanneredit/adbanneredit.component';
import { AdbanneraddnewComponent } from '../src/app/adbanneraddnew/adbanneraddnew.component';
import { AdbannereditnewComponent } from '../src/app/adbannereditnew/adbannereditnew.component';
import {CampaignaddComponent} from './../src/app/campaignadd/campaignadd.component';
import {CampaignlistnewComponent} from './../src/app/campaignlistnew/campaignlistnew.component';
import {CampaigneditComponent} from "../src/app/campaignedit/campaignedit.component";
import {AddmoneyComponent} from "../src/app/addmoney/addmoney.component";
import {WalletComponent} from "../src/app/wallet/wallet.component";
import {WalletlistComponent} from "./../src/app/walletlist/walletlist.component";
import {HeadernewComponent} from "./../src/app/headernew/headernew.component";
import {FooternewComponent} from "./../src/app/footernew/footernew.component";
import {MissioncontrolComponent} from "./../src/app/missioncontrol/missioncontrol.component";
import {CampaignlistsComponent} from "./../src/app/campaignlists/campaignlists.component";
import {WalletlistforadminComponent} from "./../src/app/walletlistforadmin/walletlistforadmin.component";
import {AllwalletlistComponent} from "./../src/app/allwalletlist/allwalletlist.component";
import {AddcampaignComponent} from "./../src/app/addcampaign/addcampaign.component";
import {EditcampaignComponent} from "./../src/app/editcampaign/editcampaign.component";
import {SignupnewComponent} from "./../src/app/signupnew/signupnew.component";
import {UserinformationComponent} from "./../src/app/userinformation/userinformation.component";
import {SearchnewComponent} from "./../src/app/searchnew/searchnew.component";
import {BannerlistComponent} from "./../src/app/bannerlist/bannerlist.component";
import {HelpdesklistComponent} from "../src/app/helpdesklist/helpdesklist.component";
import {HelpdeskaddComponent} from "../src/app/helpdeskadd/helpdeskadd.component";
import {RolesettingsComponent} from "../src/app/rolesettings/rolesettings.component";
import {HelpdeskeditComponent} from "../src/app/helpdeskedit/helpdeskedit.component";
import {UseraddComponent} from "../src/app/useradd/useradd.component";

const appRoutes: Routes = [

   // { path: '', component: OrderformComponent},
    // { path: 'simplesolution', component: SimplesolutionComponent},
    { path: 'simplesolution', component: SimplesolutionComponent},
    { path: 'basicinformation', component: BasicinformationComponent},
    { path: 'confirmation', component: ConfirmationComponent},
    { path: 'trial', component: TrialComponent},
    { path: 'campaignsettings', component: CampaignsettingsComponent},
    { path: 'createaudience', component: CreateAudienceComponent},
    { path: 'campaignlist', component: CampaignlistComponent},
    { path: 'header', component: HeaderComponent},
    { path: 'summary', component: SummaryComponent},
    { path: 'test', component: TestComponent},
    { path: 'signup', component: SignupComponent},
    { path: '', component: LoginComponent},
    { path: 'login/:id', component: LoginComponent},
   // { path: ':type', component: LoginComponent},
    { path: 'userlist', component: UserlistComponent},
    { path: 'accountdetails', component: AccountdetailsComponent},
    { path: 'updateprofile', component: UpdateprofileComponent},
    { path: 'changepassword', component: ChangepasswordComponent},
    { path: 'locationtrace', component: LocationtraceComponent},
    { path: 'forgetpassword', component: ForgetpasswordComponent},
    { path: 'accesscode', component: AccesscodeComponent},
    { path: 'newpassword', component: NewpasswordComponent},
    { path: 'circlemap', component: CicrlemapComponent},
    { path: 'polyintersect', component: PolyintersectComponent},
    { path: 'getcircle', component: GetcircleComponent},
    { path: 'browser', component: BrowserComponent},
    { path: 'pacing', component: PacingComponent},
    { path: 'locations', component: LocationsComponent},
    { path: 'viewability', component: ViewabilityComponent},
    { path: 'devicetypes', component: DevicetypesComponent},
    { path: 'deals', component: DealsComponent},
    { path: 'os', component: OsComponent},
    { path: 'dayparting', component: DaypartingComponent},
    { path: 'audiencelist', component: AudiencelistComponent},
    { path: 'trialloc', component: TriallocComponent},
    { path: 'trial_airtory', component: TrialAirtoryComponent},
    { path: 'creativeadd', component: CreativeaddComponent},
    { path: 'creativelist', component: CreativelistComponent},
    { path: 'campaignadd', component: CampaignaddComponent},
    { path: 'creativeedit/:id', component: CreativeeditComponent},
    { path: 'adminedit/:id', component: AdmineditComponent},
    { path: 'adminadd', component: AdminaddComponent},
    { path: 'adminlist', component: AdminlistComponent},
    { path: 'adbanneradd', component: AdbanneraddComponent},
    { path: 'adbannerlist', component: AdbannerlistComponent},
    { path: 'adbanneredit/:id', component: AdbannereditComponent},
    { path: 'adbanneraddnew', component: AdbanneraddnewComponent},
    { path: 'adbannereditnew/:id', component: AdbannereditnewComponent},
    { path: 'campaignedit/:id', component: CampaigneditComponent},
    { path: 'campaignlistnew', component: CampaignlistnewComponent},
    { path: 'addmoney', component: AddmoneyComponent},
    { path: 'wallet', component: WalletComponent},
    { path: 'walletlist', component: WalletlistComponent},
    { path: 'headernew', component: HeadernewComponent},
    { path: 'footernew', component: FooternewComponent},
    { path: 'missioncontrol', component: MissioncontrolComponent},
    { path: 'campaignlists', component: CampaignlistsComponent},
    { path: 'adminwalletlist/:emailid', component: WalletlistforadminComponent},
    { path: 'allwalletlist', component: AllwalletlistComponent},
    { path: 'addcampaign', component: AddcampaignComponent},
    { path: 'addcampaign/:id', component: AddcampaignComponent},
    { path: 'editcampaign/:id', component: EditcampaignComponent},
    { path: 'editcampaign/:id/:type', component: EditcampaignComponent},
    { path: 'signupnew', component: SignupnewComponent},
    { path: 'userinformation', component: UserinformationComponent},
    { path: 'searchnew', component: SearchnewComponent},
    { path: 'bannerlist', component: BannerlistComponent},
    { path: 'bannerlist/:id', component: BannerlistComponent},
    { path: 'helpdesklist', component: HelpdesklistComponent},
    { path: 'helpdeskadd', component: HelpdeskaddComponent},
    { path: 'rolesettings', component: RolesettingsComponent},
    {path: 'agencyadd', component:AgencyaddComponent},
    {path:'agencylist',component:AgencylistComponent},
    {path:'agencyedit/:id',component:AgencyeditComponent},
    {path:'helpdeskedit/:id',component:HelpdeskeditComponent},
    {path:'useradd',component:UseraddComponent},
];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
