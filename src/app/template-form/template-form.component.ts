import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ConsultaCepService } from '../services/consultaCepService';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
 
  constructor(private http: HttpClient, private cepService: ConsultaCepService ) { }

  ngOnInit(): void {
  }

  onSubmit(formulario){
    console.log(formulario.value);
  }

  consultarCep(cep, formulario) {
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    
    if(cep !== "" && cep != null){
      this.cepService.consultarCep(cep).subscribe(dados => this.preencherCampos(dados, formulario));
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
