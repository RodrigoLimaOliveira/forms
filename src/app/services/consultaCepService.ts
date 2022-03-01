import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  urlCep = "https://viacep.com.br/ws/";

  constructor(private http: HttpClient) { }

  consultarCep(cep: string) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    // Verifica se campo cep possui valor informado.
    if(cep != ""){
      // Expressão regular para validar o CEP.
      const validaCep = /^[0-9]{8}$/;
      if(validaCep.test(cep)){
        return this.http.get(`${this.urlCep}${cep}/json`);
      }
    }
    return of({});
  }
}
