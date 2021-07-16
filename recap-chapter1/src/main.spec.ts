import { describe, it } from 'mocha';
import assert from 'assert';
import helloWorld from './main';

describe('helloWorld 함수 테스트', () => {
  it('인자 없이 실행', () => {
    // Arrange
    const expected = 'Hello World';

    // Act
    const output = helloWorld();

    // Assert
    assert.strictEqual(expected, output);
  });
  it('인자 있이 실행', () => {
    // Arrange
    const expected = 'Hello jongwow';

    // Act
    const output = helloWorld('jongwow');

    // Assert
    assert.strictEqual(expected, output);
  });
  it('있는데 없는거랑 비교', () => {
    // Arrange
    const expected = 'Hello world';

    // Act
    const output = helloWorld('jongwow');

    // Assert
    assert.notStrictEqual(expected, output);
  });
});

// 테스트 패턴은 AAA
