import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios!: Array<User>;
  nome!: String;
  page: number = 1;
  total: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private usuarioService: UsuarioService) {


  }

  ngOnInit() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.usuarios = data.content;
      this.total =data.totalElements;
    });
  }
  deleteUsuario(id: Number,index:any) {
    if (confirm('Deseja mesmo remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
      /*  console.log("Retorno do metodo delete: " + data);
        this.usuarioService.getUsuarioList().subscribe(data => {
          this.usuarios = data.content;
          this.total =data.totalElements;
        });*/
this.usuarios.splice(index,1);
      });
    }
  }
  consultarUser() {
    if(this.nome==''){
      this.usuarioService.getUsuarioList().subscribe(data => {
        this.usuarios = data.content;
        this.total =data.totalElements;
      });
    }else{
      this.usuarioService.consultarUser(this.nome).subscribe(data => {
        this.usuarios = data.content;
        this.total =data.totalElements;
      });
    }
  
  }

  onTableDataChange(event: any) {
    this.page = event;
if(this.nome!=''){
  this.usuarioService.consultarUserPage(this.nome,this.page).subscribe(data => {
    this.usuarios = data.content;
    this.total =data.totalElements;
  });
}else{

  this.usuarioService.getUsuarioListPage(event).subscribe(data => {
    this.usuarios = data.content;
    this.total =data.totalElements;
  });
}

    console.info(event);
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.usuarios = data.content;
      this.total =data.totalElements;
    });
  }
}
