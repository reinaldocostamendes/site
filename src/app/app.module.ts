import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { NgxMaskModule, IConfig } from 'ngx-mask-2';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from "ngx-currency";


export const appRrouters: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'userList', component: UsuarioComponent, canActivate: [GuardiaoGuard] },

  { path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] }
];

export const routes: ModuleWithProviders<any> = RouterModule.forRoot(appRrouters);

export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
