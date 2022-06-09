import { Component, OnInit } from '@angular/core';
import { DataSourceService } from './services/data-source.service';

/** App Component */
@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
})
export class AppComponent implements OnInit {
  /** Title of the app */
  title = 'interview-organiser';
  /** @ignore */
  constructor(private _dataSourceService: DataSourceService) {}
  /** @ignore */
  ngOnInit() {
    this._dataSourceService.createDataSource();
  }
}
