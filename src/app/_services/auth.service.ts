import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user.model';
import { BehaviorSubject, first, map, Observable, ReplaySubject, tap ,Subject} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Observable<User>;

  currentUserSubject: BehaviorSubject<User>;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user')!)
     // JSON.parse(this.cookieService.get('user')!)

    );
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  
  logout() {
    
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.clear();

    this.currentUserSubject.next(null!);
    //this.router.navigate(['/logout'])
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }  
}
