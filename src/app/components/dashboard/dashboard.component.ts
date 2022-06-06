import { Component, OnInit } from '@angular/core';

interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

/** @ignore */
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', '../../../styles.scss'],
})
export class DashboardComponent implements OnInit {

  white = 'white'

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  // largeButtonTile: Tile = {text: '', }
  constructor() {}

  ngOnInit(): void {}


}
