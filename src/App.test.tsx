import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('fails the test', () => {
  const { asFragment } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(asFragment()).not.toMatchInlineSnapshot(`
    <h1>Hello, World!</h1>
  `);
});
