var args = window.location.search.substring(1).split('&');
var randomColor = '#000';
var noteId = 0;
var md = window.markdownit().use(window.markdownitEmoji);

for (var i = 0; i < args.length; i++) {
	var arg = args[i].split('=');
	if (arg[0] == 'color') 
		randomColor = '#'+arg[1];
	if (arg[0] == 'noteId')
		noteKey = arg[1]
}

var rules = document.styleSheets[0].cssRules;
    for (var i = 0; i < rules.length; i++) {
        if (rules[i].selectorText == '::-webkit-scrollbar-thumb')
            rules[i].style.background = randomColor;
        if (rules[i].selectorText == 'a') {
        	rules[i].style.color = randomColor;
        }
    }

function toEdit() {
	document.getElementById('editButton').style.display = 'none';
	document.getElementById('saveButton').style.display = 'block';
	document.getElementById('markdown').style.display = 'none';
	document.getElementById('editor').style.display = 'block';
}

function toSave() {
	var mk = document.getElementById('editor');

	let text = mk.innerText;
	heading = text.split('\n', 1)[0];
	for (var i = 0; i < heading.length; i++)
		if (heading[i] !== '#')
			if (heading[i] !== ' ') {
				heading = heading.slice(i);
				break;
			}
	noteData[noteKey].name = heading;
	noteData[noteKey].content = text;
	localStorage.setItem('noteData', JSON.stringify(noteData));
	setTimeout(function(){window.top.postMessage('refresh', '*');}, 0);

	document.getElementById('markdown').innerHTML = md.render(text);
	document.getElementById('editButton').style.display = 'block';
	document.getElementById('saveButton').style.display = 'none';
	document.getElementById('markdown').style.display = 'block';
	document.getElementById('editor').style.display = 'none';
}

var noteData = JSON.parse(localStorage.getItem('noteData'));
document.getElementById('editor').innerHTML = noteData[noteKey].content;
toEdit();
toSave();
