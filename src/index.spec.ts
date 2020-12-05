import { SignalRPlugin } from './Index';
import sinon, { fake } from 'sinon';
import Vue from 'vue'; // <-- notice the changed import

const fakeMixin = sinon.fake();
Vue.mixin = fakeMixin;
Vue.use(SignalRPlugin);

test('Add Variables', () => {
  expect(Vue.$signalr).not.toBeNull();
});

test('Add Mixins', () => {
  expect(fakeMixin.calledOnce);

  const fakedArgs = <any>fakeMixin.lastCall.args[0];

  expect(fakedArgs.created).not.toBeNull();
  expect(fakedArgs.destroyed).not.toBeNull();
});
