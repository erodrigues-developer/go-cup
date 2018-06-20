import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-detalhe-torneio',
  templateUrl: './detalhe-torneio.component.html',
  styleUrls: ['./detalhe-torneio.component.css']
})
export class DetalheTorneioComponent implements OnInit {

  url = "";
  safeURL;
  dangerousUrl

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.setUrl();
  }

  /**
   * Recebe a url e seta na propriedade da classe
   * @author Erodrigues
   * @since 19/06/2018
   */
  setUrl() {
    this.url = this.route.snapshot.paramMap.get('url');
    this.getUrl();
  }

  getUrl() {
    this.dangerousUrl = "https://challonge.com/pt_BR/"+this.url+"/module";

    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousUrl);
  }
   

}
