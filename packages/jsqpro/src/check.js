const { exit } = require('utils/puppeteer')
const write = require('./write')
const {
  createNewPage,
  assertLogin,
  getCookies,
  inputAccount,
  signInAndGetUrl,
  commit,
} = require('./core')

module.exports = async (browser, url) => {
  const page = await createNewPage(browser)
  let info

  await page.goto(url)

  if (await assertLogin(page)) {
    info = await signInAndGetUrl(page)
    return exit(`已经登录!`)
  }

  await page.waitForTimeout(10000)
  await getCookies(page)

  await inputAccount(page)
  await page.waitForTimeout(4000)
  info = await signInAndGetUrl(page)

  await write(info.signInTime, info.inviteAddress)
  await commit()

  await page.waitForTimeout(2000)
  await exit('done. ', browser)
  return info
}
