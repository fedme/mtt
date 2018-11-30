export class Participant {

  code: string;
  workerId: string;
  assignmentId: string;
  hitId: string;
  gender: string;
  age: number;
  ageGroup: string;
  dob: Date;
  grade: number;
  playedBefore: boolean = false;
  languageProficiency: number;
  isMturk: boolean = false;
  isSandbox: boolean = false;

  constructor(code: string) {
    this.code = code;
  }

  public equals(obj: Participant): boolean {
    return this.code === obj.code;
  }

}  