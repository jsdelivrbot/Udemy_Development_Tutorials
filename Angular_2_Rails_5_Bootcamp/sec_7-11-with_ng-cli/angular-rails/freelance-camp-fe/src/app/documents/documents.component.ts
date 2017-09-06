import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Document } from './document';
import { DocumentService } from './document.service';

@Component({
  moduleId: module.id,
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentService]
})
export class DocumentsComponent implements OnInit {
  pageTitle: string = 'Document Dashboard';
  documents: Document[];
  errorMessage: string;
  mode = 'Observable';

  constructor(
    private documentService: DocumentService
  ) {}

  ngOnInit() {
    let timer = Observable.timer(0, 5000); // make calls in the background every 5 sec
    timer.subscribe(() => this.getDocuments());
  }

  getDocuments() {
    this.documentService.getDocuments()
    // subscribe is what actually making call
      .subscribe(
        // subscribe takes two functions as arg
        documents => this.documents = documents,
        error => this.errorMessage = <any>error
      );
  }
}
