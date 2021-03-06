import {types} from '../types'
import {simpleValueEdit} from '../editSpecs/simpleValueEdit'
import {askQuestion} from './askQuestion'

export async function createSpecElement(specsForTypeContents: any, session: any = {}) {
  if (!specsForTypeContents) return {}
  const subTypes = Object.keys(specsForTypeContents)
  let answers: any = {}
  let i
  for (i = 0; i < subTypes.length; i++) {
    const subType = subTypes[i]
    const subTypeInfo = specsForTypeContents[subType]
    const {type} = subTypeInfo
    if (type !== types.SET && type !== types.LIST) {
      // eslint-disable-next-line require-atomic-updates

      answers = await askQuestion(
        subTypeInfo, subType, answers, session
      )
    }
  }

  Object.keys(answers).forEach(key => {
    if (answers[key] === '') delete answers[key]
  })

  subTypes.map((subType: string) => {
    const subTypeInfo = specsForTypeContents[subType]
    const type = subTypeInfo.type
    if (answers[subType] === '' || answers[subType] === undefined) {
      delete answers[subType]
      return
    }

    answers[subType] = simpleValueEdit(type, answers[subType])
  })

  return answers
}
