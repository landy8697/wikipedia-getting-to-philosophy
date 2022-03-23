const cheerio = require("cheerio");
const axios = require("axios").default;
const fetchHtml = async url => {
	try {
		const { data } = await axios.get(url);
		return data;
	} catch {
		console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
	}
}

const scrapWiki = async () => {
	const wikiUrl =
		"https://en.wikipedia.org/wiki/Batman";

	const html = await fetchHtml(wikiUrl);
	//console.log(html);
	const selector = cheerio.load(html);

	
	const searchResults = selector("body")
		.find("mw-content-text")
		
	selector('a').each((i, link) => {
		const href = link.attribs.href;
		if(href=="/wiki/Superhero")console.log(href);
	});
	
	  /*
	const searchResults = selector("body")
		.find("mw-content-text")
		.find("<p>")
		.text()
		.trim();
		*/
	//console.log(searchResults);
	
};

scrapWiki();
/*
const wiki = require('wikijs').default;
wiki().page('batman').then(page => page.links({limit:5000})).then(console.log);


(async () => {
	try {
		const page = await wiki.page('Batman', {preload:false});
		console.log(page);
		//Response of type @Page object
		const summary = await page.summary();
		console.log(summary);
		//Response of type @wikiSummary - contains the intro and the main image
        const links = await page.links({redirect: false, limit: 1000});
		console.log(links.length)
        for(let thing in links){
            console.log(links[thing]);
        }
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
})();
*/