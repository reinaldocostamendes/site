import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Curso-Angular-REST';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  public sair() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  public esconderBarra() {
    if (localStorage.getItem('token') != null /*&& (localStorage.getItem('token').toString().trim() != null)*/) {
      return false;
    } else {
      return true;
    }

  }
  
}
