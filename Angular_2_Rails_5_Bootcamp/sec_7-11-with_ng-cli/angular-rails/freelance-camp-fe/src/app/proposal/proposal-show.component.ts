import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import { Proposal } from './proposal';
import { ProposalService } from './proposal.service';

@Component({
  moduleId: module.id,
  selector: 'proposal-show',
  templateUrl: 'proposal-show.component.html',
  styleUrls: ['proposal-show.component.css'],
  providers: [ ProposalService ]
})
export class ProposalShowComponent implements OnInit {
  // id: number;
  // routeId: any;

  constructor(
    private http: Http,
    private proposalService: ProposalService,
    private route: ActivatedRoute
  ) {}

  @Input()
  proposal: Proposal;

  ngOnInit(): void {
    // // system going out to capture the route id, and make this set the id
    // this.routeId = this.route.params.subscribe(
    //   params => {
    //     this.id = +params['id']; // + sign take the param and convert into number
    //   }
    // );
    // // subscribe gives the access of the obj we are communicating with
    let proposalRequest = this.route.params
      .flatMap((params: Params) =>
        this.proposalService.getProposal(+params['id'])
      );
    // creating a proposal request
    // flatMap map all the parameters
    // getProposal maing the API request
    proposalRequest.subscribe(response => this.proposal = response.json());
  }
}
