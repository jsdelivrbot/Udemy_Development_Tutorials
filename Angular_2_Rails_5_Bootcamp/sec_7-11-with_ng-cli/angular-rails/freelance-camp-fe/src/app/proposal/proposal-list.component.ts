import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Proposal } from './proposal';
import { ProposalService } from './proposal.service';

@Component({
  moduleId: module.id,
  selector: 'proposal-list',
  templateUrl: 'proposal-list.component.html',
  // styleUrls: ['proposal-list.component.css'],
  providers: [ProposalService]
})
export class ProposalListComponent implements OnInit {

  proposals: Proposal[];
  errorMessage: string;
  mode = 'Observable';

  // constructor for dependency injections
  constructor(
    private proposalService: ProposalService,
    private router: Router
  ) {}

  ngOnInit() {
    let timer = Observable.timer(0, 5000); // make calls in the background every 5 sec
    timer.subscribe(() => this.getProposals());
  }

  getProposals() {
    this.proposalService.getProposals()
    // subscribe is what actually making call
      .subscribe(
        // subscribe takes two functions as arg
        proposals => this.proposals = proposals,
        error => this.errorMessage = <any>error
      );
  }

  goToShow(proposal: Proposal): void {
    let link = ['/proposal', proposal.id];
    this.router.navigate(link);
  }
}
