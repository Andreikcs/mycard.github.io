import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PessoaService } from './../../services/pessoaservice';
import { Pessoa } from './../../model/pessoa';
import { SetorService } from '../../services/setor-service';
import { Setor } from '../../model/setor';


@Component({
  selector: 'page-home',
  templateUrl: 'empresa_funcionario.html',
  providers: [PessoaService, SetorService]
})

export class EmpresaFuncionarioPage {

  public setores: Array<Setor>;
  public setor: Setor = new Setor();

  public pessoa: Pessoa = new Pessoa();
  public funcionarios: Array<Pessoa>

  constructor(public navCtrl: NavController,
    private pessoaService: PessoaService,
    private setorService: SetorService) {

    this.getSetores();

    this.getFuncionarios();
  }


  public goToSave() {
    this.pessoa.tipo = 3;
    this.pessoaService.save(this.pessoa).subscribe((pes) => {
      if (pes != null) {
        this.pessoa = pes;
      }
    }, error => {

    });
  }


  public getFuncionarios() {
    this.pessoaService.buscarPorTipo(3).subscribe((lista: Pessoa[]) => {
      this.funcionarios = lista;
    })
  }

  public getSetores() {
    this.setorService.buscarPorNomeSetor("").subscribe((lista: Setor[]) => {
      this.setores = lista;
    })
  }
}
