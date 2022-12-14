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
var prevTitle = '';
const map1 = new Map();
const curSet = new Set();
const titleMap = new Map();
map1.set('https://en.wikipedia.org/wiki/Philosophy', 0);
const scrapWiki = async (url, chain) => {
	
	
	const wikiUrl = url;
	
	var html = await fetchHtml(wikiUrl);
	idx = html.indexOf('</table>');
	if(idx!=-1||idx>html.indexOf('h1'))html = html.substring(html.indexOf('</table>'))
	
	link = firstValidLink(html);

	link = 'https://en.wikipedia.org'+link;
	//if(!curSet.has(link))scrapWiki(link, false);
	
	
	//console.log(curSet);
	console.log(`${cnt++}: ${link}`)
	//console.log(link);
	//if(link ==  'https://en.wikipedia.org/wiki/Philosophy')return;
	return await scrapWiki(link, false);
};

function callScrapWiki(){

}
function firstValidLink(html){
	let isLink = false;
	let paren = 0;
	let curlink = '';
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
		if(!s.includes('/wiki/'))continue;
		if(s.includes('reference'))continue;
		if(s.includes('cite_note'))continue;
		if(s.includes('Help'))continue;
		if(s.includes('Wikipedia'))continue;
		if(s.includes('File'))continue;
        if(s.includes('wikipedia'))continue;
        if(s.includes('Template'))continue;
        if(s.includes('Talk'))continue;
        if(s.includes('Talk'))continue;
        if(s.includes('Category'))continue;
		if(s.includes('href')){
			//console.log(s);
			curlink = s.substring(6, s.length-1);
			break;
		}
		//console.log(s);
	}
	return curlink;
}

var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  
  });

var finished = false;
curSet.clear();
cnt = 0;
prevTitle = '';
scrapWiki('https://en.wikipedia.org/wiki/The_Diary_of_a_Chambermaid_(novel)');
/*
rl.question(">>Enter number of articles: ", async function(answer) {
	let num = parseInt(answer);
	for(let i = 0; i < num; i++){
		console.log('---------------------------------------------------------------')
		curSet.clear();
		cnt = 0;
		prevTitle = '';
		await scrapWiki('https://en.wikipedia.org/wiki/Special:Random');
		//scrapWiki('https://en.wikipedia.org/wiki/United_States');
		//scrapWiki('https://en.wikipedia.org/wiki/Creativity', false);
	}
	
	rl.close();
});
*/
	/*
	add while loop
	rl.question(">>Enter a link, END to finish: ", function(answer) {
		if(answer=='END'){
			finished = false;
			r1.close();
		}
		link = answer;
		console.log(`${cnt++}: ${link}`)
		scrapWiki(link);
		rl.close();
	});
	*/




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
	