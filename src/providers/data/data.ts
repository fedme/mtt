import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Stimuli } from '../stimuli/stimuli';


@Injectable()
export class Data {

  constructor(private storage: Storage, private filesystem: File,
    private stimuli: Stimuli) {
    console.log('Hello Data Provider');
  }

  save() {
    console.log("db driver: " + this.storage.driver);
    const recordId = "record_" + this.stimuli.participant.code;
    let dataObject = this.encodeStimuliData();
    this.storage.set(recordId, dataObject);
  }

  encodeStimuliData() {
    //let duration = Math.floor((Date.now() - this.initialTimestamp) / 1000);
    let duration = 0; // TODO: update

    // build date and time
    let currentdate = new Date();
    let day = ("0" + currentdate.getDate()).slice(-2);
    let month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
    let year = currentdate.getFullYear();
    let dateString = day + "/" + month + "/" + year;
    let timeString = currentdate.getHours() + ":" + currentdate.getMinutes();

    let data = new Map();
    data.set("participant_code", this.stimuli.participant.code);
    data.set("participant_age", this.stimuli.participant.age);
    data.set("participant_grade", this.stimuli.participant.grade);
    data.set("session_date", dateString);
    data.set("session_time", timeString);
    data.set("session_duration", duration);

    return this.mapToObj(data);
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
