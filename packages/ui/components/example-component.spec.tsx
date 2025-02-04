import { render } from '@testing-library/react';

import { ExampleComponent } from './example-component';

describe('ExampleComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExampleComponent />);
    expect(baseElement).toBeTruthy();
  });
});
