import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { RequestCenterService } from '../../services/requester/request-center.service';
import { StringToDatetimePipe } from './string-to-datetime.pipe';

describe('StringToDatetimePipe', () => {
  let pipe: StringToDatetimePipe;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        //RouterTestingModule,
        HttpClientTestingModule,

      ],
      providers: [
        //DataSourceService,
        StringToDatetimePipe,
        SocialAuthService,
        DatePipe,
        RequestCenterService,
       
      ],
      declarations: [ 
        StringToDatetimePipe
       ]
    })
    .compileComponents();
    pipe = TestBed.inject(StringToDatetimePipe)
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('pipe formats correctly', () => {
    let ret:Date = pipe.transform("20:00");
    let myDate = new Date();
    myDate.setHours(20);
    myDate.setMinutes(0);
    expect(ret.toString() === myDate.toString()).toBeTruthy();
  });
});
