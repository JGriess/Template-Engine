const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const render = require("./lib/htmlRenderer");
const employeeAr = [];

function ask() {
    inquirer.prompt([
        {
            type: "input",
            message: "Name:",
            name: "name"
        },
        {
            type: "input",
            message: "ID:",
            name: "id"
        },
        {
            type: "input",
            message: "Email:",
            name: "email"
        },
        {
            type: "expand",
            message: "Role:",
            name: "role",
            choices: [
                {
                    key: 'M',
                    name: 'Manager',
                    value: 'Manager'
                },
                {
                    key: 'E',
                    name: 'Engineer',
                    value: 'Engineer'
                },
                {
                    key: 'I',
                    name: 'Intern',
                    value: 'Intern'
                },
            ]
        },
    ]).then(answers => {
        if (answers.role === "Manager") {
            inquirer.prompt([{
                type: "input",
                message: "Office Number:",
                name: "officeNum"
            }
            ]).then(
                answer => {
                    const newManager = new Manager(answers.name, answers.id, answers.email, answer.officeNum)
                    const hmtl = render([newManager]);
                    outputHtml(hmtl)
                }
            )
        }
        else if (answers.role === "Intern") {
            inquirer.prompt([{
                type: "input",
                message: "School:",
                name: "school"
            }
            ]).then(
                answer => {
                    const newIntern = new Intern(answers.name, answers.id, answers.email, answer.school)
                    const hmtl = render([newIntern]);
                    outputHtml(hmtl)
                }
            )
        }
        else if (answers.role === "Engineer") {
            inquirer.prompt([{
                type: "input",
                message: "Github:",
                name: "github"
            }
            ]).then(
                answer => {
                    const newEngineer = new Engineer(answers.name, answers.id, answers.email, answer.github)
                    const hmtl = render([newEngineer]);
                    outputHtml(hmtl)
                }
            )
        }

    })
        .catch(error =>
            console.log("error")
        );
}
ask()
function oneMore() {
    inquirer.prompt([{
        type: "confirm",
        message: "Add another employee:",
        name: "another"
    }])
    if (answers.another == true) {
        ask()
    }
}
function outputHtml(html) {
    fs.writeFile("./output/team.html", html, function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data)
        }
    });
}
