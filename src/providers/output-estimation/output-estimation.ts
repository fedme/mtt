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
    let counter = NUMBERS.TRAINING_CARDS + NUMBERS.PAIR_COMPARISONS + 1;
    const questionsNumber = NUMBERS.OUTPUT_ESTIMATION_EXTRAPOLATION + NUMBERS.OUTPUT_ESTIMATION_INTERPOLATION
      + NUMBERS.OUTPUT_ESTIMATION_RECALL;
    while (ids.length < questionsNumber) {
      ids.push("monster" + counter);
      counter++;
    }
    this.utils.shuffleArray(ids);
    console.log(ids);

    // TODO: generate monsters


    this.questions.push(new OutputEstimationQuestion("recall", new Monster(ids[0], 0, 0, 0, 0)));
    
    
  }

  getNextQuestion() {
    this.questionsCounter++;
    return this.questions[this.questionsCounter];
  }

  updateQuestion(question: OutputEstimationQuestion) {
    const idx = this.questions.indexOf(question);
    this.questions[idx] = question;
  }

  runOutOfQuestions() {
    return this.questionsCounter >= (this.questions.length - 1);
  }

}
