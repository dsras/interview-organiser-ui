import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing' 


import { CreateInterviewComponent } from './create-interview.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';

// describe('CreateInterviewComponent', () => {
//   let component: CreateInterviewComponent;
//   let fixture: ComponentFixture<CreateInterviewComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ 
//         CreateInterviewComponent,
//       ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CreateInterviewComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
