import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Dropdown, Healthcheck, QueryResponse, UserProfile } from './dtos.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private countries: Dropdown[] = [];
  private queryCategories:Dropdown[] = [];
  private querySubCategories:Dropdown[] = [];
  private healthcheck: Healthcheck = {
    assets: {
      cash: 0,
      equity: 0,
      debt: 0,
      realEstate: 0,
      preciousMetals: 0,
    },
    loan: []
  };
  private queryType: string = "";
  private userProfile: UserProfile = {
    userName: "",
    photoUrl: "",
    phone: "",
    skypeId: "",
    emailId: "",
  }
  public gotPayments = new BehaviorSubject(false);


  public get $countries(): Dropdown[] {
    return this.countries;
  }

  public set $countries(value: Dropdown[]) {
    this.countries = value;
  }


  public get $healthcheck(): Healthcheck  {
		return this.healthcheck;
	}

	public set $healthcheck(value: Healthcheck ) {
		this.healthcheck = value;
	}


	public get $queryCategories(): Dropdown[]  {
		return this.queryCategories;
	}

	public set $queryCategories(value: Dropdown[] ) {
		this.queryCategories = value;
	}


	public get $querySubCategories(): Dropdown[]  {
		return this.querySubCategories;
	}

	public set $querySubCategories(value: Dropdown[] ) {
		this.querySubCategories = value;
	}


	public get $queryType(): string  {
		return this.queryType;
	}

	public set $queryType(value: string ) {
		this.queryType = value;
	}

  public get $userProfile(): UserProfile {
    return this.userProfile;
  }

  public set $userProfile(value: UserProfile) {
    this.userProfile = value;
  }



  constructor( private apiService:ApiService) { }

  public getCategories() {
    this.apiService.getQueryCategories()
      .subscribe(response => {
        if (response['errorCode'] == 0) {
          var data = JSON.parse(response['data'])
          console.log(data);
          data.forEach(category => {
            this.querySubCategories = []
            category.subCategories.forEach(subCategory => {
              this.querySubCategories = [...this.querySubCategories, { value: subCategory.subCategoryId, text: subCategory.subCategory }]
            });
            this.queryCategories = [...this.queryCategories, { value: category.categoryId, text: category.category, subValue: this.querySubCategories }]
            console.log(this.queryCategories);
          });
          // this.askQuery.controls['category'].setValue(this.queryCategories);
        }
      })
  }


  async getCountries() {
    await this.apiService.getCountryList()
      .then(response => {
        console.log(response);
        this.countries = []
        response.forEach(elmt => {
          this.countries.push({ value: elmt.alpha2Code, text: elmt.name })
        })
      })
  }


  async getUserProfile() {
    await this.apiService.viewProfile()
      .then((data) => {
        if (data['errorCode'] == 0) {
          var details = JSON.parse(data['data'])
          this.userProfile = details;
          console.log(this.userProfile);
        }
        console.log(data);
      })
  }

}
