import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-torneios',
  templateUrl: './lista-torneios.component.html',
  styleUrls: ['./lista-torneios.component.css']
})
export class ListaTorneiosComponent implements OnInit {

  torneios = [
    { id: 1, nome: 'Torneio 1', url: 'http://www.torneio.com.br/' },
    { id: 2, nome: 'Torneio 2', url: 'http://www.torneio.com.br/' },
    { id: 3, nome: 'Torneio 3', url: 'http://www.torneio.com.br/' },
    { id: 4, nome: 'Torneio 4', url: 'http://www.torneio.com.br/' },
    { id: 5, nome: 'Torneio 5', url: 'http://www.torneio.com.br/' },
    { id: 6, nome: 'Torneio 6', url: 'http://www.torneio.com.br/' },
    { id: 7, nome: 'Torneio 7', url: 'http://www.torneio.com.br/' },
    { id: 8, nome: 'Torneio 8', url: 'http://www.torneio.com.br/' },
    { id: 9, nome: 'Torneio 9', url: 'http://www.torneio.com.br/' },
    { id: 10, nome: 'Torneio 10', url: 'http://www.torneio.com.br/' },
    { id: 11, nome: 'Torneio 11', url: 'http://www.torneio.com.br/' },
    { id: 12, nome: 'Torneio 12', url: 'http://www.torneio.com.br/' },
    { id: 13, nome: 'Torneio 13', url: 'http://www.torneio.com.br/' },
    { id: 14, nome: 'Torneio 14', url: 'http://www.torneio.com.br/' },
    { id: 15, nome: 'Torneio 15', url: 'http://www.torneio.com.br/' },
    { id: 16, nome: 'Torneio 16', url: 'http://www.torneio.com.br/' },
    { id: 17, nome: 'Torneio 17', url: 'http://www.torneio.com.br/' },
    { id: 18, nome: 'Torneio 18', url: 'http://www.torneio.com.br/' },
    { id: 19, nome: 'Torneio 19', url: 'http://www.torneio.com.br/' },
    { id: 20, nome: 'Torneio 20', url: 'http://www.torneio.com.br/' },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
