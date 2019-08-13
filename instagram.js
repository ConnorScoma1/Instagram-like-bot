const pupperteer = require('pupperteer')
const BASE_URL = 'https://www.instagram.com/'
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`
​
const instagram = {
    browser: null,
    page: null,
​
    initialize: async() => {
        instagram.browser = await pupperteer.launch({
            headless: false
        });
​
        instagram.page = await instagram.browser.newPage();
​
    },
​
    login: async(username, password) => {
​
        await instagram.page.goto(BASE_URL, {waitUntil: 'networkidle2'});
​
        let loginButton = await instagram.page.$x('//a[contains(text(), "Log in")]')
​
        // Click login button
        await loginButton[0].click()
​
        // await instagram.page.waitForNavigation({waitUntil: 'networkidle2'})
​
        await instagram.page.waitFor(1000);
​
        // writing username password
        await instagram.page.type('input[name="username"]', username, { delay: 50 })
        await instagram.page.type('input[name="password"]', password, { delay: 50 })
​
        // Clicking Login Button
        loginButton = await instagram.page.$x('//button[contains(text(), "Log in")]')
        await loginButton[0].click()
​
        await instagram.page.waitFor(10000)
        await instagram.page.waitFor('a > span[aria-label="Profile"]')
​
    },
​
    likeTagsProcess = async (tags = []) => {
        for(let tag of tags) {
            // goto tag page
            await instagram.page.goto(TAG_URL(tag), {waitUntil: 'networkidle2'})
            await instagram.page.waitFor(1000)
​
            let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding="auto"]')
            
            for(let i = 0; i < 3; i++) {
                let post = posts[i];
​
                // click on post
​
                await post.click()
​
                await instagram.page.waitFor('span[id="react-root"][aria-hidden="true"]');
                await instagram.page.waitFor(1000)
​
                let isLikeAble = await instagram.page.$('span[aria-label="Like"]')
​
                if(isLikeAble) {
                    await instagram.page.click('span[aria-label="Like"]')
                }
​
                await instagram.page.waitFor(3000)
                
                // close modal
                let closeModalButton = await instagram.page.$x('//button[contains(text(), "Close")]')
                await icloseModalButton[0].click()
​
                await instagram.page.waitFor(1000)
            }
​
            await instagram.page.waitFor(10000)
​
        }
    }
}
​
module.exports = instagram