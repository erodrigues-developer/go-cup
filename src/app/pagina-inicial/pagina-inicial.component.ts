import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  constructor(private rota: Router) { 
    if(localStorage['token'] != null){
      this.rota.navigate(['']);
    }
    else{
      this.rota.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
