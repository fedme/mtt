import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
import { Pair } from '../../models/pair';
import { OutputEstimationQuestion } from '../../models/output-estimation-question';
import { Utils } from '../utils/utils';
import { Stimuli } from '../stimuli/stimuli';
import 'rxjs/add/operator/map';
import { NUMBERS } from '../stimuli/constants';

@Injectable()
export class OutputEstimationProvider {

  questions: OutputEstimationQuestion[] = [];
  questionsCounter: number = -1;

  constructor(private utils: Utils, private stimuli: Stimuli) {
    console.log('Hello OutputEstimationProvider Provider');
    this.generateQuestions();
  }

  generateQuestions() {

    // generate monsters IDs
    let ids = [];
    let counter = NUMBERS.TRAINING_CARDS + 1;
    while (ids.length < (NUMBERS.PAIR_COMPARISONS*2)) {
      ids.push("monster"+counter);
      counter++;
    }
    this.utils.shuffleArray(ids);
    console.log(ids);

    // TODO: generate monsters
    
    
  }

  getNextQuestion() {
    this.questionsCounter++;
    return this.questions[this.questionsCounter];
  }

  recordAnswer(answer: OutputEstimationQuestion) {
    this.questions[this.questionsCounter] = answer;
  }

  runOutOfQuestions() {
    return this.questionsCounter >= (this.questions.length - 1);
  }

}
