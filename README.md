
[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )
roving-reporter
======
prompts the user to fill out a form based on a json of fields and generates a json from the answers.

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )

[![codecov](https://codecov.io/gh/YizYah/roving-reporter/branch/main/graph/badge.svg?token=019QO4XK1Z)](https://codecov.io/gh/YizYah/roving-reporter)
[![Version](https://img.shields.io/npm/v/roving-reporter.svg)](https://npmjs.org/package/roving-reporter)
[![Downloads/week](https://img.shields.io/npm/dw/roving-reporter.svg)](https://npmjs.org/package/roving-reporter)
[![License](https://img.shields.io/npm/l/roving-reporter.svg)](https://github.com/YizYah/roving-reporter/blob/master/package.json)

[![Geenee](https://img.shields.io/badge/maintained%20by-geenee-brightgreen)](https://npmjs.org/package/geenee)
[![Template](https://img.shields.io/badge/template-ts--packrat-blue)](https://npmjs.org/package/ts-packrat)

[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )


[//]: # ( ns__start_section api )


[//]: # ( ns__custom_start APIIntro )

# Why
Inquirer is great, but requires a fair amount of boilerplate for the common case of a series of questions to create a json.

# What
A function that returns a json from the answers.  Uses [Dynamapping](https://www.npmjs.com/package/dynamapping) to allows you to update dynamically values based on prior mappings and/or a `session` passed in.

Very useful for building a json to specs based on prompts to a user.

# Usage
Install the package:
```
npm i roving-reporter
```

Then define a typical inquirer spec object and pass it in:
```
const createSpecElement = require('roving-reporter')

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
    "required": "__session.falsy__",
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
  "empty": {
    "type":"string",
  },
  "list": {
    "type":"list"
  }
}

test('createSpecElement', async t => {
  const userAnswers = [
    'freddie', // author
    '2', // owner
    'a simple test', // description
    'y', // fast
    'y', // slow
    '', //empty
    'something', //list
  ]
  
  const output = await createSpecElement(sampleConfigGeneral,{
    userName: 'Borris',
    isSlowDefault: 'true',
    falsy: 'false',
  },)

  // output = {
    "author":"freddie",
    "owner":"you",
    "description":"a simple test",
    "fast": true,
    "slow": true,
  })
```

[//]: # ( ns__custom_end APIIntro )


[//]: # ( ns__custom_start constantsIntro )
## General Constants and Commands

[//]: # ( ns__custom_end constantsIntro )



[//]: # ( ns__start_section types )


[//]: # ( ns__end_section types )


[//]: # ( ns__end_section api )

