import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ListaTorneiosComponent } from './pagina-inicial/torneios/lista-torneios/lista-torneios.component';
import { DetalheTorneioComponent } from './pagina-inicial/torneios/detalhe-torneio/detalhe-torneio.component';
import { FormTorneiosComponent } from './pagina-inicial/torneios/form-torneios/form-torneios.component';
import { FormParticipantesComponent } from './pagina-inicial/torneios/form-participantes/form-participantes.component';
const routes: Routes = [
  { path: '', redirectTo: '/pagina-inicial', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pagina-inicial', component: PaginaInicialComponent, children: [
    { path: '' , component: ListaTorneiosComponent },
    { path: 'detalhe-torneio/:id', component: DetalheTorneioComponent },
    { path: 'form-torneios', component: FormTorneiosComponent },
    { path: 'form-participantes/:id/:key', component: FormParticipantesComponent }
    
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
