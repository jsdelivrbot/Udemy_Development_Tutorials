import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Proposal } from './proposal';

@Component({
  moduleId: module.id,
  selector: 'proposal-show',
  templateUrl: 'proposal-show.component.html'
})
export class ProposalShowComponent implements OnInit {
  id: number;
  routeId: any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // system going out to capture the route id, and make this set the id
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id']; // + sign take the param and convert into number
      }
    );
    // subscribe gives the access of the obj we are communicating with
  }
}
