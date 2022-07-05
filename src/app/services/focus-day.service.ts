import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FocusDayService {

  constructor() { }

  static focusedDate: Date = new Date();

  static changeDate(input: Date){
    FocusDayService.focusedDate = input;
  }  
  static getFocusDate(){
    return FocusDayService.focusedDate;
  }
}

