import test from 'ava'

import { stdin } from 'mock-stdin'
import {createSpecElement} from '../../src/custom/specs/specCreation/createSpecElement'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const io = stdin()
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
    "default": "__answers.author__"
  },
  // "description": {
  //   "type": "string",
  //   "required": false,
  //   "description": "one liner about what the cli does"
  // },
  // "multi": {
  //   "type": "boolean",
  //   "required": false,
  //   "description": "true if multiple constants are named.  false means that __answers.packageName__ exports a single constant directly",
  //   "default": true
  // }
}

test('createSpecElement', async t => {
  const sendKeystrokes = async () => {
    io.send('jones\n')
    await delay(10)
    io.send('foo\n')
    await delay(10)
  }
  setTimeout(() => sendKeystrokes().then(), 5)

  const output = await createSpecElement(sampleConfigGeneral,{userName: 'Borris'},)
  console.log(`output=${JSON.stringify(output)}`)
  t.is(1, 1)
});
