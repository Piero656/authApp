import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }


  constructor(
    private http: HttpClient
  ) { }


  registro(name:string, email:string, password:string) {

    const url = `${this.baseUrl}/auth/new`
    const nuevo = {name,email,password}

    return this.http.post<AuthResponse>(url,nuevo)
    .pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )

  }

  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
              email: resp.email!
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }


  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!
        }
        return resp.ok
      }),
      catchError(resp => of(false))
    );

  }


  logOut() {
    localStorage.clear();
  }



}