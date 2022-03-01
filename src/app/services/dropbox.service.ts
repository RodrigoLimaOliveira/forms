import { CidadesBr } from './../models/cidadesBr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadosBr } from './../models/estadosBr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadosBr[]>('assets/dados/estadosbr.json');
  }

  getCidades(idEstado: number){
    return this.http.get<CidadesBr[]>('assets/dados/cidadesbr.json').pipe(map((cidades: CidadesBr[]) => cidades.filter(c => c.estado == idEstado)));
  }
}
