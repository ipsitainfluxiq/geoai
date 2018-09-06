import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from '../app.commonservices' ;

declare  var $: any;
@Component({
  selector: 'app-simplesolution',
  templateUrl: './simplesolution.component.html',
  styleUrls: ['./simplesolution.component.css'],
  providers: [Commonservices],
})
export class SimplesolutionComponent implements OnInit {
  public serverurl;
  public datareq: any = [];
  public pushval: any = [];
  public item;
  public isActive: any = [];
  public isDisabled: any = [];
  public b: boolean = false;
  public simply_geo : any;
  public simply_premium : any;
  public simply_geotargeting: any;
  public simply_geofencing: any;
  public simply_display: any;
  public simply_audiences: any;
  public simply_intent: any;
  public simply_reach: any;
  public simply_mobile: any;
  public simply_tablet: any;
  public premium_geotargeting: any;
  public premium_geofencing: any;
  public premium_news: any;
  public premium_buisness: any;
  public premium_politics: any;
  public premium_sports: any;
  public premium_arts: any;
  public premium_shopping: any;
  public intent_audiencetype: any;
  public audiences_geotargeting: any;
  public audiences_geofencing: any;

  //public audiences_automative: any;
  public audiences_automative_fuel: any;
  public audiences_automative_convertible: any;
  public audiences_automative_minivan: any;
  public audiences_automative_coupe: any;
  public audiences_automative_motorcycle: any;
  public audiences_automative_nonus: any;
  public audiences_automative_parts: any;
  public audiences_automative_price: any;
  public audiences_automative_price_economy: any;
  public audiences_automative_price_germanyeco: any;
  public audiences_automative_price_germanylux: any;
  public audiences_automative_price_germanymid: any;
  public audiences_automative_price_luxary: any;
  public audiences_automative_price_midrange: any;
  public audiences_automative_rv: any;
  public audiences_automative_sedan: any;
  public audiences_automative_sedan_compact: any;
  public audiences_automative_sedan_large: any;
  public audiences_automative_sedan_midsize: any;
  public audiences_automative_services: any;
  public audiences_automative_sportscar: any;
  public audiences_automative_suv: any;
  public audiences_automative_truck: any;
  public audiences_automative_truck_fullsize: any;
  public audiences_automative_us: any;
  public audiences_automative_us_chry: any;
  public audiences_automative_used: any;
  public audiences_automative_used_certified: any;
  public audiences_automative_wagon: any;
  public audiences_consumer: any;
  public audiences_consumer_beauty: any;
  public audiences_consumer_beauty_cosmetics: any;
  public audiences_consumer_beauty_fragrance: any;
  public audiences_consumer_beauty_hair: any;
  public audiences_consumer_beverages: any;
  public audiences_consumer_beverages_beerwine: any;
  public audiences_consumer_beverages_beerwine_beer: any;
  public audiences_consumer_beverages_beerwine_carbonated: any;
  public audiences_consumer_beverages_beerwine_coffee: any;
  public audiences_consumer_beverages_beerwine_juices: any;
  public audiences_consumer_beverages_beerwine_tea: any;
  public audiences_consumer_contests: any;
  public audiences_consumer_food: any;
  public audiences_consumer_food_snacks: any;
  public audiences_consumer_food_snacks_savory: any;
  public audiences_consumer_food_snacks_sweet: any;
  public audiences_consumer_pet: any;
  public audiences_consumer_pet_cat: any;
  public audiences_consumer_pet_dog: any;
  public audiences_consumer_pet_food: any;
  public audiences_consumer_recipes: any;
  public audiences_entertainment: any;
  public audiences_entertainment_parks: any;
  public audiences_entertainment_games: any;
  public audiences_entertainment_games_hardcore: any;
  public audiences_entertainment_games_hardcore_genres: any;
  public audiences_entertainment_games_hardcore_genres_action: any;
  public audiences_entertainment_games_hardcore_genres_adventure: any;
  public audiences_entertainment_games_hardcore_genres_puzzle: any;
  public audiences_entertainment_games_hardcore_genres_racing: any;
  public audiences_entertainment_games_hardcore_genres_reality: any;
  public audiences_entertainment_games_hardcore_genres_role: any;
  public audiences_entertainment_games_hardcore_genres_simulation: any;
  public audiences_entertainment_games_hardcore_genres_sports: any;
  public audiences_entertainment_games_hardcore_genres_sports_autoracing: any;
  public audiences_entertainment_games_hardcore_genres_sports_baseball: any;
  public audiences_entertainment_games_hardcore_genres_sports_basketball: any;
  public audiences_entertainment_games_hardcore_genres_sports_boating: any;
  public audiences_entertainment_games_hardcore_genres_sports_cricket: any;
  public audiences_entertainment_games_hardcore_genres_sports_cycling: any;
  public audiences_entertainment_games_hardcore_genres_sports_fantasylg: any;
  public audiences_entertainment_games_hardcore_genres_sports_football: any;
  public audiences_entertainment_games_hardcore_genres_sports_golf: any;
  public audiences_entertainment_games_hardcore_genres_sports_hockey: any;
  public audiences_entertainment_games_hardcore_genres_sports_hunting: any;
  public audiences_entertainment_games_hardcore_genres_sports_outdoors: any;
  public audiences_entertainment_games_hardcore_genres_sports_rugby: any;
  public audiences_entertainment_games_hardcore_genres_sports_snow: any;
  public audiences_entertainment_games_hardcore_genres_sports_soccer: any;
  public audiences_entertainment_games_hardcore_genres_sports_sportgoods: any;
  public audiences_entertainment_games_hardcore_genres_sports_tennis: any;
  public audiences_entertainment_games_hardcore_genres_strategy: any;
  public audiences_entertainment_games_platform: any;
  public audiences_entertainment_games_platform_pc: any;
  public audiences_entertainment_games_platform_gameboy: any;
  public audiences_entertainment_games_platform_gamecube: any;
  public audiences_entertainment_games_platform_playstation: any;
  public audiences_entertainment_games_platform_wii: any;
  public audiences_entertainment_games_platform_wireless: any;
  public audiences_entertainment_games_platform_xbox: any;
  public audiences_entertainment_games_platform_xbox_360: any;
  public audiences_entertainment_genealogy: any;
  public audiences_entertainment_movies: any;
  public audiences_entertainment_movies_action: any;
  public audiences_entertainment_movies_animation: any;
  public audiences_entertainment_movies_childrens: any;
  public audiences_entertainment_movies_classics: any;
  public audiences_entertainment_movies_comedy: any;
  public audiences_entertainment_movies_drama: any;
  public audiences_entertainment_movies_horror: any;
  public audiences_entertainment_movies_romance: any;
  public audiences_entertainment_movies_romance_personals: any;
  public audiences_entertainment_movies_science: any;
  public audiences_entertainment_music: any;
  public audiences_entertainment_music_country: any;
  public audiences_entertainment_music_electronic: any;
  public audiences_entertainment_music_instru: any;
  public audiences_entertainment_music_pop: any;
  public audiences_entertainment_music_rb: any;
  public audiences_entertainment_music_rap: any;
  public audiences_entertainment_music_rock: any;
  public audiences_entertainment_music_world: any;
  public audiences_entertainment_perform: any;
  public audiences_entertainment_radio: any;
  public audiences_entertainment_tele: any;
  public audiences_entertainment_tele_broadcast: any;
  public audiences_entertainment_tele_cable: any;
  public audiences_finance: any;
  public audiences_finance_brand: any;
  public audiences_finance_brand_bank: any;
  public audiences_finance_brand_bank_boa: any;
  public audiences_finance_brand_bank_chase: any;
  public audiences_finance_brand_bank_citi: any;
  public audiences_finance_brand_bank_us: any;
  public audiences_finance_brand_bank_wach: any;
  public audiences_finance_brand_bank_washington: any;
  public audiences_finance_brand_bank_wellsfargo: any;
  public audiences_finance_brand_credit: any;
  public audiences_finance_brand_credit_american: any;
  public audiences_finance_brand_credit_capitalone: any;
  public audiences_finance_brand_credit_citicard: any;
  public audiences_finance_brand_credit_discover: any;
  public audiences_finance_brand_credit_mastercard: any;
  public audiences_finance_brand_credit_visa: any;
  public audiences_finance_creditservice: any;
  public audiences_finance_deposits: any;
  public audiences_finance_deposits_buisness: any;
  public audiences_finance_deposits_checking: any;
  public audiences_finance_deposits_savings: any;
  public audiences_finance_insurance: any;
  public audiences_finance_insurance_automobile: any;
  public audiences_finance_insurance_home: any;
  public audiences_finance_insurance_life: any;
  public audiences_finance_insurance_medical: any;
  public audiences_finance_insurance_travel: any;
  public audiences_finance_insurance_travel_air: any;
  public audiences_finance_insurance_travel_air_budget: any;
  public audiences_finance_insurance_travel_buisnesstravel: any;
  public audiences_finance_insurance_travel_carrental: any;
  public audiences_finance_insurance_travel_casiono: any;
  public audiences_finance_insurance_travel_cruises: any;
  public audiences_finance_insurance_travel_destination: any;
  public audiences_finance_insurance_travel_destination_africa: any;
  public audiences_finance_insurance_travel_destination_asia: any;
  public audiences_finance_insurance_travel_destination_asia_china: any;
  public audiences_finance_insurance_travel_destination_asia_hong: any;
  public audiences_finance_insurance_travel_destination_asia_india: any;
  public audiences_finance_insurance_travel_destination_asia_japan: any;
  public audiences_finance_insurance_travel_destination_asia_korea: any;
  public audiences_finance_insurance_travel_destination_asia_macau: any;
  public audiences_finance_insurance_travel_destination_asia_taiwan: any;
  public audiences_finance_insurance_travel_destination_caribbean: any;
  public audiences_finance_insurance_travel_destination_europe: any;
  public audiences_finance_insurance_travel_destination_europe_austria: any;
  public audiences_finance_insurance_travel_destination_europe_denmark: any;
  public audiences_finance_insurance_travel_destination_europe_france: any;
  public audiences_finance_insurance_travel_destination_europe_france_paris: any;
  public audiences_finance_insurance_travel_destination_europe_germany: any;
  public audiences_finance_insurance_travel_destination_europe_greece: any;
  public audiences_finance_insurance_travel_destination_europe_italy: any;
  public audiences_finance_insurance_travel_destination_europe_portugal: any;
  public audiences_finance_insurance_travel_destination_europe_spain: any;
  public audiences_finance_insurance_travel_destination_europe_switzerland: any;
  public audiences_finance_insurance_travel_destination_europe_turkey: any;
  public audiences_finance_insurance_travel_destination_europe_ukie: any;
  public audiences_finance_insurance_travel_destination_europe_ukie_england: any;
  public audiences_finance_insurance_travel_destination_europe_ukie_scotland: any;
  public audiences_finance_insurance_travel_destination_europe_ukie_wales: any;
  public audiences_finance_insurance_travel_destination_latinam: any;
  public audiences_finance_insurance_travel_destination_middleeast: any;
  public audiences_finance_insurance_travel_destination_middleeast_israel: any;
  public audiences_finance_insurance_travel_destination_middleeast_kuwait: any;
  public audiences_finance_insurance_travel_destination_middleeast_oman: any;
  public audiences_finance_insurance_travel_destination_middleeast_qatar: any;
  public audiences_finance_insurance_travel_destination_middleeast_saudiarab: any;
  public audiences_finance_insurance_travel_destination_middleeast_unitedarab: any;
  public audiences_finance_insurance_travel_destination_middleeast_unitedarab_dubai: any;
  public audiences_finance_insurance_travel_destination_northamarica: any;
  public audiences_finance_insurance_travel_destination_northamarica_canada: any;
  public audiences_finance_insurance_travel_destination_northamarica_mexico: any;
  public audiences_finance_insurance_travel_destination_northamarica_mexico_cancun: any;
  public audiences_finance_insurance_travel_destination_northamarica_us: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_alaska: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_arizona: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_arizona_phoenix: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_arizona_tucson: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_california: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_california_lake: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_california_los: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_california_sand: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_california_sanf: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_california_sanj: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_colorado: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_colorado_denver: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_florida: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_florida_daytona: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_florida_fort: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_florida_myers: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_florida_miami: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_florida_orlando: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_florida_tampa: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_florida_westpalm: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_georgia: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_georgia_atlanta: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_hawali: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_hawali_mauli: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu_honolulu: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_louisiana: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_illinois: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_illinois_chicago: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_louisiana_orleans: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_massa: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_maryland: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_maryland_balti: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_massa_boston: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_minnes: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_minnes_minnea: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_missouri: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_missouri_stlouis: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_nevada: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_nevada_vegas: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_neveda_reno: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_newjersy: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_newjersy_newark: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_newyork: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_ncaro: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_ncaro_raleigh: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_oregon: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_oregon_portland: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_pennsy: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_pensy_phila: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_texas: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_texas_dallas: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_utah: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_utah_saltlake: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_virginia: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_washington: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_washington_seattle: any;
  public audiences_finance_insurance_travel_destination_northamarica_us_washingtondc: any;
  public audiences_finance_insurance_travel_destination_oceania: any;
  public audiences_finance_insurance_travel_destination_oceania_australia: any;
  public audiences_finance_insurance_travel_destination_oceania_newzealand: any;
  public audiences_finance_insurance_travel_europelastmnt: any;
  public audiences_finance_insurance_travel_hotel: any;
  public audiences_finance_insurance_travel_hotel_midscale: any;
  public audiences_finance_insurance_travel_hotel_upscale: any;
  public audiences_finance_insurance_travel_onlinetravel: any;
  public audiences_finance_insurance_travel_rail: any;
  public audiences_finance_insurance_travel_vacations: any;
  public audiences_finance_insurance_travel_vacations_beach: any;
  public audiences_finance_insurance_travel_vacations_family: any;
  public audiences_finance_insurance_travel_vacations_honeymoon: any;
  public audiences_finance_investment: any;
  public audiences_finance_investment_commodities: any;
  public audiences_finance_investment_currency: any;
  public audiences_finance_investment_discount: any;
  public audiences_finance_investment_fullsc: any;
  public audiences_finance_investment_bau: any;
  public audiences_finance_investment_mutualfunds: any;
  public audiences_finance_investment_mutualfunds_etf: any;
  public audiences_finance_investment_options: any;
  public audiences_finance_loans: any;
  public audiences_finance_loans_buisness: any;
  public audiences_finance_loans_personal: any;
  public audiences_finance_loans_mortgage: any;
  public audiences_finance_loans_mortgage_home: any;
  public audiences_finance_loans_mortgage_new: any;
  public audiences_finance_loans_mortgage_refinance: any;
  public audiences_finance_onlinepay: any;
  public audiences_finance_reales: any;
  public audiences_finance_reales_commercial: any;
  public audiences_finance_reales_purchase: any;
  public audiences_finance_reales_rental: any;
  public audiences_finance_rplaning: any;
  public audiences_finance_tax: any;
  public audiences_healthpharma: any;
  public audiences_healthpharma_bones: any;
  public audiences_healthpharma_bones_arthritis: any;
  public audiences_healthpharma_bones_arthritis_osteo: any;
  public audiences_healthpharma_bones_osteop: any;
  public audiences_healthpharma_bones_pain: any;
  public audiences_healthpharma_circulatory_cardio: any;
  public audiences_healthpharma_circulatory_choles: any;
  public audiences_healthpharma_circulatory_hyper: any;
  public audiences_healthpharma_circulatory_heart: any;
  public audiences_healthpharma_circulatory_stroke: any;
  public audiences_healthpharma_dental: any;
  public audiences_healthpharma_diges: any;
  public audiences_healthpharma_diges_gerd: any;
  public audiences_healthpharma_endo: any;
  public audiences_healthpharma_endo_dia: any;
  public audiences_healthpharma_infant: any;
  public audiences_healthpharma_infections: any;
  public audiences_healthpharma_infections_foot: any;
  public audiences_healthpharma_nervous: any;
  public audiences_healthpharma_nervous_alzhe: any;
  public audiences_healthpharma_nervous_headaches: any;
  public audiences_healthpharma_nervous_vision: any;
  public audiences_healthpharma_pregnancy: any;
  public audiences_healthpharma_respi: any;
  public audiences_healthpharma_respi_allergies: any;
  public audiences_healthpharma_respi_asthma: any;
  public audiences_healthpharma_respi_cold: any;
  public audiences_healthpharma_skin: any;
  public audiences_healthpharma_sleep: any;
  public audiences_healthpharma_wellness: any;
  public audiences_healthpharma_wellness_exercise: any;
  public audiences_healthpharma_wellness_smoking: any;
  public audiences_healthpharma_wellness_weight: any;
  public audiences_healthpharma_womenhealth: any;
  public audiences_healthpharma_womenhealth_meno: any;
  public audiences_internationalinterest: any;
  public audiences_internationalinterest_avtars: any;
  public audiences_internationalinterest_hispanic: any;
  public audiences_internationalinterest_hispanic_inferred: any;
  public audiences_internationalinterest_languagec: any;
  public audiences_internationalinterest_indiainterest: any;
  public audiences_internationalinterest_languagej: any;
  public audiences_internationalinterest_languagek: any;
  public audiences_issues: any;
  public audiences_issues_charity: any;
  public audiences_issues_education: any;
  public audiences_issues_education_college: any;
  public audiences_issues_education_adult: any;
  public audiences_issues_education_adult_computer: any;
  public audiences_issues_education_foreign: any;
  public audiences_issues_education_foreign_english: any;
  public audiences_issues_education_kto12: any;
  public audiences_issues_energy: any;
  public audiences_issues_affairs: any;
  public audiences_issues_govtreform: any;
  public audiences_issues_green: any;
  public audiences_issues_healthcare: any;
  public audiences_issues_healthcare_nursing: any;
  public audiences_issues_homeland: any;
  public audiences_issues_jobs: any;
  public audiences_issues_social: any;
  public audiences_issues_taxes: any;
  public audiences_lifestages: any;
  public audiences_lifestages_moving: any;
  public audiences_lifestages_parenting: any;
  public audiences_lifestages_parenting_baby: any;
  public audiences_lifestages_seniors: any;
  public audiences_lifestages_teen: any;
  public audiences_lifestages_wedding: any;
  public audiences_lifestages_women: any;
  public audiences_misce: any;
  public audiences_misce_arts: any;
  public audiences_misce_aviation: any;
  public audiences_misce_gas: any;
  public audiences_misce_military: any;
  public audiences_misce_hobbies: any;
  public audiences_misce_hobbies_photo: any;
  public audiences_misce_holidays: any;
  public audiences_misce_holidays_back: any;
  public audiences_misce_holidays_fathers: any;
  public audiences_misce_holidays_halloween: any;
  public audiences_misce_holidays_mothers: any;
  public audiences_misce_holidays_spring: any;
  public audiences_misce_holidays_valen: any;
  public audiences_misce_holidays_winter: any;
  public audiences_misce_law: any;
  public audiences_misce_law_class: any;
  public audiences_misce_law_injury: any;
  public audiences_misce_news: any;
  public audiences_misce_news_finance: any;
  public audiences_misce_poeple: any;
  public audiences_misce_poeple_actors: any;
  public audiences_misce_poeple_athletes: any;
  public audiences_misce_poeple_models: any;
  public audiences_misce_reference: any;
  public audiences_misce_religion: any;
  public audiences_misce_religion_astro: any;
  public audiences_misce_science: any;
  public audiences_misce_weather: any;
  public audiences_politics: any;
  public audiences_retail: any;
  public audiences_retail_apparel: any;
  public audiences_retail_apparel_wear: any;
  public audiences_retail_apparel_fashion: any;
  public audiences_retail_apparel_footwear: any;
  public audiences_retail_apparel_intimate: any;
  public audiences_retail_apparel_watch: any;
  public audiences_retail_apparel_womens: any;
  public audiences_retail_auctions: any;
  public audiences_retail_books: any;
  public audiences_retail_etailer: any;
  public audiences_retail_etailer_amazon: any;
  public audiences_retail_etailer_ebay: any;
  public audiences_retail_merchandise: any;
  public audiences_retail_merchandise_discounter: any;
  public audiences_retail_merchandise_premium: any;
  public audiences_retail_gifts: any;
  public audiences_retail_gifts_flowers: any;
  public audiences_retail_gifts_food: any;
  public audiences_retail_gifts_cards: any;
  public audiences_retail_home: any;
  public audiences_retail_home_appliances: any;
  public audiences_retail_home_bed: any;
  public audiences_retail_home_cleaning: any;
  public audiences_retail_home_furniture: any;
  public audiences_retail_home_garden: any;
  public audiences_retail_home_housewares: any;
  public audiences_retail_home_improve: any;
  public audiences_retail_home_improve_kitchen: any;
  public audiences_retail_home_improve_tools: any;
  public audiences_retail_goods: any;
  public audiences_retail_goods_beauty: any;
  public audiences_retail_goods_food: any;
  public audiences_retail_resturents: any;
  public audiences_retail_resturents_fastfood: any;
  public audiences_retail_retailers: any;
  public audiences_retail_retailers_dshoes: any;
  public audiences_retail_retailers_dshoes_jc: any;
  public audiences_retail_retailers_dshoes_kohls: any;
  public audiences_retail_retailers_dshoes_macys: any;
  public audiences_retail_retailers_dshoes_sears: any;
  public audiences_retail_retailers_electronics: any;
  public audiences_retail_retailers_electronics_bestbuy: any;
  public audiences_retail_retailers_electronics_city: any;
  public audiences_retail_retailers_electronics_radio: any;
  public audiences_retail_retailers_homeimp: any;
  public audiences_retail_retailers_homeimp_lowes: any;
  public audiences_retail_retailers_massmerchants_kmart: any;
  public audiences_retail_retailers_massmerchants_target: any;
  public audiences_retail_retailers_massmerchants_walmart: any;
  public audiences_retail_retailers_officesupply: any;
  public audiences_retail_retailers_officesupply_staples: any;
  public audiences_retail_retailers_apparel: any;
  public audiences_retail_retailers_apparel_gap: any;
  public audiences_retail_retailers_apparel_victorias: any;
  public audiences_retail_retailers_apparel_navy: any;
  public audiences_retail_retailers_clubs: any;
  public audiences_retail_retailers_clubs_costco: any;
  public audiences_retail_retailers_clubs_same: any;
  public audiences_retail_toys: any;
  public audiences_buisness: any;
  public audiences_buisness_b2b: any;
  public audiences_buisness_b2b_corp: any;
  public audiences_buisness_b2b_corp_human: any;
  public audiences_buisness_b2b_corp_human_recruit: any;
  public audiences_buisness_b2b_corp_human_recruit_technology: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_desktops: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_networking: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_notebooks: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_monitors: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_printers: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_storaged: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compservices: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware_productivity: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware_security: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio_mp3: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart_navi: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular_sphones: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_digicam: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_pdas: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo_cam: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo_vh: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetnewmedia: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_domain: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_chat: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_email: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_messenger: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_photos: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_webhosting: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware_servers: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware: any;
  public audiences_buisness_employment: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_backup: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_databases: any;
  public audiences_buisness_employment_account: any;
  public audiences_buisness_employment_advertise: any;
  public audiences_buisness_employment_account_bank: any;
  public audiences_buisness_employment_adminstrative: any;
  public audiences_buisness_employment_arts: any;
  public audiences_buisness_employment_facilities: any;
  public audiences_buisness_employment_customer: any;
  public audiences_buisness_employment_education: any;
  public audiences_buisness_employment_engineering: any;
  public audiences_buisness_employment_travel: any;
  public audiences_buisness_employment_law: any;
  public audiences_buisness_employment_legal: any;
  public audiences_buisness_employment_management: any;
  public audiences_buisness_employment_operations: any;
  public audiences_buisness_employment_marketing: any;
  public audiences_buisness_employment_work: any;
  public audiences_buisness_employment_biotech: any;
  public audiences_buisness_employment_food: any;
  public audiences_buisness_employment_sales: any;
  public audiences_buisness_employment_tele: any;
  public audiences_buisness_employment_tele_cable: any;
  public audiences_buisness_employment_tele_wireless: any;
  public audiences_buisness_employment_tele_local: any;
  public audiences_buisness_employment_tele_long: any;
  public audiences_buisness_employment_tele_satellite: any;
  public audiences_buisness_employment_trans: any;
  public audiences_buisness_small: any;
  public audiences_buisness_truck: any;
  public intent_geotargeting: any;
  public reach_geotargeting: any;
  public reach_geofencing: any;
  public reach_audiencemirror: any;
  public audiences_issues_envio: any;
  public audiences_healthpharma_circulatory: any;
  public intent_geofencing: any;
  public audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_developers: any;
  public audiences_retail_retailers_massmerchants: any;
  public audiences_buisness_small_services: any;
  public audiences_buisness_employment_tele_multi: any;
  public audiences_buisness_employment_tele_access: any;
  public audiences_retail_retailers_homeimp_depot: any;
  //public audiences_automativee: any;
  public validation: boolean = false;
  public audiences_automative= false;
  public isopen: any= 'hide';
  public isopen1: any= 'hide';
  public isopen2: any= 'hide';
  public isopen3: any= 'hide';
  public isopen4: any= 'hide';
  public isopen5: any= 'hide';
  public isopen6: any= 'hide';
  public isopen7: any= 'hide';
  public isopen8: any= 'hide';
  public isopen9: any= 'hide';
  public isopen10: any= 'hide';
  public isopen11: any= 'hide';
  public isopen12: any= 'hide';
  public isopen13: any= 'hide';
  public isopen14: any= 'hide';
  public isopen15: any= 'hide';
  public isopen16: any= 'hide';
  public isopen17: any= 'hide';
  public isopen18: any= 'hide';
  public isopen19: any= 'hide';
  public isopen20: any= 'hide';
  public isopen21: any= 'hide';
  public isopen22: any= 'hide';
  public isopen23: any= 'hide';
  public isopen24: any= 'hide';
  public isopen25: any= 'hide';
  public isopen26: any= 'hide';
  public isopen27: any= 'hide';
  public isopen28: any= 'hide';
  public isopen29: any= 'hide';
  public isopen30: any= 'hide';
  public isopen31: any= 'hide';
  public isopen32: any= 'hide';
  public isopen33: any= 'hide';
  public isopen34: any= 'hide';
  public isopen35: any= 'hide';
  public isopen36: any= 'hide';
  public isopen37: any= 'hide';
  public isopen38: any= 'hide';
  public isopen39: any= 'hide';
  public isopen40: any= 'hide';
  public isopen41: any= 'hide';
  public isopen42: any= 'hide';
  public isopen43: any= 'hide';
  public isopen44: any= 'hide';
  public isopen45: any= 'hide';
  public isopen46: any= 'hide';
  public isopen47: any= 'hide';
  public isopen48: any= 'hide';
  public isopen49: any= 'hide';
  public isopen50: any= 'hide';
  public isopen51: any= 'hide';
  public isopen52: any= 'hide';
  public isopen53: any= 'hide';
  public isopen54: any= 'hide';
  public isopen55: any= 'hide';
  public isopen56: any= 'hide';
  public isopen57: any= 'hide';
  public isopen58: any= 'hide';
  public isopen59: any= 'hide';
  public isopen60: any= 'hide';
  public isopen61: any= 'hide';
  public isopen62: any= 'hide';
  public isopen63: any= 'hide';
  public isopen64: any= 'hide';
  public isopen65: any= 'hide';
  public isopen66: any= 'hide';
  public isopen67: any= 'hide';
  public isopen68: any= 'hide';
  public isopen69: any= 'hide';
  public isopen70: any= 'hide';
  public isopen71: any= 'hide';
  public isopen72: any= 'hide';
  public isopen73: any= 'hide';
  public isopen74: any= 'hide';
  public isopen75: any= 'hide';
  public isopen76: any= 'hide';
  public isopen77: any= 'hide';
  public isopen78: any= 'hide';
  public isopen79: any= 'hide';
  public isopen80: any= 'hide';
  public isopen81: any= 'hide';
  public isopen82: any= 'hide';
  public isopen83: any= 'hide';
  public isopen84: any= 'hide';
  public isopen85: any= 'hide';
  public isopen86: any= 'hide';
  public isopen87: any= 'hide';
  public isopen88: any= 'hide';
  public isopen89: any= 'hide';
  public isopen90: any= 'hide';
  public isopen91: any= 'hide';
  public isopen92: any= 'hide';
  public isopen93: any= 'hide';
  public isopen94: any= 'hide';
  public isopen95: any= 'hide';
  public isopen96: any= 'hide';
  public isopen97: any= 'hide';
  public isopen98: any= 'hide';
  public isopen99: any= 'hide';
  public isopen100: any= 'hide';
  public isopen101: any= 'hide';
  public isopen102: any= 'hide';
  public isopen103: any= 'hide';
  public isopen104: any= 'hide';
  public isopen105: any= 'hide';
  public isopen106: any= 'hide';
  public isopen107: any= 'hide';
  public isopen108: any= 'hide';
  public isopen109: any= 'hide';
  public isopen110: any= 'hide';
  public isopen111: any= 'hide';
  public isopen112: any= 'hide';
  public isopen113: any= 'hide';
  public isopen114: any= 'hide';
  public isopen115: any= 'hide';
  public isopen116: any= 'hide';
  public isopen117: any= 'hide';
  public isopen118: any= 'hide';
  public isopen119: any= 'hide';
  public isopen120: any= 'hide';
  public isopen121: any= 'hide';
  public isopen122: any= 'hide';
  public isopen123: any= 'hide';
  public isopen124: any= 'hide';
  public isopen125: any= 'hide';
  public isopen126: any= 'hide';
  public isopen127: any= 'hide';
  public isopen128: any= 'hide';
  public isopen129: any= 'hide';
  public isopen130: any= 'hide';
  public isopen131: any= 'hide';
  public isopen132: any= 'hide';
  public isopen133: any= 'hide';
  public isopen134: any= 'hide';
  public isopen135: any= 'hide';
  public isopen136: any= 'hide';
  public isopen137: any= 'hide';
  public isopen138: any= 'hide';
  public isopen139: any= 'hide';
  public isopen140: any= 'hide';
  public result: any;
  public addcookie: CookieService;
  public cookiedetails;
  public error: any;

  constructor(private _http: HttpClient, private router: Router, addcookie: CookieService,  private _commonservices: Commonservices) {
    this.serverurl = _commonservices.url;
    this.addcookie = addcookie ;
    this.cookiedetails = this.addcookie.getObject('cookiedetails');
    this.simply_display = true;
    this.simply_tablet = true;
    this.simply_mobile = true;
    this.pushval = [] ;
    for (let i = 0; i <= 4; i++) {
      this.isActive.push(false);
      this.isDisabled.push(true);
    }
    setTimeout(() => {
      this.b = true;
    }, 1000);
  }
  checked(event: any) {
    let target = event.target || event.srcElement || event.currentTarget;
    console.log(target);
    console.log(target.className);
    // target.nextElementSibling.nextElementSibling.nextElementSibling.classNames[0]='';
    // console.log(target.nextElementSibling.nextElementSibling.nextElementSibling.childElementCount());

    if (target.className == 'thumb') {
      if (this.isopen == 'hide') {
        this.isopen = '';
        return;
      }

      if (this.isopen == '') {
        this.isopen = 'hide';
        return;
      }
      if (this.audiences_automative == true) {
        this.isopen = '';
      }
      if (this.audiences_automative == false) {
        this.isopen = 'hide';
      }
    }

    if(target.className == 'thumb1'){
      if (this.isopen1 == 'hide') {
        this.isopen1 = '';
        return;
      }

      if (this.isopen1 == '') {
        this.isopen1 = 'hide';
        return;
      }
      if (this.audiences_consumer == true) {
        this.isopen1 = '';
      }
      if (this.audiences_consumer == false) {
        this.isopen1 = 'hide';
      }
    }
    if(target.className == 'thumb2'){
      if (this.isopen2 == 'hide') {
        this.isopen2 = '';
        return;
      }
      if (this.isopen2 == '') {
        this.isopen2 = 'hide';
        return;
      }
      if (this.audiences_entertainment == true) {
        this.isopen2 = '';
      }
      if (this.audiences_entertainment == false) {
        this.isopen2 = 'hide';
      }
    }
    if(target.className == 'thumb3'){
      if (this.isopen3 == 'hide') {
        this.isopen3 = '';
        return;
      }
      if (this.isopen3 == '') {
        this.isopen3 = 'hide';
        return;
      }
      if (this.audiences_finance == true) {
        this.isopen3 = '';
      }
      if (this.audiences_finance == false) {
        this.isopen3 = 'hide';
      }
    }
    if(target.className == 'thumb4'){
      if (this.isopen4 == 'hide') {
        this.isopen4 = '';
        return;
      }
      if (this.isopen4 == '') {
        this.isopen4 = 'hide';
        return;
      }
      if (this.audiences_healthpharma == true) {
        this.isopen4 = '';
      }
      if (this.audiences_healthpharma == false) {
        this.isopen4 = 'hide';
      }
    }
    if(target.className == 'thumb5'){
      if (this.isopen5 == 'hide') {
        this.isopen5 = '';
        return;
      }
      if (this.isopen5 == '') {
        this.isopen5 = 'hide';
        return;
      }
      if (this.audiences_internationalinterest == true) {
        this.isopen5 = '';
      }
      if (this.audiences_internationalinterest == false) {
        this.isopen5 = 'hide';
      }
    }
    if(target.className == 'thumb6'){
      if (this.isopen6 == 'hide') {
        this.isopen6 = '';
        return;
      }
      if (this.isopen6 == '') {
        this.isopen6 = 'hide';
        return;
      }
      if (this.audiences_issues == true) {
        this.isopen6 = '';
      }
      if (this.audiences_issues == false) {
        this.isopen6 = 'hide';
      }
    }
    if(target.className == 'thumb7'){
      if (this.isopen7 == 'hide') {
        this.isopen7 = '';
        return;
      }
      if (this.isopen7 == '') {
        this.isopen7 = 'hide';
        return;
      }
      if (this.audiences_lifestages == true) {
        this.isopen7 = '';
      }
      if (this.audiences_lifestages == false) {
        this.isopen7 = 'hide';
      }
    }
    if(target.className == 'thumb8'){
      if (this.isopen8 == 'hide') {
        this.isopen8 = '';
        return;
      }
      if (this.isopen8 == '') {
        this.isopen8 = 'hide';
        return;
      }
      if (this.audiences_misce == true) {
        this.isopen8 = '';
      }
      if (this.audiences_misce == false) {
        this.isopen8 = 'hide';
      }
    }
    if(target.className == 'thumb9'){
      if (this.isopen9 == 'hide') {
        this.isopen9 = '';
        return;
      }
      if (this.isopen9 == '') {
        this.isopen9 = 'hide';
        return;
      }
      if (this.audiences_retail == true) {
        this.isopen9 = '';
      }
      if (this.audiences_retail == false) {
        this.isopen9 = 'hide';
      }
    }
    if(target.className == 'thumb10'){
      if (this.isopen10 == 'hide') {
        this.isopen10 = '';
        return;
      }
      if (this.isopen10 == '') {
        this.isopen10 = 'hide';
        return;
      }
      if (this.audiences_buisness == true) {
        this.isopen10 = '';
      }
      if (this.audiences_buisness == false) {
        this.isopen10 = 'hide';
      }
    }
    if(target.className == 'thumb11'){
      if (this.isopen11 == 'hide') {
        this.isopen11 = '';
        return;
      }
      if (this.isopen11 == '') {
        this.isopen11 = 'hide';
        return;
      }
      if (this.audiences_automative_price == true) {
        this.isopen11 = '';
      }
      if (this.audiences_automative_price == false) {
        this.isopen11 = 'hide';
      }
    }
    if(target.className == 'thumb12'){
      if (this.isopen12 == 'hide') {
        this.isopen12 = '';
        return;
      }
      if (this.isopen12 == '') {
        this.isopen12 = 'hide';
        return;
      }
      if (this.audiences_automative_sedan == true) {
        this.isopen12 = '';
      }
      if (this.audiences_automative_sedan == false) {
        this.isopen12 = 'hide';
      }
    }
    if(target.className == 'thumb13'){
      if (this.isopen13 == 'hide') {
        this.isopen13 = '';
        return;
      }
      if (this.isopen13 == '') {
        this.isopen13 = 'hide';
        return;
      }
      if (this.audiences_automative_truck == true) {
        this.isopen13 = '';
      }
      if (this.audiences_automative_truck == false) {
        this.isopen13 = 'hide';
      }
    }
    if(target.className == 'thumb14'){
      if (this.isopen14 == 'hide') {
        this.isopen14 = '';
        return;
      }
      if (this.isopen14 == '') {
        this.isopen14 = 'hide';
        return;
      }
      if (this.audiences_automative_us == true) {
        this.isopen14 = '';
      }
      if (this.audiences_automative_us == false) {
        this.isopen14 = 'hide';
      }
    }
    if(target.className == 'thumb15'){
      if (this.isopen15 == 'hide') {
        this.isopen15 = '';
        return;
      }
      if (this.isopen15 == '') {
        this.isopen15 = 'hide';
        return;
      }
      if (this.audiences_automative_used == true) {
        this.isopen15 = '';
      }
      if (this.audiences_automative_used == false) {
        this.isopen15 = 'hide';
      }
    }
    if(target.className == 'thumb16'){
      if (this.isopen16 == 'hide') {
        this.isopen16 = '';
        return;
      }
      if (this.isopen16 == '') {
        this.isopen16 = 'hide';
        return;
      }
      if (this.audiences_consumer_beauty == true) {
        this.isopen16 = '';
      }
      if (this.audiences_consumer_beauty == false) {
        this.isopen16 = 'hide';
      }
    }
    if(target.className == 'thumb17'){
      if (this.isopen17 == 'hide') {
        this.isopen17 = '';
        return;
      }
      if (this.isopen17 == '') {
        this.isopen17 = 'hide';
        return;
      }
      if (this.audiences_consumer_beverages == true) {
        this.isopen17 = '';
      }
      if (this.audiences_consumer_beverages == false) {
        this.isopen17 = 'hide';
      }
    }
    if(target.className == 'thumb18'){
      if (this.isopen18 == 'hide') {
        this.isopen18 = '';
        return;
      }
      if (this.isopen18 == '') {
        this.isopen18 = 'hide';
        return;
      }
      if (this.audiences_consumer_beverages_beerwine == true) {
        this.isopen18 = '';
      }
      if (this.audiences_consumer_beverages_beerwine == false) {
        this.isopen18 = 'hide';
      }
    }
    if(target.className == 'thumb19'){
      if (this.isopen19 == 'hide') {
        this.isopen19 = '';
        return;
      }
      if (this.isopen19 == '') {
        this.isopen19 = 'hide';
        return;
      }
      if (this.audiences_consumer_food == true) {
        this.isopen19 = '';
      }
      if (this.audiences_consumer_food == false) {
        this.isopen19 = 'hide';
      }
    }
    if(target.className == 'thumb20'){
      if (this.isopen20 == 'hide') {
        this.isopen20 = '';
        return;
      }
      if (this.isopen20 == '') {
        this.isopen20 = 'hide';
        return;
      }
      if (this.audiences_consumer_food_snacks == true) {
        this.isopen20 = '';
      }
      if (this.audiences_consumer_food_snacks == false) {
        this.isopen20 = 'hide';
      }
    }
    if(target.className == 'thumb21'){
      if (this.isopen21 == 'hide') {
        this.isopen21 = '';
        return;
      }
      if (this.isopen21 == '') {
        this.isopen21 = 'hide';
        return;
      }
      if (this.audiences_consumer_pet == true) {
        this.isopen21 = '';
      }
      if (this.audiences_consumer_pet == false) {
        this.isopen21 = 'hide';
      }
    }
    if(target.className == 'thumb22'){
      if (this.isopen22 == 'hide') {
        this.isopen22 = '';
        return;
      }
      if (this.isopen22 == '') {
        this.isopen22 = 'hide';
        return;
      }
      if (this.audiences_entertainment_games == true) {
        this.isopen22 = '';
      }
      if (this.audiences_entertainment_games == false) {
        this.isopen22 = 'hide';
      }
    }
    if(target.className == 'thumb23'){
      if (this.isopen23 == 'hide') {
        this.isopen23 = '';
        return;
      }
      if (this.isopen23 == '') {
        this.isopen23 = 'hide';
        return;
      }
      if (this.audiences_entertainment_games_hardcore == true) {
        this.isopen23 = '';
      }
      if (this.audiences_entertainment_games_hardcore == false) {
        this.isopen23 = 'hide';
      }
    }
    if(target.className == 'thumb25'){
      if (this.isopen25 == 'hide') {
        this.isopen25 = '';
        return;
      }
      if (this.isopen25 == '') {
        this.isopen25 = 'hide';
        return;
      }
      if (this.audiences_entertainment_games_hardcore_genres == true) {
        this.isopen25 = '';
      }
      if (this.audiences_entertainment_games_hardcore_genres == false) {
        this.isopen25 = 'hide';
      }
    }
    if(target.className == 'thumb26'){
      if (this.isopen26 == 'hide') {
        this.isopen26 = '';
        return;
      }
      if (this.isopen26 == '') {
        this.isopen26 = 'hide';
        return;
      }
      if (this.audiences_entertainment_games_hardcore_genres_sports == true) {
        this.isopen26 = '';
      }
      if (this.audiences_entertainment_games_hardcore_genres_sports == false) {
        this.isopen26 = 'hide';
      }
    }
    if(target.className == 'thumb27'){
      if (this.isopen27 == 'hide') {
        this.isopen27 = '';
        return;
      }
      if (this.isopen27 == '') {
        this.isopen27 = 'hide';
        return;
      }
      if (this.audiences_entertainment_games_platform == true) {
        this.isopen27 = '';
      }
      if (this.audiences_entertainment_games_platform == false) {
        this.isopen27 = 'hide';
      }
    }
    if(target.className == 'thumb28'){
      if (this.isopen28 == 'hide') {
        this.isopen28 = '';
        return;
      }
      if (this.isopen28 == '') {
        this.isopen28 = 'hide';
        return;
      }
      if (this.audiences_entertainment_games_platform_xbox == true) {
        this.isopen28 = '';
      }
      if (this.audiences_entertainment_games_platform_xbox == false) {
        this.isopen28 = 'hide';
      }
    }
    if(target.className == 'thumb29'){
      if (this.isopen29 == 'hide') {
        this.isopen29 = '';
        return;
      }
      if (this.isopen29 == '') {
        this.isopen29 = 'hide';
        return;
      }
      if (this.audiences_entertainment_movies == true) {
        this.isopen29 = '';
      }
      if (this.audiences_entertainment_movies == false) {
        this.isopen29 = 'hide';
      }
    }
    if(target.className == 'thumb30'){
      if (this.isopen30 == 'hide') {
        this.isopen30 = '';
        return;
      }
      if (this.isopen30 == '') {
        this.isopen30 = 'hide';
        return;
      }
      if (this.audiences_entertainment_movies_romance == true) {
        this.isopen30 = '';
      }
      if (this.audiences_entertainment_movies_romance == false) {
        this.isopen30 = 'hide';
      }
    }
    if(target.className == 'thumb31'){
      if (this.isopen31 == 'hide') {
        this.isopen31 = '';
        return;
      }
      if (this.isopen31 == '') {
        this.isopen31 = 'hide';
        return;
      }
      if (this.audiences_entertainment_music == true) {
        this.isopen31 = '';
      }
      if (this.audiences_entertainment_music == false) {
        this.isopen31 = 'hide';
      }
    }
    if(target.className == 'thumb32'){
      if (this.isopen32 == 'hide') {
        this.isopen32 = '';
        return;
      }
      if (this.isopen32 == '') {
        this.isopen32 = 'hide';
        return;
      }
      if (this.audiences_entertainment_tele == true) {
        this.isopen32 = '';
      }
      if (this.audiences_entertainment_tele == false) {
        this.isopen32 = 'hide';
      }
    }
    if(target.className == 'thumb33'){
      if (this.isopen33 == 'hide') {
        this.isopen33 = '';
        return;
      }
      if (this.isopen33 == '') {
        this.isopen33 = 'hide';
        return;
      }
      if (this.audiences_finance_brand == true) {
        this.isopen33 = '';
      }
      if (this.audiences_finance_brand == false) {
        this.isopen33 = 'hide';
      }
    }
    if(target.className == 'thumb34'){
      if (this.isopen34 == 'hide') {
        this.isopen34 = '';
        return;
      }
      if (this.isopen34 == '') {
        this.isopen34 = 'hide';
        return;
      }
      if (this.audiences_finance_brand_bank == true) {
        this.isopen34 = '';
      }
      if (this.audiences_finance_brand_bank == false) {
        this.isopen34 = 'hide';
      }
    }
    if(target.className == 'thumb35'){
      if (this.isopen35 == 'hide') {
        this.isopen35 = '';
        return;
      }
      if (this.isopen35 == '') {
        this.isopen35 = 'hide';
        return;
      }
      if (this.audiences_finance_brand_credit == true) {
        this.isopen35 = '';
      }
      if (this.audiences_finance_brand_credit == false) {
        this.isopen35 = 'hide';
      }
    }
    if(target.className == 'thumb36'){
      if (this.isopen36 == 'hide') {
        this.isopen36 = '';
        return;
      }
      if (this.isopen36 == '') {
        this.isopen36 = 'hide';
        return;
      }
      if (this.audiences_finance_deposits == true) {
        this.isopen36 = '';
      }
      if (this.audiences_finance_deposits == false) {
        this.isopen36 = 'hide';
      }
    }
    if(target.className == 'thumb37'){
      if (this.isopen37 == 'hide') {
        this.isopen37 = '';
        return;
      }
      if (this.isopen37 == '') {
        this.isopen37 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance == true) {
        this.isopen37 = '';
      }
      if (this.audiences_finance_insurance == false) {
        this.isopen37 = 'hide';
      }
    }
    if(target.className == 'thumb38'){
      if (this.isopen38 == 'hide') {
        this.isopen38 = '';
        return;
      }
      if (this.isopen38 == '') {
        this.isopen38 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel == true) {
        this.isopen38 = '';
      }
      if (this.audiences_finance_insurance_travel == false) {
        this.isopen38 = 'hide';
      }
    }
    if(target.className == 'thumb39'){
      if (this.isopen39 == 'hide') {
        this.isopen39 = '';
        return;
      }
      if (this.isopen39 == '') {
        this.isopen39 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_air == true) {
        this.isopen39 = '';
      }
      if (this.audiences_finance_insurance_travel_air == false) {
        this.isopen39 = 'hide';
      }
    }
    if(target.className == 'thumb40'){
      if (this.isopen40 == 'hide') {
        this.isopen40 = '';
        return;
      }
      if (this.isopen40 == '') {
        this.isopen40 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination == true) {
        this.isopen40 = '';
      }
      if (this.audiences_finance_insurance_travel_destination == false) {
        this.isopen40 = 'hide';
      }
    }
    if(target.className == 'thumb41'){
      if (this.isopen41 == 'hide') {
        this.isopen41 = '';
        return;
      }
      if (this.isopen41 == '') {
        this.isopen41 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_asia == true) {
        this.isopen41 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_asia == false) {
        this.isopen41 = 'hide';
      }
    }
    if(target.className == 'thumb42'){
      if (this.isopen42 == 'hide') {
        this.isopen42 = '';
        return;
      }
      if (this.isopen42 == '') {
        this.isopen42 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_europe == true) {
        this.isopen42 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_europe == false) {
        this.isopen42 = 'hide';
      }
    }
    if(target.className == 'thumb43'){
      if (this.isopen43 == 'hide') {
        this.isopen43 = '';
        return;
      }
      if (this.isopen43 == '') {
        this.isopen43 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_europe_france == true) {
        this.isopen43 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_europe_france == false) {
        this.isopen43 = 'hide';
      }
    }
    if(target.className == 'thumb44'){
      if (this.isopen44 == 'hide') {
        this.isopen44 = '';
        return;
      }
      if (this.isopen44 == '') {
        this.isopen44 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_europe_ukie == true) {
        this.isopen44 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_europe_ukie == false) {
        this.isopen44 = 'hide';
      }
    }
    if(target.className == 'thumb45'){
      if (this.isopen45 == 'hide') {
        this.isopen45 = '';
        return;
      }
      if (this.isopen45 == '') {
        this.isopen45 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_middleeast == true) {
        this.isopen45 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_middleeast == false) {
        this.isopen45 = 'hide';
      }
    }
    if(target.className == 'thumb46'){
      if (this.isopen46 == 'hide') {
        this.isopen46 = '';
        return;
      }
      if (this.isopen46 == '') {
        this.isopen46 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_middleeast_unitedarab == true) {
        this.isopen46 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_middleeast_unitedarab == false) {
        this.isopen46 = 'hide';
      }
    }
    if(target.className == 'thumb47'){
      if (this.isopen47 == 'hide') {
        this.isopen47 = '';
        return;
      }
      if (this.isopen47 == '') {
        this.isopen47 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica == true) {
        this.isopen47 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica == false) {
        this.isopen47 = 'hide';
      }
    }
    if(target.className == 'thumb48'){
      if (this.isopen48 == 'hide') {
        this.isopen48 = '';
        return;
      }
      if (this.isopen48 == '') {
        this.isopen48 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_mexico == true) {
        this.isopen48 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_mexico == false) {
        this.isopen48 = 'hide';
      }
    }
    if(target.className == 'thumb49'){
      if (this.isopen49 == 'hide') {
        this.isopen49 = '';
        return;
      }
      if (this.isopen49 == '') {
        this.isopen49 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us == true) {
        this.isopen49 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us == false) {
        this.isopen49 = 'hide';
      }
    }
    if(target.className == 'thumb50'){
      if (this.isopen50 == 'hide') {
        this.isopen50 = '';
        return;
      }
      if (this.isopen50 == '') {
        this.isopen50 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_arizona == true) {
        this.isopen50 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_arizona == false) {
        this.isopen50 = 'hide';
      }
    }
    if(target.className == 'thumb51'){
      if (this.isopen51 == 'hide') {
        this.isopen51 = '';
        return;
      }
      if (this.isopen51 == '') {
        this.isopen51 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_california == true) {
        this.isopen51 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_california == false) {
        this.isopen51 = 'hide';
      }
    }
    if(target.className == 'thumb52'){
      if (this.isopen52 == 'hide') {
        this.isopen52 = '';
        return;
      }
      if (this.isopen52 == '') {
        this.isopen52 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_colorado == true) {
        this.isopen52 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_colorado == false) {
        this.isopen52 = 'hide';
      }
    }
    if(target.className == 'thumb53'){
      if (this.isopen53 == 'hide') {
        this.isopen53 = '';
        return;
      }
      if (this.isopen53 == '') {
        this.isopen53 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_florida == true) {
        this.isopen53 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_florida == false) {
        this.isopen53 = 'hide';
      }
    }
    if(target.className == 'thumb54'){
      if (this.isopen54 == 'hide') {
        this.isopen54 = '';
        return;
      }
      if (this.isopen54 == '') {
        this.isopen54 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_georgia == true) {
        this.isopen54 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_georgia == false) {
        this.isopen54 = 'hide';
      }
    }
    if(target.className == 'thumb55'){
      if (this.isopen55 == 'hide') {
        this.isopen55 = '';
        return;
      }
      if (this.isopen55 == '') {
        this.isopen55 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_hawali == true) {
        this.isopen55 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_hawali == false) {
        this.isopen55 = 'hide';
      }
    }
    if(target.className == 'thumb56'){
      if (this.isopen56 == 'hide') {
        this.isopen56 = '';
        return;
      }
      if (this.isopen56 == '') {
        this.isopen56 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu == true) {
        this.isopen56 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu == false) {
        this.isopen56 = 'hide';
      }
    }
    if(target.className == 'thumb57'){
      if (this.isopen57 == 'hide') {
        this.isopen57 = '';
        return;
      }
      if (this.isopen57 == '') {
        this.isopen57 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_illinois == true) {
        this.isopen57 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_illinois == false) {
        this.isopen57 = 'hide';
      }
    }
    if(target.className == 'thumb58'){
      if (this.isopen58 == 'hide') {
        this.isopen58 = '';
        return;
      }
      if (this.isopen58 == '') {
        this.isopen58 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_louisiana == true) {
        this.isopen58 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_louisiana == false) {
        this.isopen58 = 'hide';
      }
    }
    if(target.className == 'thumb59'){
      if (this.isopen59 == 'hide') {
        this.isopen59 = '';
        return;
      }
      if (this.isopen59 == '') {
        this.isopen59 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_maryland == true) {
        this.isopen59 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_maryland == false) {
        this.isopen59 = 'hide';
      }
    }
    if(target.className == 'thumb60'){
      if (this.isopen60 == 'hide') {
        this.isopen60 = '';
        return;
      }
      if (this.isopen60 == '') {
        this.isopen60 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_massa == true) {
        this.isopen60 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_massa == false) {
        this.isopen60 = 'hide';
      }
    }
    if(target.className == 'thumb61'){
      if (this.isopen61 == 'hide') {
        this.isopen61 = '';
        return;
      }
      if (this.isopen61 == '') {
        this.isopen61 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_minnes == true) {
        this.isopen61 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_minnes == false) {
        this.isopen61 = 'hide';
      }
    }
    if(target.className == 'thumb62'){
      if (this.isopen62 == 'hide') {
        this.isopen62 = '';
        return;
      }
      if (this.isopen62 == '') {
        this.isopen62 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_missouri == true) {
        this.isopen62 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_missouri == false) {
        this.isopen62 = 'hide';
      }
    }
    if(target.className == 'thumb63'){
      if (this.isopen63 == 'hide') {
        this.isopen63 = '';
        return;
      }
      if (this.isopen63 == '') {
        this.isopen63 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_nevada == true) {
        this.isopen63 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_nevada == false) {
        this.isopen63 = 'hide';
      }
    }
    if(target.className == 'thumb64'){
      if (this.isopen64 == 'hide') {
        this.isopen64 = '';
        return;
      }
      if (this.isopen64 == '') {
        this.isopen64 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_newjersy == true) {
        this.isopen64 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_newjersy == false) {
        this.isopen64 = 'hide';
      }
    }
    if(target.className == 'thumb65'){
      if (this.isopen65 == 'hide') {
        this.isopen65 = '';
        return;
      }
      if (this.isopen65 == '') {
        this.isopen65 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_ncaro == true) {
        this.isopen65 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_ncaro == false) {
        this.isopen65 = 'hide';
      }
    }
    if(target.className == 'thumb66'){
      if (this.isopen66 == 'hide') {
        this.isopen66 = '';
        return;
      }
      if (this.isopen66 == '') {
        this.isopen66 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_oregon == true) {
        this.isopen66 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_oregon == false) {
        this.isopen66 = 'hide';
      }
    }
    if(target.className == 'thumb67'){
      if (this.isopen67 == 'hide') {
        this.isopen67 = '';
        return;
      }
      if (this.isopen67 == '') {
        this.isopen67 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_pennsy == true) {
        this.isopen67 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_pennsy == false) {
        this.isopen67 = 'hide';
      }
    }
    if(target.className == 'thumb68'){
      if (this.isopen68 == 'hide') {
        this.isopen68 = '';
        return;
      }
      if (this.isopen68 == '') {
        this.isopen68 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_texas == true) {
        this.isopen68 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_texas == false) {
        this.isopen68 = 'hide';
      }
    }
    if(target.className == 'thumb69'){
      if (this.isopen69 == 'hide') {
        this.isopen69 = '';
        return;
      }
      if (this.isopen69 == '') {
        this.isopen69 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_utah == true) {
        this.isopen69 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_utah == false) {
        this.isopen69 = 'hide';
      }
    }
    if(target.className == 'thumb70'){
      if (this.isopen70 == 'hide') {
        this.isopen70 = '';
        return;
      }
      if (this.isopen70 == '') {
        this.isopen70 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_washington == true) {
        this.isopen70 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_washington == false) {
        this.isopen70 = 'hide';
      }
    }
    if(target.className == 'thumb71'){
      if (this.isopen71 == 'hide') {
        this.isopen71 = '';
        return;
      }
      if (this.isopen71 == '') {
        this.isopen71 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_destination_oceania == true) {
        this.isopen71 = '';
      }
      if (this.audiences_finance_insurance_travel_destination_oceania == false) {
        this.isopen71 = 'hide';
      }
    }
    if(target.className == 'thumb72'){
      if (this.isopen72 == 'hide') {
        this.isopen72 = '';
        return;
      }
      if (this.isopen72 == '') {
        this.isopen72 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_hotel == true) {
        this.isopen72 = '';
      }
      if (this.audiences_finance_insurance_travel_hotel == false) {
        this.isopen72 = 'hide';
      }
    }
    if(target.className == 'thumb73'){
      if (this.isopen73 == 'hide') {
        this.isopen73 = '';
        return;
      }
      if (this.isopen73 == '') {
        this.isopen73 = 'hide';
        return;
      }
      if (this.audiences_finance_insurance_travel_vacations == true) {
        this.isopen73 = '';
      }
      if (this.audiences_finance_insurance_travel_vacations == false) {
        this.isopen73 = 'hide';
      }
    }
    if(target.className == 'thumb74'){
      if (this.isopen74 == 'hide') {
        this.isopen74 = '';
        return;
      }
      if (this.isopen74 == '') {
        this.isopen74 = 'hide';
        return;
      }
      if (this.audiences_finance_investment == true) {
        this.isopen74 = '';
      }
      if (this.audiences_finance_investment == false) {
        this.isopen74 = 'hide';
      }
    }
    if(target.className == 'thumb75'){
      if (this.isopen75 == 'hide') {
        this.isopen75 = '';
        return;
      }
      if (this.isopen75 == '') {
        this.isopen75 = 'hide';
        return;
      }
      if (this.audiences_finance_investment_mutualfunds == true) {
        this.isopen75 = '';
      }
      if (this.audiences_finance_investment_mutualfunds == false) {
        this.isopen75 = 'hide';
      }
    }
    if(target.className == 'thumb76'){
      if (this.isopen76 == 'hide') {
        this.isopen76 = '';
        return;
      }
      if (this.isopen76 == '') {
        this.isopen76 = 'hide';
        return;
      }
      if (this.audiences_finance_loans == true) {
        this.isopen76 = '';
      }
      if (this.audiences_finance_loans == false) {
        this.isopen76 = 'hide';
      }
    }
    if(target.className == 'thumb77'){
      if (this.isopen77 == 'hide') {
        this.isopen77 = '';
        return;
      }
      if (this.isopen77 == '') {
        this.isopen77 = 'hide';
        return;
      }
      if (this.audiences_finance_loans_mortgage == true) {
        this.isopen77 = '';
      }
      if (this.audiences_finance_loans_mortgage == false) {
        this.isopen77 = 'hide';
      }
    }
    if(target.className == 'thumb78'){
      if (this.isopen78 == 'hide') {
        this.isopen78 = '';
        return;
      }
      if (this.isopen78 == '') {
        this.isopen78 = 'hide';
        return;
      }
      if (this.audiences_finance_reales == true) {
        this.isopen78 = '';
      }
      if (this.audiences_finance_reales == false) {
        this.isopen78 = 'hide';
      }
    }
    if(target.className == 'thumb79'){
      if (this.isopen79 == 'hide') {
        this.isopen79 = '';
        return;
      }
      if (this.isopen79 == '') {
        this.isopen79 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_bones == true) {
        this.isopen79 = '';
      }
      if (this.audiences_healthpharma_bones == false) {
        this.isopen79 = 'hide';
      }
    }
    if(target.className == 'thumb80'){
      if (this.isopen80 == 'hide') {
        this.isopen80 = '';
        return;
      }
      if (this.isopen80 == '') {
        this.isopen80 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_bones_arthritis == true) {
        this.isopen80 = '';
      }
      if (this.audiences_healthpharma_bones_arthritis == false) {
        this.isopen80 = 'hide';
      }
    }
    if(target.className == 'thumb81'){
      if (this.isopen81 == 'hide') {
        this.isopen81 = '';
        return;
      }
      if (this.isopen81 == '') {
        this.isopen81 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_circulatory == true) {
        this.isopen81 = '';
      }
      if (this.audiences_healthpharma_circulatory == false) {
        this.isopen81 = 'hide';
      }
    }
    if(target.className == 'thumb82'){
      if (this.isopen82 == 'hide') {
        this.isopen82 = '';
        return;
      }
      if (this.isopen82 == '') {
        this.isopen82 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_diges == true) {
        this.isopen82 = '';
      }
      if (this.audiences_healthpharma_diges == false) {
        this.isopen82 = 'hide';
      }
    }
    if(target.className == 'thumb83'){
      if (this.isopen83 == 'hide') {
        this.isopen83 = '';
        return;
      }
      if (this.isopen83 == '') {
        this.isopen83 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_endo == true) {
        this.isopen83 = '';
      }
      if (this.audiences_healthpharma_endo == false) {
        this.isopen83 = 'hide';
      }
    }
    if(target.className == 'thumb84'){
      if (this.isopen84 == 'hide') {
        this.isopen84 = '';
        return;
      }
      if (this.isopen84 == '') {
        this.isopen84 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_infections == true) {
        this.isopen84 = '';
      }
      if (this.audiences_healthpharma_infections == false) {
        this.isopen84 = 'hide';
      }
    }
    if(target.className == 'thumb85'){
      if (this.isopen85 == 'hide') {
        this.isopen85 = '';
        return;
      }
      if (this.isopen85 == '') {
        this.isopen85 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_nervous == true) {
        this.isopen85 = '';
      }
      if (this.audiences_healthpharma_nervous == false) {
        this.isopen85 = 'hide';
      }
    }
    if(target.className == 'thumb86'){
      if (this.isopen86 == 'hide') {
        this.isopen86 = '';
        return;
      }
      if (this.isopen86 == '') {
        this.isopen86 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_respi == true) {
        this.isopen86 = '';
      }
      if (this.audiences_healthpharma_respi == false) {
        this.isopen86 = 'hide';
      }
    }
    if(target.className == 'thumb87'){
      if (this.isopen87 == 'hide') {
        this.isopen87 = '';
        return;
      }
      if (this.isopen87 == '') {
        this.isopen87 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_wellness == true) {
        this.isopen87 = '';
      }
      if (this.audiences_healthpharma_wellness == false) {
        this.isopen87 = 'hide';
      }
    }
    if(target.className == 'thumb88'){
      if (this.isopen88 == 'hide') {
        this.isopen88 = '';
        return;
      }
      if (this.isopen88 == '') {
        this.isopen88 = 'hide';
        return;
      }
      if (this.audiences_healthpharma_womenhealth == true) {
        this.isopen88 = '';
      }
      if (this.audiences_healthpharma_womenhealth == false) {
        this.isopen88 = 'hide';
      }
    }
    if(target.className == 'thumb89'){
      if (this.isopen89 == 'hide') {
        this.isopen89 = '';
        return;
      }
      if (this.isopen89 == '') {
        this.isopen89 = 'hide';
        return;
      }
      if (this.audiences_internationalinterest_hispanic == true) {
        this.isopen89 = '';
      }
      if (this.audiences_internationalinterest_hispanic == false) {
        this.isopen89 = 'hide';
      }
    }
    if(target.className == 'thumb90'){
      if (this.isopen90 == 'hide') {
        this.isopen90 = '';
        return;
      }
      if (this.isopen90 == '') {
        this.isopen90 = 'hide';
        return;
      }
      if (this.audiences_issues_education == true) {
        this.isopen90 = '';
      }
      if (this.audiences_issues_education == false) {
        this.isopen90 = 'hide';
      }
    }
    if(target.className == 'thumb91'){
      if (this.isopen91 == 'hide') {
        this.isopen91 = '';
        return;
      }
      if (this.isopen91 == '') {
        this.isopen91 = 'hide';
        return;
      }
      if (this.audiences_issues_education_adult == true) {
        this.isopen91 = '';
      }
      if (this.audiences_issues_education_adult == false) {
        this.isopen91 = 'hide';
      }
    }
    if(target.className == 'thumb92'){
      if (this.isopen92 == 'hide') {
        this.isopen92 = '';
        return;
      }
      if (this.isopen92 == '') {
        this.isopen92 = 'hide';
        return;
      }
      if (this.audiences_issues_education_foreign == true) {
        this.isopen92 = '';
      }
      if (this.audiences_issues_education_foreign == false) {
        this.isopen92 = 'hide';
      }
    }
    if(target.className == 'thumb93'){
      if (this.isopen93 == 'hide') {
        this.isopen93 = '';
        return;
      }
      if (this.isopen93 == '') {
        this.isopen93 = 'hide';
        return;
      }
      if (this.audiences_issues_healthcare == true) {
        this.isopen93 = '';
      }
      if (this.audiences_issues_healthcare == false) {
        this.isopen93 = 'hide';
      }
    }
    if(target.className == 'thumb94'){
      if (this.isopen94 == 'hide') {
        this.isopen94 = '';
        return;
      }
      if (this.isopen94 == '') {
        this.isopen94 = 'hide';
        return;
      }
      if (this.audiences_lifestages_parenting == true) {
        this.isopen94 = '';
      }
      if (this.audiences_lifestages_parenting == false) {
        this.isopen94 = 'hide';
      }
    }
    if(target.className == 'thumb96'){
      if (this.isopen96 == 'hide') {
        this.isopen96 = '';
        return;
      }
      if (this.isopen96 == '') {
        this.isopen96 = 'hide';
        return;
      }
      if (this.audiences_misce_hobbies == true) {
        this.isopen96 = '';
      }
      if (this.audiences_misce_hobbies == false) {
        this.isopen96 = 'hide';
      }
    }
    if(target.className == 'thumb97'){
      if (this.isopen97 == 'hide') {
        this.isopen97 = '';
        return;
      }
      if (this.isopen97 == '') {
        this.isopen97 = 'hide';
        return;
      }
      if (this.audiences_misce_holidays == true) {
        this.isopen97 = '';
      }
      if (this.audiences_misce_holidays == false) {
        this.isopen97 = 'hide';
      }
    }
    if(target.className == 'thumb98'){
      if (this.isopen98 == 'hide') {
        this.isopen98 = '';
        return;
      }
      if (this.isopen98 == '') {
        this.isopen98 = 'hide';
        return;
      }
      if (this.audiences_misce_law == true) {
        this.isopen98 = '';
      }
      if (this.audiences_misce_law == false) {
        this.isopen98 = 'hide';
      }
    }
    if(target.className == 'thumb99'){
      if (this.isopen99 == 'hide') {
        this.isopen99 = '';
        return;
      }
      if (this.isopen99 == '') {
        this.isopen99 = 'hide';
        return;
      }
      if (this.audiences_misce_news == true) {
        this.isopen99 = '';
      }
      if (this.audiences_misce_news == false) {
        this.isopen99 = 'hide';
      }
    }
    if(target.className == 'thumb100'){
      if (this.isopen100 == 'hide') {
        this.isopen100 = '';
        return;
      }
      if (this.isopen100 == '') {
        this.isopen100 = 'hide';
        return;
      }
      if (this.audiences_misce_poeple == true) {
        this.isopen100 = '';
      }
      if (this.audiences_misce_poeple == false) {
        this.isopen100 = 'hide';
      }
    }
    if(target.className == 'thumb101'){
      if (this.isopen101 == 'hide') {
        this.isopen101 = '';
        return;
      }
      if (this.isopen101 == '') {
        this.isopen101 = 'hide';
        return;
      }
      if (this.audiences_misce_religion == true) {
        this.isopen101 = '';
      }
      if (this.audiences_misce_religion == false) {
        this.isopen101 = 'hide';
      }
    }
    if(target.className == 'thumb102'){
      if (this.isopen102 == 'hide') {
        this.isopen102 = '';
        return;
      }
      if (this.isopen102 == '') {
        this.isopen102 = 'hide';
        return;
      }
      if (this.audiences_retail_apparel == true) {
        this.isopen102 = '';
      }
      if (this.audiences_retail_apparel == false) {
        this.isopen102 = 'hide';
      }
    }
    if(target.className == 'thumb103'){
      if (this.isopen103 == 'hide') {
        this.isopen103 = '';
        return;
      }
      if (this.isopen103 == '') {
        this.isopen103 = 'hide';
        return;
      }
      if (this.audiences_retail_etailer == true) {
        this.isopen103 = '';
      }
      if (this.audiences_retail_etailer == false) {
        this.isopen103 = 'hide';
      }
    }
    if(target.className == 'thumb104'){
      if (this.isopen104 == 'hide') {
        this.isopen104 = '';
        return;
      }
      if (this.isopen104 == '') {
        this.isopen104 = 'hide';
        return;
      }
      if (this.audiences_retail_merchandise == true) {
        this.isopen104 = '';
      }
      if (this.audiences_retail_merchandise == false) {
        this.isopen104 = 'hide';
      }
    }
    if(target.className == 'thumb105'){
      if (this.isopen105 == 'hide') {
        this.isopen105 = '';
        return;
      }
      if (this.isopen105 == '') {
        this.isopen105 = 'hide';
        return;
      }
      if (this.audiences_retail_gifts == true) {
        this.isopen105 = '';
      }
      if (this.audiences_retail_gifts == false) {
        this.isopen105 = 'hide';
      }
    }
    if(target.className == 'thumb106'){
      if (this.isopen106 == 'hide') {
        this.isopen106 = '';
        return;
      }
      if (this.isopen106 == '') {
        this.isopen106 = 'hide';
        return;
      }
      if (this.audiences_retail_home == true) {
        this.isopen106 = '';
      }
      if (this.audiences_retail_home == false) {
        this.isopen106 = 'hide';
      }
    }
    if(target.className == 'thumb107'){
      if (this.isopen107 == 'hide') {
        this.isopen107 = '';
        return;
      }
      if (this.isopen107 == '') {
        this.isopen107 = 'hide';
        return;
      }
      if (this.audiences_retail_home_improve == true) {
        this.isopen107 = '';
      }
      if (this.audiences_retail_home_improve == false) {
        this.isopen107 = 'hide';
      }
    }
    if(target.className == 'thumb108'){
      if (this.isopen108 == 'hide') {
        this.isopen108 = '';
        return;
      }
      if (this.isopen108 == '') {
        this.isopen108 = 'hide';
        return;
      }
      if (this.audiences_retail_goods == true) {
        this.isopen108 = '';
      }
      if (this.audiences_retail_goods == false) {
        this.isopen108 = 'hide';
      }
    }
    if(target.className == 'thumb109'){
      if (this.isopen109 == 'hide') {
        this.isopen109 = '';
        return;
      }
      if (this.isopen109 == '') {
        this.isopen109 = 'hide';
        return;
      }
      if (this.audiences_retail_resturents == true) {
        this.isopen109 = '';
      }
      if (this.audiences_retail_resturents == false) {
        this.isopen109 = 'hide';
      }
    }
    if(target.className == 'thumb110'){
      if (this.isopen110 == 'hide') {
        this.isopen110 = '';
        return;
      }
      if (this.isopen110 == '') {
        this.isopen110 = 'hide';
        return;
      }
      if (this.audiences_retail_retailers == true) {
        this.isopen110 = '';
      }
      if (this.audiences_retail_retailers == false) {
        this.isopen110 = 'hide';
      }
    }
    if(target.className == 'thumb111'){
      if (this.isopen111 == 'hide') {
        this.isopen111 = '';
        return;
      }
      if (this.isopen111 == '') {
        this.isopen111 = 'hide';
        return;
      }
      if (this.audiences_retail_retailers_dshoes == true) {
        this.isopen111 = '';
      }
      if (this.audiences_retail_retailers_dshoes == false) {
        this.isopen111 = 'hide';
      }
    }
    if(target.className == 'thumb112'){
      if (this.isopen112 == 'hide') {
        this.isopen112 = '';
        return;
      }
      if (this.isopen112 == '') {
        this.isopen112 = 'hide';
        return;
      }
      if (this.audiences_retail_retailers_electronics == true) {
        this.isopen112 = '';
      }
      if (this.audiences_retail_retailers_electronics == false) {
        this.isopen112 = 'hide';
      }
    }
    if(target.className == 'thumb113'){
      if (this.isopen113 == 'hide') {
        this.isopen113 = '';
        return;
      }
      if (this.isopen113 == '') {
        this.isopen113 = 'hide';
        return;
      }
      if (this.audiences_retail_retailers_homeimp == true) {
        this.isopen113 = '';
      }
      if (this.audiences_retail_retailers_homeimp == false) {
        this.isopen113 = 'hide';
      }
    }
    if(target.className == 'thumb114'){
      if (this.isopen114 == 'hide') {
        this.isopen114 = '';
        return;
      }
      if (this.isopen114 == '') {
        this.isopen114 = 'hide';
        return;
      }
      if (this.audiences_retail_retailers_massmerchants == true) {
        this.isopen114 = '';
      }
      if (this.audiences_retail_retailers_massmerchants == false) {
        this.isopen114 = 'hide';
      }
    }
    if(target.className == 'thumb115'){
      if (this.isopen115 == 'hide') {
        this.isopen115 = '';
        return;
      }
      if (this.isopen115 == '') {
        this.isopen115 = 'hide';
        return;
      }
      if (this.audiences_retail_retailers_officesupply == true) {
        this.isopen115 = '';
      }
      if (this.audiences_retail_retailers_officesupply == false) {
        this.isopen115 = 'hide';
      }
    }
    if(target.className == 'thumb116'){
      if (this.isopen116 == 'hide') {
        this.isopen116 = '';
        return;
      }
      if (this.isopen116 == '') {
        this.isopen116 = 'hide';
        return;
      }
      if (this.audiences_retail_retailers_apparel == true) {
        this.isopen116 = '';
      }
      if (this.audiences_retail_retailers_apparel == false) {
        this.isopen116 = 'hide';
      }
    }
    if(target.className == 'thumb117'){
      if (this.isopen117 == 'hide') {
        this.isopen117 = '';
        return;
      }
      if (this.isopen117 == '') {
        this.isopen117 = 'hide';
        return;
      }
      if (this.audiences_retail_retailers_clubs == true) {
        this.isopen117 = '';
      }
      if (this.audiences_retail_retailers_clubs == false) {
        this.isopen117 = 'hide';
      }
    }
    if(target.className == 'thumb118'){
      if (this.isopen118 == 'hide') {
        this.isopen118 = '';
        return;
      }
      if (this.isopen118 == '') {
        this.isopen118 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b == true) {
        this.isopen118 = '';
      }
      if (this.audiences_buisness_b2b == false) {
        this.isopen118 = 'hide';
      }
    }
    if(target.className == 'thumb119'){
      if (this.isopen119 == 'hide') {
        this.isopen119 = '';
        return;
      }
      if (this.isopen119 == '') {
        this.isopen119 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp == true) {
        this.isopen119 = '';
      }
      if (this.audiences_buisness_b2b_corp == false) {
        this.isopen119 = 'hide';
      }
    }
    if(target.className == 'thumb120'){
      if (this.isopen120 == 'hide') {
        this.isopen120 = '';
        return;
      }
      if (this.isopen120 == '') {
        this.isopen120 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human == true) {
        this.isopen120 = '';
      }
      if (this.audiences_buisness_b2b_corp_human == false) {
        this.isopen120 = 'hide';
      }
    }
    if(target.className == 'thumb121'){
      if (this.isopen121 == 'hide') {
        this.isopen121 = '';
        return;
      }
      if (this.isopen121 == '') {
        this.isopen121 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit == true) {
        this.isopen121 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit == false) {
        this.isopen121 = 'hide';
      }
    }
    if(target.className == 'thumb122'){
      if (this.isopen122 == 'hide') {
        this.isopen122 = '';
        return;
      }
      if (this.isopen122 == '') {
        this.isopen122 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology == true) {
        this.isopen122 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology == false) {
        this.isopen122 = 'hide';
      }
    }
    if(target.className == 'thumb123'){
      if (this.isopen123 == 'hide') {
        this.isopen123 = '';
        return;
      }
      if (this.isopen123 == '') {
        this.isopen123 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware == true) {
        this.isopen123 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware == false) {
        this.isopen123 = 'hide';
      }
    }
    if(target.className == 'thumb124'){
      if (this.isopen124 == 'hide') {
        this.isopen124 = '';
        return;
      }
      if (this.isopen124 == '') {
        this.isopen124 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri == true) {
        this.isopen124 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri == false) {
        this.isopen124 = 'hide';
      }
    }
    if(target.className == 'thumb125'){
      if (this.isopen125 == 'hide') {
        this.isopen125 = '';
        return;
      }
      if (this.isopen125 == '') {
        this.isopen125 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware == true) {
        this.isopen125 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware == false) {
        this.isopen125 = 'hide';
      }
    }
    if(target.className == 'thumb126'){
      if (this.isopen126 == 'hide') {
        this.isopen126 = '';
        return;
      }
      if (this.isopen126 == '') {
        this.isopen126 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec == true) {
        this.isopen126 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec == false) {
        this.isopen126 = 'hide';
      }
    }
    if(target.className == 'thumb127'){
      if (this.isopen127 == 'hide') {
        this.isopen127 = '';
        return;
      }
      if (this.isopen127 == '') {
        this.isopen127 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio == true) {
        this.isopen127 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio == false) {
        this.isopen127 = 'hide';
      }
    }
    if(target.className == 'thumb128'){
      if (this.isopen128 == 'hide') {
        this.isopen128 = '';
        return;
      }
      if (this.isopen128 == '') {
        this.isopen128 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart == true) {
        this.isopen128 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart == false) {
        this.isopen128 = 'hide';
      }
    }
    if(target.className == 'thumb129'){
      if (this.isopen129 == 'hide') {
        this.isopen129 = '';
        return;
      }
      if (this.isopen129 == '') {
        this.isopen129 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication == true) {
        this.isopen129 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication == false) {
        this.isopen129 = 'hide';
      }
    }
    if(target.className == 'thumb130'){
      if (this.isopen130 == 'hide') {
        this.isopen130 = '';
        return;
      }
      if (this.isopen130 == '') {
        this.isopen130 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile == true) {
        this.isopen130 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile == false) {
        this.isopen130 = 'hide';
      }
    }
    if(target.className == 'thumb131'){
      if (this.isopen131 == 'hide') {
        this.isopen131 = '';
        return;
      }
      if (this.isopen131 == '') {
        this.isopen131 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular == true) {
        this.isopen131 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular == false) {
        this.isopen131 = 'hide';
      }
    }
    if(target.className == 'thumb132'){
      if (this.isopen132 == 'hide') {
        this.isopen132 = '';
        return;
      }
      if (this.isopen132 == '') {
        this.isopen132 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo == true) {
        this.isopen132 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo == false) {
        this.isopen132 = 'hide';
      }
    }
    if(target.className == 'thumb133'){
      if (this.isopen133 == 'hide') {
        this.isopen133 = '';
        return;
      }
      if (this.isopen133 == '') {
        this.isopen133 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices == true) {
        this.isopen133 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices == false) {
        this.isopen133 = 'hide';
      }
    }
    if(target.className == 'thumb134'){
      if (this.isopen134 == 'hide') {
        this.isopen134 = '';
        return;
      }
      if (this.isopen134 == '') {
        this.isopen134 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community == true) {
        this.isopen134 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community == false) {
        this.isopen134 = 'hide';
      }
    }
    if(target.className == 'thumb135'){
      if (this.isopen135 == 'hide') {
        this.isopen135 = '';
        return;
      }
      if (this.isopen135 == '') {
        this.isopen135 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware == true) {
        this.isopen135 = '';
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware == false) {
        this.isopen135 = 'hide';
      }
    }
    if(target.className == 'thumb136'){
      if (this.isopen136 == 'hide') {
        this.isopen136 = '';
        return;
      }
      if (this.isopen136 == '') {
        this.isopen136 = 'hide';
        return;
      }
      if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware == true) {
        this.isopen136 = '';
      }
      if (this.audiences_consumer == false) {
        this.isopen136 = 'hide';
      }
    }
    if(target.className == 'thumb137'){
      if (this.isopen137 == 'hide') {
        this.isopen137 = '';
        return;
      }
      if (this.isopen137 == '') {
        this.isopen137 = 'hide';
        return;
      }
      if (this.audiences_buisness_employment == true) {
        this.isopen137 = '';
      }
      if (this.audiences_buisness_employment == false) {
        this.isopen137 = 'hide';
      }
    }
    if(target.className == 'thumb138'){
      if (this.isopen138 == 'hide') {
        this.isopen138 = '';
        return;
      }
      if (this.isopen138 == '') {
        this.isopen138 = 'hide';
        return;
      }
      if (this.audiences_buisness_employment_account == true) {
        this.isopen138 = '';
      }
      if (this.audiences_buisness_employment_account == false) {
        this.isopen138 = 'hide';
      }
    }
    if(target.className == 'thumb139'){
      if (this.isopen139 == 'hide') {
        this.isopen139 = '';
        return;
      }
      if (this.isopen139 == '') {
        this.isopen139 = 'hide';
        return;
      }
      if (this.audiences_buisness_employment_tele == true) {
        this.isopen139 = '';
      }
      if (this.audiences_buisness_employment_tele == false) {
        this.isopen139 = 'hide';
      }
    }
    if(target.className == 'thumb140'){
      if (this.isopen140 == 'hide') {
        this.isopen140 = '';
        return;
      }
      if (this.isopen140 == '') {
        this.isopen140 = 'hide';
        return;
      }
      if (this.audiences_buisness_small == true) {
        this.isopen140 = '';
      }
      if (this.audiences_buisness_small == false) {
        this.isopen140 = 'hide';
      }
    }


  }

  allcheck(event:any) {

    let target = event.target || event.srcElement || event.currentTarget;
    console.log(target);

    setTimeout(()=>{
      if (target.id == 'page_context_1') {

        /*$(target).parent().find("ul").find("input").click();*/
        if (this.audiences_automative == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_automative == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
/*        $(target).parent().find("ul").eq(0).find("input").trigger('input');


        $(target).parent().find("ul").eq(0).find("input").each(function () {
          //this['audiences_automative_fuel']=90;
          console.log(this.audiences_automative_fuel);
          console.log($(this).prop('checked'));
          console.log('I am clicked'+$(this).attr('id'));
          this["'"+$(this).attr('ngModel')+"'"]=$(this).prop('checked');
          console.log(this.audiences_automative_fuel);
          //console.log(this);
        })*/

      }


    if(target.id == 'page_context_31'){
      if (this.audiences_consumer == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_consumer == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }

    if(target.id == 'page_context_60'){
      if (this.audiences_entertainment == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_108'){
      if (this.audiences_finance == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_159'){
      if (this.audiences_healthpharma == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_196'){
      if (this.audiences_internationalinterest == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_internationalinterest == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_204'){
      if (this.audiences_issues == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_issues == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_217'){
      if (this.audiences_lifestages == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_lifestages == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_231'){
      if (this.audiences_misce == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_misce == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_261'){
      if (this.audiences_politics == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_politics == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_262'){
      if (this.audiences_retail == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_retail == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_324'){
      if (this.audiences_buisness == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_buisness == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_9'){
      if (this.audiences_automative_price == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_automative_price == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_17'){
      if (this.audiences_automative_sedan == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_automative_sedan == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_24'){
      if (this.audiences_automative_truck == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_automative_truck == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_26'){
      if (this.audiences_automative_us == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_automative_us == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_28'){
      if (this.audiences_automative_used == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_automative_used == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_32'){
      if (this.audiences_consumer_beauty == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_consumer_beauty == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_36'){
      if (this.audiences_consumer_beverages == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_consumer_beverages == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_37'){
      if (this.audiences_consumer_beverages_beerwine == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_consumer_beverages_beerwine == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_44'){
      if (this.audiences_consumer_food == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_consumer_food == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_45'){
      if (this.audiences_consumer_food_snacks == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_consumer_food_snacks == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_48'){
      if (this.audiences_consumer_pet == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_consumer_pet == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_62'){
      if (this.audiences_entertainment_games == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_games == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_63'){
      if (this.audiences_entertainment_games_hardcore == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_games_hardcore == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_64'){
      if (this.audiences_entertainment_games_hardcore_genres == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_games_hardcore_genres == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_71'){
      if (this.audiences_entertainment_games_hardcore_genres_sports == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_games_hardcore_genres_sports == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_73'){
      if (this.audiences_entertainment_games_platform == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_games_platform == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_80'){
      if (this.audiences_entertainment_games_platform_xbox == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_games_platform_xbox == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_83'){
      if (this.audiences_entertainment_movies == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_movies == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_91'){
      if (this.audiences_entertainment_movies_romance == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_movies_romance == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_93'){
      if (this.audiences_entertainment_music == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_music == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_104'){
      if (this.audiences_entertainment_tele == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_entertainment_tele == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_114'){
      if (this.audiences_finance_brand == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_brand == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_115'){
      if (this.audiences_finance_brand_bank == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_brand_bank == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_123'){
      if (this.audiences_finance_brand_credit == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_brand_credit == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_131'){
      if (this.audiences_finance_deposits == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_deposits == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_135'){
      if (this.audiences_finance_insurance == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_140'){
      if (this.audiences_finance_insurance_travel == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_423'){
      if (this.audiences_finance_insurance_travel_air == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_air == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_429'){
      if (this.audiences_finance_insurance_travel_destination == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_431'){
      if (this.audiences_finance_insurance_travel_destination_asia == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_asia == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_440'){
      if (this.audiences_finance_insurance_travel_destination_europe == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_europe == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_443'){
      if (this.audiences_finance_insurance_travel_destination_europe_france == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_europe_france == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_452'){
      if (this.audiences_finance_insurance_travel_destination_europe_ukie == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_europe_ukie == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_457'){
      if (this.audiences_finance_insurance_travel_destination_middleeast == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_middleeast == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_463'){
      if (this.audiences_finance_insurance_travel_destination_middleeast_unitedarab == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_middleeast_unitedarab == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_465'){
      if (this.audiences_finance_insurance_travel_destination_northamarica == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_467'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_mexico == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_mexico == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_469'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_471'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_arizona == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_arizona == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_474'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_california == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_california == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_480'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_colorado == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_colorado == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_482'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_florida == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_florida == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_490'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_georgia == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_georgia == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_492'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_hawali == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_hawali == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_494'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_496'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_illinois == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_illinois == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_498'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_louisiana == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_louisiana == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_500'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_maryland == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_maryland == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_502'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_massa == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_massa == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_504'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_minnes == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_minnes == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_506'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_missouri == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_missouri == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_508'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_nevada == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_nevada == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_511'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_newjersy == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_newjersy == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_514'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_ncaro == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_ncaro == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_516'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_oregon == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_oregon == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_518'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_pennsy == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_pennsy == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_520'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_texas == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_texas == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_522'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_utah == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_utah == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_526'){
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_washington == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_northamarica_us_washington == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_528'){
        if (this.audiences_finance_insurance_travel_destination_oceania == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_destination_oceania == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_532'){
      if (this.audiences_finance_insurance_travel_hotel == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_hotel == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_537'){
      if (this.audiences_finance_insurance_travel_vacations == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_insurance_travel_vacations == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_109'){
      if (this.audiences_finance_investment == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_investment == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_144'){
      if (this.audiences_finance_investment_mutualfunds == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_investment_mutualfunds == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_112'){
      if (this.audiences_finance_loans == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_loans == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_148'){
      if (this.audiences_finance_loans_mortgage == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_loans_mortgage == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_153'){
      if (this.audiences_finance_reales == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_finance_reales == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_160'){
      if (this.audiences_healthpharma_bones == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_bones == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_161'){
      if (this.audiences_healthpharma_bones_arthritis == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_bones_arthritis == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_165'){
      if (this.audiences_healthpharma_circulatory == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_circulatory == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_172'){
      if (this.audiences_healthpharma_diges == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_diges == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_174'){
      if (this.audiences_healthpharma_endo == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_endo == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_177'){
      if (this.audiences_healthpharma_infections == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_infections == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_179'){
      if (this.audiences_healthpharma_nervous == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_nervous == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_184'){
      if (this.audiences_healthpharma_respi == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_respi == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_190'){
      if (this.audiences_healthpharma_wellness == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_wellness == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_194'){
      if (this.audiences_healthpharma_womenhealth == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_healthpharma_womenhealth == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_198'){
      if (this.audiences_internationalinterest_hispanic == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_internationalinterest_hispanic == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_206'){
      if (this.audiences_issues_education == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_issues_education == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_219'){
      if (this.audiences_issues_education_adult == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_issues_education_adult == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_221'){
      if (this.audiences_issues_education_foreign == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_issues_education_foreign == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_212'){
      if (this.audiences_issues_healthcare == false) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
      }
      if (this.audiences_issues_healthcare == true) {
        $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
      }
    }
    if(target.id == 'page_context_225'){
        if (this.audiences_lifestages_parenting == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_lifestages_parenting == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_236'){
        if (this.audiences_misce_hobbies == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_misce_hobbies == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_238'){
        if (this.audiences_misce_holidays == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_misce_holidays == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_246'){
        if (this.audiences_misce_law == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_misce_law == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_249'){
        if (this.audiences_misce_news == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_misce_news == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_251'){
        if (this.audiences_misce_poeple == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_misce_poeple == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_256'){
        if (this.audiences_misce_religion == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_misce_religion == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_263'){
        if (this.audiences_retail_apparel == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_apparel == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_272'){
        if (this.audiences_retail_etailer == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_etailer == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_275'){
        if (this.audiences_retail_merchandise == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_merchandise == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_278'){
        if (this.audiences_retail_gifts == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_gifts == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_282'){
        if (this.audiences_retail_home == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_home == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_289'){
        if (this.audiences_retail_home_improve == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_home_improve == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_292'){
        if (this.audiences_retail_goods == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_goods == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_295'){
        if (this.audiences_retail_resturents == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_resturents == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_297'){
        if (this.audiences_retail_retailers == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_retailers == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_298'){
        if (this.audiences_retail_retailers_dshoes == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_retailers_dshoes == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_303'){
        if (this.audiences_retail_retailers_electronics == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_retailers_electronics == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_307'){
        if (this.audiences_retail_retailers_homeimp == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_retailers_homeimp == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_310'){
        if (this.audiences_retail_retailers_massmerchants == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_retailers_massmerchants == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_314'){
        if (this.audiences_retail_retailers_officesupply == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_retailers_officesupply == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_316'){
        if (this.audiences_retail_retailers_apparel == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_retailers_apparel == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_320'){
        if (this.audiences_retail_retailers_clubs == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_retail_retailers_clubs == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_325'){
        if (this.audiences_buisness_b2b == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_326'){
        if (this.audiences_buisness_b2b_corp == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_327'){
        if (this.audiences_buisness_b2b_corp_human == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_328'){
        if (this.audiences_buisness_b2b_corp_human_recruit == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_329'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_374'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_378'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_383'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_386'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_387'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_389'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_391'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_392'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_393'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_397'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_400'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_402'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_408'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_410'){
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_331'){
        if (this.audiences_buisness_employment_account == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_employment_account == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_352'){
        if (this.audiences_buisness_employment_tele == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_employment_tele == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    if(target.id == 'page_context_354'){
        if (this.audiences_buisness_small == false) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", false);
        }
        if (this.audiences_buisness_small == true) {
          $(target).parent().find("ul").eq(0).find("input").prop("checked", true);
        }
      }
    }, 400);

 /*   setTimeout(()=>{

    },700);*/
  }

  ngOnInit() {

/*    $('input[type="checkbox"]').change(function () {
      console.log('I am clicked'+$(this).attr('id'));
      this[$(this).attr('ngModel')]=$(this).prop('checked');
    });*/

    setTimeout(() => {
        console.log("hey");
        $( '.audience-list').find('input').attr('class','boxvalues');
        console.log($( '.audience-list').find('input').length);
        //console.log($( '.audience-list').find('input').;
        $('.boxvalues').each(function () {
        console.log($(this).find('ul').length);
      });

    }, 2000);


    setTimeout(() => {
      $('.boxvalues').parent().each(function () {
        console.log($(this).find('ul').length);
        if($(this).find('ul').length>0){
          $(this).addClass('collapsed');
        }
      });

    }, 3000);

    setTimeout(() => {
      $('.collapsed').click(function () {
          $(this).toggleClass('expanded');
      });

    }, 3200);

   /* setTimeout(() => {
      $('.active').click(function () {
        $(this).toggleClass('expanded');
      });
    }, 3200);*/
  }


  sendtype(type: any) {
      for (let i = 0; i <= 4; i++) {
        this.isDisabled[i] = true;
        this.isActive[i] = false;
      }
      setTimeout(() => {
        this.b = true;
        this.isDisabled[type] = false;
        this.isActive[type] = true;
      }, 500);
  }

  haserrorcls(cntrlname) {

      if (cntrlname == 'Simply_Solutions__c') {
        if (typeof(this.simply_geo) != undefined || typeof(this.simply_premium) != undefined || typeof(this.simply_audiences) != undefined || typeof(this.simply_intent) != undefined || typeof(this.simply_reach) != undefined) {
          return '';
        }
        else {
          return 'has-error';
        }
      }
      if (cntrlname == 'Solution_Geo_Details__c') {
        if (this.simply_display == true || this.simply_tablet == true || this.simply_mobile == true) {
          return '';
        }
        else {
          return 'has-error';
        }
      }
      if (cntrlname == 'Solution_Premium_Details__c') {
      if (this.premium_news == true || this.premium_buisness == true || this.premium_politics == true || this.premium_sports == true || this.premium_arts == true         ||  this.premium_shopping == true) {
          return '';
        }
        else {
          return 'has-error';
        }
      }
      if (cntrlname == 'Simply_Intent_Business_Intelligence__c') {
        if (this.intent_audiencetype != 'undefined' && this.intent_audiencetype != '' && this.intent_audiencetype != null) {

          return '';
        }
        else {
          return 'has-error';
        }
      }
      return '';
    }
/*  }*/

  showerrorcls(cntrlname) {

    if (this.validation == false) {
      return 'hide';
    }

    else {

      if (cntrlname == 'Simply_Solutions__c') {
        if (this.simply_geo != undefined || this.simply_premium != undefined || this.simply_audiences != undefined || this.simply_intent != undefined || this.simply_reach != undefined) {
          return 'hide';
        }
        else {

          return '';
        }
      }

      if (cntrlname == 'Simply_Geo_Display__c') {
        if (this.simply_display == true || this.simply_tablet == true || this.simply_mobile == true) {
          return 'hide';
        }
        else {
          return '';
        }
      }

      if (cntrlname == 'Solution_Premium_Details__c') {
        if (this.premium_news == true || this.premium_buisness == true || this.premium_politics == true || this.premium_sports == true || this.premium_arts == true ||              this.premium_shopping == true) {
          return 'hide';
        }
        else {
          return '';
        }
      }
      if (cntrlname == 'Simply_Intent_Business_Intelligence__c') {
        if (this.intent_audiencetype!= 'undefined' && this.intent_audiencetype!= '' && this.intent_audiencetype!= null) {
          return 'hide';
        }
        else {
          return '';
        }
      }
      return 'hide';
    }
  }

  updatepushval(val:any){
    this.pushval(val);
    console.log(this.pushval);
  }

  callsubmit(){
    this.pushval= [];
    let pushval=[];
    console.log(pushval);
    //console.log("pushvl");
    $('.boxvalues').each(function () {
      if($(this).prop("checked")== true){
        console.log($(this).attr('id'));
        pushval.push($(this).attr('id'));
      }
    });

    console.log(pushval);
    console.log("pushvl");
    this.pushval=pushval;

    this.validation=true;
    if(
        ((this.simply_geo!= undefined)&& (this.simply_display == true || this.simply_tablet == true || this.simply_mobile == true)) ||

        ((this.simply_premium!= undefined) && ((this.premium_news==true || this.premium_buisness==true || this.premium_politics==true || this.premium_sports==true ||              this.premium_arts==true || this.premium_shopping==true))) ||

        (this.simply_audiences!= undefined) ||

        ((this.simply_intent!= undefined) && ((this.intent_audiencetype!=undefined)&&(this.intent_audiencetype!= '')&&(this.intent_audiencetype!= null))) ||

        (this.simply_reach!= undefined)

    )

/*    if (    (this.simply_geo!= undefined || this.simply_premium!= undefined || this.simply_audiences!= undefined || this.simply_intent!= undefined || this.simply_reach!= undefined) &&  (this.simply_display == true || this.simply_tablet == true || this.simply_mobile == true || this.premium_news==true || this.premium_buisness==true || this.premium_politics==true || this.premium_sports==true || this.premium_arts==true || this.premium_shopping==true || this.intent_audiencetype!=undefined)    )*/

    {
    //  let link = 'http://localhost:3004/simplesolution';
     // let link = 'http://influxiq.com:3014/simplesolution';
      let link = this.serverurl + 'simplesolution';


    let data = {
      simply_geotargeting: this.simply_geotargeting,
      simply_geofencing: this.simply_geofencing,
      simply_display: this.simply_display,
      simply_tablet: this.simply_tablet,
      simply_mobile: this.simply_mobile,
      premium_geotargeting: this.premium_geotargeting,
      premium_geofencing: this.premium_geofencing,
      premium_news: this.premium_news,
      premium_buisness: this.premium_buisness,
      premium_politics: this.premium_politics,
      premium_sports: this.premium_sports,
      premium_arts: this.premium_arts,
      premium_shopping: this.premium_shopping,
      audiences_geotargeting: this.audiences_geotargeting,
      audiences_geofencing: this.audiences_geofencing,
      audiences_automative: this.audiences_automative,
      audiences_automative_fuel: this.audiences_automative_fuel,
      audiences_automative_convertible: this.audiences_automative_convertible,
      audiences_automative_coupe: this.audiences_automative_coupe,
      audiences_automative_minivan: this.audiences_automative_minivan,
      audiences_automative_motorcycle: this.audiences_automative_motorcycle,
      audiences_automative_nonus: this.audiences_automative_nonus,
      audiences_automative_parts: this.audiences_automative_parts,
      audiences_automative_price: this.audiences_automative_price,
      audiences_automative_price_economy: this.audiences_automative_price_economy,
      audiences_automative_price_germanyeco: this.audiences_automative_price_germanyeco,
      audiences_automative_price_germanylux: this.audiences_automative_price_germanylux,
      audiences_automative_price_germanymid: this.audiences_automative_price_germanymid,
      audiences_automative_price_luxary: this.audiences_automative_price_luxary,
      audiences_automative_price_midrange: this.audiences_automative_price_midrange,
      audiences_automative_rv: this.audiences_automative_rv,
      audiences_automative_sedan: this.audiences_automative_sedan,
      audiences_automative_sedan_compact: this.audiences_automative_sedan_compact,
      audiences_automative_sedan_large: this.audiences_automative_sedan_large,
      audiences_automative_sedan_midsize: this.audiences_automative_sedan_midsize,
      audiences_automative_services: this.audiences_automative_services,
      audiences_automative_sportscar: this.audiences_automative_sportscar,
      audiences_automative_suv: this.audiences_automative_suv,
      audiences_automative_truck: this.audiences_automative_truck,
      audiences_automative_truck_fullsize: this.audiences_automative_truck_fullsize,
      audiences_automative_us: this.audiences_automative_us,
      audiences_automative_us_chry: this.audiences_automative_us_chry,
      audiences_automative_used: this.audiences_automative_used,
      audiences_automative_used_certified: this.audiences_automative_used_certified,
      audiences_automative_wagon: this.audiences_automative_wagon,
      audiences_consumer: this.audiences_consumer,
      audiences_consumer_beauty: this.audiences_consumer_beauty,
      audiences_consumer_beauty_cosmetics: this.audiences_consumer_beauty_cosmetics,
      audiences_consumer_beauty_fragrance: this.audiences_consumer_beauty_fragrance,
      audiences_consumer_beauty_hair: this.audiences_consumer_beauty_hair,
      audiences_consumer_beverages: this.audiences_consumer_beverages,
      audiences_consumer_beverages_beerwine: this.audiences_consumer_beverages_beerwine,
      audiences_consumer_beverages_beerwine_beer: this.audiences_consumer_beverages_beerwine_beer,
      audiences_consumer_beverages_beerwine_carbonated: this.audiences_consumer_beverages_beerwine_carbonated,
      audiences_consumer_beverages_beerwine_coffee: this.audiences_consumer_beverages_beerwine_coffee,
      audiences_consumer_beverages_beerwine_juices: this.audiences_consumer_beverages_beerwine_juices,
      audiences_consumer_beverages_beerwine_tea: this.audiences_consumer_beverages_beerwine_tea,
      audiences_consumer_contests: this.audiences_consumer_contests,
      audiences_consumer_food: this.audiences_consumer_food,
      audiences_consumer_food_snacks: this.audiences_consumer_food_snacks,
      audiences_consumer_food_snacks_savory: this.audiences_consumer_food_snacks_savory,
      audiences_consumer_food_snacks_sweet: this.audiences_consumer_food_snacks_sweet,
      audiences_consumer_pet: this.audiences_consumer_pet,
      audiences_consumer_pet_cat: this.audiences_consumer_pet_cat,
      audiences_consumer_pet_dog: this.audiences_consumer_pet_dog,
      audiences_consumer_pet_food: this.audiences_consumer_pet_food,
      audiences_consumer_recipes: this.audiences_consumer_recipes,
      audiences_entertainment: this.audiences_entertainment,
      audiences_entertainment_parks: this.audiences_entertainment_parks,
      audiences_entertainment_games: this.audiences_entertainment_games,
      audiences_entertainment_games_hardcore: this.audiences_entertainment_games_hardcore,
      audiences_entertainment_games_hardcore_genres: this.audiences_entertainment_games_hardcore_genres,
      audiences_entertainment_games_hardcore_genres_action: this.audiences_entertainment_games_hardcore_genres_action,
      audiences_entertainment_games_hardcore_genres_adventure: this.audiences_entertainment_games_hardcore_genres_adventure,
      audiences_entertainment_games_hardcore_genres_puzzle: this.audiences_entertainment_games_hardcore_genres_puzzle,
      audiences_entertainment_games_hardcore_genres_racing: this.audiences_entertainment_games_hardcore_genres_racing,
      audiences_entertainment_games_hardcore_genres_reality: this.audiences_entertainment_games_hardcore_genres_reality,
      audiences_entertainment_games_hardcore_genres_role: this.audiences_entertainment_games_hardcore_genres_role,
      audiences_entertainment_games_hardcore_genres_simulation: this.audiences_entertainment_games_hardcore_genres_simulation,
      audiences_entertainment_games_hardcore_genres_sports: this.audiences_entertainment_games_hardcore_genres_sports,
      audiences_entertainment_games_hardcore_genres_sports_autoracing: this.audiences_entertainment_games_hardcore_genres_sports_autoracing,
      audiences_entertainment_games_hardcore_genres_sports_baseball: this.audiences_entertainment_games_hardcore_genres_sports_baseball,
      audiences_entertainment_games_hardcore_genres_sports_basketball: this.audiences_entertainment_games_hardcore_genres_sports_basketball,
      audiences_entertainment_games_hardcore_genres_sports_boating: this.audiences_entertainment_games_hardcore_genres_sports_boating,
      audiences_entertainment_games_hardcore_genres_sports_cricket: this.audiences_entertainment_games_hardcore_genres_sports_cricket,
      audiences_entertainment_games_hardcore_genres_sports_cycling: this.audiences_entertainment_games_hardcore_genres_sports_cycling,
      audiences_entertainment_games_hardcore_genres_sports_fantasylg: this.audiences_entertainment_games_hardcore_genres_sports_fantasylg,
      audiences_entertainment_games_hardcore_genres_sports_football: this.audiences_entertainment_games_hardcore_genres_sports_football,
      audiences_entertainment_games_hardcore_genres_sports_golf: this.audiences_entertainment_games_hardcore_genres_sports_golf,
      audiences_entertainment_games_hardcore_genres_sports_hockey: this.audiences_entertainment_games_hardcore_genres_sports_hockey,
      audiences_entertainment_games_hardcore_genres_sports_hunting: this.audiences_entertainment_games_hardcore_genres_sports_hunting,
      audiences_entertainment_games_hardcore_genres_sports_outdoors: this.audiences_entertainment_games_hardcore_genres_sports_outdoors,
      audiences_entertainment_games_hardcore_genres_sports_rugby: this.audiences_entertainment_games_hardcore_genres_sports_rugby,
      audiences_entertainment_games_hardcore_genres_sports_snow: this.audiences_entertainment_games_hardcore_genres_sports_snow,
      audiences_entertainment_games_hardcore_genres_sports_soccer: this.audiences_entertainment_games_hardcore_genres_sports_soccer,
      audiences_entertainment_games_hardcore_genres_sports_sportgoods: this.audiences_entertainment_games_hardcore_genres_sports_sportgoods,
      audiences_entertainment_games_hardcore_genres_sports_tennis: this.audiences_entertainment_games_hardcore_genres_sports_tennis,
      audiences_entertainment_games_hardcore_genres_strategy: this.audiences_entertainment_games_hardcore_genres_strategy,
      audiences_entertainment_games_platform: this.audiences_entertainment_games_platform,
      audiences_entertainment_games_platform_pc: this.audiences_entertainment_games_platform_pc,
      audiences_entertainment_games_platform_gameboy: this.audiences_entertainment_games_platform_gameboy,
      audiences_entertainment_games_platform_gamecube: this.audiences_entertainment_games_platform_gamecube,
      audiences_entertainment_games_platform_playstation: this.audiences_entertainment_games_platform_playstation,
      audiences_entertainment_games_platform_wii: this.audiences_entertainment_games_platform_wii,
      audiences_entertainment_games_platform_wireless: this.audiences_entertainment_games_platform_wireless,
      audiences_entertainment_games_platform_xbox: this.audiences_entertainment_games_platform_xbox,
      audiences_entertainment_games_platform_xbox_360: this.audiences_entertainment_games_platform_xbox_360,
      audiences_entertainment_genealogy: this.audiences_entertainment_genealogy,
      audiences_entertainment_movies: this.audiences_entertainment_movies,
      audiences_entertainment_movies_action: this.audiences_entertainment_movies_action,
      audiences_entertainment_movies_animation: this.audiences_entertainment_movies_animation,
      audiences_entertainment_movies_childrens: this.audiences_entertainment_movies_childrens,
      audiences_entertainment_movies_classics: this.audiences_entertainment_movies_classics,
      audiences_entertainment_movies_comedy: this.audiences_entertainment_movies_comedy,
      audiences_entertainment_movies_drama: this.audiences_entertainment_movies_drama,
      audiences_entertainment_movies_horror: this.audiences_entertainment_movies_horror,
      audiences_entertainment_movies_romance: this.audiences_entertainment_movies_romance,
      audiences_entertainment_movies_romance_personals: this.audiences_entertainment_movies_romance_personals,
      audiences_entertainment_movies_science: this.audiences_entertainment_movies_science,
      audiences_entertainment_music: this.audiences_entertainment_music,
      audiences_entertainment_music_country: this.audiences_entertainment_music_country,
      audiences_entertainment_music_electronic: this.audiences_entertainment_music_electronic,
      audiences_entertainment_music_instru: this.audiences_entertainment_music_instru,
      audiences_entertainment_music_pop: this.audiences_entertainment_music_pop,
      audiences_entertainment_music_rb: this.audiences_entertainment_music_rb,
      audiences_entertainment_music_rap: this.audiences_entertainment_music_rap,
      audiences_entertainment_music_rock: this.audiences_entertainment_music_rock,
      audiences_entertainment_music_world: this.audiences_entertainment_music_world,
      audiences_entertainment_perform: this.audiences_entertainment_perform,
      audiences_entertainment_radio: this.audiences_entertainment_radio,
      audiences_entertainment_tele: this.audiences_entertainment_tele,
      audiences_entertainment_tele_broadcast: this.audiences_entertainment_tele_broadcast,
      audiences_entertainment_tele_cable: this.audiences_entertainment_tele_cable,
      audiences_finance: this.audiences_finance,
      audiences_finance_brand: this.audiences_finance_brand,
      audiences_finance_brand_bank: this.audiences_finance_brand_bank,
      audiences_finance_brand_bank_boa: this.audiences_finance_brand_bank_boa,
      audiences_finance_brand_bank_chase: this.audiences_finance_brand_bank_chase,
      audiences_finance_brand_bank_citi: this.audiences_finance_brand_bank_citi,
      audiences_finance_brand_bank_us: this.audiences_finance_brand_bank_us,
      audiences_finance_brand_bank_wach: this.audiences_finance_brand_bank_wach,
      audiences_finance_brand_bank_washington: this.audiences_finance_brand_bank_washington,
      audiences_finance_brand_bank_wellsfargo: this.audiences_finance_brand_bank_wellsfargo,
      audiences_finance_brand_credit: this.audiences_finance_brand_credit,
      audiences_finance_brand_credit_american: this.audiences_finance_brand_credit_american,
      audiences_finance_brand_credit_capitalone: this.audiences_finance_brand_credit_capitalone,
      audiences_finance_brand_credit_citicard: this.audiences_finance_brand_credit_citicard,
      audiences_finance_brand_credit_discover: this.audiences_finance_brand_credit_discover,
      audiences_finance_brand_credit_mastercard: this.audiences_finance_brand_credit_mastercard,
      audiences_finance_brand_credit_visa: this.audiences_finance_brand_credit_visa,
      audiences_finance_creditservice: this.audiences_finance_creditservice,
      audiences_finance_deposits: this.audiences_finance_deposits,
      audiences_finance_deposits_buisness: this.audiences_finance_deposits_buisness,
      audiences_finance_deposits_checking: this.audiences_finance_deposits_checking,
      audiences_finance_deposits_savings: this.audiences_finance_deposits_savings,
      audiences_finance_insurance: this.audiences_finance_insurance,
      audiences_finance_insurance_automobile: this.audiences_finance_insurance_automobile,
      audiences_finance_insurance_home: this.audiences_finance_insurance_home,
      audiences_finance_insurance_life: this.audiences_finance_insurance_life,
      audiences_finance_insurance_medical: this.audiences_finance_insurance_medical,
      audiences_finance_insurance_travel: this.audiences_finance_insurance_travel,
      audiences_finance_insurance_travel_air: this.audiences_finance_insurance_travel_air,
      audiences_finance_insurance_travel_air_budget: this.audiences_finance_insurance_travel_air_budget,
      audiences_finance_insurance_travel_buisnesstravel: this.audiences_finance_insurance_travel_buisnesstravel,
      audiences_finance_insurance_travel_carrental: this.audiences_finance_insurance_travel_carrental,
      audiences_finance_insurance_travel_casiono: this.audiences_finance_insurance_travel_casiono,
      audiences_finance_insurance_travel_cruises: this.audiences_finance_insurance_travel_cruises,
      audiences_finance_insurance_travel_destination: this.audiences_finance_insurance_travel_destination,
      audiences_finance_insurance_travel_destination_africa: this.audiences_finance_insurance_travel_destination_africa,
      audiences_finance_insurance_travel_destination_asia: this.audiences_finance_insurance_travel_destination_asia,
      audiences_finance_insurance_travel_destination_asia_china: this.audiences_finance_insurance_travel_destination_asia_china,
      audiences_finance_insurance_travel_destination_asia_hong: this.audiences_finance_insurance_travel_destination_asia_hong,
      audiences_finance_insurance_travel_destination_asia_india: this.audiences_finance_insurance_travel_destination_asia_india,
      audiences_finance_insurance_travel_destination_asia_japan: this.audiences_finance_insurance_travel_destination_asia_japan,
      audiences_finance_insurance_travel_destination_asia_korea: this.audiences_finance_insurance_travel_destination_asia_korea,
      audiences_finance_insurance_travel_destination_asia_macau: this.audiences_finance_insurance_travel_destination_asia_macau,
      audiences_finance_insurance_travel_destination_asia_taiwan: this.audiences_finance_insurance_travel_destination_asia_taiwan,
      audiences_finance_insurance_travel_destination_caribbean: this.audiences_finance_insurance_travel_destination_caribbean,
      audiences_finance_insurance_travel_destination_europe: this.audiences_finance_insurance_travel_destination_europe,
      audiences_finance_insurance_travel_destination_europe_austria: this.audiences_finance_insurance_travel_destination_europe_austria,
      audiences_finance_insurance_travel_destination_europe_denmark: this.audiences_finance_insurance_travel_destination_europe_denmark,
      audiences_finance_insurance_travel_destination_europe_france: this.audiences_finance_insurance_travel_destination_europe_france,
      audiences_finance_insurance_travel_destination_europe_france_paris: this.audiences_finance_insurance_travel_destination_europe_france_paris,
      audiences_finance_insurance_travel_destination_europe_germany: this.audiences_finance_insurance_travel_destination_europe_germany,
      audiences_finance_insurance_travel_destination_europe_greece: this.audiences_finance_insurance_travel_destination_europe_greece,
      audiences_finance_insurance_travel_destination_europe_italy: this.audiences_finance_insurance_travel_destination_europe_italy,
      audiences_finance_insurance_travel_destination_europe_portugal: this.audiences_finance_insurance_travel_destination_europe_portugal,
      audiences_finance_insurance_travel_destination_europe_spain: this.audiences_finance_insurance_travel_destination_europe_spain,
      audiences_finance_insurance_travel_destination_europe_switzerland: this.audiences_finance_insurance_travel_destination_europe_switzerland,
      audiences_finance_insurance_travel_destination_europe_turkey: this.audiences_finance_insurance_travel_destination_europe_turkey,
      audiences_finance_insurance_travel_destination_europe_ukie: this.audiences_finance_insurance_travel_destination_europe_ukie,
      audiences_finance_insurance_travel_destination_europe_ukie_england: this.audiences_finance_insurance_travel_destination_europe_ukie_england,
      audiences_finance_insurance_travel_destination_europe_ukie_scotland: this.audiences_finance_insurance_travel_destination_europe_ukie_scotland,
      audiences_finance_insurance_travel_destination_europe_ukie_wales: this.audiences_finance_insurance_travel_destination_europe_ukie_wales,
      audiences_finance_insurance_travel_destination_latinam: this.audiences_finance_insurance_travel_destination_latinam,
      audiences_finance_insurance_travel_destination_middleeast: this.audiences_finance_insurance_travel_destination_middleeast,
      audiences_finance_insurance_travel_destination_middleeast_israel: this.audiences_finance_insurance_travel_destination_middleeast_israel,
      audiences_finance_insurance_travel_destination_middleeast_kuwait: this.audiences_finance_insurance_travel_destination_middleeast_kuwait,
      audiences_finance_insurance_travel_destination_middleeast_oman: this.audiences_finance_insurance_travel_destination_middleeast_oman,
      audiences_finance_insurance_travel_destination_middleeast_qatar: this.audiences_finance_insurance_travel_destination_middleeast_qatar,
      audiences_finance_insurance_travel_destination_middleeast_saudiarab: this.audiences_finance_insurance_travel_destination_middleeast_saudiarab,
      audiences_finance_insurance_travel_destination_middleeast_unitedarab: this.audiences_finance_insurance_travel_destination_middleeast_unitedarab,
      audiences_finance_insurance_travel_destination_middleeast_unitedarab_dubai: this.audiences_finance_insurance_travel_destination_middleeast_unitedarab_dubai,
      audiences_finance_insurance_travel_destination_northamarica: this.audiences_finance_insurance_travel_destination_northamarica,
      audiences_finance_insurance_travel_destination_northamarica_canada: this.audiences_finance_insurance_travel_destination_northamarica_canada,
      audiences_finance_insurance_travel_destination_northamarica_mexico: this.audiences_finance_insurance_travel_destination_northamarica_mexico,
      audiences_finance_insurance_travel_destination_northamarica_mexico_cancun: this.audiences_finance_insurance_travel_destination_northamarica_mexico_cancun,
      audiences_finance_insurance_travel_destination_northamarica_us: this.audiences_finance_insurance_travel_destination_northamarica_us,
      audiences_finance_insurance_travel_destination_northamarica_us_hawali: this.audiences_finance_insurance_travel_destination_northamarica_us_hawali,
      audiences_finance_insurance_travel_destination_northamarica_us_alaska: this.audiences_finance_insurance_travel_destination_northamarica_us_alaska,
      audiences_finance_insurance_travel_destination_northamarica_us_arizona: this.audiences_finance_insurance_travel_destination_northamarica_us_arizona,
      audiences_finance_insurance_travel_destination_northamarica_us_arizona_phoenix: this.audiences_finance_insurance_travel_destination_northamarica_us_arizona_phoenix,
      audiences_finance_insurance_travel_destination_northamarica_us_arizona_tucson: this.audiences_finance_insurance_travel_destination_northamarica_us_arizona_tucson,
      audiences_finance_insurance_travel_destination_northamarica_us_california: this.audiences_finance_insurance_travel_destination_northamarica_us_california,
      audiences_finance_insurance_travel_destination_northamarica_us_california_los: this.audiences_finance_insurance_travel_destination_northamarica_us_california_los,
      audiences_finance_insurance_travel_destination_northamarica_us_california_lake: this.audiences_finance_insurance_travel_destination_northamarica_us_california_lake,
      audiences_finance_insurance_travel_destination_northamarica_us_california_sand: this.audiences_finance_insurance_travel_destination_northamarica_us_california_sand,
      audiences_finance_insurance_travel_destination_northamarica_us_california_sanf: this.audiences_finance_insurance_travel_destination_northamarica_us_california_sanf,
      audiences_finance_insurance_travel_destination_northamarica_us_california_sanj: this.audiences_finance_insurance_travel_destination_northamarica_us_california_sanj,
      audiences_finance_insurance_travel_destination_northamarica_us_colorado: this.audiences_finance_insurance_travel_destination_northamarica_us_colorado,
      audiences_finance_insurance_travel_destination_northamarica_us_colorado_denver: this.audiences_finance_insurance_travel_destination_northamarica_us_colorado_denver,
      audiences_finance_insurance_travel_destination_northamarica_us_florida: this.audiences_finance_insurance_travel_destination_northamarica_us_florida,
      audiences_finance_insurance_travel_destination_northamarica_us_florida_daytona: this.audiences_finance_insurance_travel_destination_northamarica_us_florida_daytona,
      audiences_finance_insurance_travel_destination_northamarica_us_florida_fort: this.audiences_finance_insurance_travel_destination_northamarica_us_florida_fort,
      audiences_finance_insurance_travel_destination_northamarica_us_florida_myers: this.audiences_finance_insurance_travel_destination_northamarica_us_florida_myers,
      audiences_finance_insurance_travel_destination_northamarica_us_florida_miami: this.audiences_finance_insurance_travel_destination_northamarica_us_florida_miami,
      audiences_finance_insurance_travel_destination_northamarica_us_florida_orlando: this.audiences_finance_insurance_travel_destination_northamarica_us_florida_orlando,
      audiences_finance_insurance_travel_destination_northamarica_us_florida_tampa: this.audiences_finance_insurance_travel_destination_northamarica_us_florida_tampa,
      audiences_finance_insurance_travel_destination_northamarica_us_florida_westpalm: this.audiences_finance_insurance_travel_destination_northamarica_us_florida_westpalm,
      audiences_finance_insurance_travel_destination_northamarica_us_georgia_atlanta: this.audiences_finance_insurance_travel_destination_northamarica_us_georgia_atlanta,
      audiences_finance_insurance_travel_destination_northamarica_us_georgia: this.audiences_finance_insurance_travel_destination_northamarica_us_georgia,
      audiences_finance_insurance_travel_destination_northamarica_us_hawali_mauli: this.audiences_finance_insurance_travel_destination_northamarica_us_hawali_mauli,
      audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu: this.audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu,
      audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu_honolulu: this.audiences_finance_insurance_travel_destination_northamarica_us_hawali_oahu_honolulu,
      audiences_finance_insurance_travel_destination_northamarica_us_illinois: this.audiences_finance_insurance_travel_destination_northamarica_us_illinois,
      audiences_finance_insurance_travel_destination_northamarica_us_louisiana: this.audiences_finance_insurance_travel_destination_northamarica_us_louisiana,
      audiences_finance_insurance_travel_destination_northamarica_us_illinois_chicago: this.audiences_finance_insurance_travel_destination_northamarica_us_illinois_chicago,
      audiences_finance_insurance_travel_destination_northamarica_us_louisiana_orleans: this.audiences_finance_insurance_travel_destination_northamarica_us_louisiana_orleans,
      audiences_finance_insurance_travel_destination_northamarica_us_maryland: this.audiences_finance_insurance_travel_destination_northamarica_us_maryland,
      audiences_finance_insurance_travel_destination_northamarica_us_maryland_balti: this.audiences_finance_insurance_travel_destination_northamarica_us_maryland_balti,
      audiences_finance_insurance_travel_destination_northamarica_us_massa: this.audiences_finance_insurance_travel_destination_northamarica_us_massa,
      audiences_finance_insurance_travel_destination_northamarica_us_massa_boston: this.audiences_finance_insurance_travel_destination_northamarica_us_massa_boston,
      audiences_finance_insurance_travel_destination_northamarica_us_minnes: this.audiences_finance_insurance_travel_destination_northamarica_us_minnes,
      audiences_finance_insurance_travel_destination_northamarica_us_minnes_minnea: this.audiences_finance_insurance_travel_destination_northamarica_us_minnes_minnea,
      audiences_finance_insurance_travel_destination_northamarica_us_missouri: this.audiences_finance_insurance_travel_destination_northamarica_us_missouri,
      audiences_finance_insurance_travel_destination_northamarica_us_missouri_stlouis: this.audiences_finance_insurance_travel_destination_northamarica_us_missouri_stlouis,
      audiences_finance_insurance_travel_destination_northamarica_us_nevada: this.audiences_finance_insurance_travel_destination_northamarica_us_nevada,
      audiences_finance_insurance_travel_destination_northamarica_us_nevada_vegas: this.audiences_finance_insurance_travel_destination_northamarica_us_nevada_vegas,
      audiences_finance_insurance_travel_destination_northamarica_us_neveda_reno: this.audiences_finance_insurance_travel_destination_northamarica_us_neveda_reno,
      audiences_finance_insurance_travel_destination_northamarica_us_newjersy: this.audiences_finance_insurance_travel_destination_northamarica_us_newjersy,
      audiences_finance_insurance_travel_destination_northamarica_us_newjersy_newark: this.audiences_finance_insurance_travel_destination_northamarica_us_newjersy_newark,
      audiences_finance_insurance_travel_destination_northamarica_us_newyork: this.audiences_finance_insurance_travel_destination_northamarica_us_newyork,
      audiences_finance_insurance_travel_destination_northamarica_us_ncaro: this.audiences_finance_insurance_travel_destination_northamarica_us_ncaro,
      audiences_finance_insurance_travel_destination_northamarica_us_ncaro_raleigh: this.audiences_finance_insurance_travel_destination_northamarica_us_ncaro_raleigh,
      audiences_finance_insurance_travel_destination_northamarica_us_oregon: this.audiences_finance_insurance_travel_destination_northamarica_us_oregon,
      audiences_finance_insurance_travel_destination_northamarica_us_oregon_portland: this.audiences_finance_insurance_travel_destination_northamarica_us_oregon_portland,
      audiences_finance_insurance_travel_destination_northamarica_us_pennsy: this.audiences_finance_insurance_travel_destination_northamarica_us_pennsy,
      audiences_finance_insurance_travel_destination_northamarica_us_pensy_phila: this.audiences_finance_insurance_travel_destination_northamarica_us_pensy_phila,
      audiences_finance_insurance_travel_destination_northamarica_us_texas: this.audiences_finance_insurance_travel_destination_northamarica_us_texas,
      audiences_finance_insurance_travel_destination_northamarica_us_texas_dallas: this.audiences_finance_insurance_travel_destination_northamarica_us_texas_dallas,
      audiences_finance_insurance_travel_destination_northamarica_us_utah: this.audiences_finance_insurance_travel_destination_northamarica_us_utah,
      audiences_finance_insurance_travel_destination_northamarica_us_utah_saltlake: this.audiences_finance_insurance_travel_destination_northamarica_us_utah_saltlake,
      audiences_finance_insurance_travel_destination_northamarica_us_virginia: this.audiences_finance_insurance_travel_destination_northamarica_us_virginia,
      audiences_finance_insurance_travel_destination_northamarica_us_washington: this.audiences_finance_insurance_travel_destination_northamarica_us_washington,
      audiences_finance_insurance_travel_destination_northamarica_us_washington_seattle: this.audiences_finance_insurance_travel_destination_northamarica_us_washington_seattle,
      audiences_finance_insurance_travel_destination_northamarica_us_washingtondc: this.audiences_finance_insurance_travel_destination_northamarica_us_washingtondc,
      audiences_finance_insurance_travel_destination_oceania: this.audiences_finance_insurance_travel_destination_oceania,
      audiences_finance_insurance_travel_destination_oceania_australia: this.audiences_finance_insurance_travel_destination_oceania_australia,
      audiences_finance_insurance_travel_destination_oceania_newzealand: this.audiences_finance_insurance_travel_destination_oceania_newzealand,
      audiences_finance_insurance_travel_europelastmnt: this.audiences_finance_insurance_travel_europelastmnt,
      audiences_finance_insurance_travel_hotel: this.audiences_finance_insurance_travel_hotel,
      audiences_finance_insurance_travel_hotel_midscale: this.audiences_finance_insurance_travel_hotel_midscale,
      audiences_finance_insurance_travel_hotel_upscale: this.audiences_finance_insurance_travel_hotel_upscale,
      audiences_finance_insurance_travel_onlinetravel: this.audiences_finance_insurance_travel_onlinetravel,
      audiences_finance_insurance_travel_rail: this.audiences_finance_insurance_travel_rail,
      audiences_finance_insurance_travel_vacations: this.audiences_finance_insurance_travel_vacations,
      audiences_finance_insurance_travel_vacations_beach: this.audiences_finance_insurance_travel_vacations_beach,
      audiences_finance_insurance_travel_vacations_family: this.audiences_finance_insurance_travel_vacations_family,
      audiences_finance_insurance_travel_vacations_honeymoon: this.audiences_finance_insurance_travel_vacations_honeymoon,
      audiences_finance_investment: this.audiences_finance_investment,
      audiences_finance_investment_commodities: this.audiences_finance_investment_commodities,
      audiences_finance_investment_currency: this.audiences_finance_investment_currency,
      audiences_finance_investment_discount: this.audiences_finance_investment_discount,
      audiences_finance_investment_fullsc: this.audiences_finance_investment_fullsc,
      audiences_finance_investment_bau: this.audiences_finance_investment_bau,
      audiences_finance_investment_mutualfunds: this.audiences_finance_investment_mutualfunds,
      audiences_finance_investment_mutualfunds_etf: this.audiences_finance_investment_mutualfunds_etf,
      audiences_finance_investment_options: this.audiences_finance_investment_options,
      audiences_finance_loans: this.audiences_finance_loans,
      audiences_finance_loans_buisness: this.audiences_finance_loans_buisness,
      audiences_finance_loans_personal: this.audiences_finance_loans_personal,
      audiences_finance_loans_mortgage: this.audiences_finance_loans_mortgage,
      audiences_finance_loans_mortgage_home: this.audiences_finance_loans_mortgage_home,
      audiences_finance_loans_mortgage_new: this.audiences_finance_loans_mortgage_new,
      audiences_finance_loans_mortgage_refinance: this.audiences_finance_loans_mortgage_refinance,
      audiences_finance_onlinepay: this.audiences_finance_onlinepay,
      audiences_finance_reales: this.audiences_finance_reales,
      audiences_finance_reales_commercial: this.audiences_finance_reales_commercial,
      audiences_finance_reales_purchase: this.audiences_finance_reales_purchase,
      audiences_finance_reales_rental: this.audiences_finance_reales_rental,
      audiences_finance_rplaning: this.audiences_finance_rplaning,
      audiences_finance_tax: this.audiences_finance_tax,
      audiences_healthpharma: this.audiences_healthpharma,
      audiences_healthpharma_bones: this.audiences_healthpharma_bones,
      audiences_healthpharma_bones_arthritis: this.audiences_healthpharma_bones_arthritis,
      audiences_healthpharma_bones_arthritis_osteo: this.audiences_healthpharma_bones_arthritis_osteo,
      audiences_healthpharma_bones_osteop: this.audiences_healthpharma_bones_osteop,
      audiences_healthpharma_bones_pain: this.audiences_healthpharma_bones_pain,
      audiences_healthpharma_circulatory: this.audiences_healthpharma_circulatory,
      audiences_healthpharma_circulatory_cardio: this.audiences_healthpharma_circulatory_cardio,
      audiences_healthpharma_circulatory_choles: this.audiences_healthpharma_circulatory_choles,
      audiences_healthpharma_circulatory_hyper: this.audiences_healthpharma_circulatory_hyper,
      audiences_healthpharma_circulatory_heart: this.audiences_healthpharma_circulatory_heart,
      audiences_healthpharma_circulatory_stroke: this.audiences_healthpharma_circulatory_stroke,
      audiences_healthpharma_dental: this.audiences_healthpharma_dental,
      audiences_healthpharma_diges: this.audiences_healthpharma_diges,
      audiences_healthpharma_diges_gerd: this.audiences_healthpharma_diges_gerd,
      audiences_healthpharma_endo: this.audiences_healthpharma_endo,
      audiences_healthpharma_endo_dia: this.audiences_healthpharma_endo_dia,
      audiences_healthpharma_infant: this.audiences_healthpharma_infant,
      audiences_healthpharma_infections: this.audiences_healthpharma_infections,
      audiences_healthpharma_infections_foot: this.audiences_healthpharma_infections_foot,
      audiences_healthpharma_nervous: this.audiences_healthpharma_nervous,
      audiences_healthpharma_nervous_alzhe: this.audiences_healthpharma_nervous_alzhe,
      audiences_healthpharma_nervous_headaches: this.audiences_healthpharma_nervous_headaches,
      audiences_healthpharma_nervous_vision: this.audiences_healthpharma_nervous_vision,
      audiences_healthpharma_pregnancy: this.audiences_healthpharma_pregnancy,
      audiences_healthpharma_respi: this.audiences_healthpharma_respi,
      audiences_healthpharma_respi_allergies: this.audiences_healthpharma_respi_allergies,
      audiences_healthpharma_respi_asthma: this.audiences_healthpharma_respi_asthma,
      audiences_healthpharma_respi_cold: this.audiences_healthpharma_respi_cold,
      audiences_healthpharma_skin: this.audiences_healthpharma_skin,
      audiences_healthpharma_sleep: this.audiences_healthpharma_sleep,
      audiences_healthpharma_wellness: this.audiences_healthpharma_wellness,
      audiences_healthpharma_wellness_exercise: this.audiences_healthpharma_wellness_exercise,
      audiences_healthpharma_wellness_smoking: this.audiences_healthpharma_wellness_smoking,
      audiences_healthpharma_wellness_weight: this.audiences_healthpharma_wellness_weight,
      audiences_healthpharma_womenhealth: this.audiences_healthpharma_womenhealth,
      audiences_healthpharma_womenhealth_meno: this.audiences_healthpharma_womenhealth_meno,
      audiences_internationalinterest: this.audiences_internationalinterest,
      audiences_internationalinterest_avtars: this.audiences_internationalinterest_avtars,
      audiences_internationalinterest_hispanic: this.audiences_internationalinterest_hispanic,
      audiences_internationalinterest_hispanic_inferred: this.audiences_internationalinterest_hispanic_inferred,
      audiences_internationalinterest_indiainterest: this.audiences_internationalinterest_indiainterest,
      audiences_internationalinterest_languagec: this.audiences_internationalinterest_languagec,
      audiences_internationalinterest_languagej: this.audiences_internationalinterest_languagej,
      audiences_internationalinterest_languagek: this.audiences_internationalinterest_languagek,
      audiences_issues: this.audiences_issues,
      audiences_issues_charity: this.audiences_issues_charity,
      audiences_issues_education: this.audiences_issues_education,
      audiences_issues_education_college: this.audiences_issues_education_college,
      audiences_issues_education_adult: this.audiences_issues_education_adult,
      audiences_issues_education_adult_computer: this.audiences_issues_education_adult_computer,
      audiences_issues_education_foreign: this.audiences_issues_education_foreign,
      audiences_issues_education_foreign_english: this.audiences_issues_education_foreign_english,
      audiences_issues_education_kto12: this.audiences_issues_education_kto12,
      audiences_issues_energy: this.audiences_issues_energy,
      audiences_issues_envio: this.audiences_issues_envio,
      audiences_issues_affairs: this.audiences_issues_affairs,
      audiences_issues_govtreform: this.audiences_issues_govtreform,
      audiences_issues_green: this.audiences_issues_green,
      audiences_issues_healthcare: this.audiences_issues_healthcare,
      audiences_issues_healthcare_nursing: this.audiences_issues_healthcare_nursing,
      audiences_issues_homeland: this.audiences_issues_homeland,
      audiences_issues_jobs: this.audiences_issues_jobs,
      audiences_issues_social: this.audiences_issues_social,
      audiences_issues_taxes: this.audiences_issues_taxes,
      audiences_lifestages: this.audiences_lifestages,
      audiences_lifestages_moving: this.audiences_lifestages_moving,
      audiences_lifestages_parenting: this.audiences_lifestages_parenting,
      audiences_lifestages_parenting_baby: this.audiences_lifestages_parenting_baby,
      audiences_lifestages_seniors: this.audiences_lifestages_seniors,
      audiences_lifestages_teen: this.audiences_lifestages_teen,
      audiences_lifestages_wedding: this.audiences_lifestages_wedding,
      audiences_lifestages_women: this.audiences_lifestages_women,
      audiences_misce: this.audiences_misce,
      audiences_misce_arts: this.audiences_misce_arts,
      audiences_misce_aviation: this.audiences_misce_aviation,
      audiences_misce_gas: this.audiences_misce_gas,
      audiences_misce_military: this.audiences_misce_military,
      audiences_misce_hobbies: this.audiences_misce_hobbies,
      audiences_misce_hobbies_photo: this.audiences_misce_hobbies_photo,
      audiences_misce_holidays: this.audiences_misce_holidays,
      audiences_misce_holidays_back: this.audiences_misce_holidays_back,
      audiences_misce_holidays_fathers: this.audiences_misce_holidays_fathers,
      audiences_misce_holidays_halloween: this.audiences_misce_holidays_halloween,
      audiences_misce_holidays_mothers: this.audiences_misce_holidays_mothers,
      audiences_misce_holidays_spring: this.audiences_misce_holidays_spring,
      audiences_misce_holidays_valen: this.audiences_misce_holidays_valen,
      audiences_misce_holidays_winter: this.audiences_misce_holidays_winter,
      audiences_misce_law: this.audiences_misce_law,
      audiences_misce_law_class: this.audiences_misce_law_class,
      audiences_misce_law_injury: this.audiences_misce_law_injury,
      audiences_misce_news: this.audiences_misce_news,
      audiences_misce_news_finance: this.audiences_misce_news_finance,
      audiences_misce_poeple: this.audiences_misce_poeple,
      audiences_misce_poeple_actors: this.audiences_misce_poeple_actors,
      audiences_misce_poeple_athletes: this.audiences_misce_poeple_athletes,
      audiences_misce_poeple_models: this.audiences_misce_poeple_models,
      audiences_misce_reference: this.audiences_misce_reference,
      audiences_misce_religion: this.audiences_misce_religion,
      audiences_misce_religion_astro: this.audiences_misce_religion_astro,
      audiences_misce_science: this.audiences_misce_science,
      audiences_misce_weather: this.audiences_misce_weather,
      audiences_politics: this.audiences_politics,
      audiences_retail: this.audiences_retail,
      audiences_retail_apparel: this.audiences_retail_apparel,
      audiences_retail_apparel_wear: this.audiences_retail_apparel_wear,
      audiences_retail_apparel_fashion: this.audiences_retail_apparel_fashion,
      audiences_retail_apparel_footwear: this.audiences_retail_apparel_footwear,
      audiences_retail_apparel_intimate: this.audiences_retail_apparel_intimate,
      audiences_retail_apparel_watch: this.audiences_retail_apparel_watch,
      audiences_retail_apparel_womens: this.audiences_retail_apparel_womens,
      audiences_retail_auctions: this.audiences_retail_auctions,
      audiences_retail_books: this.audiences_retail_books,
      audiences_retail_etailer: this.audiences_retail_etailer,
      audiences_retail_etailer_amazon: this.audiences_retail_etailer_amazon,
      audiences_retail_etailer_ebay: this.audiences_retail_etailer_ebay,
      audiences_retail_merchandise: this.audiences_retail_merchandise,
      audiences_retail_merchandise_discounter: this.audiences_retail_merchandise_discounter,
      audiences_retail_merchandise_premium: this.audiences_retail_merchandise_premium,
      audiences_retail_gifts: this.audiences_retail_gifts,
      audiences_retail_gifts_flowers: this.audiences_retail_gifts_flowers,
      audiences_retail_gifts_food: this.audiences_retail_gifts_food,
      audiences_retail_gifts_cards: this.audiences_retail_gifts_cards,
      audiences_retail_home: this.audiences_retail_home,
      audiences_retail_home_appliances: this.audiences_retail_home_appliances,
      audiences_retail_home_bed: this.audiences_retail_home_bed,
      audiences_retail_home_cleaning: this.audiences_retail_home_cleaning,
      audiences_retail_home_furniture: this.audiences_retail_home_furniture,
      audiences_retail_home_garden: this.audiences_retail_home_garden,
      audiences_retail_home_housewares: this.audiences_retail_home_housewares,
      audiences_retail_home_improve: this.audiences_retail_home_improve,
      audiences_retail_home_improve_kitchen: this.audiences_retail_home_improve_kitchen,
      audiences_retail_home_improve_tools: this.audiences_retail_home_improve_tools,
      audiences_retail_goods: this.audiences_retail_goods,
      audiences_retail_goods_beauty: this.audiences_retail_goods_beauty,
      audiences_retail_goods_food: this.audiences_retail_goods_food,
      audiences_retail_resturents: this.audiences_retail_resturents,
      audiences_retail_resturents_fastfood: this.audiences_retail_resturents_fastfood,
      audiences_retail_retailers: this.audiences_retail_retailers,
      audiences_retail_retailers_dshoes: this.audiences_retail_retailers_dshoes,
      audiences_retail_retailers_dshoes_jc: this.audiences_retail_retailers_dshoes_jc,
      audiences_retail_retailers_dshoes_kohls: this.audiences_retail_retailers_dshoes_kohls,
      audiences_retail_retailers_dshoes_macys: this.audiences_retail_retailers_dshoes_macys,
      audiences_retail_retailers_dshoes_sears: this.audiences_retail_retailers_dshoes_sears,
      audiences_retail_retailers_electronics: this.audiences_retail_retailers_electronics,
      audiences_retail_retailers_electronics_bestbuy: this.audiences_retail_retailers_electronics_bestbuy,
      audiences_retail_retailers_electronics_city: this.audiences_retail_retailers_electronics_city,
      audiences_retail_retailers_electronics_radio: this.audiences_retail_retailers_electronics_radio,
      audiences_retail_retailers_homeimp: this.audiences_retail_retailers_homeimp,
      audiences_retail_retailers_homeimp_depot: this.audiences_retail_retailers_homeimp_depot,
      audiences_retail_retailers_homeimp_lowes: this.audiences_retail_retailers_homeimp_lowes,
      audiences_retail_retailers_massmerchants: this.audiences_retail_retailers_massmerchants,
      audiences_retail_retailers_massmerchants_kmart: this.audiences_retail_retailers_massmerchants_kmart,
      audiences_retail_retailers_massmerchants_target: this.audiences_retail_retailers_massmerchants_target,
      audiences_retail_retailers_massmerchants_walmart: this.audiences_retail_retailers_massmerchants_walmart,
      audiences_retail_retailers_officesupply: this.audiences_retail_retailers_officesupply,
      audiences_retail_retailers_officesupply_staples: this.audiences_retail_retailers_officesupply_staples,
      audiences_retail_retailers_apparel: this.audiences_retail_retailers_apparel,
      audiences_retail_retailers_apparel_gap: this.audiences_retail_retailers_apparel_gap,
      audiences_retail_retailers_apparel_navy: this.audiences_retail_retailers_apparel_navy,
      audiences_retail_retailers_apparel_victorias: this.audiences_retail_retailers_apparel_victorias,
      audiences_retail_retailers_clubs: this.audiences_retail_retailers_clubs,
      audiences_retail_retailers_clubs_costco: this.audiences_retail_retailers_clubs_costco,
      audiences_retail_retailers_clubs_same: this.audiences_retail_retailers_clubs_same,
      audiences_retail_toys: this.audiences_retail_toys,
      audiences_buisness: this.audiences_buisness,
      audiences_buisness_b2b: this.audiences_buisness_b2b,
      audiences_buisness_b2b_corp: this.audiences_buisness_b2b_corp,
      audiences_buisness_b2b_corp_human: this.audiences_buisness_b2b_corp_human,
      audiences_buisness_b2b_corp_human_recruit: this.audiences_buisness_b2b_corp_human_recruit,
      audiences_buisness_b2b_corp_human_recruit_technology: this.audiences_buisness_b2b_corp_human_recruit_technology,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_desktops: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_desktops,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_networking: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_networking,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_notebooks: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_notebooks,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_monitors: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_monitors,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_printers: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_printers,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_storaged: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_peri_storaged,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compservices: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compservices,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware_productivity: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware_productivity,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware_security: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compsoftware_security,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio_mp3: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_audio_mp3,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart_navi: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_cart_navi,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular_sphones: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_communication_mobile_cellular_sphones,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_digicam: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_digicam,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_pdas: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_pdas,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo_cam: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo_cam,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo_vh: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_compelec_homevideo_vh,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetnewmedia: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetnewmedia,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_domain: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_domain,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_chat: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_chat,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_email: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_email,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_messenger: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_messenger,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_photos: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_community_photos,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_webhosting: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_internetservices_webhosting,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware_servers: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_ithardware_servers,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_backup: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_backup,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_databases: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_databases,
      audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_developers: this.audiences_buisness_b2b_corp_human_recruit_technology_comphardware_itsoftware_developers,
      audiences_buisness_employment: this.audiences_buisness_employment,
      audiences_buisness_employment_account: this.audiences_buisness_employment_account,
      audiences_buisness_employment_account_bank: this.audiences_buisness_employment_account_bank,
      audiences_buisness_employment_advertise: this.audiences_buisness_employment_advertise,
      audiences_buisness_employment_arts: this.audiences_buisness_employment_arts,
      audiences_buisness_employment_adminstrative: this.audiences_buisness_employment_adminstrative,
      audiences_buisness_employment_facilities: this.audiences_buisness_employment_facilities,
      audiences_buisness_employment_customer: this.audiences_buisness_employment_customer,
      audiences_buisness_employment_education: this.audiences_buisness_employment_education,
      audiences_buisness_employment_engineering: this.audiences_buisness_employment_engineering,
      audiences_buisness_employment_travel: this.audiences_buisness_employment_travel,
      audiences_buisness_employment_law: this.audiences_buisness_employment_law,
      audiences_buisness_employment_legal: this.audiences_buisness_employment_legal,
      audiences_buisness_employment_management: this.audiences_buisness_employment_management,
      audiences_buisness_employment_operations: this.audiences_buisness_employment_operations,
      audiences_buisness_employment_marketing: this.audiences_buisness_employment_marketing,
      audiences_buisness_employment_work: this.audiences_buisness_employment_work,
      audiences_buisness_employment_biotech: this.audiences_buisness_employment_biotech,
      audiences_buisness_employment_food: this.audiences_buisness_employment_food,
      audiences_buisness_employment_sales: this.audiences_buisness_employment_sales,
      audiences_buisness_employment_tele: this.audiences_buisness_employment_tele,
      audiences_buisness_employment_tele_cable: this.audiences_buisness_employment_tele_cable,
      audiences_buisness_employment_tele_wireless: this.audiences_buisness_employment_tele_wireless,
      audiences_buisness_employment_tele_access: this.audiences_buisness_employment_tele_access,
      audiences_buisness_employment_tele_local: this.audiences_buisness_employment_tele_local,
      audiences_buisness_employment_tele_long: this.audiences_buisness_employment_tele_long,
      audiences_buisness_employment_tele_multi: this.audiences_buisness_employment_tele_multi,
      audiences_buisness_employment_tele_satellite: this.audiences_buisness_employment_tele_satellite,
      audiences_buisness_employment_trans: this.audiences_buisness_employment_trans,
      audiences_buisness_small: this.audiences_buisness_small,
      audiences_buisness_small_services: this.audiences_buisness_small_services,
      audiences_buisness_truck: this.audiences_buisness_truck,
      intent_geotargeting: this.intent_geotargeting,
      intent_geofencing: this.intent_geofencing,
      intent_audiencetype: this.intent_audiencetype,
      reach_geotargeting: this.reach_geotargeting,
      reach_geofencing: this.reach_geofencing,
      reach_audiencemirror: this.reach_audiencemirror
    };

      console.log('data object values-> ');
      console.log(data);
      console.log('audiences_automative_fuel  '+this.audiences_automative_fuel);
      for (let i in data) {
        if(typeof (data[i])!= 'undefined'){
          this.datareq[i]=data[i];
          data[i]=data[i];
        } else{
          this.datareq[i]='';
          data[i]='';
        }
      }
    //  console.log(this.datareq);

      this._http.post(link, data)
          .subscribe(res => {
            let result: any;
             result=res;
            console.log('result');
            console.log(result);
            if(result.status =='success') {
              this.addcookie.putObject('cookiedetails', result.id);    // Value of result.msg is inserted to userdetails
              this.cookiedetails = this.addcookie.getObject('cookiedetails');
              console.log('after putobject ');
              console.log(this.cookiedetails);
              this.router.navigate(['/basicinformation']);
            }
            else {
              this.error = result.status;
            }
          }, error => {
            console.log('Ooops');
          });
    }
    else {
      this.router.navigate(['/']);
    }
  }

}

