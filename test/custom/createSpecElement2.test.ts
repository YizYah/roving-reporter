import test from 'ava';
import { createSpecElement } from '../../src/custom/specs/specCreation/createSpecElement';
import { userSession } from './mock-user';
const {stdout} = require('stdout-stderr')

const secondConfig={
  "noSession": {
    "type": "string",
  },
  "nothing": {
    "type": "string",
    "required": "true",
  }
}

test('no session passed in', async t => {
  const userAnswers = [
    'blah', // noSession
    '', // nothing, first time
    'foo', // nothing, second time
  ]
  await userSession(userAnswers)
  stdout.start()
  const output = await createSpecElement(secondConfig) // no session
  stdout.stop()
  t.regex(stdout.output, /nothing is required. Please enter value/)
  //make sure prompting fpr a new value after none is entered

  t.deepEqual(output, {
    "noSession":"blah",
    'nothing': "foo",
  })
});

