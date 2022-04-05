import { Component, OnInit } from '@angular/core';
import { Interface } from 'readline';
import { 
  Requester,
  data,
  userData,
  dummy
} from './requester.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ Requester ],
  styles: ['.error { color: #b30000; }']
})




export class RequesterComponent implements OnInit {

  error: any;
  headers: string[] = [];
  return: userData | undefined;

  constructor(private requester: Requester) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  clear() {
    this.return = undefined;
    this.error = undefined;
    this.headers = [];
  }

  processRequest(type: string, link: string, returnType: data) {
      
    this.requester.getreturn(link)
      .subscribe({
        next: (data: userData) => this.return = { ...data }, // success path
        error: error => this.error = error, // error path
      });
  }

  
}
