var rules = document.styleSheets[2].cssRules;
var colors = ['B48EAD', 'BF616A', 'D08770', 'EBCB8B', 'A3BE8C']
var randomColor = colors[Math.floor(Math.random() * colors.length)];

for (var i = 0; i < rules.length; i++)
    if (rules[i].selectorText == '::-webkit-scrollbar-thumb'){
        rules[i].style.background = '#'+randomColor;
        break;
    }
document.getElementById('noteFrame').src += "color=" + randomColor;

var noteData = {}
var currentlyOpen = {}

function addButtons(refresh) {
    if (!('noteData' in localStorage) || localStorage.noteData.length === 2) {
        let noteData = {
            note0: {name:'Quick note', content:'# Quick note\n - Press edit button to edit.\n - Press save after editing *(else won\'t be saved)*.\n - All note data is saved offline in your browser.\n - Supports styling with [markdown](https://www.markdownguide.org/).\n - [For more info](https://github.com/mukheshpugal/startpage).\n> This is a quote\n\nThe following is a table:\n|Title 1|Title 2|\n|--|--|\n|content|some other content|\n\n`A line of code`\n\nHere is an emoji for you: :heart:. Find more [here](https://gist.github.com/rxaviers/7360908).\n'}
        }
        localStorage.setItem('noteData', JSON.stringify(noteData));
    }
    noteData = JSON.parse(localStorage.getItem('noteData'));
    let buttons = '';
    Object.keys(noteData).forEach((key) => {
        buttons += '<div><span onclick="openNote(\''+String(key)+'\')">'+noteData[key].name+'</span><button onclick="delNote(\''+String(key)+'\')">x</button></div>';
    })
    document.getElementById('noteslist').innerHTML = buttons;
    if (refresh)
        openNote(Object.keys(noteData)[0]);
}

window.onmessage = function(e){
    if (e.data == 'refresh')
        addButtons(false);
}

function openNote(key) {
    document.getElementById('noteFrame').src = document.getElementById('noteFrame').src.split('&')[0] + '&noteId=' + String(key);
    currentlyOpen = key;
}

function delNote(key) {
    delete noteData[key];
    localStorage.setItem('noteData', JSON.stringify(noteData));
    addButtons((currentlyOpen == key));
}

function newNote() {
    let keys = Object.keys(noteData);
    var i = 0;
    while ('note'+String(i) in noteData)
        i++;
    noteData['note'+String(i)] = {name:'New note', content:'# New note'};
    localStorage.setItem('noteData', JSON.stringify(noteData));
    addButtons(false);
    openNote('note'+String(i));
}

addButtons(true);
