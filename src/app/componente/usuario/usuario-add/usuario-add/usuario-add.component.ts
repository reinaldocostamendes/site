import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';

@Injectable()
export class FormaDateAdapter extends NgbDateAdapter<string>{
  readonly DELIMETER ='/';
  fromModel(value: string ): NgbDateStruct {
    if(value){
      let date = value.split(this.DELIMETER);
      return {
      day: parseInt(date[0],10),
      month:parseInt(date[1],10),
      year:parseInt(date[2],10)
    };
   
  }
  return {day:1,month:1,year:2022};
  }
  toModel(date: NgbDateStruct |null): string  {
    return date ? date.day +this.DELIMETER +date.month+this.DELIMETER+date.year : '';
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter{
  readonly DELIMETER ='/';
  parse(value: string | null): NgbDateStruct  {
    if(value){
      let date = value.split(this.DELIMETER);
      return {
      day: parseInt(date[0],10),
      month:parseInt(date[1],10),
      year:parseInt(date[2],10)
    };
   
  } return {day:1,month:1,year:2022};
    }
  format(date: NgbDateStruct | null): string {
    return date ? validarDia(date.day) +this.DELIMETER +validarDia(date.month)+this.DELIMETER+date.year : '';
  }

toModel(date:NgbDateStruct | null): String | null{
  return date ? date.day+1 +this.DELIMETER +date.month+this.DELIMETER+date.year : null;
}
}
function validarDia(valor:any) {
  if(valor.toString != '' && parseInt(valor)<10){
    return '0'+valor;
  }
  return valor;
}
@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers:[{provide: NgbDateParserFormatter, useClass: FormataData}, 
  {provide: NgbDateAdapter, useClass: FormaDateAdapter }]
})
export class UsuarioAddComponent implements OnInit {
  usuario = new User();
  telefone = new Telefone();
  profissoes!: Array<Profissao>;

  constructor(private routeActive: ActivatedRoute, private usuarioServie: UsuarioService) { }

  ngOnInit() {
    this.usuarioServie.getProfissaoList().subscribe(data=>{
    this.profissoes=data;
    });
    let id = this.routeActive.snapshot.paramMap.get('id');
    console.log(id);

    if (id != null) {
      this.usuarioServie.getUsuario(id).subscribe(data => {
        this.usuario = data;
        console.info(this.usuario.dataNascimento);
        if(this.usuario.profissao==null){
          this.usuario.profissao=new Profissao();
        }
        console.log(this.usuario.nome);
      });
    }
  }
  salvarUser() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.usuarioServie.updateUsuario(this.usuario).subscribe(data => {
        this.novo();
      })
    } else {
      this.usuarioServie.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
      });
    }
  }
  deletarTelefone(id: Number | null, i: any) {
    if (id == null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }

    if (id != null && confirm("Deseja remover?")) {
      this.usuarioServie.removerTelefone(id).subscribe(data => {

        this.usuario.telefones.splice(i, 1);//remove o telefone da lista ou por index-1

      });
    }
  }
  addFone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }
    this.usuario.telefones.push(this.telefone);
    this.telefone=new Telefone();
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

}
