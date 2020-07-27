const inquirer = require('inquirer');
const { build } = require('./projectBuilder');
const { vanillaTemplate, vanillaChoices } = require('./templates/vanilla');

const projectChoices = ['Vanilla'];



inquirer
    .prompt([{
        type: 'list',
        name: 'type',
        message: 'What kind of project do you want to build?',
        choices: projectChoices,
        default: projectChoices[0]
    }])
    .then(answers => {
        console.log(answers);
    })
    .catch(error => {
        if (error.isTtyError) {
            console.error('Prompt could not be rendered in the current environment');
        } else {
            console.error('Something unexpected happened. Error message: ', error);
        }
    });