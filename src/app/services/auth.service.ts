import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginDetails } from './dtos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = false;
  private isClient: boolean = true;
  private loginDetails: LoginDetails = { loginType: 2, password: "", userId: 0 };
  private accountType: number = 0;
  authenticationState = new BehaviorSubject(false);


	public get $accountType(): number  {
		return this.accountType;
	}

	public set $accountType(value: number ) {
		this.accountType = value;
	}

	public get $loginDetails(): LoginDetails  {
		return this.loginDetails;
	}
	public set $loginDetails(value: LoginDetails ) {
		this.loginDetails = value;
	}

	public get $isClient(): boolean  {
		return this.isClient;
	}
	public set $isClient(value: boolean ) {
		this.isClient = value;
	}

	public get $isLoggedIn(): boolean  {
		return this.isLoggedIn;
	}
	public set $isLoggedIn(value: boolean ) {
		this.isLoggedIn = value;
		this.authenticationState.next(value);
	}

  constructor() { }
}
