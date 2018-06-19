import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TorneiosService } from '../../../torneios.service';

@Component({
  selector: 'app-form-participantes',
  templateUrl: './form-participantes.component.html',
  styleUrls: ['./form-participantes.component.css']
})
export class FormParticipantesComponent implements OnInit {

  public id;

  constructor(private svc: LoginService, private rota: Router, 
              private torneio: TorneiosService, private route: ActivatedRoute) { 
    this.auth();
  }

  private async auth() {
    let logado;

    logado = await this.svc.verificaToken();

    if (!logado) {
      this.rota.navigate(['/login'])
    }
  }

  ngOnInit() {
  }

  setId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
