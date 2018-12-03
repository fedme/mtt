import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Platform, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Stimuli } from '../stimuli/stimuli';
import { Api } from '../api/api';
import { TrainingProvider } from '../training/training';
import { PairComparisonProvider } from '../pair-comparison/pair-comparison';
import { OutputEstimationProvider } from '../output-estimation/output-estimation';
import { RankingTaskProvider } from '../ranking-task/ranking-task';
import { AppInfo } from '../stimuli/app-info';
import shortid from 'shortid';
import { Pro } from '@ionic/pro';


@Injectable()
export class Data {

  serverURI: string = "";
  recordsNumber: number;
  allRecords: any;

  constructor(
    private storage: Storage,
    private filesystem: File,
    private toastCtrl: ToastController,
    private api: Api,
    private platform: Platform,
    private device: Device,
    private stimuli: Stimuli,
    private training: TrainingProvider,
    private pairComparison: PairComparisonProvider,
    private outputEstimation: OutputEstimationProvider,
    private rankingTask: RankingTaskProvider
  ) {
    //console.log('Hello Data Provider');
  }

  initialize() {
    this.updateRecordsNumber();
  }

  serializeStimuliData() {
    let data = new Map();
    let i = 0;

    // save conditions data
    data.set("condition", this.stimuli.condition);
    data.set("condition_index", this.stimuli.conditionIndex);
    data.set("condition_features_weigth_6", this.stimuli.featuresOrder[0]);
    data.set("condition_features_weigth_3", this.stimuli.featuresOrder[1]);
    data.set("condition_features_weigth_1", this.stimuli.featuresOrder[2]);
    data.set("condition_training_type", this.stimuli.trainingType);
    data.set("condition_tests_order_1", this.stimuli.testTypes[0]);
    data.set("condition_tests_order_2", this.stimuli.testTypes[1]);

    // save instructions check data
    data.set("instructions_check_attempts_counter", this.stimuli.questionsCheckCounter);
    data.set("instructions_check_answers", JSON.stringify(this.stimuli.questionsCheck));

    // save training data (revealed cards)
    i = 1;
    for (let card of this.training.revealedCards) {
      data.set("training_revealed_" + i + "_card", card.monster != null ? card.monster.toString() : null);
      i++;
    }

    // save training data (unrevealed cards)
    i = 1;
    for (let card of this.training.cards) {
      if (!card.hasBeenRevealed()) {
        data.set("training_unrevealed_" + i + "_card", card.monster != null ? card.monster.toString() : null);
        i++;
      }
    }

    // save test "pair comparison" data
    i = 1;
    for (let question of this.pairComparison.questions) {
      data.set("test_comparison_" + i + "_card_a", question.pair.left != null ? question.pair.left.toString() : null);
      data.set("test_comparison_" + i + "_card_b", question.pair.right != null ? question.pair.right.toString() : null);
      data.set("test_comparison_" + i + "_chosen_card", question.chosenMonster != null ? question.chosenMonster.toString() : null);
      data.set("test_comparison_" + i + "_correct", question.isAnswerCorrect() ? 1 : 0);
      i++;
    }

    // save test "output estimation" extrapolation data
    i = 1;
    for (let question of this.outputEstimation.questions) {
      if (question.type === "extrapolation") {
        data.set("test_estimation_extrapolation_" + i + "_card", question.monster != null ? question.monster.toString() : null);
        data.set("test_estimation_extrapolation_" + i + "_estimated_criterion", question.guessedCriterion);
        data.set("test_estimation_extrapolation_" + i + "_estimation_distance", question.getAnswerDistance());
        i++;
      }
    }

    // save test "output estimation" interpolation data
    i = 1;
    for (let question of this.outputEstimation.questions) {
      if (question.type === "interpolation") {
        data.set("test_estimation_interpolation_" + i + "_card", question.monster != null ? question.monster.toString() : null);
        data.set("test_estimation_interpolation_" + i + "_estimated_criterion", question.guessedCriterion);
        data.set("test_estimation_interpolation_" + i + "_estimation_distance", question.getAnswerDistance());
        i++;
      }
    }

    // save test "output estimation" recall data
    i = 1;
    for (let question of this.outputEstimation.questions) {
      if (question.type === "recall") {
        data.set("test_estimation_recall_" + i + "_card", question.monster != null ? question.monster.toString() : null);
        data.set("test_estimation_recall_" + i + "_estimated_criterion", question.guessedCriterion);
        data.set("test_estimation_recall_" + i + "_estimation_distance", question.getAnswerDistance());
        i++;
      }
    }

    // save ranking task data
    i = 1;
    for (let feature of this.rankingTask.features) {
      data.set("ranking_task_feature_" + i, feature.id);
      i++;
    }

    // save ranking task free text question (some hopefully working sanitization here...)
    let freeText = this.rankingTask.freeText != null ? this.rankingTask.freeText.replace(/[^\w\s!?\-*+\/\.\(\)]/g, ' ') : "";
    freeText.replace(/\r?\n|\r/g, ' ');
    freeText = "'" + freeText + "'";
    data.set("ranking_task_question_adults", freeText);

    // save rewards data
    data.set("reward_test_comparison_cents", this.pairComparison.getTotalReward());
    data.set("reward_test_estimation_cents", this.outputEstimation.getTotalReward());
    const totalReward = this.pairComparison.getTotalReward() + this.outputEstimation.getTotalReward();
    data.set("reward_total_cents", totalReward);
    data.set("reward_total_euros", (totalReward / 100).toFixed(2));
    data.set("reward_mturk_total_euros", ((totalReward / 5) / 100).toFixed(2));

    return this.mapToObj(data);
  }

  save() {

    console.log("[DEBUG] DB driver: " + this.storage.driver);

    // Generate unique short id
    const recordId = shortid.generate();

    console.log("[DEBUG] Saving data to DB...", recordId);

    // Create data object
    let dataObject = {
      "id": recordId,
      "participant": this.getParticipantInfo(),
      "app": this.getAppInfo(),
      "session": this.getSessionInfo(),
      "data": this.serializeStimuliData(),
      "platformInfo": this.getPlatformInfo()
    }
    console.log("[DEBUG] Serialized data: ", dataObject);

    // Save data...
    if (this.stimuli.onlineVersion) {

      // online
      this.postDataToServer(dataObject);

      // If run inside an iframe, send data as Post Message to parent window
      if (window.parent) {
        window.parent.postMessage({
          'state': 'end',
          'data': dataObject
        }, '*');
      }

    }
    else {
      // locally
      this.storage.set(recordId, dataObject);
    }

    return dataObject;

  }

  getParticipantInfo() {
    return {
      "code": this.stimuli.participant.code,
      "age": this.stimuli.participant.age,
      "ageGroup": this.stimuli.participant.ageGroup,
      "grade": this.stimuli.participant.grade,
      "gender": this.stimuli.participant.gender,
      "playedBefore": this.stimuli.participant.playedBefore,
      "languageProficiency": this.stimuli.participant.languageProficiency
    }
  }

  getSessionInfo() {
    const now = new Date();
    const duration = Math.floor(Date.now() - this.stimuli.initialTimestamp);
    return {
      "datetime": now.toJSON(),
      "duration": duration
    }
  }

  getAppInfo() {
    return {
      "id": AppInfo.id,
      "version": AppInfo.version,
      "nameLabel": AppInfo.nameLabel,
      "lang": localStorage.getItem('lang')
    }
  }

  getPlatformInfo() {
    return {
      'platform': {
        'userAgent': this.platform.userAgent(),
        'platforms': this.platform.platforms(),
        'navigatorPlatform': this.platform.navigatorPlatform(),
        'height': this.platform.height(),
        'width': this.platform.width()
      },
      'device': {
        'uuid': this.device.uuid,
        'model': this.device.model,
        'cordovaVersion': this.device.cordova,
        'version': this.device.version,
        'manufacturer': this.device.manufacturer,
        'serial': this.device.serial
      }
    }
  }

  async postDataToServer(dataObject: any) {

    console.log('Participant', this.stimuli.participant);

    const body = {
      workerId: this.stimuli.participant.workerId,
      assignmentId: this.stimuli.participant.assignmentId,
      hitId: this.stimuli.participant.hitId,
      status: RecordStatus.Completed,
      isMturk: this.stimuli.participant.isMturk,
      isSandbox: this.stimuli.participant.isSandbox,
      bonus: parseFloat(dataObject['data']['reward_mturk_total_euros']),
      dataString: JSON.stringify(dataObject)
    };

    console.log('Saving data to the server...', body);
    //console.log('Saving data to the server...', JSON.stringify(dataObject));

    try {
      const res = await this.api.post('records', body).toPromise();
      console.log('Data saved to the server:', res);
    }
    catch (e) {

      // Send error to Ionic Monitoring
      Pro.monitoring.log(
        `ERROR saving data to the server. 
        Uid: ${this.stimuli.participant.code}. WorkerId: ${this.stimuli.participant.workerId}.
        Error: ${e}
        `, { level: 'error' }
      );

      console.log('Error saving data to the server:', e);
    }


  }

  async sendStartedToServer() {
    const body = {
      workerId: this.stimuli.participant.workerId,
      assignmentId: this.stimuli.participant.assignmentId,
      hitId: this.stimuli.participant.hitId,
      status: RecordStatus.Started,
      isMturk: this.stimuli.participant.isMturk,
      isSandbox: this.stimuli.participant.isSandbox,
    };

    console.log('Saving data to the server...', body);

    try {
      const res = await this.api.post('records', body).toPromise();
      console.log('Data saved to the server:', res);
    }
    catch (e) {

      // Send error to Ionic Monitoring
      Pro.monitoring.log(
        `ERROR sending Start to the server. 
        Uid: ${this.stimuli.participant.code}. WorkerId: ${this.stimuli.participant.workerId}.
        Error: ${e}
        `, { level: 'error' }
      );
      
      console.log('ERROR sending Start to the server:', e);
    }
  }

  async sendFailureToServer() {
    const body = {
      workerId: this.stimuli.participant.workerId,
      assignmentId: this.stimuli.participant.assignmentId,
      hitId: this.stimuli.participant.hitId,
      status: RecordStatus.Failed
    };

    console.log('Saving data to the server...', body);

    try {
      const res = await this.api.post('records', body).toPromise();
      console.log('Data saved to the server:', res);
    }
    catch (e) {

      // Send error to Ionic Monitoring
      Pro.monitoring.log(
        `ERROR sending Failure to the server. 
        Uid: ${this.stimuli.participant.code}. WorkerId: ${this.stimuli.participant.workerId}.
        Error: ${e}
        `, { level: 'error' }
      );

      console.log('ERROR sending Failure to the server:', e);
    }
  }

  async loadAllRecords() {
    console.log("[debug] Loading all records...");

    // get records
    let records = await this.storageGetAll();

    // order records by date
    records.sort((a, b) => new Date(b["session"]["datetime"]).getTime()
      - new Date(a["session"]["datetime"]).getTime());

    this.allRecords = records;
    console.log("All records", this.allRecords);
  }


  async exportRecordsAsJSON() {
    console.log("[debug] Exporting all records as JSON...");

    // get records
    let records = await this.storageGetAll();

    // order records by date
    records.sort((a, b) => new Date(b["session"]["datetime"]).getTime()
      - new Date(a["session"]["datetime"]).getTime());

    // debug records
    console.log("All records", records);

    // save records to JSON file
    let fileContent = JSON.stringify(records);
    this.saveOutputFile(fileContent);

    // show toast
    this.toastCtrl.create({
      message: 'Saving JSON file to internal memory...',
      duration: 2000,
      position: 'top'
    }).present();
  }


  async updateRecordsNumber() {
    let records = await this.storageGetAll();
    if (records == null) return 0;
    this.recordsNumber = records.length;
  }


  /**
   * Returns a Promise with the raw records from Storage
   */
  storageGetAll() {
    return this.storage.keys()
      .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
  }


  saveOutputFile(csvContent, fileExt = "json") {
    // build file name
    let currentdate = new Date();
    let day = ("0" + currentdate.getDate()).slice(-2);
    let month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
    let filename = "data-" + day + month + currentdate.getFullYear() + "-"
      + currentdate.getHours() + currentdate.getMinutes() + "." + fileExt;

    // access file system
    this.filesystem.resolveDirectoryUrl(this.filesystem.externalDataDirectory)
      .then(directory => {
        // get or create results file
        this.filesystem.getFile(directory, filename, { create: true, exclusive: false })
          .then(file => {
            console.log("fileEntry is file?" + file.isFile.toString());
            this.writeFile(file, csvContent);
          })
          .catch(err => {
            console.log("Resolve file error: " + err);
          });
      })
      .catch(err => {
        console.log("Resolve filesystem error: " + err);
      });
  }

  writeFile(fileEntry, data) {
    fileEntry.createWriter(
      function (writer) {
        writer.onwriteend = function (evt) {
          console.log("File successfully created!");
        };
        writer.write(data);
      },
      function (evt, where) {
        console.log("Error writing file " + where + " :");
        console.log(JSON.stringify(evt));
      }
    );
  }

  mapToObj(strMap) {
    let obj = {};
    strMap.forEach((value, key, map) => {
      obj[key] = value;
    });
    return obj;
  }

}

enum RecordStatus { Assigned, Started, Failed, Completed, Submitted, Approved, Rejected }
