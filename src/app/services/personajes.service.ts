import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private _http: HttpClient) { }

  addPersonaje(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/personajes',data);
  }

  putPersonaje(id: number,data:any): Observable<any>{
    return this._http.put(`http://localhost:3000/personajes/${id}`,data);
  }

  getPersonajes(): Observable<any>{
    return this._http.get('http://localhost:3000/personajes');
  }
  
  deletePersonajes(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/personajes/${id}`);
  }
}
