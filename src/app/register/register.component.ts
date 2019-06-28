import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, PatternValidator } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

export interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  selectFormControl = new FormControl('', Validators.required);

  submitted:boolean = false;
  success:boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  registerForm: FormGroup;
  isSubmitted: boolean = false;

  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname:            ['', Validators.required],
      middlename:           [''],
      lastname:             ['', Validators.required],
      birthday:             ['', Validators.required],
      email:                ['', Validators.required],
      password:             ['', Validators.required],
      billing_addressline:  ['', Validators.required],
      billing_city:         ['', Validators.required],
      billing_zipcode:      ['', Validators.required],
      billing_country:      ['SE', Validators.required],
      delivery_addressline: [''],
      delivery_city:        [''],
      delivery_zipcode:     [''],
      delivery_country:     ['choose'],
      gridCheck:            ['', Validators.required]
    })

    //this.registerForm.get('delivery_country').disable();
    //this.registerForm.controls.delivery_country['choose'].disable();
    //$('body').addClass('addclasstobody');
    //$('#trendingdisplay').hide();//hide on load

      $('#toggleaddress').click(function(){
          $('#displaydeliveryaddress').fadeToggle();
      })

    }

  get formControls() { return this.registerForm.controls }

  register() {

    this.isSubmitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.success = true;

    this.authService.register(this.registerForm.value).subscribe((registerres) => {
      if(registerres["success"]) {
        this.authService.login(this.registerForm.value).subscribe((loginres) => {
          if(loginres["success"]) {
            this.router.navigateByUrl('/login');
          }
          else {
            this.router.navigateByUrl('/register');
          }         
        })        
      }    
    })
  }

    countries: Country[] = [
              { value: "choose", viewValue: "Välj..."},
              { value: "AF", viewValue: "Afghanistan"},
              { value: "AX", viewValue: "Åland Islands"},
              { value: "AL", viewValue: "Albania"},
              { value: "DZ", viewValue: "Algeria"},
              { value: "AS", viewValue: "American Samoa"},
              { value: "AD", viewValue: "Andorra" },
              { value: "AO", viewValue: "Angola" },
              { value: "AI", viewValue: "Anguilla" },
              { value: "AQ", viewValue: "Antarctica" },
              { value: "AG", viewValue: "Antigua and Barbuda" },
              { value: "AR", viewValue: "Argentina" },
              { value: "AM", viewValue: "Armenia" },
              { value: "AW", viewValue: "Aruba" },
              { value: "AU", viewValue: "Australia" },
              { value: "AT", viewValue: "Austria" },
              { value: "AZ", viewValue: "Azerbaijan" },
              { value: "BS", viewValue: "Bahamas" },
              { value: "BH", viewValue: "Bahrain" },
              { value: "BD", viewValue: "Bangladesh" },
              { value: "BB", viewValue: "Barbados" },
              { value: "BY", viewValue: "Belarus" },
              { value: "BE", viewValue: "Belgium" },
              { value: "BZ", viewValue: "Belize" },
              { value: "BJ", viewValue: "Benin" },
              { value: "BM", viewValue: "Bermuda" },
              { value: "BT", viewValue: "Bhutan" },
              { value: "BO", viewValue: "Bolivia, Plurinational State of" },
              { value: "BQ", viewValue: "Bonaire, Sint Eustatius and Saba" },
              { value: "BA", viewValue: "Bosnia and Herzegovina" },
              { value: "BW", viewValue: "Botswana" },
              { value: "BV", viewValue: "Bouvet Island" },
              { value: "BR", viewValue: "Brazil" },
              { value: "IO", viewValue: "British Indian Ocean Territory" },
              { value: "BN", viewValue: "Brunei Darussalam" },
              { value: "BG", viewValue: "Bulgaria" },
              { value: "BF", viewValue: "Burkina Faso" },
              { value: "BI", viewValue: "Burundi" },
              { value: "KH", viewValue: "Cambodia" },
              { value: "CM", viewValue: "Cameroon" },
              { value: "CA", viewValue: "Canada" },
              { value: "CV", viewValue: "Cape Verde" },
              { value: "KY", viewValue: "Cayman Islands" },
              { value: "CF", viewValue: "Central African Republic" },
              { value: "TD", viewValue: "Chad" },
              { value: "CL", viewValue: "Chile" },
              { value: "CN", viewValue: "China" },
              { value: "CX", viewValue: "Christmas Island" },
              { value: "CC", viewValue: "Cocos (Keeling) Islands" },
              { value: "CO", viewValue: "Colombia" },
              { value: "KM", viewValue: "Comoros" },
              { value: "CG", viewValue: "Congo" },
              { value: "CD", viewValue: "Congo, the Democratic Republic of the" },
              { value: "CK", viewValue: "Cook Islands" },
              { value: "CR", viewValue: "Costa Rica" },
              { value: "CI", viewValue: "Côte d'Ivoire" },
              { value: "HR", viewValue: "Croatia" },
              { value: "CU", viewValue: "Cuba" },
              { value: "CW", viewValue: "Curaçao" },
              { value: "CY", viewValue: "Cyprus" },
              { value: "CZ", viewValue: "Czech Republic" },
              { value: "DK", viewValue: "Denmark" },
              { value: "DJ", viewValue: "Djibouti" },
              { value: "DM", viewValue: "Dominica" },
              { value: "DO", viewValue: "Dominican Republic" },
              { value: "EC", viewValue: "Ecuador" },
              { value: "EG", viewValue: "Egypt" },
              { value: "SV", viewValue: "El Salvador" },
              { value: "GQ", viewValue: "Equatorial Guinea" },
              { value: "ER", viewValue: "Eritrea" },
              { value: "EE", viewValue: "Estonia" },
              { value: "ET", viewValue: "Ethiopia" },
              { value: "FK", viewValue: "Falkland Islands (Malvinas)" },
              { value: "FO", viewValue: "Faroe Islands" },
              { value: "FJ", viewValue: "Fiji" },
              { value: "FI", viewValue: "Finland" },
              { value: "FR", viewValue: "France" },
              { value: "GF", viewValue: "French Guiana" },
              { value: "PF", viewValue: "French Polynesia" },
              { value: "TF", viewValue: "French Southern Territories" },
              { value: "GA", viewValue: "Gabon" },
              { value: "GM", viewValue: "Gambia" },
              { value: "GE", viewValue: "Georgia" },
              { value: "DE", viewValue: "Germany" },
              { value: "GH", viewValue: "Ghana" },
              { value: "GI", viewValue: "Gibraltar" },
              { value: "GR", viewValue: "Greece" },
              { value: "GL", viewValue: "Greenland" },
              { value: "GD", viewValue: "Grenada" },
              { value: "GP", viewValue: "Guadeloupe" },
              { value: "GU", viewValue: "Guam" },
              { value: "GT", viewValue: "Guatemala" },
              { value: "GG", viewValue: "Guernsey" },
              { value: "GN", viewValue: "Guinea" },
              { value: "GW", viewValue: "Guinea-Bissau" },
              { value: "GY", viewValue: "Guyana" },
              { value: "HT", viewValue: "Haiti" },
              { value: "HM", viewValue: "Heard Island and McDonald Islands" },
              { value: "VA", viewValue: "Holy See (Vatican City State)" },
              { value: "HN", viewValue: "Honduras" },
              { value: "HK", viewValue: "Hong Kong" },
              { value: "HU", viewValue: "Hungary" },
              { value: "IS", viewValue: "Iceland" },
              { value: "IN", viewValue: "India" },
              { value: "ID", viewValue: "Indonesia" },
              { value: "IR", viewValue: "Iran, Islamic Republic of" },
              { value: "IQ", viewValue: "Iraq" },
              { value: "IE", viewValue: "Ireland" },
              { value: "IM", viewValue: "Isle of Man" },
              { value: "IL", viewValue: "Israel" },
              { value: "IT", viewValue: "Italy" },
              { value: "JM", viewValue: "Jamaica" },
              { value: "JP", viewValue: "Japan" },
              { value: "JE", viewValue: "Jersey" },
              { value: "JO", viewValue: "Jordan"},
              { value: "KZ", viewValue: "Kazakhstan" },
              { value: "KE", viewValue: "Kenya" },
              { value: "KI", viewValue: "Kiribati" },
              { value: "KP", viewValue: "Korea, Democratic People's Republic of" },
              { value: "KR", viewValue: "Korea, Republic of" },
              { value: "KW", viewValue: "Kuwait" },
              { value: "KG", viewValue: "Kyrgyzstan" },
              { value: "LA", viewValue: "Lao People's Democratic Republic" },
              { value: "LV", viewValue: "Latvia" },
              { value: "LB", viewValue: "Lebanon" },
              { value: "LS", viewValue: "Lesotho" },
              { value: "LR", viewValue: "Liberia" },
              { value: "LY", viewValue: "Libya" },
              { value: "LI", viewValue: "Liechtenstein" },
              { value: "LT", viewValue: "Lithuania" },
              { value: "LU", viewValue: "Luxembourg" },
              { value: "MO", viewValue: "Macao" },
              { value: "MK", viewValue: "Macedonia, the former Yugoslav Republic of" },
              { value: "MG", viewValue: "Madagascar" },
              { value: "MW", viewValue: "Malawi" },
              { value: "MY", viewValue: "Malaysia" },
              { value: "MV", viewValue: "Maldives" },
              { value: "ML", viewValue: "Mali" },
              { value: "MT", viewValue: "Malta" },
              { value: "MH", viewValue: "Marshall Islands" },
              { value: "MQ", viewValue: "Martinique" },
              { value: "MR", viewValue: "Mauritania" },
              { value: "MU", viewValue: "Mauritius" },
              { value: "YT", viewValue: "Mayotte" },
              { value: "MX", viewValue: "Mexico" },
              { value: "FM", viewValue: "Micronesia, Federated States of" },
              { value: "MD", viewValue: "Moldova, Republic of" },
              { value: "MC", viewValue: "Monaco" },
              { value: "MN", viewValue: "Mongolia" },
              { value: "ME", viewValue: "Montenegro" },
              { value: "MS", viewValue: "Montserrat" },
              { value: "MA", viewValue: "Morocco" },
              { value: "MZ", viewValue: "Mozambique" },
              { value: "MM", viewValue: "Myanmar" },
              { value: "NA", viewValue: "Namibia"},
              { value: "NR", viewValue: "Nauru" },
              { value: "NP", viewValue: "Nepal" },
              { value: "NL", viewValue: "Netherlands" },
              { value: "NC", viewValue: "New Caledonia" },
              { value: "NZ", viewValue: "New Zealand" },
              { value: "NI", viewValue: "Nicaragua"},
              { value: "NE", viewValue: "Niger" },
              { value: "NG", viewValue: "Nigeria" },
              { value: "NU", viewValue: "Niue" },
              { value: "NF", viewValue: "Norfolk Island" },
              { value: "MP", viewValue: "Northern Mariana Islands" },
              { value: "NO", viewValue: "Norway" },
              { value: "OM", viewValue: "Oman" },
              { value: "PK", viewValue: "Pakistan" },
              { value: "PW", viewValue: "Palau" },
              { value: "PS", viewValue: "Palestinian Territory, Occupied" },
              { value: "PA", viewValue: "Panama" },
              { value: "PG", viewValue: "Papua New Guinea" },
              { value: "PY", viewValue: "Paraguay" },
              { value: "PE", viewValue: "Peru" },
              { value: "PH", viewValue: "Philippines" },
              { value: "PN", viewValue: "Pitcairn" },
              { value: "PL", viewValue: "Poland" },
              { value: "PT", viewValue: "Portugal" },
              { value: "PR", viewValue: "Puerto Rico" },
              { value: "QA", viewValue: "Qatar" },
              { value: "RE", viewValue: "Réunion" },
              { value: "RO", viewValue: "Romania" },
              { value: "RU", viewValue: "Russian Federation" },
              { value: "RW", viewValue: "Rwanda" },
              { value: "BL", viewValue: "Saint Barthélemy" },
              { value: "SH", viewValue: "Saint Helena, Ascension and Tristan da Cunha" },
              { value: "KN", viewValue: "Saint Kitts and Nevis" },
              { value: "LC", viewValue: "Saint Lucia" },
              { value: "MF", viewValue: "Saint Martin (French part)" },
              { value: "PM", viewValue: "Saint Pierre and Miquelon" },
              { value: "VC", viewValue: "Saint Vincent and the Grenadines" },
              { value: "WS", viewValue: "Samoa" },
              { value: "SM", viewValue: "San Marino" },
              { value: "ST", viewValue: "Sao Tome and Principe" },
              { value: "SA", viewValue: "Saudi Arabia" },
              { value: "SN", viewValue: "Senegal" },
              { value: "RS", viewValue: "Serbia" },
              { value: "SC", viewValue: "Seychelles" },
              { value: "SL", viewValue: "Sierra Leone" },
              { value: "SG", viewValue: "Singapore" },
              { value: "SX", viewValue: "Sint Maarten (Dutch part)" },
              { value: "SK", viewValue: "Slovakia" },
              { value: "SI", viewValue: "Slovenia" },
              { value: "SB", viewValue: "Solomon Islands" },
              { value: "SO", viewValue: "Somalia" },
              { value: "ZA", viewValue: "South Africa" },
              { value: "GS", viewValue: "South Georgia and the South Sandwich Islands" },
              { value: "SS", viewValue: "South Sudan" },
              { value: "ES", viewValue: "Spain" },
              { value: "LK", viewValue: "Sri Lanka" },
              { value: "SD", viewValue: "Sudan" },
              { value: "SR", viewValue: "Suriname" },
              { value: "SJ", viewValue: "Svalbard and Jan Mayen" },
              { value: "SZ", viewValue: "Swaziland" },
              { value: "SE", viewValue: "Sweden" },
              { value: "CH", viewValue: "Switzerland" },
              { value: "SY", viewValue: "Syrian Arab Republic" },
              { value: "TW", viewValue: "Taiwan, Province of China" },
              { value: "TJ", viewValue: "Tajikistan" },
              { value: "TZ", viewValue: "Tanzania, United Republic of" },
              { value: "TH", viewValue: "Thailand" },
              { value: "TL", viewValue: "Timor-Leste" },
              { value: "TG", viewValue: "Togo" },
              { value: "TK", viewValue: "Tokelau" },
              { value: "TO", viewValue: "Tonga" },
              { value: "TT", viewValue: "Trinidad and Tobago" },
              { value: "TN", viewValue: "Tunisia" },
              { value: "TR", viewValue: "Turkey" },
              { value: "TM", viewValue: "Turkmenistan" },
              { value: "TC", viewValue: "Turks and Caicos Islands" },
              { value: "TV", viewValue: "Tuvalu" },
              { value: "UG", viewValue: "Uganda" },
              { value: "UA", viewValue: "Ukraine" },
              { value: "AE", viewValue: "United Arab Emirates" },
              { value: "GB", viewValue: "United Kingdom" },
              { value: "US", viewValue: "United States" },
              { value: "UM", viewValue: "United States Minor Outlying Islands" },
              { value: "UY", viewValue: "Uruguay" },
              { value: "UZ", viewValue: "Uzbekistan" },
              { value: "VU", viewValue: "Vanuatu" },
              { value: "VE", viewValue: "Venezuela, Bolivarian Republic of" },
              { value: "VN", viewValue: "Viet Nam" },
              { value: "VG", viewValue: "Virgin Islands, British" },
              { value: "VI", viewValue: "Virgin Islands, U.S." },
              { value: "WF", viewValue: "Wallis and Futuna" },
              { value: "EH", viewValue: "Western Sahara" },
              { value: "YE", viewValue: "Yemen" },
              { value: "ZM", viewValue: "Zambia" },
              { value: "ZW", viewValue: "Zimbabwe" }
          ];

}
