const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');


yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true
        },
        body: {
            describe: 'body',
            demandOption: true,
            type: "string"
        }
    },
    handler (argv) {
        const title = argv.title;
        const body = argv.body;
        if (title && body && title != "" && body != "") {
            notes.addNote(argv.title, argv.body);
        } else {
            console.log(chalk.red('Title and Body should not be empty!'));
        }
    }
}).argv;

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: "string"
        }
    },
    handler (argv) {
        if (argv.title && argv.title != "" && argv.title != " ") {
            notes.removeNote(argv.title)
        } else {
            console.log(chalk.red('Title should not be empty!'));
        }
    }
}).argv;

yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler () {
        notes.listNotes();
    }
}).argv;

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: "string"
        }
    },
    handler (argv) {
        argv && argv.title != "" && argv.title != " " ? notes.readNote(argv.title) : console.log(chalk.bgRed(`Invalid Title`));
    }
}).argv;
