import { Component, OnInit } from '@angular/core';
import { ConfigService, data } from './config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error { color: #b30000; }']
})

export class ConfigComponent implements OnInit {

  error: any;
  headers: string[] = [];
  config: data | undefined;

  constructor(private configService: ConfigService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = [];
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe({
        next: (data: data) => this.config = { ...data }, // success path
        error: error => this.error = error, // error path
      });
  }

  
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/