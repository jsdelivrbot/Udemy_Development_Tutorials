import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

import { AppComponent } from './app.component';
import { PostListComponent } from './post/post-list.component';
import { PostShowComponent } from './post/post-show.component';
import { PostNewComponent } from './post/post-new.component';
import { PostService } from './post/post.service';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostShowComponent,
    PostNewComponent,
    HomepageComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PostService,
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
