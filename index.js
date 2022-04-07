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
var searchNumber = 0;
const map1 = new Map();
const curSet = new Set();
const dict = {};
var articleNum = 1;
var firstTitle = '';
map1.set('https://en.wikipedia.org/wiki/Philosophy', 0);
const scrapWiki = async (url, chain) => {
	if(url=='https://en.wikipedia.org/wiki/Philosophy'){
		map1.set(prevTitle, 'Philosophy')
		console.log(`${cnt++}: ${'Philosophy'}`)
		return 1;
	}
	if(chain){
		if(url=='Philosophy'){
			console.log(`${cnt++}: ${'Philosophy'}`)
			return 1;
		}
		if(curSet.has(url)){
			console.log(`${cnt++}: ${url}`)
			console.log('Found a loop!')
			return Number.MIN_SAFE_INTEGER;
		}
		curSet.add(url);
		console.log(`${cnt++}: ${url} (Found)`)
		return await scrapWiki(map1.get(url), true)+1;
	}
	
	const wikiUrl = url;
	
	var html = await fetchHtml(wikiUrl);
	var orig = html;
	var title = html.substring(html.indexOf('<title>')+7, html.indexOf('</title>'));
	title = title.substring(0, title.indexOf(' - Wikipedia'));
	//if(cnt==0){
	//	console.log(title, searchNumber++);
	//}
	//titleMap.set(url. title);
	if(url=='https://en.wikipedia.org/wiki/Special:Random'){
		firstTitle = title;
		console.log(title, articleNum++);
	}
	if(prevTitle!='')map1.set(prevTitle, title);
	if(curSet.has(url)){
		console.log(`${cnt++}: ${title}`)
		console.log('Found a loop!')
		return Number.MIN_SAFE_INTEGER;
	}else{
		if(url!='https://en.wikipedia.org/wiki/Special:Random')curSet.add(url);
		curSet.add(title);
	}
	if(map1.has(title)){
		console.log(`${cnt++}: ${title}`)
		return await scrapWiki(map1.get(title), true)+1;
	}
	//console.log(title);
	//titleMap.set(title, url);
	var $ = cheerio.load(html);   
    $('table').each(function() {      
		//console.log(this.attribs)
        this.children = {};     
    });$('.toc').each(function() {      
		//console.log('YAY')
        this.children = {};     
    });
	link = '';
	$('p').each(function() {
		//console.log($(this).html());
		let html2 = $(this).html();
		if(!html2.includes('href'))return true;
		link = firstValidLink(html2);
		if(link!='')return false;
	});
	$('li').each(function() {
		if(link!='')return false;
		//console.log($(this).html());
		let html2 = $(this).html();
		if(!html2.includes('href'))return true;
		link = firstValidLink(html2);
		if(link!='')return false;
	});
	prevTitle = title;
	link = 'https://en.wikipedia.org'+link;
	//if(!curSet.has(link))scrapWiki(link, false);
	
	
	//console.log(curSet);
	if(url!= 'https://en.wikipedia.org/wiki/Special:Random')console.log(`${cnt++}: ${title}`)
	//console.log(link);
	//if(link ==  'https://en.wikipedia.org/wiki/Philosophy')return;
	return await scrapWiki(link, false)+1;
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
		if(s.includes('cite_note'))continue;s
		if(s.includes('Help'))continue;
		if(s.includes('Wikipedia'))continue;
		if(s.includes('wikipedia'))continue;
		if(s.includes('wikimedia'))continue;
		if(s.includes('wiktionary'))continue;
		if(s.includes('File'))continue;
		if(s.includes('Map'))continue;
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

rl.question(">>Enter number of articles: ", async function(answer) {
	let num = parseInt(answer);
	for(let i = 0; i < num; i++){
		console.log('---------------------------------------------------------------')
		curSet.clear();
		cnt = 0;
		prevTitle = '';
        //var linkCnt = await scrapWiki('https://en.wikipedia.org/wiki/1900_in_literature', false);
		var linkCnt = await scrapWiki('https://en.wikipedia.org/wiki/Special:Random');
		dict[firstTitle] = linkCnt;
		//scrapWiki('https://en.wikipedia.org/wiki/United_States');
		//scrapWiki('https://en.wikipedia.org/wiki/Creativity', false);
	}
	//console.log(dict);
	var items = Object.keys(dict).map(function(key) {
		return [key, dict[key]];
	  });
	  
	  // Sort the array based on the second element
	  items.sort(function(first, second) {
		return second[1] - first[1];
	  });
	  console.log(items);
	rl.close();
});	