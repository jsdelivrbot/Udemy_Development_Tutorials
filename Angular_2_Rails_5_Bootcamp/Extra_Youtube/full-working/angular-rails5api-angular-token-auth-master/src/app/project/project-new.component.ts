import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'project-new',
  templateUrl: 'project-new.component.html',
  styleUrls: ['project.css']
})
export class ProjectNewComponent {
  project = new Project;
  submitted: boolean = false; //check if the form is submitted

  constructor(
    private projectService: ProjectService
  ) {}
  
  createProject(project: Project) {
    this.submitted = true;
    this.projectService.createProject(project)
        .subscribe(
          data => { return true }, 
          error => {
            console.log("Error creating project");
            return Observable.throw(error);
          });
  }
}