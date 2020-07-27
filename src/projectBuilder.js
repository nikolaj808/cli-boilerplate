const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { buildVanilla } = require('./templates/vanilla');

const packageJsonQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?',
        default: path.basename(process.cwd()),
    },
    {
        type: 'input',
        name: 'version',
        message: 'What is the project version?',
        default: '1.0.0',
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the description for the project?',
        default: '',
    },
    {
        type: 'input',
        name: 'author',
        message: 'Who is the author of the project?',
        default: '',
    },
    {
        type: 'input',
        name: 'license',
        message: 'Under what license is this project?',
        default: 'ISC',
    },
];

const projectChoices = ['Vanilla', 'Testing'];

const projectTypeQuestion = [
    {
        type: 'list',
        name: 'type',
        message: 'What kind of project do you want to build?',
        choices: projectChoices, 
    }
]

async function init(create) {
    if (create) {
        const answers = await inquirer.prompt(packageJsonQuestions);
        fs.writeFileSync(path.join(process.cwd(), 'pakage.json'), JSON.stringify(answers, null, 2));
    }
}

async function build() {
    const answer = await inquirer.prompt(projectTypeQuestion);
    const type = answer.type.toLowerCase();
    switch(type) {
        case 'vanilla':
            await buildVanilla();
            break;
        
        default:
            break;
    }
}

module.exports = { init, build };