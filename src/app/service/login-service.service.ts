import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  recuperar(login:any) {
let user = new User();
user.login=login;
    return this.http.post(AppConstants.getBaseUrlPath+'recuperar/', user).subscribe(data => {
 alert(JSON.parse(JSON.stringify(data)).error);
    },
      error => {
        console.error("Erro ao fazer login");
      }
    )
  }

  login(usuario:any) {

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      /*Retorno http*/
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
      localStorage.setItem("token", token);
      this.router.navigate(['home']);
      console.log(token);
    },
      error => {
        console.error("Erro ao fazer login");
      }
    )
  }
}
