const ig = require('./instagram')
​
(async () => {
​
    await ig.initialize()
​
    await ig.login('afkjaslkdf', 'jasdfljasldf')
​
    await ig.likeTagsProcess(['cars, car, fastcars'])
​
})()