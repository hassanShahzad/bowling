import { Injectable } from '@angular/core';
import {Frame} from '../pages/bowling-frames/frame.interface';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() { }

  addBonus(rollArray : any[], checkLastFrame: boolean): boolean {
    const isSpare: boolean = rollArray[0] + rollArray[1] === 10;
    const isStrike: boolean = rollArray[0] === 10 || rollArray[1] === 10;
    const checkBonus = (isSpare || isStrike) && checkLastFrame && rollArray.length < 3;
    return checkBonus;
  }

  calculateScore(rollArray : any[], frames: Frame[]): void {
    let sumOfScore = 0;
    let hasBonus = false;

    rollArray.forEach((roll, index) => {
      // throw index
      const currThrow: number = roll[0];
      const nextThrow: number = roll[1];
      const bonusThrow: number = roll[2];

      // frame index
      const currFrame: Frame = frames[index];

      // roll index
      const nextRoll: number[] = rollArray[index + 1];
      const nextTowRoll: number[] = rollArray[index + 2];

      // add bonus score
      const isSpare = currThrow + nextThrow === 10;
      const isStrike = currThrow === 10 && index < 9;

      if (index === 9) {
        hasBonus = isSpare || currThrow === 10 || nextThrow === 10;
        if (hasBonus) {
          sumOfScore += currThrow + nextThrow + bonusThrow;
          currFrame.score = sumOfScore;
          currFrame.showScore = true;
        } else {
          sumOfScore += currThrow + nextThrow;
          currFrame.score = sumOfScore;
          currFrame.showScore = true;
        }
      } else if (isStrike) { // strike
        if (nextRoll[0] === 10 && index !== 8) {
          sumOfScore += 10 + 10 + nextTowRoll[0];
          currFrame.score = sumOfScore;
          currFrame.showScore = true;
        } else {
          sumOfScore += 10 + nextRoll[0] + nextRoll[1];
          currFrame.score = sumOfScore;
          currFrame.showScore = true;
        }

      } else if (isSpare) { // spare
        sumOfScore += 10 + nextRoll[0];
        currFrame.score = sumOfScore;
        currFrame.showScore = true;
      } else {
        sumOfScore += currThrow + nextThrow;
        currFrame.score = sumOfScore;
        currFrame.showScore = true;
      }
    });
  }

}
