const lt = require('long-timeout')
const { run } = require('./src/core')
const check = require('./src/check')
const moment = require('moment')

async function job() {
  const { signInTime } = await run(check)
  const delay = moment(signInTime).add(1, 'days') - moment()
  console.log(`>>> delay:`, delay)
  lt.setTimeout(job, delay > 0 ? delay : 1000 * 60 * 10)
}

job()
