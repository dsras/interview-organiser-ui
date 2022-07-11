import { IterableArrayPipe } from './iterable-array.pipe';

describe('IterableArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new IterableArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
