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
var link = "";
var cnt = 0;
const scrapWiki = async (url) => {
	const wikiUrl = url;
	var html = await fetchHtml(wikiUrl);
	
	html = html.substring(html.indexOf('h1'))
	let idx = html.indexOf('id="toc"');
    
	if(idx!=-1)html = html.substring(0, html.indexOf('id="toc"'))
    idx = html.indexOf('</table>');
    var html2 = html;
	if(idx!=-1||idx>html.indexOf('h1'))html = html.substring(html.indexOf('</table>'))
	
    //console.log(html2)
	idx = html.indexOf('<p>');
	html = html.substring(html.indexOf('<p>'))
	html = html.substring(0, html.indexOf('</p>'));
	//console.log(html);
	while(!html.includes('href')){
        html = html2;
		html = html.substring(idx+4);
        html2 = html;
        idx = html.indexOf('<p>');
		html = html.substring(html.indexOf('<p>'))
		html = html.substring(0, html.indexOf('</p>'));
        idx = 0;
	}
	//console.log(html)
	let isLink = false;
	let paren = 0;
	
	for(var s of html.split(' ')){
		
		if(s.includes('('))paren+=(s.split("(").length - 1);
		if(s.includes(')'))paren-=(s.split(")").length - 1);
		//console.log(s, paren);
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
			//console.log(s);
			link = s.substring(6, s.length-1);
			break;
		}
		//console.log(s);
	}
	
	link = 'https://en.wikipedia.org'+link;
	console.log(`${cnt++}: ${link}`)
	if(link ==  'https://en.wikipedia.org/wiki/Philosophy')return;
	scrapWiki(link);
	
};
var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  
  });
  rl.question(">>Enter a link  ", function(answer) {
	link = answer;
	console.log(`${cnt++}: ${link}`)
	scrapWiki(link);
	rl.close();
 });



//
/*
let person = prompt("Enter a wikipedia article link");
link = input;
cnt = 0;
console.log(`${cnt++}: ${link}`)
scrapWiki(link);
*/
/*
function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

prompt('Enter a wikipedia article link:\n', function (input) {
    //console.log(input);

	link = input;
	//link = 'https://en.wikipedia.org/wiki/Mathematics'
	cnt = 0;
	console.log(`${cnt++}: ${link}`)
	scrapWiki(link);
    process.exit();
});
*/


/*
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
	