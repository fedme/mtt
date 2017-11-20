import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
import { Pair } from '../../models/pair';
import { PairComparisonQuestion } from '../../models/pair-comparison-question';
import { Utils } from '../utils/utils';
import { Stimuli } from '../stimuli/stimuli';
import 'rxjs/add/operator/map';
import { NUMBERS, PAIR_COMPARISONS } from '../stimuli/constants';

/*
  Generated class for the PairComparisonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PairComparisonProvider {

  questions: PairComparisonQuestion[] = [];
  questionsCounter: number = -1;

  constructor(private utils: Utils, private stimuli: Stimuli) {
    console.log('Hello PairComparisonProvider Provider');
  }

  initialize() {
    this.questions = [];
    this.questionsCounter = -1;
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

    // generate pairs
    let j=0;
    for (let i=0; i < NUMBERS.PAIR_COMPARISONS; i++) {

      let pairMonsters = [];

      // generate monster a
      const features_a = PAIR_COMPARISONS[i][0];
      const criterion_a = this.stimuli.calculateCriterion(
        features_a[0],
        features_a[1],
        features_a[2]
      );
      pairMonsters.push(new Monster(ids[j], features_a[0], features_a[1], features_a[2], criterion_a));
      j++;

      // generate monster b
      let features_b = PAIR_COMPARISONS[i][1];
      const criterion_b = this.stimuli.calculateCriterion(
        features_b[0],
        features_b[1],
        features_b[2]
      );
      pairMonsters.push(new Monster(ids[j], features_b[0], features_b[1], features_b[2], criterion_b));
      j++;

      // generate pair
      this.utils.shuffleArray(pairMonsters);
      const pair = new Pair(pairMonsters[0], pairMonsters[1]);
      const question = new PairComparisonQuestion(pair);
      this.questions.push(question);
    }
    
  }

  getNextQuestion() {
    this.questionsCounter++;
    return this.questions[this.questionsCounter];
  }

  updateQuestion(question: PairComparisonQuestion) {
    const idx = this.questions.indexOf(question);
    this.questions[idx] = question;
  }

  runOutOfQuestions() {
    return this.questionsCounter >= (this.questions.length - 1);
  }

  getTotalReward() {
    let total = 0;
    for (let question of this.questions) {
      total = total + question.getAnswerReward();
    }
    return total;
  }

}
