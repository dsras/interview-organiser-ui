import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { DataSourceService } from './data-source.service';

describe('DataSourceService', () => {
  let service: DataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Local service should not be null after creation', () => {
    let tmpStr = "users";
    let tmpObs: any;
    try {
      tmpObs = service.getDataSource(tmpStr);
    } catch (error) {
      
    }
    expect(tmpObs == null).toBeTruthy();
    service.createDataSource();
    expect(service.getDataSource(tmpStr) != null).toBeTruthy();
  });

  it('update source should alter object', fakeAsync(() => {
    let tmpStr = "users";
    service.createDataSource();
    expect(service.getDataSource(tmpStr) != <Observable<any>><unknown>'me').toBeTruthy();
    service.updateDataSource(tmpStr, "me");
    service.getDataSource(tmpStr).subscribe(returnData => {
      expect(returnData == 'me').toBeTruthy();
    })
    tick(3);
  }));
});
