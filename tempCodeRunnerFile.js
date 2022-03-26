idx = html.indexOf('</table>');
    var html2 = html;
	if(idx!=-1||idx>html.indexOf('h1'))html = html.substring(html.indexOf('</table>'))