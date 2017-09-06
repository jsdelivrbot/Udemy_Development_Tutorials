import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //Rx
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Project } from './project';

@Injectable() 
export class ProjectService {
  headers: Headers;
  options: RequestOptions;
  private projectsUrl = 'http://localhost:3000/projects';

  constructor(
    private http: Http
  ){
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  getProjects(): Observable<Project[]> {
    return this.http.get(this.projectsUrl)
                    .map((response: Response) => <Project[]>response.json())
  }

  getProject(id: number) {
    return this.http.get(this.projectsUrl + "/" + id + '.json');
  }

  createProject(project: Project): Observable<Project> {
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let options = new RequestOptions({headers: headers});
    return this.http.post(this.projectsUrl, JSON.stringify(project), 
            this.options).map((res: Response) => res.json());
  }

  deleteProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.delete(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);         
  }

  updateProject(project: Project): Observable<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http.put(url, JSON.stringify(project), 
            this.options).map((res: Response) => res.json())
                          .catch(this.handleError);
  } 

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
 
}