import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RankingTaskProvider {

  features: {id: string, label: string}[];
  freeText: string;

  constructor(private utils: Utils, public translate: TranslateService) {
    console.log('Hello RankingTaskProvider Provider');
  }

  initialize() {
    this.freeText = "";
    this.translate.get(['MONSTER.FEATURE_A_LABEL', 'MONSTER.FEATURE_B_LABEL', 'MONSTER.FEATURE_C_LABEL']).subscribe(labels => {
      this.features = [
        {"id": "feature_a", "label": labels["MONSTER.FEATURE_A_LABEL"]},
        {"id": "feature_b", "label": labels["MONSTER.FEATURE_B_LABEL"]},
        {"id": "feature_c", "label": labels["MONSTER.FEATURE_C_LABEL"]}
      ];
    });
  }

  

}
