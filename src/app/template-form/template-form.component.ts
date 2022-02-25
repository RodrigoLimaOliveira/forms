import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  urlCep = "https://viacep.com.br/ws/";
  
  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
  }

  onSubmit(formulario){
    console.log(formulario.value);
  }

  consultarCep(cep, formulario) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    // Verifica se campo cep possui valor informado.
    if(cep != ""){
      // Expressão regular para validar o CEP.
      const validaCep = /^[0-9]{8}$/;
      if(validaCep.test(cep)){
        this.http.get(`${this.urlCep}${cep}/json`).subscribe(dados => this.preencherCampos(dados, formulario));
      }
    }
  }
  preencherCampos(dados, formulario){
    //  formulario.setValue({
    //    nome: formulario.value.nome,
    //    email: formulario.value.email,
    //  })

     formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
     })
     
  }
}
