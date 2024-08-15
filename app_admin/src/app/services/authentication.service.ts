import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  // Save token to Storage provider
  private saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Get token from Storage provider
  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  // Logout of application and remove JWT from storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Boolean to determine if logged in and token is still valid
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token)  {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    return false;
  }

  // Retrieve current user if logged in
  public getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return null;
  }

  // Login method that leverages the login method in TripDataService
  public login(email: string, password: string): Observable<AuthResponse> {
    const credentials = {email, password};
    return this.tripDataService.login(credentials).pipe(
      map((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
        return authResp;
      })
    );
  }

  // Register method that leverages the register method in TripDataService
  public register(user: User, passwd: string): Observable<AuthResponse> {
    return this.tripDataService.register(user, passwd);
  }
}