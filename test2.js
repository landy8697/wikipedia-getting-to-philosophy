const wiki = require('wikipedia');
(async () => {
	try {
		const page = await wiki.page('Villanueva, New Mexico', {preload:false});
		console.log(page);
		//Response of type @Page object
		const intro = await page.intro();
		console.log(intro);
		//Response of type @wikiSummary - contains the intro and the main image
        /*
        const links = await page.links({redirect: false, limit: 1000});
		console.log(links.length)
        for(let thing in links){
            console.log(links[thing]);
        }
        */
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();