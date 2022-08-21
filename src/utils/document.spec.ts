import { clearElementById } from './document';

const id = 'my-id';
const div = document.createElement('div');
div.id = id;
div.innerHTML = 'Full of html';

Object.defineProperty(document, 'getElementById', {
  value: jest.fn().mockReturnValue(div)
});

describe('Utils -> document', () => {
  beforeEach(() => {
    div.innerHTML = 'Full of html';
  });

  describe('clearElementById()', () => {
    it('should clear the html content of the container if found.', () => {
      expect(div.innerHTML).not.toHaveLength(0);
      clearElementById(id);
      expect(div.innerHTML).toHaveLength(0);
    });
  });
});
