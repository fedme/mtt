import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Stimuli } from '../stimuli/stimuli';
import { TrainingProvider } from '../training/training';
import { PairComparisonProvider } from '../pair-comparison/pair-comparison';
import { OutputEstimationProvider } from '../output-estimation/output-estimation';


@Injectable()
export class Data {

  constructor(private storage: Storage, private filesystem: File,
    private stimuli: Stimuli, private training: TrainingProvider,
    private pairComparison: PairComparisonProvider, private outputEstimation: OutputEstimationProvider) {
    console.log('Hello Data Provider');
  }

  serializeStimuliData() {
    // calculate exp duration
    const duration = Math.floor((Date.now() - this.stimuli.initialTimestamp) / 1000);

    // build date and time strings
    const currentdate = new Date();
    const day = ("0" + currentdate.getDate()).slice(-2);
    const month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
    const year = currentdate.getFullYear();
    const dateString = day + "/" + month + "/" + year;
    const timeString = currentdate.getHours() + ":" + currentdate.getMinutes();

    // data map
    let data = new Map();
    let i, j = 0;

    // save participant data
    data.set("participant_code", this.stimuli.participant.code);
    data.set("participant_age", this.stimuli.participant.age);
    data.set("participant_age_group", this.stimuli.getParticipantAgeGroup())
    data.set("participant_grade", this.stimuli.participant.grade);

    // save session data
    data.set("session_date", dateString);
    data.set("session_time", timeString);
    data.set("session_duration", duration);

    // save conditions data
    data.set("condition_features_order", this.stimuli.featuresOrder.join());
    data.set("condition_tests_order", this.stimuli.testTypes.join());
    data.set("condition_training_type", this.stimuli.trainingType)

    // save training data
    i = 0;
    for (let card of this.training.cards) {
      data.set("training_"+i+"_card", card.monster.toString());
      i++;
    }

    // save test "pair comparison" data
    i = 0;
    for (let question of this.pairComparison.questions) {
      data.set("test_comparison_"+i+"_card_a",  question.pair.left.toString());
      data.set("test_comparison_"+i+"_card_b",  question.pair.right.toString());
      data.set("test_comparison_"+i+"_chosen_card", question.chosenMonster.toString());
      data.set("test_comparison_"+i+"_correct", question.isAnswerCorrect() ? 1 : 0);
      i++;
    }

    // save test "output estimation" extrapolation data
    i = 0;
    for (let question of this.outputEstimation.questions) {
      if (question.type === "extrapolation") {
        data.set("test_estimation_extrapolation_"+i+"_card", question.monster.toString());
        data.set("test_estimation_extrapolation_"+i+"_estimated_criterion", question.guessedCriterion);
        data.set("test_estimation_extrapolation_"+i+"_estimation_distance", question.getAnswerDistance());
        i++;
      }
    }

    // save test "output estimation" interpolation data
    i = 0;
    for (let question of this.outputEstimation.questions) {
      if (question.type === "interpolation") {
        data.set("test_estimation_interpolation_"+i+"_card", question.monster.toString());
        data.set("test_estimation_interpolation_"+i+"_estimated_criterion", question.guessedCriterion);
        data.set("test_estimation_interpolation_"+i+"_estimation_distance", question.getAnswerDistance());
        i++;
      }
    }

    // save test "output estimation" recall data
    i = 0;
    for (let question of this.outputEstimation.questions) {
      if (question.type === "recall") {
        data.set("test_estimation_recall_"+i+"_card", question.monster.toString());
        data.set("test_estimation_recall_"+i+"_estimated_criterion", question.guessedCriterion);
        data.set("test_estimation_recall_"+i+"_estimation_distance", question.getAnswerDistance());
        i++;
      }
    }


    return this.mapToObj(data);
  }

  save() {
    console.log("db driver: " + this.storage.driver);
    const recordId = "record_" + this.stimuli.participant.code;
    let dataObject = this.serializeStimuliData();
    this.storage.set(recordId, dataObject);
  }

  exportRecordsAsCsv() {
    this.storageGetAll()
      .then(records => {
        console.log("records:");
        console.log(records);
        let csvContent = this.fromRecordsToCsv(records)
        this.saveCsvFile(csvContent);
      });
  }

  /**
   * Returns a Promise with the raw records from Storage
   */
  storageGetAll() {
    return this.storage.keys()
      .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
  }


  fromRecordsToCsv(records) {
    let csvKeys = [];
    let csvRows = [];
    let first = true;
    for (let record of records) {
      if (first) {
        csvKeys = Array.from(record.keys());
        first = false;
      }
      let csvRow = Array.from(record.values());
      csvRows.push(csvRow.join(","));
    }
    let csvContent = csvKeys.join(",") + "\n";
    csvContent += csvRows.join("\n");
    return csvContent;
  }


  saveCsvFile(csvContent) {
    // build file name
    let currentdate = new Date();
    let day = ("0" + currentdate.getDate()).slice(-2);
    let month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
    let filename = "data-" + day + month + currentdate.getFullYear() + "-"
      + currentdate.getHours() + currentdate.getMinutes() + ".csv";

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
