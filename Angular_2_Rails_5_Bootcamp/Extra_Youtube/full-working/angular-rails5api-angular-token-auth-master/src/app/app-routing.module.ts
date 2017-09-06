import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './project/project-list.component';
import { ProjectShowComponent } from './project/project-show.component';
import { ProjectNewComponent } from './project/project-new.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { LoggedInGuard } from './authentication/logged-in-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home',            component: HomepageComponent },
  { path: 'projects',        component: ProjectListComponent },
  { path: 'project/new',     component: ProjectNewComponent },
  { path: 'projects/:id',    component: ProjectShowComponent },
  { path: 'user',            component: UserComponent},
  {
    path: 'profile',
    loadChildren: 'app/account/account.module#AccountModule',
    canLoad: [LoggedInGuard]
  }
] 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  
}


