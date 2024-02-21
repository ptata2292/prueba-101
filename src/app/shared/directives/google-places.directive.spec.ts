import { GooglePlacesDirective } from './google-places.directive';

describe('GooglePlacesDirective', () => {
  it('should create an instance', () => {
    let element;
    const directive = new GooglePlacesDirective(element);
    expect(directive).toBeTruthy();
  });
});
