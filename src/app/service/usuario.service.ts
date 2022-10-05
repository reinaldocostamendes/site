import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
getProfissaoList():Observable<any>{
  return this.http.get<any>(AppConstants.getBaseUrlPath+"profissao/");
}
  getUsuarioList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }
  getUsuarioListPage(page:any): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl+'page/'+page);
  }
  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, { responseType: 'text' })
  }
  consultarUser(nome:String): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome);
  }
  consultarUserPage(nome:String,page:any): Observable<any> {
    return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome+"/page/"+page);
  }
  getUsuario(id:any): Observable<any> {
  
    return this.http.get<any>(AppConstants.baseUrl + id);
  }
  salvarUsuario(user:User): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }
  updateUsuario(user:User): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }
  removerTelefone(id:Number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + "removerTelefone/" + id, { responseType: 'text' });
  }
  userAutenticado() {
    if (localStorage.getItem('token') != null /*&& localStorage.getItem('token').toString().trim() != null*/) {
      return true;
    } else {
      return false;
    }
  }
}
