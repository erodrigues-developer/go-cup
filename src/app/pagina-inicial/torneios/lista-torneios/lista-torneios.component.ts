import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { TorneiosService } from '../../../torneios.service';
import { LoginService } from '../../../login.service';
import { Router } from '@angular/router';
import { IgxGridCellComponent } from 'igniteui-angular/grid/cell.component';
import { IgxGridComponent } from 'igniteui-angular/grid/grid.component';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-lista-torneios',
  templateUrl: './lista-torneios.component.html',
  styleUrls: ['./lista-torneios.component.css']
})
export class ListaTorneiosComponent implements OnInit {
  @ViewChild("grid1")
  public grid1: IgxGridComponent;
  public selection = true;

  public idTorneio = "";
  public keyTorneio = "";
  
  @Output()
  public idSetado = new EventEmitter();

  torneios = [];

  constructor(private svc: LoginService, private rota: Router, private torneio: TorneiosService) { 
  }
  
  ngOnInit() {
    this.auth();
    this.get();
  }

  private async auth(){
    let logado;

    logado = await this.svc.verificaToken();

    if (!logado) {
      this.rota.navigate(['/login'])
    }
  }


  private async get(){
    let v;
    
    v = await this.torneio.getTorneios();

    this.torneios = v;
  }

  public handleRowSelection(args) {
    const targetCell = args.cell as IgxGridCellComponent;
    
    if (!this.selection) {
        this.grid1.selectRows([targetCell.row.rowID], true);
    }
    
    this.idTorneio = targetCell.row.rowID.id;
    this.torneio.setIdTorneioSelecionado(this.idTorneio);

    this.keyTorneio = targetCell.row.rowID.key;
    this.torneio.setKeyTorneioSelecionado(this.keyTorneio);
}

}