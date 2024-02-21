import { FormGroup } from '@angular/forms';

import { config } from '../../../shared/config';
import { ObjectBase } from '../../../core/object-base';
import { LoginService } from '../auth/login/login.service';
import { from } from 'rxjs';

export class Hotel extends ObjectBase {

  protected defaultPlace =   {
    "id": "New York",
    "city": "New York",
    "state": "NY",
    "country": "US",
    "value":"New York, NY, US",
    "data":"New York"
  };
  public numbers  = [1,2,3,4,5,6,7,8,9,10];
  public wholeNumbers  = [0,1,2,3,4,5,6,7,8,9,10];

  public countries = [
    {
      "countryCode": "US",
      "fullName": "United States"
    },
    {
      "countryCode": "AF",
      "fullName": "Afghanistan"
    },
    {
      "countryCode": "AL",
      "fullName": "Albania"
    },
    {
      "countryCode": "DZ",
      "fullName": "Algeria"
    },
    {
      "countryCode": "AX",
      "fullName": "Aland Islands"
    },
    {
      "countryCode": "AS",
      "fullName": "American Samoa"
    },
    {
      "countryCode": "AI",
      "fullName": "Anguilla"
    },
    {
      "countryCode": "AD",
      "fullName": "Andorra"
    },
    {
      "countryCode": "AO",
      "fullName": "Angola"
    },
    {
      "countryCode": "AN",
      "fullName": "Antilles - Netherlands"
    },
    {
      "countryCode": "AG",
      "fullName": "Antigua and Barbuda"
    },
    {
      "countryCode": "AQ",
      "fullName": "Antarctica"
    },
    {
      "countryCode": "AR",
      "fullName": "Argentina"
    },
    {
      "countryCode": "AM",
      "fullName": "Armenia"
    },
    {
      "countryCode": "AU",
      "fullName": "Australia"
    },
    {
      "countryCode": "AT",
      "fullName": "Austria"
    },
    {
      "countryCode": "AW",
      "fullName": "Aruba"
    },
    {
      "countryCode": "AZ",
      "fullName": "Azerbaijan"
    },
    {
      "countryCode": "BA",
      "fullName": "Bosnia and Herzegovina"
    },
    {
      "countryCode": "BB",
      "fullName": "Barbados"
    },
    {
      "countryCode": "BD",
      "fullName": "Bangladesh"
    },
    {
      "countryCode": "BE",
      "fullName": "Belgium"
    },
    {
      "countryCode": "BF",
      "fullName": "Burkina Faso"
    },
    {
      "countryCode": "BG",
      "fullName": "Bulgaria"
    },
    {
      "countryCode": "BH",
      "fullName": "Bahrain"
    },
    {
      "countryCode": "BI",
      "fullName": "Burundi"
    },
    {
      "countryCode": "BJ",
      "fullName": "Benin"
    },
    {
      "countryCode": "BM",
      "fullName": "Bermuda"
    },
    {
      "countryCode": "BN",
      "fullName": "Brunei Darussalam"
    },
    {
      "countryCode": "BO",
      "fullName": "Bolivia"
    },
    {
      "countryCode": "BR",
      "fullName": "Brazil"
    },
    {
      "countryCode": "BS",
      "fullName": "Bahamas"
    },
    {
      "countryCode": "BT",
      "fullName": "Bhutan"
    },
    {
      "countryCode": "BV",
      "fullName": "Bouvet Island"
    },
    {
      "countryCode": "BW",
      "fullName": "Botswana"
    },
    {
      "countryCode": "BV",
      "fullName": "Belarus"
    },
    {
      "countryCode": "BZ",
      "fullName": "Belize"
    },
    {
      "countryCode": "KH",
      "fullName": "Cambodia"
    },
    {
      "countryCode": "CM",
      "fullName": "Cameroon"
    },
    {
      "countryCode": "CA",
      "fullName": "Canada"
    },
    {
      "countryCode": "CV",
      "fullName": "Cape Verde"
    },
    {
      "countryCode": "CF",
      "fullName": "Central African Republic"
    },
    {
      "countryCode": "TD",
      "fullName": "Chad"
    },
    {
      "countryCode": "CL",
      "fullName": "Chile"
    },
    {
      "countryCode": "CN",
      "fullName": "China"
    },
    {
      "countryCode": "CX",
      "fullName": "Christmas Island"
    },
    {
      "countryCode": "CC",
      "fullName": "Cocos (Keeling) Islands"
    },
    {
      "countryCode": "CO",
      "fullName": "Colombia"
    },
    {
      "countryCode": "CG",
      "fullName": "Congo"
    },
    {
      "countryCode": "CI",
      "fullName": "Cote D'Ivoire (Ivory Coast)"
    },
    {
      "countryCode": "CK",
      "fullName": "Cook Islands"
    },
    {
      "countryCode": "CR",
      "fullName": "Costa Rica"
    },
    {
      "countryCode": "HR",
      "fullName": "Croatia (Hrvatska)"
    },
    {
      "countryCode": "CU",
      "fullName": "Cuba"
    },
    {
      "countryCode": "CY",
      "fullName": "Cyprus"
    },
    {
      "countryCode": "CZ",
      "fullName": "Czech Republic"
    },
    {
      "countryCode": "CD",
      "fullName": "Democratic Republic of the Congo"
    },
    {
      "countryCode": "DJ",
      "fullName": "Djibouti"
    },
    {
      "countryCode": "DK",
      "fullName": "Denmark"
    },
    {
      "countryCode": "DM",
      "fullName": "Dominica"
    },
    {
      "countryCode": "DO",
      "fullName": "Dominican Republic"
    },
    {
      "countryCode": "EC",
      "fullName": "Ecuador"
    },
    {
      "countryCode": "EG",
      "fullName": "Egypt"
    },
    {
      "countryCode": "SV",
      "fullName": "El Salvador"
    },
    {
      "countryCode": "TP",
      "fullName": "East Timor"
    },
    {
      "countryCode": "EE",
      "fullName": "Estonia"
    },
    {
      "countryCode": "GQ",
      "fullName": "Equatorial Guinea"
    },
    {
      "countryCode": "ER",
      "fullName": "Eritrea"
    },
    {
      "countryCode": "ET",
      "fullName": "Ethiopia"
    },
    {
      "countryCode": "FI",
      "fullName": "Finland"
    },
    {
      "countryCode": "FJ",
      "fullName": "Fiji"
    },
    {
      "countryCode": "FK",
      "fullName": "Falkland Islands (Malvinas)"
    },
    {
      "countryCode": "FM",
      "fullName": "Federated States of Micronesia"
    },
    {
      "countryCode": "FO",
      "fullName": "Faroe Islands"
    },
    {
      "countryCode": "FR",
      "fullName": "France"
    },
    {
      "countryCode": "FX",
      "fullName": "France, Metropolitan"
    },
    {
      "countryCode": "GF",
      "fullName": "French Guiana"
    },
    {
      "countryCode": "PF",
      "fullName": "French Polynesia"
    },
    {
      "countryCode": "GA",
      "fullName": "Gabon"
    },
    {
      "countryCode": "GM",
      "fullName": "Gambia"
    },
    {
      "countryCode": "DE",
      "fullName": "Germany"
    },
    {
      "countryCode": "GH",
      "fullName": "Ghana"
    },
    {
      "countryCode": "GI",
      "fullName": "Gibraltar"
    },
    {
      "countryCode": "GB",
      "fullName": "Great Britain (UK)"
    },
    {
      "countryCode": "GD",
      "fullName": "Grenada"
    },
    {
      "countryCode": "GE",
      "fullName": "Georgia"
    },
    {
      "countryCode": "GR",
      "fullName": "Greece"
    },
    {
      "countryCode": "GL",
      "fullName": "Greenland"
    },
    {
      "countryCode": "GN",
      "fullName": "Guinea"
    },
    {
      "countryCode": "GP",
      "fullName": "Guadeloupe"
    },
    {
      "countryCode": "GS",
      "fullName": "S. Georgia and S. Sandwich Islands"
    },
    {
      "countryCode": "GT",
      "fullName": "Guatemala"
    },
    {
      "countryCode": "GU",
      "fullName": "Guam"
    },
    {
      "countryCode": "GW",
      "fullName": "Guinea-Bissau"
    },
    {
      "countryCode": "GY",
      "fullName": "Guyana"
    },
    {
      "countryCode": "HK",
      "fullName": "Hong Kong"
    },
    {
      "countryCode": "HM",
      "fullName": "Heard Island and McDonald Islands"
    },
    {
      "countryCode": "HN",
      "fullName": "Honduras"
    },
    {
      "countryCode": "HT",
      "fullName": "Haiti"
    },
    {
      "countryCode": "HU",
      "fullName": "Hungary"
    },
    {
      "countryCode": "ID",
      "fullName": "Indonesia"
    },
    {
      "countryCode": "IE",
      "fullName": "Ireland"
    },
    {
      "countryCode": "IL",
      "fullName": "Israel"
    },
    {
      "countryCode": "IN",
      "fullName": "India"
    },
    {
      "countryCode": "IO",
      "fullName": "British Indian Ocean Territory"
    },
    {
      "countryCode": "IQ",
      "fullName": "Iraq"
    },
    {
      "countryCode": "IR",
      "fullName": "Iran"
    },
    {
      "countryCode": "IT",
      "fullName": "Italy"
    },
    {
      "countryCode": "JM",
      "fullName": "Jamaica"
    },
    {
      "countryCode": "JO",
      "fullName": "Jordan"
    },
    {
      "countryCode": "JP",
      "fullName": "Japan"
    },
    {
      "countryCode": "KE",
      "fullName": "Kenya"
    },
    {
      "countryCode": "KG",
      "fullName": "Kyrgyzstan"
    },
    {
      "countryCode": "KI",
      "fullName": "Kiribati"
    },
    {
      "countryCode": "KM",
      "fullName": "Comoros"
    },
    {
      "countryCode": "KN",
      "fullName": "Saint Kitts and Nevis"
    },
    {
      "countryCode": "KP",
      "fullName": "Korea (North)"
    },
    {
      "countryCode": "KR",
      "fullName": "Korea (South)"
    },
    {
      "countryCode": "KW",
      "fullName": "Kuwait"
    },
    {
      "countryCode": "KY",
      "fullName": "Cayman Islands"
    },
    {
      "countryCode": "KZ",
      "fullName": "Kazakhstan"
    },
    {
      "countryCode": "LA",
      "fullName": "Laos"
    },
    {
      "countryCode": "LB",
      "fullName": "Lebanon"
    },
    {
      "countryCode": "LC",
      "fullName": "Saint Lucia"
    },
    {
      "countryCode": "LI",
      "fullName": "Liechtenstein"
    },
    {
      "countryCode": "LK",
      "fullName": "Sri Lanka"
    },
    {
      "countryCode": "LR",
      "fullName": "Liberia"
    },
    {
      "countryCode": "LS",
      "fullName": "Lesotho"
    },
    {
      "countryCode": "LT",
      "fullName": "Lithuania"
    },
    {
      "countryCode": "LU",
      "fullName": "Luxembourg"
    },
    {
      "countryCode": "LV",
      "fullName": "Latvia"
    },
    {
      "countryCode": "LY",
      "fullName": "Libya"
    },
    {
      "countryCode": "MK",
      "fullName": "Macedonia"
    },
    {
      "countryCode": "MO",
      "fullName": "Macao"
    },
    {
      "countryCode": "MG",
      "fullName": "Madagascar"
    },
    {
      "countryCode": "MY",
      "fullName": "Malaysia"
    },
    {
      "countryCode": "ML",
      "fullName": "Mali"
    },
    {
      "countryCode": "MW",
      "fullName": "Malawi"
    },
    {
      "countryCode": "MR",
      "fullName": "Mauritania"
    },
    {
      "countryCode": "MH",
      "fullName": "Marshall Islands"
    },
    {
      "countryCode": "MQ",
      "fullName": "Martinique"
    },
    {
      "countryCode": "MU",
      "fullName": "Mauritius"
    },
    {
      "countryCode": "YT",
      "fullName": "Mayotte"
    },
    {
      "countryCode": "MT",
      "fullName": "Malta"
    },
    {
      "countryCode": "MX",
      "fullName": "Mexico"
    },
    {
      "countryCode": "MA",
      "fullName": "Morocco"
    },
    {
      "countryCode": "MC",
      "fullName": "Monaco"
    },
    {
      "countryCode": "MD",
      "fullName": "Moldova"
    },
    {
      "countryCode": "MN",
      "fullName": "Mongolia"
    },
    {
      "countryCode": "MM",
      "fullName": "Myanmar"
    },
    {
      "countryCode": "MP",
      "fullName": "Northern Mariana Islands"
    },
    {
      "countryCode": "MS",
      "fullName": "Montserrat"
    },
    {
      "countryCode": "MV",
      "fullName": "Maldives"
    },
    {
      "countryCode": "MZ",
      "fullName": "Mozambique"
    },
    {
      "countryCode": "NA",
      "fullName": "Namibia"
    },
    {
      "countryCode": "NC",
      "fullName": "New Caledonia"
    },
    {
      "countryCode": "NE",
      "fullName": "Niger"
    },
    {
      "countryCode": "NF",
      "fullName": "Norfolk Island"
    },
    {
      "countryCode": "NG",
      "fullName": "Nigeria"
    },
    {
      "countryCode": "NI",
      "fullName": "Nicaragua"
    },
    {
      "countryCode": "NL",
      "fullName": "Netherlands"
    },
    {
      "countryCode": "NO",
      "fullName": "Norway"
    },
    {
      "countryCode": "NP",
      "fullName": "Nepal"
    },
    {
      "countryCode": "NR",
      "fullName": "Nauru"
    },
    {
      "countryCode": "NU",
      "fullName": "Niue"
    },
    {
      "countryCode": "NZ",
      "fullName": "New Zealand (Aotearoa)"
    },
    {
      "countryCode": "OM",
      "fullName": "Oman"
    },
    {
      "countryCode": "PA",
      "fullName": "Panama"
    },
    {
      "countryCode": "PE",
      "fullName": "Peru"
    },
    {
      "countryCode": "PG",
      "fullName": "Papua New Guinea"
    },
    {
      "countryCode": "PH",
      "fullName": "Philippines"
    },
    {
      "countryCode": "PK",
      "fullName": "Pakistan"
    },
    {
      "countryCode": "PL",
      "fullName": "Poland"
    },
    {
      "countryCode": "PM",
      "fullName": "Saint Pierre and Miquelon"
    },
    {
      "countryCode": "CS",
      "fullName": "Serbia and Montenegro"
    },
    {
      "countryCode": "PN",
      "fullName": "Pitcairn"
    },
    {
      "countryCode": "PR",
      "fullName": "Puerto Rico"
    },
    {
      "countryCode": "PS",
      "fullName": "Palestinian Territory"
    },
    {
      "countryCode": "PT",
      "fullName": "Portugal"
    },
    {
      "countryCode": "PW",
      "fullName": "Palau"
    },
    {
      "countryCode": "PY",
      "fullName": "Paraguay"
    },
    {
      "countryCode": "QA",
      "fullName": "Qatar"
    },
    {
      "countryCode": "RE",
      "fullName": "Reunion"
    },
    {
      "countryCode": "RO",
      "fullName": "Romania"
    },
    {
      "countryCode": "RU",
      "fullName": "Russian Federation"
    },
    {
      "countryCode": "RW",
      "fullName": "Rwanda"
    },
    {
      "countryCode": "SA",
      "fullName": "Saudi Arabia"
    },
    {
      "countryCode": "WS",
      "fullName": "Samoa"
    },
    {
      "countryCode": "SH",
      "fullName": "Saint Helena"
    },
    {
      "countryCode": "VC",
      "fullName": "Saint Vincent and the Grenadines"
    },
    {
      "countryCode": "SM",
      "fullName": "San Marino"
    },
    {
      "countryCode": "ST",
      "fullName": "Sao Tome and Principe"
    },
    {
      "countryCode": "SN",
      "fullName": "Senegal"
    },
    {
      "countryCode": "SC",
      "fullName": "Seychelles"
    },
    {
      "countryCode": "SL",
      "fullName": "Sierra Leone"
    },
    {
      "countryCode": "SG",
      "fullName": "Singapore"
    },
    {
      "countryCode": "SK",
      "fullName": "Slovakia"
    },
    {
      "countryCode": "SI",
      "fullName": "Slovenia"
    },
    {
      "countryCode": "SB",
      "fullName": "Solomon Islands"
    },
    {
      "countryCode": "SO",
      "fullName": "Somalia"
    },
    {
      "countryCode": "ZA",
      "fullName": "South Africa"
    },
    {
      "countryCode": "ES",
      "fullName": "Spain"
    },
    {
      "countryCode": "SD",
      "fullName": "Sudan"
    },
    {
      "countryCode": "SR",
      "fullName": "Suriname"
    },
    {
      "countryCode": "SJ",
      "fullName": "Svalbard and Jan Mayen"
    },
    {
      "countryCode": "SE",
      "fullName": "Sweden"
    },
    {
      "countryCode": "CH",
      "fullName": "Switzerland"
    },
    {
      "countryCode": "SY",
      "fullName": "Syria"
    },
    {
      "countryCode": "SU",
      "fullName": "USSR (former)"
    },
    {
      "countryCode": "SZ",
      "fullName": "Swaziland"
    },
    {
      "countryCode": "TW",
      "fullName": "Taiwan"
    },
    {
      "countryCode": "TZ",
      "fullName": "Tanzania"
    },
    {
      "countryCode": "TJ",
      "fullName": "Tajikistan"
    },
    {
      "countryCode": "TH",
      "fullName": "Thailand"
    },
    {
      "countryCode": "TL",
      "fullName": "Timor-Leste"
    },
    {
      "countryCode": "TG",
      "fullName": "Togo"
    },
    {
      "countryCode": "TK",
      "fullName": "Tokelau"
    },
    {
      "countryCode": "TO",
      "fullName": "Tonga"
    },
    {
      "countryCode": "TT",
      "fullName": "Trinidad and Tobago"
    },
    {
      "countryCode": "TN",
      "fullName": "Tunisia"
    },
    {
      "countryCode": "TR",
      "fullName": "Turkey"
    },
    {
      "countryCode": "TM",
      "fullName": "Turkmenistan"
    },
    {
      "countryCode": "TC",
      "fullName": "Turks and Caicos Islands"
    },
    {
      "countryCode": "TV",
      "fullName": "Tuvalu"
    },
    {
      "countryCode": "UA",
      "fullName": "Ukraine"
    },
    {
      "countryCode": "UG",
      "fullName": "Uganda"
    },
    {
      "countryCode": "AE",
      "fullName": "United Arab Emirates"
    },
    {
      "countryCode": "UK",
      "fullName": "United Kingdom"
    },
    
    {
      "countryCode": "UM",
      "fullName": "United States Minor Outlying Islands"
    },
    {
      "countryCode": "UY",
      "fullName": "Uruguay"
    },
    {
      "countryCode": "UZ",
      "fullName": "Uzbekistan"
    },
    {
      "countryCode": "VU",
      "fullName": "Vanuatu"
    },
    {
      "countryCode": "VA",
      "fullName": "Vatican City State"
    },
    {
      "countryCode": "VE",
      "fullName": "Venezuela"
    },
    {
      "countryCode": "VG",
      "fullName": "Virgin Islands (British)"
    },
    {
      "countryCode": "VI",
      "fullName": "Virgin Islands (U.S.)"
    },
    {
      "countryCode": "VN",
      "fullName": "Viet Nam"
    },
    {
      "countryCode": "WF",
      "fullName": "Wallis and Futuna"
    },
    {
      "countryCode": "EH",
      "fullName": "Western Sahara"
    },
    {
      "countryCode": "YE",
      "fullName": "Yemen"
    },
    {
      "countryCode": "YU",
      "fullName": "Yugoslavia (former)"
    },
    {
      "countryCode": "ZM",
      "fullName": "Zambia"
    },
    {
      "countryCode": "ZR",
      "fullName": "Zaire (former)"
    },
    {
      "countryCode": "ZW",
      "fullName": "Zimbabwe"
    }
  ];
//   public city = [
//     New York, "state:" New York"
// Los Angeles, "state:" California"
// Chicago, "state:" Illinois"
// Houston, "state:" Texas"14
// Philadelphia, "state:" Pennsylvania 1553165
// Phoenix, "state:" Arizona 1513367
// San Antonio, "state:" Texas 1409019
// San Diego, "state:" California 1355896
// Dallas, "state:" Texas 1257676
// San Jose, "state:" California 998537
// Austin, "state:" Texas"0
// Indianapolis, "state:" Indiana"3
// Jacksonville, "state:" Florida"3
// San Francisco, "state:" California"2
// Columbus, "state:" Ohio"3
// Charlotte, "state:" North Carolina 792862
// Fort Worth, "state:" Texas 792727
// Detroit, "state:" Michigan 688701
// El Paso, "state:" Texas 674433
// Memphis, "state:" Tennessee 653450
// Seattle, "state:" Washington 652405
// Denver, "state:" Colorado 649495
// Washington, "state:" District of Columbia 646449
// Boston, "state:" Massachusetts 645966
// Nashville-Davidson, "state:" Tennessee 634464
// Baltimore, "state:" Maryland 622104
// Oklahoma City, "state:" Oklahoma 610613
// Louisville/Jefferson County, "state:" Kentucky 609893
// Portland, "state:" Oregon 609456
// Las Vegas, "state:" Nevada 603488
// Milwaukee, "state:" Wisconsin 599164
// Albuquerque, "state:" New Mexico 556495
// Tucson, "state:" Arizona 526116
// Fresno, "state:" California 509924
// Sacramento, "state:" California"6
// Long Beach, "state:" California"8
// Kansas City, "state:" Missouri"7
// Mesa, "state:" Arizona"7
// Virginia Beach, "state:" Virginia"9
// Atlanta, "state:" Georgia"1
// Colorado Springs, "state:" Colorado"6
// Omaha, "state:" Nebraska"3
// Raleigh, "state:" North Carolina"6
// Miami, "state:" Florida"0
// Oakland, "state:" California"3
// Minneapolis, "state:" Minnesota"0
// Tulsa, "state:" Oklahoma"1
// Cleveland, "state:" Ohio"3
// Wichita, "state:" Kansas"2
// Arlington, "state:" Texas"7
// New Orleans, "state:" Louisiana"5
// Bakersfield, "state:" California"0
// Tampa, "state:" Florida"7
// Honolulu, "state:" Hawaii"4
// Aurora, "state:" Colorado"3
// Anaheim, "state:" California"2
// Santa Ana, "state:" California"7
// St. Louis, "state:" Missouri"6
// Riverside, "state:" California"9
// Corpus Christi, "state:" Texas"1
// Lexington-Fayette, "state:" Kentucky"8
// Pittsburgh, "state:" Pennsylvania"1
// Anchorage, "state:" Alaska"0
// Stockton, "state:" California"8
// Cincinnati, "state:" Ohio"7
// St. Paul, "state:" Minnesota"3
// Toledo, "state:" Ohio"3
// Greensboro, "state:" North Carolina"9
// Newark, "state:" New Jersey"7
// Plano, "state:" Texas"9
// Henderson, "state:" Nevada"1
// Lincoln, "state:" Nebraska"8
// Buffalo, "state:" New York"9
// Jersey City, "state:" New Jersey"2
// Chula Vista, "state:" California"0
// Fort Wayne, "state:" Indiana"6
// Orlando, "state:" Florida"3
// St. Petersburg, "state:" Florida"8
// Chandler, "state:" Arizona"6
// Laredo, "state:" Texas"2
// Norfolk, "state:" Virginia"9
// Durham, "state:" North Carolina"5
// Madison, "state:" Wisconsin"4
// Lubbock, "state:" Texas"8
// Irvine, "state:" California"6
// Winston-Salem, "state:" North Carolina"1
// Glendale, "state:" Arizona"2
// Garland, "state:" Texas"6
// Hialeah, "state:" Florida"4
// Reno, "state:" Nevada"4
// Chesapeake, "state:" Virginia"1
// Gilbert, "state:" Arizona"2
// Baton Rouge, "state:" Louisiana"6
// Irving, "state:" Texas"3
// Scottsdale, "state:" Arizona"8
// North Las Vegas, "state:" Nevada"7
// Fremont, "state:" California"2
// Boise City, "state:" Idaho"7
// Richmond, "state:" Virginia"4
// San Bernardino, "state:" California"8
// Birmingham, "state:" Alabama"3
// Spokane, "state:" Washington"1
// Rochester, "state:" New York"8
// Des Moines, "state:" Iowa"0
// Modesto, "state:" California"3
// Fayetteville, "state:" North Carolina"8
// Tacoma, "state:" Washington"6
// Oxnard, "state:" California"7
// Fontana, "state:" California"3
// Columbus, "state:" Georgia"4
// Montgomery, "state:" Alabama"2
// Moreno Valley, "state:" California"5
// Shreveport, "state:" Louisiana"7
// Aurora, "state:" Illinois 199963
// Yonkers, "state:" New York 199766
// Akron, "state:" Ohio 198100
// Huntington Beach, "state:" California 197575
// Little Rock, "state:" Arkansas 197357
// Augusta-Richmond County, "state:" Georgia 197350
// Amarillo, "state:" Texas 196429
// Glendale, "state:" California 196021
// Mobile, "state:" Alabama 194899
// Grand Rapids, "state:" Michigan 192294
// Salt Lake City, "state:" Utah 191180
// Tallahassee, "state:" Florida 186411
// Huntsville, "state:" Alabama 186254
// Grand Prairie, "state:" Texas 183372
// Knoxville, "state:" Tennessee 183270
// Worcester, "state:" Massachusetts 182544
// Newport News, "state:" Virginia 182020
// Brownsville, "state:" Texas 181860
// Overland Park, "state:" Kansas 181260
// Santa Clarita, "state:" California 179590
// Providence, "state:" Rhode Island 177994
// Garden Grove, "state:" California 175140
// Chattanooga, "state:" Tennessee 173366
// Oceanside, "state:" California 172794
// Jackson, "state:" Mississippi 172638
// Fort Lauderdale, "state:" Florida 172389
// Santa Rosa, "state:" California 171990
// Rancho Cucamonga, "state:" California 171386
// Port St. Lucie, "state:" Florida 171016
// Tempe, "state:" Arizona 168228
// Ontario, "state:" California 167500
// Vancouver, "state:" Washington 167405
// Cape Coral, "state:" Florida 165831
// Sioux Falls, "state:" South Dakota 164676
// Springfield, "state:" Missouri 164122
// Peoria, "state:" Arizona 162592
// Pembroke Pines, "state:" Florida 162329
// Elk Grove, "state:" California 161007
// Salem, "state:" Oregon 160614
// Lancaster, "state:" California 159523
// Corona, "state:" California 159503
// Eugene, "state:" Oregon 159190
// Palmdale, "state:" California 157161
// Salinas, "state:" California 155662
// Springfield, "state:" Massachusetts 153703
// Pasadena, "state:" Texas 152735
// Fort Collins, "state:" Colorado 152061
// Hayward, "state:" California 151574
// Pomona, "state:" California 151348
// Cary, "state:" North Carolina 151088
// Rockford, "state:" Illinois 150251
// Alexandria, "state:" Virginia 148892
// Escondido, "state:" California 148738
// McKinney, "state:" Texas 148559
// Kansas City, "state:" Kansas 148483
// Joliet, "state:" Illinois 147806
// Sunnyvale, "state:" California 147559
// Torrance, "state:" California 147478
// Bridgeport, "state:" Connecticut 147216
// Lakewood, "state:" Colorado 147214
// Hollywood, "state:" Florida 146526
// Paterson, "state:" New Jersey 145948
// Naperville, "state:" Illinois 144864
// Syracuse, "state:" New York 144669
// Mesquite, "state:" Texas 143484
// Dayton, "state:" Ohio 143355
// Savannah, "state:" Georgia 142772
// Clarksville, "state:" Tennessee 142357
// Orange, "state:" California 139969
// Pasadena, "state:" California 139731
// Fullerton, "state:" California 138981
// Killeen, "state:" Texas 137147
// Frisco, "state:" Texas 136791
// Hampton, "state:" Virginia 136699
// McAllen, "state:" Texas 136639
// Warren, "state:" Michigan 134873
// Bellevue, "state:" Washington 133992
// West Valley City, "state:" Utah 133579
// Columbia, "state:" South Carolina 133358
// Olathe, "state:" Kansas 131885
// Sterling Heights, "state:" Michigan 131224
// New Haven, "state:" Connecticut 130660
// Miramar, "state:" Florida 130288
// Waco, "state:" Texas 129030
// Thousand Oaks, "state:" California 128731
// Cedar Rapids, "state:" Iowa 128429
// Charleston, "state:" South Carolina 127999
// Visalia, "state:" California 127763
// Topeka, "state:" Kansas 127679
// Elizabeth, "state:" New Jersey 127558
// Gainesville, "state:" Florida 127488
// Thornton, "state:" Colorado 127359
// Roseville, "state:" California 127035
// Carrollton, "state:" Texas 126700
// Coral Springs, "state:" Florida 126604
// Stamford, "state:" Connecticut 126456
// Simi Valley, "state:" California 126181
// Concord, "state:" California 125880
// Hartford, "state:" Connecticut 125017
// Kent, "state:" Washington 124435
// Lafayette, "state:" Louisiana 124276
// Midland, "state:" Texas 123933
// Surprise, "state:" Arizona 123546
// Denton, "state:" Texas 123099
// Victorville, "state:" California 121096
// Evansville, "state:" Indiana 120310
// Santa Clara, "state:" California 120245
// Abilene, "state:" Texas 120099
// Athens-Clarke County, "state:" Georgia 119980
// Vallejo, "state:" California 118837
// Allentown, "state:" Pennsylvania 118577
// Norman, "state:" Oklahoma 118197
// Beaumont, "state:" Texas 117796
// Independence, "state:" Missouri 117240
// Murfreesboro, "state:" Tennessee 117044
// Ann Arbor, "state:" Michigan 117025
// Springfield, "state:" Illinois 117006
// Berkeley, "state:" California 116768
// Peoria, "state:" Illinois 116513
// Provo, "state:" Utah 116288
// El Monte, "state:" California 115708
// Columbia, "state:" Missouri 115276
// Lansing, "state:" Michigan 113972
// Fargo, "state:" North Dakota 113658
// Downey, "state:" California 113242
// Costa Mesa, "state:" California 112174
// Wilmington, "state:" North Carolina 112067
// Arvada, "state:" Colorado 111707
// Inglewood, "state:" California 111542
// Miami Gardens, "state:" Florida 111378
// Carlsbad, "state:" California 110972
// Westminster, "state:" Colorado 110945
// Rochester, "state:" Minnesota 110742
// Odessa, "state:" Texas 110720
// Manchester, "state:" New Hampshire 110378
// Elgin, "state:" Illinois 110145
// West Jordan, "state:" Utah 110077
// Round Rock, "state:" Texas 109821
// Clearwater, "state:" Florida 109703
// Waterbury, "state:" Connecticut 109676
// Gresham, "state:" Oregon 109397
// Fairfield, "state:" California 109320
// Billings, "state:" Montana 109059
// Lowell, "state:" Massachusetts 108861
// San Buenaventura (Ventura), "state:" California 108817
// Pueblo, "state:" Colorado 108249
// High Point, "state:" North Carolina 107741
// West Covina, "state:" California 107740
// Richmond, "state:" California 107571
// Murrieta, "state:" California 107479
// Cambridge, "state:" Massachusetts 107289
// Antioch, "state:" California 107100
// Temecula, "state:" California 106780
// Norwalk, "state:" California 106589
// Centennial, "state:" Colorado 106114
// Everett, "state:" Washington 105370
// Palm Bay, "state:" Florida 104898
// Wichita Falls, "state:" Texas 104898
// Green Bay, "state:" Wisconsin 104779
// Daly City, "state:" California 104739
// Burbank, "state:" California 104709
// Richardson, "state:" Texas 104475
// Pompano Beach, "state:" Florida 104410
// North Charleston, "state:" South Carolina 104054
// Broken Arrow, "state:" Oklahoma 103500
// Boulder, "state:" Colorado 103166
// West Palm Beach, "state:" Florida 102436
// Santa Maria, "state:" California 102216
// El Cajon, "state:" California 102211
// Davenport, "state:" Iowa 102157
// Rialto, "state:" California 101910
// Las Cruces, "state:" New Mexico 101324
// San Mateo, "state:" California 101128
// Lewisville, "state:" Texas 101074
// South Bend, "state:" Indiana 100886
// Lakeland, "state:" Florida 100710
// Erie, "state:" Pennsylvania 100671
// Tyler, "state:" Texas 100223
// Pearland, "state:" Texas 100065
// College Station, "state:" Texas 100050
// Kenosha, "state:" Wisconsin 99889
// Sandy Springs, "state:" Georgia 99770
// Clovis, "state:" California 99769
// Flint, "state:" Michigan 99763
// Roanoke, "state:" Virginia 98465
// Albany, "state:" New York 98424
// Jurupa Valley, "state:" California 98030
// Compton, "state:" California 97877
// San Angelo, "state:" Texas 97492
// Hillsboro, "state:" Oregon 97368
// Lawton, "state:" Oklahoma 97151
// Renton, "state:" Washington 97003
// Vista, "state:" California 96929
// Davie, "state:" Florida 96830
// Greeley, "state:" Colorado 96539
// Mission Viejo, "state:" California 96346
// Portsmouth, "state:" Virginia 96205
// Dearborn, "state:" Michigan 95884
// South Gate, "state:" California 95677
// Tuscaloosa, "state:" Alabama 95334
// Livonia, "state:" Michigan 95208
// New Bedford, "state:" Massachusetts 95078
// Vacaville, "state:" California 94275
// Brockton, "state:" Massachusetts 94089
// Roswell, "state:" Georgia 94034
// Beaverton, "state:" Oregon 93542
// Quincy, "state:" Massachusetts 93494
// Sparks, "state:" Nevada 93282
// Yakima, "state:" Washington 93257
// Lee's Summit, "state:" Missouri 93184
// Federal Way, "state:" Washington 92734
// Carson, "state:" California 92599
// Santa Monica, "state:" California 92472
// Hesperia, "state:" California 92147
// Allen, "state:" Texas 92020
// Rio Rancho, "state:" New Mexico 91956
// Yuma, "state:" Arizona 91923
// Westminster, "state:" California 91739
// Orem, "state:" Utah 91648
// Lynn, "state:" Massachusetts 91589
// Redding, "state:" California 91119
// Spokane Valley, "state:" Washington 91113
// Miami Beach, "state:" Florida 91026
// League City, "state:" Texas 90983
// Lawrence, "state:" Kansas 90811
// Santa Barbara, "state:" California 90412
// Plantation, "state:" Florida 90268
// Sandy, "state:" Utah 90231
// Sunrise, "state:" Florida 90116
// Macon, "state:" Georgia"
// Longmont, "state:" Colorado"
// Boca Raton, "state:" Florida"
// San Marcos, "state:" California"
// Greenville, "state:" North Carolina"
// Waukegan, "state:" Illinois"
// Fall River, "state:" Massachusetts"
// Chico, "state:" California"
// Newton, "state:" Massachusetts"
// San Leandro, "state:" California"
// Reading, "state:" Pennsylvania"
// Norwalk, "state:" Connecticut"
// Fort Smith, "state:" Arkansas"
// Newport Beach, "state:" California"
// Asheville, "state:" North Carolina"
// Nashua, "state:" New Hampshire"
// Edmond, "state:" Oklahoma"
// Whittier, "state:" California"
// Nampa, "state:" Idaho"
// Bloomington, "state:" Minnesota"
// Deltona, "state:" Florida"
// Hawthorne, "state:" California"
// Duluth, "state:" Minnesota"
// Carmel, "state:" Indiana"
// Suffolk, "state:" Virginia"
// Clifton, "state:" New Jersey"
// Citrus Heights, "state:" California"
// Livermore, "state:" California"
// Tracy, "state:" California"
// Alhambra, "state:" California"
// Kirkland, "state:" Washington"
// Trenton, "state:" New Jersey"
// Ogden, "state:" Utah"
// Hoover, "state:" Alabama"
// Cicero, "state:" Illinois"
// Fishers, "state:" Indiana"
// Sugar Land, "state:" Texas"
// Danbury, "state:" Connecticut"
// Meridian, "state:" Idaho"
// Indio, "state:" California"
// Concord, "state:" North Carolina"
// Menifee, "state:" California"
// Champaign, "state:" Illinois"
// Buena Park, "state:" California"
// Troy, "state:" Michigan"
// O'Fallon, "state:" Missouri"
// Johns Creek, "state:" Georgia"
// Bellingham, "state:" Washington"
// Westland, "state:" Michigan"
// Bloomington, "state:" Indiana"
// Sioux City, "state:" Iowa"
// Warwick, "state:" Rhode Island"
// Hemet, "state:" California"
// Longview, "state:" Texas"
// Farmington Hills, "state:" Michigan"
// Bend, "state:" Oregon"
// Lakewood, "state:" California"
// Merced, "state:" California"
// Mission, "state:" Texas"
// Chino, "state:" California"
// Redwood City, "state:" California"
// Edinburg, "state:" Texas"
// Cranston, "state:" Rhode Island"
// Parma, "state:" Ohio"
// New Rochelle, "state:" New York 79446
// Lake Forest, "state:" California 79312
// Napa, "state:" California 79068
// Hammond, "state:" Indiana 78967
// Fayetteville, "state:" Arkansas 78960
// Bloomington, "state:" Illinois 78902
// Avondale, "state:" Arizona 78822
// Somerville, "state:" Massachusetts 78804
// Palm Coast, "state:" Florida 78740
// Bryan, "state:" Texas 78709
// Gary, "state:" Indiana 78450
// Largo, "state:" Florida 78409
// Brooklyn Park, "state:" Minnesota 78373
// Tustin, "state:" California 78327
// Racine, "state:" Wisconsin 78199
// Deerfield Beach, "state:" Florida 78041
// Lynchburg, "state:" Virginia 78014
// Mountain View, "state:" California 77846
// Medford, "state:" Oregon 77677
// Lawrence, "state:" Massachusetts 77657
// Bellflower, "state:" California 77593
// Melbourne, "state:" Florida 77508
// St. Joseph, "state:" Missouri 77147
// Camden, "state:" New Jersey 76903
// St. George, "state:" Utah 76817
// Kennewick, "state:" Washington 76762
// Baldwin Park, "state:" California 76635
// Chino Hills, "state:" California 76572
// Alameda, "state:" California 76419
// Albany, "state:" Georgia 76185
// Arlington Heights, "state:" Illinois 75994
// Scranton, "state:" Pennsylvania 75806
// Evanston, "state:" Illinois 75570
// Kalamazoo, "state:" Michigan 75548
// Baytown, "state:" Texas 75418
// Upland, "state:" California 75413
// Springdale, "state:" Arkansas 75229
// Bethlehem, "state:" Pennsylvania 75018
// Schaumburg, "state:" Illinois 74907
// Mount Pleasant, "state:" South Carolina 74885
// Auburn, "state:" Washington 74860
// Decatur, "state:" Illinois 74710
// San Ramon, "state:" California 74513
// Pleasanton, "state:" California 74110
// Wyoming, "state:" Michigan 74100
// Lake Charles, "state:" Louisiana 74024
// Plymouth, "state:" Minnesota 73987
// Bolingbrook, "state:" Illinois 73936
// Pharr, "state:" Texas 73790
// Appleton, "state:" Wisconsin 73596
// Gastonia, "state:" North Carolina 73209
// Folsom, "state:" California 73098
// Southfield, "state:" Michigan 73006
// Rochester Hills, "state:" Michigan 72952
// New Britain, "state:" Connecticut 72939
// Goodyear, "state:" Arizona 72864
// Canton, "state:" Ohio 72535
// Warner Robins, "state:" Georgia 72531
// Union City, "state:" California 72528
// Perris, "state:" California 72326
// Manteca, "state:" California 71948
// Iowa City, "state:" Iowa 71591
// Jonesboro, "state:" Arkansas 71551
// Wilmington, "state:" Delaware 71525
// Lynwood, "state:" California 71371
// Loveland, "state:" Colorado 71334
// Pawtucket, "state:" Rhode Island 71172
// Boynton Beach, "state:" Florida 71097
// Waukesha, "state:" Wisconsin 71016
// Gulfport, "state:" Mississippi 71012
// Apple Valley, "state:" California 70924
// Passaic, "state:" New Jersey 70868
// Rapid City, "state:" South Dakota 70812
// Layton, "state:" Utah 70790
// Lafayette, "state:" Indiana 70373
// Turlock, "state:" California 70365
// Muncie, "state:" Indiana 70316
// Temple, "state:" Texas 70190
// Missouri City, "state:" Texas 70185
// Redlands, "state:" California 69999
// Santa Fe, "state:" New Mexico 69976
// Lauderhill, "state:" Florida 69813
// Milpitas, "state:" California 69783
// Palatine, "state:" Illinois 69350
// Missoula, "state:" Montana 69122
// Rock Hill, "state:" South Carolina 69103
// Jacksonville, "state:" North Carolina 69079
// Franklin, "state:" Tennessee 68886
// Flagstaff, "state:" Arizona 68667
// Flower Mound, "state:" Texas 68609
// Weston, "state:" Florida 68388
// Waterloo, "state:" Iowa 68366
// Union City, "state:" New Jersey 68247
// Mount Vernon, "state:" New York 68224
// Fort Myers, "state:" Florida 68190
// Dothan, "state:" Alabama 68001
// Rancho Cordova, "state:" California 67911
// Redondo Beach, "state:" California 67815
// Jackson, "state:" Tennessee 67685
// Pasco, "state:" Washington 67599
// St. Charles, "state:" Missouri 67569
// Eau Claire, "state:" Wisconsin 67545
// North Richland Hills, "state:" Texas 67317
// Bismarck, "state:" North Dakota 67034
// Yorba Linda, "state:" California 67032
// Kenner, "state:" Louisiana 66975
// Walnut Creek, "state:" California 66900
// Frederick, "state:" Maryland 66893
// Oshkosh, "state:" Wisconsin 66778
// Pittsburg, "state:" California 66695
// Palo Alto, "state:" California 66642
// Bossier City, "state:" Louisiana 66333
// Portland, "state:" Maine 66318
// St. Cloud, "state:" Minnesota 66297
// Davis, "state:" California 66205
// South San Francisco, "state:" California 66174
// Camarillo, "state:" California 66086
// North Little Rock, "state:" Arkansas 66075
// Schenectady, "state:" New York 65902
// Gaithersburg, "state:" Maryland 65690
// Harlingen, "state:" Texas 65665
// Woodbury, "state:" Minnesota 65656
// Eagan, "state:" Minnesota 65453
// Yuba City, "state:" California 65416
// Maple Grove, "state:" Minnesota 65415
// Youngstown, "state:" Ohio 65184
// Skokie, "state:" Illinois 65176
// Kissimmee, "state:" Florida 65173
// Johnson City, "state:" Tennessee 65123
// Victoria, "state:" Texas 65098
// San Clemente, "state:" California 65040
// Bayonne, "state:" New Jersey 65028
// Laguna Niguel, "state:" California 64652
// East Orange, "state:" New Jersey 64544
// Shawnee, "state:" Kansas 64323
// Homestead, "state:" Florida 64079
// Rockville, "state:" Maryland 64072
// Delray Beach, "state:" Florida 64072
// Janesville, "state:" Wisconsin 63820
// Conway, "state:" Arkansas 63816
// Pico Rivera, "state:" California 63771
// Lorain, "state:" Ohio 63710
// Montebello, "state:" California 63495
// Lodi, "state:" California 63338
// New Braunfels, "state:" Texas 63279
// Marysville, "state:" Washington 63269
// Tamarac, "state:" Florida 63155
// Madera, "state:" California 63105
// Conroe, "state:" Texas 63032
// Santa Cruz, "state:" California 62864
// Eden Prairie, "state:" Minnesota 62603
// Cheyenne, "state:" Wyoming 62448
// Daytona Beach, "state:" Florida 62316
// Alpharetta, "state:" Georgia 62298
// Hamilton, "state:" Ohio 62258
// Waltham, "state:" Massachusetts 62227
// Coon Rapids, "state:" Minnesota 62103
// Haverhill, "state:" Massachusetts 62088
// Council Bluffs, "state:" Iowa 61969
// Taylor, "state:" Michigan 61817
// Utica, "state:" New York 61808
// Ames, "state:" Iowa 61792
// La Habra, "state:" California 61653
// Encinitas, "state:" California 61588
// Bowling Green, "state:" Kentucky 61488
// Burnsville, "state:" Minnesota 61434
// Greenville, "state:" South Carolina 61397
// West Des Moines, "state:" Iowa 61255
// Cedar Park, "state:" Texas 61238
// Tulare, "state:" California 61170
// Monterey Park, "state:" California 61085
// Vineland, "state:" New Jersey 61050
// Terre Haute, "state:" Indiana 61025
// North Miami, "state:" Florida 61007
// Mansfield, "state:" Texas 60872
// West Allis, "state:" Wisconsin 60697
// Bristol, "state:" Connecticut 60568
// Taylorsville, "state:" Utah 60519
// Malden, "state:" Massachusetts 60509
// Meriden, "state:" Connecticut 60456
// Blaine, "state:" Minnesota 60407
// Wellington, "state:" Florida 60202
// Cupertino, "state:" California 60189
// Springfield, "state:" Oregon 60177
// Rogers, "state:" Arkansas 60112
// St. Clair Shores, "state:" Michigan 60070
// Gardena, "state:" California 59957
// Pontiac, "state:" Michigan 59887
// National City, "state:" California 59834
// Grand Junction, "state:" Colorado 59778
// Rocklin, "state:" California 59738
// Chapel Hill, "state:" North Carolina 59635
// Casper, "state:" Wyoming 59628
// Broomfield, "state:" Colorado 59471
// Petaluma, "state:" California 59440
// South Jordan, "state:" Utah 59366
// Springfield, "state:" Ohio 59357
// Great Falls, "state:" Montana 59351
// Lancaster, "state:" Pennsylvania 59325
// North Port, "state:" Florida 59212
// Lakewood, "state:" Washington 59097
// Marietta, "state:" Georgia 59089
// San Rafael, "state:" California 58994
// Royal Oak, "state:" Michigan 58946
// Des Plaines, "state:" Illinois 58918
// Huntington Park, "state:" California 58879
// La Mesa, "state:" California 58642
// Orland Park, "state:" Illinois 58590
// Auburn, "state:" Alabama 58582
// Lakeville, "state:" Minnesota 58562
// Owensboro, "state:" Kentucky 58416
// Moore, "state:" Oklahoma 58414
// Jupiter, "state:" Florida 58298
// Idaho Falls, "state:" Idaho 58292
// Dubuque, "state:" Iowa 58253
// Bartlett, "state:" Tennessee 58226
// Rowlett, "state:" Texas 58043
// Novi, "state:" Michigan 57960
// White Plains, "state:" New York 57866
// Arcadia, "state:" California 57639
// Redmond, "state:" Washington 57530
// Lake Elsinore, "state:" California 57525
// Ocala, "state:" Florida 57468
// Tinley Park, "state:" Illinois 57282
// Port Orange, "state:" Florida 57203
// Medford, "state:" Massachusetts 57170
// Oak Lawn, "state:" Illinois 57073
// Rocky Mount, "state:" North Carolina 56954
// Kokomo, "state:" Indiana 56895
// Coconut Creek, "state:" Florida 56792
// Bowie, "state:" Maryland 56759
// Berwyn, "state:" Illinois 56758
// Midwest City, "state:" Oklahoma 56756
// Fountain Valley, "state:" California 56707
// Buckeye, "state:" Arizona 56683
// Dearborn Heights, "state:" Michigan 56620
// Woodland, "state:" California 56590
// Noblesville, "state:" Indiana 56540
// Valdosta, "state:" Georgia 56481
// Diamond Bar, "state:" California 56449
// Manhattan, "state:" Kansas 56143
// Santee, "state:" California 56105
// Taunton, "state:" Massachusetts 56069
// Sanford, "state:" Florida 56002
// Kettering, "state:" Ohio 55870
// New Brunswick, "state:" New Jersey 55831
// Decatur, "state:" Alabama 55816
// Chicopee, "state:" Massachusetts 55717
// Anderson, "state:" Indiana 55670
// Margate, "state:" Florida 55456
// Weymouth Town, "state:" Massachusetts 55419
// Hempstead, "state:" New York 55361
// Corvallis, "state:" Oregon 55298
// Eastvale, "state:" California 55191
// Porterville, "state:" California 55174
// West Haven, "state:" Connecticut 55046
// Brentwood, "state:" California 55000
// Paramount, "state:" California 54980
// Grand Forks, "state:" North Dakota 54932
// Georgetown, "state:" Texas 54898
// St. Peters, "state:" Missouri 54842
// Shoreline, "state:" Washington 54790
// Mount Prospect, "state:" Illinois 54771
// Hanford, "state:" California 54686
// Normal, "state:" Illinois 54664
// Rosemead, "state:" California 54561
// Lehi, "state:" Utah 54382
// Pocatello, "state:" Idaho 54350
// Highland, "state:" California 54291
// Novato, "state:" California 54194
// Port Arthur, "state:" Texas 54135
// Carson City, "state:" Nevada 54080
// San Marcos, "state:" Texas 54076
// Hendersonville, "state:" Tennessee 54068
// Elyria, "state:" Ohio 53956
// Revere, "state:" Massachusetts 53756
// Pflugerville, "state:" Texas 53752
// Greenwood, "state:" Indiana 53665
// Bellevue, "state:" Nebraska 53663
// Wheaton, "state:" Illinois 53648
// Smyrna, "state:" Georgia 53438
// Sarasota, "state:" Florida 53326
// Blue Springs, "state:" Missouri 53294
// Colton, "state:" California 53243
// Euless, "state:" Texas 53224
// Castle Rock, "state:" Colorado 53063
// Cathedral City, "state:" California 52977
// Kingsport, "state:" Tennessee 52962
// Lake Havasu City, "state:" Arizona 52844
// Pensacola, "state:" Florida 52703
// Hoboken, "state:" New Jersey 52575
// Yucaipa, "state:" California 52536
// Watsonville, "state:" California 52477
// Richland, "state:" Washington 52413
// Delano, "state:" California 52403
// Hoffman Estates, "state:" Illinois 52398
// Florissant, "state:" Missouri 52363
// Placentia, "state:" California 52206
// West New York, "state:" New Jersey 52122
// Dublin, "state:" California 52105
// Oak Park, "state:" Illinois 52066
// Peabody, "state:" Massachusetts 52044
// Perth Amboy, "state:" New Jersey 51982
// Battle Creek, "state:" Michigan 51848
// Bradenton, "state:" Florida 51763
// Gilroy, "state:" California 51701
// Milford, "state:" Connecticut 51644
// Albany, "state:" Oregon 51583
// Ankeny, "state:" Iowa 51567
// La Crosse, "state:" Wisconsin 51522
// Burlington, "state:" North Carolina 51510
// DeSoto, "state:" Texas 51483
// Harrisonburg, "state:" Virginia 51395
// Minnetonka, "state:" Minnesota 51368
// Elkhart, "state:" Indiana 51265
// Lakewood, "state:" Ohio 51143
// Glendora, "state:" California 51074
// Southaven, "state:" Mississippi 50997
// Charleston, "state:" West Virginia 50821
// Joplin, "state:" Missouri 50789
// Enid, "state:" Oklahoma 50725
// Palm Beach Gardens, "state:" Florida 50699
// Brookhaven, "state:" Georgia 50603
// Plainfield, "state:" New Jersey 50588
// Grand Island, "state:" Nebraska 50550
// Palm Desert, "state:" California 50508
// Huntersville, "state:" North Carolina 50458
// Tigard, "state:" Oregon 50444
// Lenexa, "state:" Kansas 50344
// Saginaw, "state:" Michigan 50303
// Kentwood, "state:" Michigan 50233
// Doral, "state:" Florida 50213
// Apple Valley, "state:" Minnesota 50201
// Grapevine, "state:" Texas 50195
// Aliso Viejo, "state:" California 50175
// Sammamish, "state:" Washington 50169
// Casa Grande, "state:" Arizona 50111
// Pinellas Park, "state:" Florida"
// Troy, "state:" New York"
// West Sacramento, "state:" California"
// Burien, "state:" Washington"
// Commerce City, "state:" Colorado"
// Monroe, "state:" Louisiana"
// Cerritos, "state:" California"
// Downers Grove, "state:" Illinois"
// Coral Gables, "state:" Florida"
// Wilson, "state:" North Carolina"
// Niagara Falls, "state:" New York"
// Poway, "state:" California"
// Edina, "state:" Minnesota"
// Cuyahoga Falls, "state:" Ohio"
// Rancho Santa Margarita, "state:" California"
// Harrisburg, "state:" Pennsylvania"
// Huntington, "state:" West Virginia"
// La Mirada, "state:" California"
// Cypress, "state:" California"
// Caldwell, "state:" Idaho"
// Logan, "state:" Utah"
// Galveston, "state:" Texas"
// Sheboygan, "state:" Wisconsin"
// Middletown, "state:" Ohio"
// Murray, "state:" Utah"
// Roswell, "state:" New Mexico"
// Parker, "state:" Colorado"
// Bedford, "state:" Texas"
// East Lansing, "state:" Michigan"
// Methuen, "state:" Massachusetts"
// Covina, "state:" California"
// Alexandria, "state:" Louisiana"
// Olympia, "state:" Washington"
// Euclid, "state:" Ohio"
// Mishawaka, "state:" Indiana"
// Salina, "state:" Kansas"
// Azusa, "state:" California"
// Newark, "state:" Ohio"
// Chesterfield, "state:" Missouri"
// Leesburg, "state:" Virginia"
// Dunwoody, "state:" Georgia"
// Hattiesburg, "state:" Mississippi"
// Roseville, "state:" Michigan"
// Bonita Springs, "state:" Florida"
// Portage, "state:" Michigan"
// St. Louis Park, "state:" Minnesota"
// Collierville, "state:" Tennessee"
// Middletown, "state:" Connecticut"
// Stillwater, "state:" Oklahoma"
// East Providence, "state:" Rhode Island"
// Lawrence, "state:" Indiana"
// Wauwatosa, "state:" Wisconsin"
// Mentor, "state:" Ohio"
// Ceres, "state:" California"
// Cedar Hill, "state:" Texas"
// Mansfield, "state:" Ohio"
// Binghamton, "state:" New York"
// Coeur d'Alene, "state:" Idaho"
// San Luis Obispo, "state:" California"
// Minot, "state:" North Dakota"
// Palm Springs, "state:" California"
// Pine Bluff, "state:" Arkansas"
// Texas City, "state:" Texas"
// Summerville, "state:" South Carolina"
// Twin Falls, "state:" Idaho"
// Jeffersonville, "state:" Indiana"
// San Jacinto, "state:" California"
// Madison, "state:" Alabama"
// Altoona, "state:" Pennsylvania"
// Columbus, "state:" Indiana"
// Beavercreek, "state:" Ohio"
// Apopka, "state:" Florida"
// Elmhurst, "state:" Illinois"
// Maricopa, "state:" Arizona"
// Farmington, "state:" New Mexico"
// Glenview, "state:" Illinois"
// Cleveland Heights, "state:" Ohio"
// Draper, "state:" Utah"
// Lincoln, "state:" California"
// Sierra Vista, "state:" Arizona"
// Lacey, "state:" Washington"
// Biloxi, "state:" Mississippi"
// Strongsville, "state:" Ohio"
// Barnstable Town, "state:" Massachusetts"
// Wylie, "state:" Texas"
// Sayreville, "state:" New Jersey"
// Kannapolis, "state:" North Carolina"
// Charlottesville, "state:" Virginia"
// Littleton, "state:" Colorado"
// Titusville, "state:" Florida"
// Hackensack, "state:" New Jersey"
// Newark, "state:" California"
// Pittsfield, "state:" Massachusetts"
// York, "state:" Pennsylvania"
// Lombard, "state:" Illinois"
// Attleboro, "state:" Massachusetts"
// DeKalb, "state:" Illinois"
// Blacksburg, "state:" Virginia"
// Dublin, "state:" Ohio"
// Haltom City, "state:" Texas"
// Lompoc, "state:" California"
// El Centro, "state:" California"
// Danville, "state:" California"
// Jefferson City, "state:" Missouri"
// Cutler Bay, "state:" Florida"
// Oakland Park, "state:" Florida"
// North Miami Beach, "state:" Florida"
// Freeport, "state:" New York"
// Moline, "state:" Illinois"
// Coachella, "state:" California"
// Fort Pierce, "state:" Florida"
// Smyrna, "state:" Tennessee"
// Bountiful, "state:" Utah"
// Fond du Lac, "state:" Wisconsin"
// Everett, "state:" Massachusetts"
// Danville, "state:" Virginia"
// Keller, "state:" Texas"
// Belleville, "state:" Illinois"
// Bell Gardens, "state:" California"
// Cleveland, "state:" Tennessee"
// North Lauderdale, "state:" Florida"
// Fairfield, "state:" Ohio"
// Salem, "state:" Massachusetts"
// Rancho Palos Verdes, "state:" California"
// San Bruno, "state:" California"
// Concord, "state:" New Hampshire"
// Burlington, "state:" Vermont"
// Apex, "state:" North Carolina"
// Midland, "state:" Michigan"
// Altamonte Springs, "state:" Florida"
// Hutchinson, "state:" Kansas"
// Buffalo Grove, "state:" Illinois"
// Urbandale, "state:" Iowa"
// State College, "state:" Pennsylvania"
// Urbana, "state:" Illinois"
// Plainfield, "state:" Illinois"
// Manassas, "state:" Virginia"
// Bartlett, "state:" Illinois"
// Kearny, "state:" New Jersey"
// Oro Valley, "state:" Arizona"
// Findlay, "state:" Ohio"
// Rohnert Park, "state:" California"
// Westfield, "state:" Massachusetts"
// Linden, "state:" New Jersey"
// Sumter, "state:" South Carolina"
// Wilkes-Barre, "state:" Pennsylvania"
// Woonsocket, "state:" Rhode Island"
// Leominster, "state:" Massachusetts"
// Shelton, "state:" Connecticut"
// Brea, "state:" California"
// Covington, "state:" Kentucky"
// Rockwall, "state:" Texas"
// Meridian, "state:" Mississippi"
// Riverton, "state:" Utah"
// St. Cloud, "state:" Florida"
// Quincy, "state:" Illinois"
// Morgan Hill, "state:" California"
// Warren, "state:" Ohio"
// Edmonds, "state:" Washington"
// Burleson, "state:" Texas"
// Beverly, "state:" Massachusetts"
// Mankato, "state:" Minnesota"
// Hagerstown, "state:" Maryland"
// Prescott, "state:" Arizona"
// Campbell, "state:" California"
// Cedar Falls, "state:" Iowa"
// Beaumont, "state:" California"
// La Puente, "state:" California"
// Crystal Lake, "state:" Illinois"
// Fitchburg, "state:" Massachusetts"
// Carol Stream, "state:" Illinois"
// Hickory, "state:" North Carolina"
// Streamwood, "state:" Illinois"
// Norwich, "state:" Connecticut"
// Coppell, "state:" Texas"
// San Gabriel, "state:" California"
// Holyoke, "state:" Massachusetts"
// Bentonville, "state:" Arkansas"
// Florence, "state:" Alabama"
// Peachtree Corners, "state:" Georgia"
// Brentwood, "state:" Tennessee"
// Bozeman, "state:" Montana"
// New Berlin, "state:" Wisconsin"
// Goose Creek, "state:" South Carolina"
// Huntsville, "state:" Texas"
// Prescott Valley, "state:" Arizona"
// Maplewood, "state:" Minnesota"
// Romeoville, "state:" Illinois"
// Duncanville, "state:" Texas"
// Atlantic City, "state:" New Jersey"
// Clovis, "state:" New Mexico"
// The Colony, "state:" Texas"
// Culver City, "state:" California"
// Marlborough, "state:" Massachusetts"
// Hilton Head Island, "state:" South Carolina"
// Moorhead, "state:" Minnesota"
// Calexico, "state:" California"
// Bullhead City, "state:" Arizona"
// Germantown, "state:" Tennessee"
// La Quinta, "state:" California"
// Lancaster, "state:" Ohio"
// Wausau, "state:" Wisconsin"
// Sherman, "state:" Texas"
// Ocoee, "state:" Florida"
// Shakopee, "state:" Minnesota"
// Woburn, "state:" Massachusetts"
// Bremerton, "state:" Washington"
// Rock Island, "state:" Illinois"
// Muskogee, "state:" Oklahoma"
// Cape Girardeau, "state:" Missouri"
// Annapolis, "state:" Maryland"
// Greenacres, "state:" Florida"
// Ormond Beach, "state:" Florida"
// Hallandale Beach, "state:" Florida"
// Stanton, "state:" California"
// Puyallup, "state:" Washington"
// Pacifica, "state:" California"
// Hanover Park, "state:" Illinois"
// Hurst, "state:" Texas"
// Lima, "state:" Ohio"
// Marana, "state:" Arizona"
// Carpentersville, "state:" Illinois"
// Oakley, "state:" California"
// Huber Heights, "state:" Ohio"
// Lancaster, "state:" Texas"
// Montclair, "state:" California"
// Wheeling, "state:" Illinois"
// Brookfield, "state:" Wisconsin"
// Park Ridge, "state:" Illinois"
// Florence, "state:" South Carolina"
// Roy, "state:" Utah"
// Winter Garden, "state:" Florida"
// Chelsea, "state:" Massachusetts"
// Valley Stream, "state:" New York"
// Spartanburg, "state:" South Carolina"
// Lake Oswego, "state:" Oregon"
// Friendswood, "state:" Texas"
// Westerville, "state:" Ohio"
// Northglenn, "state:" Colorado"
// Phenix City, "state:" Alabama"
// Grove City, "state:" Ohio"
// Texarkana, "state:" Texas"
// Addison, "state:" Illinois"
// Dover, "state:" Delaware"
// Lincoln Park, "state:" Michigan"
// Calumet City, "state:" Illinois"
// Muskegon, "state:" Michigan"
// Aventura, "state:" Florida"
// Martinez, "state:" California"
// Greenfield, "state:" Wisconsin"
// Apache Junction, "state:" Arizona"
// Monrovia, "state:" California"
// Weslaco, "state:" Texas"
// Keizer, "state:" Oregon"
// Spanish Fork, "state:" Utah"
// Beloit, "state:" Wisconsin"
// Panama City, "state:" Florida"
//   ]
  public countriesOld = ["United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mcdonald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Helena", "Saint Kitts and Nevis"];
  public states = [{ "fullName": "Alabama", "shortName": "AL", "countryCode": "US" }, { "fullName": "Alaska", "shortName": "AK", "countryCode": "US" }, { "fullName": "Arizona", "shortName": "AZ", "countryCode": "US" }, { "fullName": "Arkansas", "shortName": "AR", "countryCode": "US" }, { "fullName": "California", "shortName": "CA", "countryCode": "US" }, { "fullName": "Colorado", "shortName": "CO", "countryCode": "US" }, { "fullName": "Connecticut", "shortName": "CT", "countryCode": "US" }, { "fullName": "Delaware", "shortName": "DE", "countryCode": "US" }, { "fullName": "Florida", "shortName": "FL", "countryCode": "US" }, { "fullName": "Georgia", "shortName": "GA", "countryCode": "US" }, { "fullName": "Hawaii", "shortName": "HI", "countryCode": "US" }, { "fullName": "Idaho", "shortName": "ID", "countryCode": "US" }, { "fullName": "Illinois", "shortName": "IL", "countryCode": "US" }, { "fullName": "Indiana", "shortName": "IN", "countryCode": "US" }, { "fullName": "Iowa", "shortName": "IA", "countryCode": "US" }, { "fullName": "Kansas", "shortName": "KS", "countryCode": "US" }, { "fullName": "Kentucky", "shortName": "KY", "countryCode": "US" }, { "fullName": "Louisiana", "shortName": "LA", "countryCode": "US" }, { "fullName": "Maine", "shortName": "ME", "countryCode": "US" }, { "fullName": "Maryland", "shortName": "MD", "countryCode": "US" }, { "fullName": "Massachusetts", "shortName": "MA", "countryCode": "US" }, { "fullName": "Michigan", "shortName": "MI", "countryCode": "US" }, { "fullName": "Minnesota", "shortName": "MN", "countryCode": "US" }, { "fullName": "Mississippi", "shortName": "MS", "countryCode": "US" }, { "fullName": "Missouri", "shortName": "MO", "countryCode": "US" }, { "fullName": "Montana", "shortName": "MT", "countryCode": "US" }, { "fullName": "Nebraska", "shortName": "NE", "countryCode": "US" }, { "fullName": "Nevada", "shortName": "NV", "countryCode": "US" }, { "fullName": "New Hampshire", "shortName": "NH", "countryCode": "US" }, { "fullName": "New Jersey", "shortName": "NJ", "countryCode": "US" }, { "fullName": "New Mexico", "shortName": "NM", "countryCode": "US" }, { "fullName": "New York", "shortName": "NY", "countryCode": "US" }, { "fullName": "North Carolina", "shortName": "NC", "countryCode": "US" }, { "fullName": "North Dakota", "shortName": "ND", "countryCode": "US" }, { "fullName": "Ohio", "shortName": "OH", "countryCode": "US" }, { "fullName": "Oklahoma", "shortName": "OK", "countryCode": "US" }, { "fullName": "Oregon", "shortName": "OR", "countryCode": "US" }, { "fullName": "Pennsylvania", "shortName": "PA", "countryCode": "US" }, { "fullName": "Rhode Island", "shortName": "RI", "countryCode": "US" }, { "fullName": "South Carolina", "shortName": "SC", "countryCode": "US" }, { "fullName": "South Dakota", "shortName": "SD", "countryCode": "US" }, { "fullName": "Tennessee", "shortName": "TN", "countryCode": "US" }, { "fullName": "Texas", "shortName": "TX", "countryCode": "US" }, { "fullName": "Utah", "shortName": "UT", "countryCode": "US" }, { "fullName": "Vermont", "shortName": "VT", "countryCode": "US" }, { "fullName": "Virginia", "shortName": "VA", "countryCode": "US" }, { "fullName": "Washington", "shortName": "WA", "countryCode": "US" }, { "fullName": "West Virginia", "shortName": "WV", "countryCode": "US" }, { "fullName": "Wisconsin", "shortName": "WI", "countryCode": "US" }, { "fullName": "Wyoming", "shortName": "WY", "countryCode": "US" }]
  public gender = ["Male", "Female"];
  public paymentTypes = ["On Hold", "Credit Card"];
  public yearArray = Array(10).fill(null).map((_, i) => new Date().getFullYear() + i);
  public monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  constructor(loginService: LoginService) {
    super(loginService);
  } 

  // Filter the states list and send back to populate the selectedStates**
  public stateSearch(value: string) { 
    let filter = value.toLowerCase();
    return this.states.filter(option => option.fullName.toLowerCase().startsWith(filter));
  }

  public countrySearch(value: string) { 
    let filter = value.toLowerCase();
    return this.countries.filter(option => option.fullName.toLowerCase().startsWith(filter));
  }

  public getHotelDisplayName(suggestion, isIntial=true) {
    if(suggestion == '') {
      return isIntial?'Please Select':''; 
    } else {
      const HotelDisplayName =  suggestion.locality + ', ' + suggestion.admin_area_l1 + ', ' + suggestion.country;
      return HotelDisplayName;
    }
  }

  sameStartEndValidator(form: FormGroup) {
    const start = form.value.start;
    const end = form.value.end;
    if( start != null && end != null) {
      const condition = new Date(start).getTime() > new Date(end).getTime();
      return condition ? { startEndMatch: true} : null;
    }
    return null;
  }

  fromSelected(form: FormGroup) {
    const formGroupValue = form.value;
    if(formGroupValue.place != '' && (formGroupValue.place.formatted_address == null)) {
      return { fromSelected: true};
    }
    return null;
  }
  
  displayFn(airport): string {
    return airport && airport.data ? airport.data : (airport && airport.name ? airport.name : '');
  }

  getFare(flightFares) {
    let fare = flightFares[0].totalPrice;
    for(let flightFare of flightFares) {
      if(flightFare.selectedFare == true) {
        return flightFare.totalPrice
      }
      if(flightFare.totalPrice < fare){
        fare = flightFare.totalPrice;
      }
    }
    return fare;
  }

  getFares(rooms) {
    let amount = {
      totalRoomCharges : 0,  
      totalTaxes : 0,
      totalFees : 0,
      totalAmount : 0
    } 
    for(let room of rooms){
      amount.totalRoomCharges = amount.totalRoomCharges + room.productPrice.roomRate[0].rate.amountBeforeTax;
      amount.totalTaxes = amount.totalTaxes + room.productPrice.roomRate[0].taxes.total.value;
      amount.totalAmount = amount.totalAmount + room.productPrice.roomRate[0].rate.value;
    }
    // for(let flightFare of roomFares) {
    //   if(flightFare.selectedFare == true) {
    //     amount = this.getTaxes(roomFares[0], amount);
    //     amount.totalRoomCharges = flightFare.totalPrice
    //     return amount;
    //   }
    //   if(flightFare.totalPrice < amount.totalRoomCharges){
    //     amount = this.getTaxes(roomFares[0], amount);
    //     amount.totalRoomCharges = flightFare.totalPrice;
    //   }
    // }
    return amount;
  }

  getTaxes(flightFare, amount){
    amount.baseAmount = flightFare.baseAmount;
    amount.facilityCharge = 0;
    amount.securityServiceFee = 0;
    for(let tax of flightFare.tax) {
      if(tax.description == 'U.S Passenger Facility Charge') {
        amount.facilityCharge = amount.facilityCharge +  (Number(tax.amount.text) * 0.01);
      } else if (tax.description == 'Passenger Civil Aviation Security Service Fee') {
        amount.securityServiceFee = amount.securityServiceFee +  (Number(tax.amount.text) * 0.01);
      }
    }
    return amount;
  }

  getOrderData(data, order) {
    if(data != null && data.response != null && data.response.dataLists != null) {
      if(data.response.dataLists.flightSegmentList != null && data.response.dataLists.flightSegmentList.flightSegment != null) {
        order.flightSegment = data.response.dataLists.flightSegmentList.flightSegment || [] ;
      }
      if(data.response.dataLists.passengerList != null && data.response.dataLists.passengerList.passenger != null) {
        order.passengerList = data.response.dataLists.passengerList.passenger || [] ;
        let index = 1;
        for(let passenger of order.passengerList){
          passenger.index = index++;
        }
      }
      if(data.response.dataLists.contactList != null && data.response.dataLists.contactList.contactInformation != null 
              && data.response.dataLists.contactList.contactInformation.contactProvided!= null) {
        order.contactList = data.response.dataLists.contactList.contactInformation.contactProvided || [] ;
      }
    } 
    order.OrderID =  order.OrderID || ((data.response || {}).order || {}).orderID || 'NA';
    let travelAgencyRecipient = (((data.party || {}).recipient || {}).travelAgencyRecipient || {})
    order.Agency =  order.Agency || (travelAgencyRecipient.agentUser || {}).agentUserID || 'NA';
    order.AgencyId =  order.AgencyId || travelAgencyRecipient.agencyID || 'NA';
    return order;
  }

  getDuration(flightDuration) {
    // const flightDurationStr =  `${flightDuration.substring(2,5)} ${flightDuration.substring(5)}`;
    const flightDurationStr = flightDuration.replace("PT","");
    return flightDurationStr;
  }
  
  getStops(stops) {
    const stopsStr =  stops == 0 ? "Nonstop" : `${stops} Stop(s)`;
    return stopsStr;
  }

  getClass(code){
    return code == 'I' ? 'Economy' : 'First Class';
  }

  getName(passenger){
    const name =
    (passenger.individual.nameTitle || "") + " " + 
    (passenger.individual.givenName || "") + " " + 
    (passenger.individual.middleName || "") + " " + 
    (passenger.individual.surname || "");
    return name;
  }

  public getImageName(hotelID) {
    let imagePath = "assets/media/Hotels/" + hotelID + ".png";
    // console.log('hotelID:' + hotelID);
    return imagePath;
  }

  public onImgError(event) {
    // console.log(event);
    event.target.src = "assets/media/Hotels/noImage2.png";
  }


  getNameOnly(passenger){
    const name =
    (passenger.individual.givenName || "") + " " + 
    (passenger.individual.middleName || "") + " " + 
    (passenger.individual.surname || "");
    return name;
  }

  public changeOrderData(orderObj) {
    let date,airportCode;
    if(orderObj != null && orderObj.flightSegment != null 
        && orderObj.flightSegment[0] != null && orderObj.flightSegment[0].departure != null ) {
          date = orderObj.flightSegment[0].departure.date;
          airportCode = orderObj.flightSegment[0].departure.airportCode;
    }
    let order = {
      OrderId : orderObj.orderID|| orderObj.OrderID,
      PassengerName : this.getNameOnly(orderObj.passengerList[0]) || 'NA',
      Depature :  date || 'NA',
      Airport : airportCode || 'NA',
      Creation : orderObj.creationDate || 'NA',
      Agency : orderObj.Agency ||(orderObj.agency||{}).name || 'NA',
      AgencyId : orderObj.AgencyId ||((orderObj.agency||{}).agencyID||{}).text  || 'NA'
    }
    orderObj = {
      ...orderObj,
      ...order
    }
    return orderObj;
  }

  public getRoomInfo(roomCount) {
    if(roomCount == 1) {
      return '1 Room';
    }else if (roomCount > 1) {
      return roomCount+ ' Rooms';
    } else {
      return '';
    }
  }

  public getGuestInfo(guestArray) {
    let guestInfo = '';
    let adult = guestArray.filter(function(item:any) {
      if(item.ageQualifyingCode.toUpperCase() == 'ADULT'){
        if(item.value == 1){
          item.Code = 'adult'
        } else {
          item.Code = 'adults'
        }
        return item;
      }
    })[0] || {};
    let child = guestArray.filter(function(item:any) {
      if(item.ageQualifyingCode.toUpperCase() == 'CHILD'){
        if(item.value == 1){
          item.Code = 'children'
        } else {
          item.Code = 'childrens'
        }
        return item;
      }
    })[0] || {};
    if(adult.value != 0){
      guestInfo = guestInfo + adult.value + ' '+ adult.Code;
    }
    if(child.value != 0){
      guestInfo = guestInfo + ', ' + child.value + ' '+ child.Code;
    }
    return guestInfo;
  }
}
