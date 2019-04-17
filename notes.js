const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();
    const currentNote = {
        title: title,
        body: body
    };
    if (!!notes.find(n => n.title === title)) {
        console.log(chalk.red('Note with same title already added!'));
    } else {
        notes.push(currentNote);
        saveNotes(notes);
        console.log(chalk.green('Note added!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    if (notes.length != 0) {
        const tempNotes = notes.filter(n => n.title != title);
        saveNotes(tempNotes);
        console.log(chalk.bgRed(`Note titled ${title} removed!`));
    } else {
        console.log(chalk.red('No Notes found!!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.bgGreen(`--- Your Notes ---`));
        notes.forEach(n => console.log(chalk.green(n.title)));
    } else {
        console.log(chalk.red(`No Notes found!`));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    if (notes.length > 0) {
        const selectedNote = notes.find(n => n.title === title);
        if (!!selectedNote) {
            console.log(chalk.bgGreen(selectedNote.title));
            console.log(chalk.green(selectedNote.body));
        } else {
            console.log(chalk.red('No Notes found!!'));            
        }
    } else {
        console.log(chalk.red('No Notes found!!'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./db-notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('./db-notes.json', dataJSON);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}