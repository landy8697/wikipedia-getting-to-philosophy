const cheerio = require("cheerio");
const axios = require("axios").default;
const wiki = require('wikipedia');
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
		"https://en.wikipedia.org/wiki/Cognition";

	var html = await fetchHtml(wikiUrl);
	html = html.substring(html.indexOf('h1'))
	const $ = cheerio.load(html);
	
	//while(html.includes('<table')){
	//	html = html.substring(0, html.indexOf('<table')+6)+html.substring('</table>')
	//}
	/*
	$('table').each((i, link) => {

		//console.log($(this).html)
		$(this).html('');
	});
	html = $.html()
	*/
	//console.log(html);
	//console.log(html==='hi')
	html = html.substring(html.indexOf('<p>'))
	html = html.substring(0, html.indexOf('</p>'));
	console.log(html)
	isLink = false;
	openParen = false;
	for(var s of html.split(' ')){
		
		if(s.includes('('))openParen = true;
		if(s.includes(')'))openParen = false;
		if(openParen)continue;
		if(!s.includes('<a') && !isLink)continue;
		if(s == '<a'){
			isLink = true;
			continue;
		}
		if(s.includes('<a'))isLink = true;
		if(s.includes('</a>'))isLink = false;
		if(s.includes('reference'))continue;
		if(s.includes('cite_note'))continue;

		
		console.log(s);
		if(s.includes('href'))break;
		//console.log(s);
	}
	/*
	while(html.includes('<a')){
		html = html.substring(html.indexOf('<a')+2)
		href = 
		console.log(html)
	}
	*/

	/*
	const wikiUrl =
		"https://en.wikipedia.org/wiki/Batman";

	var html = await fetchHtml(wikiUrl);
	const $ = cheerio.load(html);
	$('#coordinates').remove();
	var link = $('#mw-content-text').html();
	//console.log(link)
	link = link.substring(link.indexOf('<p>'))
	console.log(link);
	link = link.substring(0, link.indexOf('</p>'))
	console.log(link)
	*/
	//console.log(html);
	/*
	const selector = cheerio.load(html);

	
	const searchResults = selector("body")
		.find("mw-content-text")
		
	selector('a').each((i, link) => {
		const href = link.attribs.href;
		if(href=="/wiki/Superhero")console.log(href);
	});
	*/
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