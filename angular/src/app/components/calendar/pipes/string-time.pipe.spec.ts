import { StringTimePipe } from './string-time.pipe';

describe('StringTimePipe', () => {
  it('create an instance', () => {
    const pipe = new StringTimePipe();
    expect(pipe).toBeTruthy();
  });
});
