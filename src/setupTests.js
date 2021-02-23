// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import WebAudioApi from 'web-audio-api';

import { server } from './mocks/server.js'

beforeAll(() => {
  global.AudioContext = class extends WebAudioApi.AudioContext {
    constructor(opts) {
      super(opts);
      this.outStream = process.stdout;
    }
  }

  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());