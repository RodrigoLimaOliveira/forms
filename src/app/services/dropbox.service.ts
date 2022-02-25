import { EstadosBr } from './../models/estadosBr';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get('assets/dados/estadosbr.json');
  }
}
