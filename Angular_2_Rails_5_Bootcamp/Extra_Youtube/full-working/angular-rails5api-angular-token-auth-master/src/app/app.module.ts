import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project/project-list.component';
import { ProjectShowComponent } from './project/project-show.component';
import { ProjectNewComponent } from './project/project-new.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectService } from './project/project.service';

import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { Angular2TokenService } from 'angular2-token';

import { SharedModule }         from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';

import { AuthLinksComponent } from './authentication/auth-links.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectShowComponent,
    ProjectNewComponent,
    HomepageComponent,
    AuthLinksComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    AuthenticationModule
  ],
  providers: [
    Angular2TokenService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
