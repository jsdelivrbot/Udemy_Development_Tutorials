import { Component, OnInit } from '@angular/core';
import { Document } from './document';

@Component({
  moduleId: module.id,
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  pageTitle: string = 'Document Dashboard'
  documents: Document[] = [
    {
      title: 'My first Doc',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      file_url: 'http://google.com',
      update_at: '05/09/17',
      image_url: 'http://google.com',
    },
    {
      title: 'My second Doc',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      file_url: 'http://google.com',
      update_at: '05/09/17',
      image_url: 'http://google.com',
    },
    {
      title: 'My third Doc',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      file_url: 'http://google.com',
      update_at: '05/09/17',
      image_url: 'http://google.com',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
