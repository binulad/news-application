import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoreModule } from './core/core.module';
import { AppShellComponent } from './app-shell/app-shell.component';

@NgModule({
  declarations: [AppComponent, AppShellComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    ModalModule.forRoot(),
    AuthModule.forRoot({
      domain: 'dev-ynctyrjr13uwv5zv.us.auth0.com',
      clientId: 'EvwqlKxj4RVKObQvxf8OvNRJpCUsKHyk',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
