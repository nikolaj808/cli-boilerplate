const inquirer = require('inquirer');
const fs = require('fs');
const { init, build } = require('./projectBuilder');

const existingConfig = fs.existsSync('pakage.json');

const existingConfigQuestion = [
    {
        type: 'confirm',
        name: 'overwrite',
        message: 'You already have an existing package.json! Would you like to overwrite it?',
        default: false,
    }
];

const nonExistingConfigQuestion = [
    {
        type: 'confirm',
        name: 'create',
        message: 'You do not have an existing package.json! Would you like to make one?',
        default: false,
    }
]

if (existingConfig) {
    inquirer
        .prompt(existingConfigQuestion)
        .then(async answer => {
            await init(answer.overwrite);
            build();
        })
        .catch(error => {
            console.error('Something went terribly wrong: ', error);
        });
} else {
    inquirer
        .prompt(nonExistingConfigQuestion)
        .then(async answer => {
            await init(answer.create);
            build();
        })
        .catch(error => {
            console.error('Something went terribly wrong: ', error);
        });
}