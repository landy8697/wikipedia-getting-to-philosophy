const axios = require("axios").default;
const scrapWiki = async (url) => {
	const wikiUrl = "https://en.wikipedia.org/wiki/Creativity";
	var html = await fetchHtml(wikiUrl);
	
	html = html.substring(html.indexOf('h1'))
    //console.log(html);
	let idx = html.indexOf('id="toc"');
   // console.log(idx);
	if(idx!=-1)html = html.substring(0, html.indexOf('id="toc"'))
    idx = html.indexOf('</table>');
    var html2 = html;
	if(idx!=-1)html = html.substring(html.indexOf('</table>'))
	
    //console.log(html2)
    idx = html.indexOf('<p>');
    //console.log(idx)
	html = html.substring(html.indexOf('<p>'))
	html = html.substring(0, html.indexOf('</p>'));
	console.log(html);
	while(!html.includes('href')){
       // console.log(html);
        html = html2;
		html = html.substring(idx+4);
        html2 = html;
        idx = html.indexOf('<p>');
		html = html.substring(html.indexOf('<p>'))
		html = html.substring(0, html.indexOf('</p>'));
        idx = 0;
	}
	console.log(html)
	let isLink = false;
	let paren = 0;
	
	for(var s of html.split(' ')){
		
		if(s.includes('('))paren+=(s.split("(").length - 1);
		if(s.includes(')'))paren-=(s.split(")").length - 1);
		console.log(s, paren);
		if(paren!=0)continue;
		
		if(!s.includes('<a') && !isLink)continue;
		if(s == '<a'){
			isLink = true;
			continue;
		}
		if(s.includes('<a'))isLink = true;
		if(s.includes('</a>'))isLink = false;
		if(s.includes('reference'))continue;
		if(s.includes('cite_note'))continue;

		if(s.includes('href')){
			console.log(s);
			link = s.substring(6, s.length-1);
			break;
		}
		//console.log(s);
	}
	
	
	
};
const fetchHtml = async url => {
	try {
		const { data } = await axios.get(url);
		return data;
	} catch {
		console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
	}
}

scrapWiki();