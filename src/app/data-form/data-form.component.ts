import { ConsultaCepService } from './../services/consultaCepService';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadosBr } from './../models/estadosBr';
import { DropboxService } from './../services/dropbox.service';
import { Observable } from 'rxjs';
import { CidadesBr } from '../models/cidadesBr';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css'],
})
export class DataFormComponent implements OnInit {
  formulario: FormGroup;
  urlCep = "https://viacep.com.br/ws/";
  estados: Observable<EstadosBr[]>;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private dropboxService: DropboxService, private cepService: ConsultaCepService) {}

  ngOnInit() {
    this.estados = this.dropboxService.getEstadosBr();
    // this.dropboxService.getEstadosBr().subscribe(dados => {this.estados = dados; console.log(dados)});
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // })
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null],
        rua: [null, Validators.required],
        complemento: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
    });
  }

  onSubmit() {
    this.http
      .post('https://httpbin.org/post', this.formulario.value)
      .subscribe((dados) => {console.log(dados);
      this.resetForm()});
  }

  consultarCep() {

    let cep = this.formulario.get('endereco.cep')?.value;
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');
    // Verifica se campo cep possui valor informado.
    if(cep !== "" && cep != null){
      this.cepService.consultarCep(cep).subscribe(dados => this.preencherCampos(dados));
    }
  }

  preencherCampos(dados){
    this.formulario.patchValue({
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

  resetForm(){
    this.formulario.reset();
  }
}