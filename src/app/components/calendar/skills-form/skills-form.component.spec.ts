import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GetUserDataService } from 'src/app/services/get-user-data.service';
import { MatDialogService } from 'src/app/services/mat-dialog.service';
import { RequestCenterService } from 'src/app/services/requester/request-center.service';
import { Skills, SkillOptions } from 'src/app/shared/models/types';

import { SkillsFormComponent } from './skills-form.component';

const dummySkillForm = {
  value: {
    skill: "Java",
    level: "Junior"
  },
  reset(){}
}

const skillsAvailable: Array<Skills> = [];

/** Empty sets to be populated and used as options for skill form */
const formOptions: SkillOptions = {
  skillNames: new Set<string>(),
  skillLevels: new Set<string>(),
  
};

const FakeUserDataService = {
  getUsername(){
    return 'thorfinn.manson@accolite.digital.com';
  },
  getUserRoleNames(){
    return ['Recruiter', 'User'];
  }
}

describe('SkillsFormComponent', () => {
  let component: SkillsFormComponent;
  let fixture: ComponentFixture<SkillsFormComponent>;
  let rService: RequestCenterService;
  let uService: GetUserDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        MatDialogModule,

      ],
      providers: [
        BsModalService,
        DatePipe,
        FormBuilder,              
        {
          provide: MatDialogRef,
          useValue: {}
        },
        MatDialogService,
        {
          provide: GetUserDataService,
          useValue: FakeUserDataService
        },
      ],
      declarations: [ SkillsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsFormComponent);
    rService = TestBed.inject(RequestCenterService);
    component = fixture.componentInstance;
    uService = TestBed.inject(GetUserDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    
  it('init should call service methods', () => {
    let rSpy = spyOn(rService, 'getAllSkills').and.callThrough();
    component.ngOnInit();
    expect(rService.getAllSkills).toHaveBeenCalled();
  });

  it('Submit should call service methods', () => {
    let rSpy = spyOn(rService, 'addSkills').and.callThrough();
    let formG = dummySkillForm;
    component.onSubmit(formG);
    expect(rService.addSkills).toHaveBeenCalled();
  });
});
