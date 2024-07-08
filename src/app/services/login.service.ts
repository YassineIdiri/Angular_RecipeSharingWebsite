import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'; // Ajout de l'importation switchMap
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; // Importer map depuis rxjs/operators

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  authSubject = new BehaviorSubject<any>({
      user:null
  });

  login(userData:any):Observable<any>{
    return this.http.post<any>('http://localhost:5454/signin',userData);
  }

  register(userData:any):Observable<any>{
    return this.http.post<any>('http://localhost:5454/signup',userData);
  }

  getUserProfile():Observable<any>{
    const headers = new HttpHeaders({
        Authorization:`Bearer ${localStorage.getItem('jwt')}`
      })
    return this.http.get<any>('http://localhost:5454/api/users/profile',{headers}).pipe(
      tap((user)=>{
        const currentState = this.authSubject.value;
        this.authSubject.next({...currentState,user})
      })
    );
  }

  logout()
  {
    localStorage.clear()
    this.authSubject.next({});
  }
}