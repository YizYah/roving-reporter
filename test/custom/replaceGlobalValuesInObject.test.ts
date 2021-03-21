import test from 'ava';
import { replaceGlobalValuesInObject } from '../../src/custom/specs/specCreation/replaceGlobalValuesInObject';

test('createSpecElement', async t => {
  let newObject = replaceGlobalValuesInObject(
    {"key1":"a __session.toReplace__"},
    {"toReplace":"replacement"}
    )
  t.deepEqual(newObject,{
    "key1":"a replacement"
  })
  newObject = replaceGlobalValuesInObject(
    {"key1":"a __foo.toReplace__"},
    {"toReplace":"replacement"}
  )
  t.deepEqual(newObject,{
    "key1":"a undefined"
  })
})
