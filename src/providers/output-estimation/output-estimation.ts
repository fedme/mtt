import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
import { Pair } from '../../models/pair';
import { OutputEstimationQuestion } from '../../models/output-estimation-question';
import { Utils } from '../utils/utils';
import { Stimuli } from '../stimuli/stimuli';
import { TrainingProvider } from '../training/training';
import 'rxjs/add/operator/map';
import { NUMBERS } from '../stimuli/constants';

@Injectable()
export class OutputEstimationProvider {

  questions: OutputEstimationQuestion[] = [];
  questionsCounter: number = -1;

  constructor(private utils: Utils, private stimuli: Stimuli, private training: TrainingProvider) {
    console.log('Hello OutputEstimationProvider Provider');
    this.generateQuestions();
  }

  generateQuestions() {

    // generate monsters IDs
    const firstId = NUMBERS.TRAINING_CARDS + NUMBERS.PAIR_COMPARISONS + 1;
    const questionsNumber = NUMBERS.OUTPUT_ESTIMATION_EXTRAPOLATION + NUMBERS.OUTPUT_ESTIMATION_INTERPOLATION
      + NUMBERS.OUTPUT_ESTIMATION_RECALL;
    let ids = this.utils.range(firstId, firstId + questionsNumber);
    this.utils.shuffleArray(ids);
    console.log(ids);

    // generate interpolation questions
    let unrevealedMonsters = this.training.getUnrevealedMonsters();
    let baseIdIndex = 0;
    for (let i = 0; i < NUMBERS.OUTPUT_ESTIMATION_INTERPOLATION; i++) {
      unrevealedMonsters[i].updateId("monster" + ids[baseIdIndex + i]);
      let question = new OutputEstimationQuestion("interpolation", unrevealedMonsters[i]);
      this.questions.push(question);
    }

    // generate recall questions
    let revealedMonsters = this.training.getRevealedMonsters();
    baseIdIndex = this.questions.length;
    for (let i = 0; i < NUMBERS.OUTPUT_ESTIMATION_RECALL; i++) {  
      revealedMonsters[i].updateId("monster" + ids[baseIdIndex + i]);
      let question = new OutputEstimationQuestion("recall", revealedMonsters[i]);
      this.questions.push(question);
    }

    // generate extrapolation questions
    let genes = this.utils.combine([1, 5], 3, "");
    baseIdIndex = this.questions.length;
    console.log("extr base index", baseIdIndex);
    let i = 0;
    for (let gene of genes) {
      let monsterId = "monster" + ids[baseIdIndex + i];
      console.log("extr monsterId", monsterId);
      let feature_a = parseInt(gene.charAt(0));
      let feature_b = parseInt(gene.charAt(1));
      let feature_c = parseInt(gene.charAt(2));
      let criterion = this.stimuli.calculateCriterion(feature_a, feature_b, feature_c);
      let monster = new Monster(monsterId, feature_a, feature_b, feature_c, criterion);
      let question = new OutputEstimationQuestion("extrapolation", monster);
      this.questions.push(question);
      i++;
    }

    this.utils.shuffleArray(this.questions);
    console.log("[DEBUG] OtputEstimation questions", this.questions);
        
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
