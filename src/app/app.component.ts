import { Component, OnInit } from '@angular/core';
import { DataSourceService } from './services/data-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
})
export class AppComponent implements OnInit {
  title = 'Title-app.component.ts';
  constructor(private _dataSourceService: DataSourceService) {}
  ngOnInit() {
    this._dataSourceService.createDataSource();
  }
}
