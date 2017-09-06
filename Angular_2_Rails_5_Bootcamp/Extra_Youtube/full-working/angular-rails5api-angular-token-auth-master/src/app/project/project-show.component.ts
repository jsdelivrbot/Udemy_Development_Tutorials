import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'project-show',
  templateUrl: 'project-show.component.html',
  styleUrls: ['project.css']
})
export class ProjectShowComponent implements OnInit {

  id: number;
  routeId: any;
  errorMessage: any;
  returnUrl: string;
  editBtnClicked: boolean = false;

  constructor(
    private http: Http,
    private route: ActivatedRoute, 
    private router: Router,
    private projectService: ProjectService
  ) {}

  @Input()
  project: Project;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/projects';
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      });
    let projectRequest = this.route.params
        .flatMap((params: Params) => 
          this.projectService.getProject(+params['id']));

    projectRequest.subscribe(response => this.project = response.json());
  }

  delete(project: Project) {
    this.projectService.deleteProject(this.project.id)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => this.errorMessage = error
      );
  }

  update(project: Project) {
    this.editBtnClicked = true;
    this.projectService.updateProject(project)
        .subscribe(
          data => { return true }, 
          error => {
            console.log("Error Editing Project");
            return Observable.throw(error);
          });
  }

  onUpdateClicked() {
    this.router.navigate([this.returnUrl]);
    this.editBtnClicked = false;
    window.location.reload();
  }

 
}
