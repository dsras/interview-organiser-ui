import { Injectable } from '@angular/core';
// import * as data from 'MultiUseravailability.json'

@Injectable({
  providedIn: 'root'
})
export class MockInjectorService {

  raw = `{
    "user1Availability": [
      {
        "userId": 1,
        "date": "2022-04-18",
        "start_time": "09:00",
        "end_time": "10:00"
      },
      {
        "userId": 1,
        "date": "2022-04-19",
        "start_time": "09:00",
        "end_time": "11:00"
      },
      {
        "userId": 1,
        "date": "2022-04-20",
        "start_time": "11:00",
        "end_time": "15:00"
      },
      {
        "userId": 1,
        "date": "2022-04-21",
        "start_time": "10:00",
        "end_time": "12:00"
      },
      {
        "userId": 1,
        "date": "2022-04-22",
        "start_time": "09:00",
        "end_time": "12:00"
      },
      {
        "userId": 1,
        "date": "2022-04-16",
        "start_time": "09:00",
        "end_time": "10:00"
      }
    ],

    "user2Availability2": [
      {
        "userId": 2,
        "date": "2022-04-18",
        "start_time": "11:00",
        "end_time": "15:00"
      },
      {
        "userId": 2,
        "date": "2022-04-19",
        "start_time": "09:00",
        "end_time": "16:00"
      },
      {
        "userId": 2,
        "date": "2022-04-20",
        "start_time": "09:00",
        "end_time": "17:00"
      },
      {
        "userId": 2,
        "date": "2022-04-21",
        "start_time": "10:00",
        "end_time": "11:00"
      },
      {
        "userId": 2,
        "date": "2022-04-22",
        "start_time": "09:00",
        "end_time": "16:00"
      },
      {
        "userId": 2,
        "date": "2022-04-16",
        "start_time": "15:00",
        "end_time": "17:00"
      }
    ],

    "userAvailability3": [
      {
        "userId": 3,
        "date": "2022-04-18",
        "start_time": "09:30",
        "end_time": "11:00"
      },
      {
        "userId": 3,
        "date": "2022-04-19",
        "start_time": "09:00",
        "end_time": "11:30"
      },
      {
        "userId": 3,
        "date": "2022-04-20",
        "start_time": "11:00",
        "end_time": "15:30"
      },
      {
        "userId": 3,
        "date": "2022-04-21",
        "start_time": "10:00",
        "end_time": "16:00"
      },
      {
        "userId": 3,
        "date": "2022-04-22",
        "start_time": "09:00",
        "end_time": "10:00"
      },
      {
        "userId": 3,
        "date": "2022-04-16",
        "start_time": "09:00",
        "end_time": "10:30"
      }
    ]
  }`
    

  multiUserAvailability = JSON.parse(this.raw)


  constructor() { }

  getMockData() : string {
    return this.raw;
  }
}
