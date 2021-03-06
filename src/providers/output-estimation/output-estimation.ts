import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
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
    //console.log('Hello OutputEstimationProvider Provider');
    //this.generateQuestions();
  }

  initialize() {
    this.questions = [];
    this.questionsCounter = -1;
    this.generateQuestions();
  }

  generateQuestions() {

    // generate monsters IDs
    const firstId = NUMBERS.TRAINING_CARDS + NUMBERS.PAIR_COMPARISONS + 1;
    const questionsNumber = NUMBERS.OUTPUT_ESTIMATION_EXTRAPOLATION + NUMBERS.OUTPUT_ESTIMATION_INTERPOLATION
      + NUMBERS.OUTPUT_ESTIMATION_RECALL;
    let ids = this.utils.range(firstId, firstId + questionsNumber);
    this.utils.shuffleArray(ids);
    //console.log(ids);

    let baseIdIndex = 0;

    // Generate interpolation and recall questions


    if (this.stimuli.isExtendedCondition2) {

      // If seen 27 cards, 10 recall and 0 interpolation
      if (this.stimuli.condition.trainingTasks == 27) {
        let revealedMonsters = this.training.getRevealedMonsters();
        baseIdIndex = 0;
        for (let i = 0; i < 10; i++) {  
          revealedMonsters[i].updateId("monster" + ids[baseIdIndex + i]);
          let question = new OutputEstimationQuestion("recall", revealedMonsters[i]);
          this.questions.push(question);
        }
      }

      // If seen 0 cards, 0 recall and 10 interpolation
      if (this.stimuli.condition.trainingTasks == 0) {
        // interpolation
        let unrevealedMonsters = this.training.getUnrevealedMonsters();
        baseIdIndex = 0;
        for (let i = 0; i < 10; i++) {
          unrevealedMonsters[i].updateId("monster" + ids[baseIdIndex + i]);
          let question = new OutputEstimationQuestion("interpolation", unrevealedMonsters[i]);
          this.questions.push(question);
        }
      }

      // If seen 1 card, 1 recall and 9 interpolation
      if (this.stimuli.condition.trainingTasks == 1) {
        // recall
        let revealedMonsters = this.training.getRevealedMonsters();
        baseIdIndex = 0;
        for (let i = 0; i < 1; i++) {  
          revealedMonsters[i].updateId("monster" + ids[baseIdIndex + i]);
          let question = new OutputEstimationQuestion("recall", revealedMonsters[i]);
          this.questions.push(question);
        }
        // interpolation
        let unrevealedMonsters = this.training.getUnrevealedMonsters();
        baseIdIndex = this.questions.length;
        for (let i = 0; i < 9; i++) {
          unrevealedMonsters[i].updateId("monster" + ids[baseIdIndex + i]);
          let question = new OutputEstimationQuestion("interpolation", unrevealedMonsters[i]);
          this.questions.push(question);
        }
      }

    }

    // Normal experiment:
    else {

      // generate interpolation questions
      let unrevealedMonsters = this.training.getUnrevealedMonsters();
      baseIdIndex = 0;
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
    }

    // generate extrapolation questions
    let genes = this.utils.combine([1, 5], 3, "");
    baseIdIndex = this.questions.length;
    //console.log("extr base index", baseIdIndex);
    let i = 0;
    for (let gene of genes) {
      let monsterId = "monster" + ids[baseIdIndex + i];
      //console.log("extr monsterId", monsterId);
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
    //console.log("[DEBUG] OutputEstimation questions", this.questions);
        
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

  getTotalReward() {
    let total = 0;
    for (let question of this.questions) {
      total = total + question.getAnswerReward();
    }
    return total;
  }

}
