import test from 'ava';
import { createSpecElement } from '../../src/custom/specs/specCreation/createSpecElement';
import { userSession } from './mock-user';
const {stdout} = require('stdout-stderr')
/*
  We have to take a sample config element, and be able to get it converted to
  an appropriate json for the specs.
 */

const sampleConfigGeneral={
  "author": {
    "type": "string",
    "required": true,
    "description": "author of the package",
    "default": "__session.userName__"
  },
  "owner": {
    "type": "string",
    "required": true,
    "description": "owner of the GitHub repo",
    "default": "__answers.author__",
    "choices": ["me","you","someone else"]
  },
  "description": {
    "type": "string",
    "required": false,
    "description": "one liner about what the cli does"
  },
  "fast": {
    "type": "boolean",
    "required": false,
    "description": "does it fly?  false means that __answers.packageName__ exports a single constant directly",
    "default": true
  },
  "slow": {
    "type": "boolean",
    "default": "__session.isSlowDefault__"
  },
  "nothing": {
    "type": "string",
    "required": "true",
  }
}

test('createSpecElement', async t => {
  const userAnswers = [
    'freddie', // author
    '2', // owner
    'a simple test', // description
    'y', // fast
    'y', // slow
    '', // nothing, first time
    'foo', // nothing, second time
  ]
  await userSession(userAnswers)
  await createSpecElement(null) // tests null/missing params

  stdout.start()
  const output = await createSpecElement(sampleConfigGeneral,{
    userName: 'Borris',
    isSlowDefault: 'true',
  },)
  stdout.stop()
  t.regex(stdout.output, /nothing is required. Please enter value/)
      //make sure prompting fpr a new value after none is entered

  t.deepEqual(output, {
    "author":"freddie",
    "owner":"you",
    "description":"a simple test",
    "fast": true,
    "slow": true,
    'nothing': "foo",
  })
});
