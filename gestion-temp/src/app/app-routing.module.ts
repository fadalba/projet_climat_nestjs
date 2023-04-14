import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauAdmComponent } from './tableau-adm/tableau-adm.component';
import { ModifierComponent } from './modifier/modifier.component';
import { TableauUserComponent } from './tableau-user/tableau-user.component';
import { TableauArchComponent } from './tableau-arch/tableau-arch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConnectionComponent } from './connection/connection.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ModificationComponent } from './modification/modification.component';
import { AuthGuard } from './guards/auth.guard';
import { ModifprofilComponent } from './modifprofil/modifprofil.component';




const routes: Routes = [
  /* { path: "connection", pathMatch: "full", component: ConnectionComponent}, */
  /* { path: "modification", component: ModificationComponent }, */
  { path: "", pathMatch: "full", component: ConnectionComponent},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "inscription", component: InscriptionComponent, canActivate: [AuthGuard]},
  {path: 'tableau-adm',component:TableauAdmComponent, canActivate: [AuthGuard]},
 /*  {path: 'modifier/:id',component:ModifierComponent}, */
  {path: 'tableau-user',component:TableauUserComponent, canActivate: [AuthGuard]},
  {path: 'tableau-arch',component:TableauArchComponent, canActivate: [AuthGuard]},
  {path: "modifprofil", component: ModifprofilComponent, canActivate: [AuthGuard]},
  {path: 'modifpassword',component:ModifprofilComponent, canActivate: [AuthGuard]},
  /* {path: "modification", component: ModifierComponent}, */
  {path: '**', redirectTo: ""},
/*   {path: "modification", component: ModifierComponent}, */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
