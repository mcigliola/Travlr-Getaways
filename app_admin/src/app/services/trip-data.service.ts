import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }
  private baseUrl = 'http://localhost:3000/api';

  // Method to build the full URL
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  private getHttpOptions() {
    const token = this.storage.getItem('travlr-token');
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  public getTrips() : Observable<Trip[]> {
    const url = this.buildUrl('trips');
    return this.http.get<Trip[]>(url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    const url = this.buildUrl('trips');
    return this.http.post<Trip>(url, formData, this.getHttpOptions());
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    //console.log('Inside TripDataService::getTrip');
    const url = this.buildUrl('trips');
    return this.http.get<Trip[]>(url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip>  {
    //console.log('Inside TripDataService::updateTrip');
    const url = this.buildUrl('trips');
    return this.http.put<Trip>(url + '/' + formData.code, formData, this.getHttpOptions());
  }

  // Call to /login endpoint, returns JWT
  public login(user: { email: string; password: string }): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user);
  }

  // Call to /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    // Combine the user and password into a single object to match the API call structure
    const credentials = { email: user.email, password: passwd };
    return this.handleAuthAPICall('register', credentials);
  }

  // Helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, credentials: { email: string; password: string }): Observable<AuthResponse> {
    const url: string = `${this.baseUrl}/${endpoint}`;
    return this.http.post<AuthResponse>(url, credentials).pipe(
      map((response: AuthResponse) => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error (e.g., network error)
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error (e.g., 404, 500 status codes)
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }
  
}
