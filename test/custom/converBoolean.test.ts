import test from 'ava';
import { simpleValueEdit } from '../../src/custom/specs/editSpecs/simpleValueEdit';

test('createSpecElement', async t => {
  let value = simpleValueEdit('boolean','true')
  t.is(value,true)
  value = simpleValueEdit('boolean','false')
  t.is(value,false)

  const error = t.throws(() => {
    simpleValueEdit('boolean','neitherHitherNorThither')
  }, )

  t.regex(error.message, /non boolean value returned for boolean/)

  value = simpleValueEdit('string[]',"['get', 'this', 'clear']")
  t.deepEqual(value,['get', 'this', 'clear'])
})
