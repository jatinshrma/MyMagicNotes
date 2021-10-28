console.log('This is JavaScript for My Magic Notes.')

showNotes();
sessionStorage.clear();

// Add Title
// add title and save it into local Storage

let addTitle = document.getElementById('addTitle');
let title = document.createElement('input');
title.setAttribute('type', 'text');
title.className = "my-2 form-control";
title.id = "titleTxt";
title.style.outline = "none";
title.setAttribute('style', 'font-size: 18px; font-weight: bold; width:100%; border: 1px solid #ced4da;');
addTitle.append(title);

// Save Notes
// When 'Save Note' button is pressed, it will save the types text into localStorage 

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function saveTxt() {
    let addTxt = document.getElementById('addTxt');
    let titleTxt = document.getElementById('titleTxt');
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    if (titles == null) {
        var titleObj = [];
    }
    else {
        titleObj = JSON.parse(titles);
    }

    if (titleTxt.value != 0 || addTxt.value != 0) {
        notesObj.push(addTxt.value);
        titleObj.push(titleTxt.value);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        localStorage.setItem('titles', JSON.stringify(titleObj));
    }
    addTxt.value = '';
    titleTxt.value = '';
    showNotes();
});

// Show Notes
// Function to display saved notes, fetching it from local storage and injecting into html.

function showNotes() {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    if (titles == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(titles);
    }

    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card my-2 mx-2 notecard" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title" id= "${index}title"></h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onClick="delNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>
        `
    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show, add something using above section.`
    }

    titleObj.forEach(function (element, index) {
        document.getElementById(`${index}title`).innerText = `${element}`;
    });

};

// Delete Notes
// When 'Delete Note' button is  pressed, 'splice' will delete the note of the given index, then the local storage will be updated with the remaining notes and 'showNote' will be called to display the saved notes. 

function delNote(index) {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');

    let deletedNote = sessionStorage.getItem('deletedNote');
    let deletedTitle = sessionStorage.getItem('deletedTitle');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    if (titles == null) {
        titleObj = [];
    }
    else {
        titleObj = JSON.parse(titles);
    }

    if (deletedTitle == null) {
        deletedTitleObj = [];
    }
    else {
        deletedTitleObj = JSON.parse(deletedTitle);
    }
    if (deletedNote == null) {
        deletedNoteObj = [];
    }
    else {
        deletedNoteObj = JSON.parse(deletedNote);
    }

    deletedTitleObj.push(titleObj.slice(index)[0]);
    sessionStorage.setItem('deletedTitle', JSON.stringify(deletedTitleObj));

    deletedNoteObj.push(notesObj.slice(index)[0]);
    sessionStorage.setItem('deletedNote', JSON.stringify(deletedNoteObj));

    titleObj.splice(index, 1);
    notesObj.splice(index, 1);

    localStorage.setItem('titles', JSON.stringify(titleObj));
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
    showAlert(index);
};

// Search & Filter
// Filter your notes by fetching data from containing tag and then comparing search input, if any note does not match the search input, it's display will be set to "none".

searchTxt.addEventListener('input', function () {
    inputVal = searchTxt.value;
    let cardBody = document.getElementsByClassName('notecard');
    Array.from(cardBody).forEach(function (element) {
        let titleTxt = element.getElementsByTagName('h5')[0].innerText;
        let descriptTxt = element.getElementsByTagName('p')[0].innerText;
        if (descriptTxt.includes(inputVal.toLowerCase()) || titleTxt.includes(inputVal.toLowerCase())) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    });
});

// Undo-Alert
// Shows an alert to undo the action if you hae deleted it unintentionally.

function showAlert(index) {
    let alerts = document.getElementById("alertMessage");

    let html = '';
    deletedNoteObj.forEach(function (index) {

        html += `<div id="Alert${index}" class="alert alert-primary align-items-center my-3" role="alert" style= "display: flex; align-items: center;">
        <div>
            If you've deleted a note unintentionally, you can undo it from here.
        </div>
        <button type="button" id="${index}" onClick="restore(this.id)" class="btn btn-secondary" id="button" style="position: absolute; right: 52px;">Undo</button>
        <button type="button" id="cross" onClick="cross(this.class)" class="${index} btn-close" data-bs-dismiss="alert" aria-label="Close" style="position: absolute; right: 14px;"></button>
        </div>
        `;
    });
    alerts.innerHTML = html;
};

// Restore
// Restore the data from session storage to local storage

function restore(index) {

    titleObj.push(deletedTitleObj.slice(-1)[0]);
    localStorage.setItem('titles', JSON.stringify(titleObj));

    notesObj.push(deletedNoteObj.slice(-1)[0]);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    deletedTitleObj.splice(-1);
    deletedNoteObj.splice(-1);
    sessionStorage.setItem('deletedTitle', JSON.stringify(deletedTitleObj));
    sessionStorage.setItem('deletedNote', JSON.stringify(deletedNoteObj));

    document.getElementById(`Alert${index}`).innerHTML = "";
    document.getElementById(`Alert${index}`).style.display = "none";
    showNotes(index);

};

// Cross button
// Cross button, on right side of undo-alert.

function cross(index) {
    deletedTitleObj.splice(-1);
    deletedNoteObj.splice(-1);
    sessionStorage.setItem('deletedTitle', JSON.stringify(deletedTitleObj));
    sessionStorage.setItem('deletedNote', JSON.stringify(deletedNoteObj));
};