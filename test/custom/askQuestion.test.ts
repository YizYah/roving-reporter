import test from 'ava';
import {askQuestion} from '../../src/custom/specs/specCreation/askQuestion'
import {userSession} from './mock-user'

test('createSpecElement', async t => {
      const userAnswers = [
            'an answer', // myQuestion
      ]
      await userSession(userAnswers)

      const subTypeInfo = {'type': 'string'}
      const subType = 'myQuestion'
      const answers = await askQuestion(
        subTypeInfo, subType, null, undefined,
      )
      t.deepEqual(answers,{
            "myQuestion":"an answer"
      })
})
