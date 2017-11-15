import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Participant } from '../../models/participant';

@Injectable()
export class ParticipantProvider {

  participant: Participant;

  constructor() {
    console.log('Hello ParticipantProvider Provider');
  }

  setParticipant(p: Participant) {
      this.participant = p;
  }

}
