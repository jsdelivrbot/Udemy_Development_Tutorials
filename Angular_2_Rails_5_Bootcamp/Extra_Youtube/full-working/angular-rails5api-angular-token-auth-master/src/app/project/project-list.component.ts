import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    let timer = Observable.timer(0, 5000);
    timer.subscribe(() => this.getProjects());
  }

  getProjects() {
    this.projectService.getProjects()
        .subscribe(
          projects => this.projects = projects
        );
  }

  goToShow(project: Project): void {
    let link = ['/projects', project.id];
    this.router.navigate(link);
  }

}
