const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');

const vanillaTemplateQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'What should be the title of the project?',
        default: path.basename(process.cwd()),
    },
    {
        type: 'input',
        name: 'author',
        message: 'Who\'s the author of the project?',
        default: '',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Give a short description of the project',
        default: '',
    },
    {
        type: 'confirm',
        name: 'stylesheetinclude',
        message: 'Do you want to include a stylesheet?',
        default: true,
    },
    {
        type: 'input',
        name: 'stylesheetpath',
        message: 'What path do you want to your stylesheet?',
        default: 'css/styles.css',
        when: answers => answers.stylesheetinclude,
    },
    {
        type: 'confirm',
        name: 'scriptinclude',
        message: 'Do you want to include a script?',
        default: true,
    },
    {
        type: 'input',
        name: 'scriptpath',
        message: 'What path do you want to your script?',
        default: 'js/script.js',
        when: answers => answers.scriptinclude,
    },
];

async function buildVanilla() {
    const answers = await inquirer.prompt(vanillaTemplateQuestions);
    console.log(answers);

    if (answers.stylesheetinclude && !fs.existsSync(path.dirname(answers.stylesheetpath))) {
        fs.mkdirSync(path.dirname(answers.stylesheetpath));
        fs.writeFileSync(path.join(process.cwd(), answers.stylesheetpath), '');
    }

    if (answers.scriptinclude && !fs.existsSync(path.dirname(answers.scriptpath))) {
        fs.mkdirSync(path.dirname(answers.scriptpath));
        fs.writeFileSync(path.join(process.cwd(), answers.scriptpath), 'console.log(\'Hello, World!\');');
    }

    fs.writeFileSync(path.join(process.cwd(), 'index.html'), getTemplateFromAnswers(answers));
}

function getTemplateFromAnswers(answers) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
        
    <meta charset="UTF-8">
    <meta name="description" content="${answers.description}">
    <meta name="author" content="${answers.author}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>${answers.title}</title>
    ${ answers.stylesheetinclude ? `\n\t<link rel="stylesheet" href="${answers.stylesheetpath}">\n` : '' }
</head>
<body>
    ${ answers.scriptinclude ? `\n\t<script src="${answers.scriptpath}" defer></script>\n` : '' }
</body>
</html>`;
}

module.exports = { buildVanilla };