import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableauAdmComponent } from './tableau-adm/tableau-adm.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TableauArchComponent } from './tableau-arch/tableau-arch.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModifierComponent } from './modifier/modifier.component';
import { TableauUserComponent } from './tableau-user/tableau-user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ModificationComponent } from './modification/modification.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnectionComponent } from './connection/connection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FilterActivePipe } from './pipes/filter-active.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { FilterInactivePipe } from './pipes/filter-inactive.pipe';
import { SearchInactifPipe } from './pipes/search-inactif.pipe';
import { ListeComponent } from './tableau-adm/liste/liste.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModifprofilComponent } from './modifprofil/modifprofil.component';
const config: SocketIoConfig = {
	url: 'http://localhost:3001', // socket server url;
	options: {
		transports: ['websocket']
	}
}
@NgModule({
  declarations: [
    AppComponent,
    TableauAdmComponent,
    TableauArchComponent,
    ModifierComponent,
    TableauUserComponent,
    AdminLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    InscriptionComponent,
    ConnectionComponent,
    DashboardComponent,
    ModificationComponent,
    AdminLayoutComponent,
    FilterActivePipe,
    SearchPipe,
    FilterInactivePipe,
    SearchInactifPipe,
    ListeComponent,
    ModifprofilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
