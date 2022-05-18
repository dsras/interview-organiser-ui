import { StringToDatetimePipe } from './string-to-datetime.pipe';

describe('StringToDatetimePipe', () => {
  it('create an instance', () => {
    const pipe = new StringToDatetimePipe();
    expect(pipe).toBeTruthy();
  });
});
