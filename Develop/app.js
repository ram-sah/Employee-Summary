const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teamMembers = [];
const idArray = [];

function mainList() {
    function createManager() {
        console.log("Time to build your team, Answer the following questions !");
        inquirer.prompt([
            {
                type: "input",
                message: "What is your Manager's Name?",
                name: "managerName",
                //Checking valid answer
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Invalid Name try again"
                }
            },
            {
                type: "input",
                message: "What is your manager's Id? ",
                name: "managerId",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please Enter Number between (1 to 9).";
                }
            },
            {
                type: "input",
                message: "What is your manager's Email? ",
                name: "managerEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please Enter valid Email.";
                }
            },
            {
                type: "input",
                message: "What is your manager's office number? ",
                name: "managerOfficeNumber",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please Enter valid number between (1-9).";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                message: "Select team member to add. ",
                name: "memberChoice",
                choices: [
                    "Engineer",
                    "Intern",
                    "I am done with adding team Members"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }
    // Making Function for Engineer 
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "engineerName",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please Enter valid name."
                }
            },
            {
                type: "input",
                message: "What is your engineer's Id? ",
                name: "engineerId",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        // check if duplicate ID
                        if (idArray.includes(answer)) {
                            return "This ID is already taken. Plz try another."
                        } else {
                            return true;
                        }
                    }
                    return "Please Enter Number between (1 to 9).";
                }
            },
            {
                type: "input",
                message: "What is your engineer's Email? ",
                name: "engineerEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please Enter a valid Email.";
                }
            },
            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "engineerGithub",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter valid user name.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    }
    // Making Function for Intern
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your Intern's name?",
                name: "internName",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please Enter valid name."
                }
            },
            {
                type: "input",
                message: "What is your Intern's Id? ",
                name: "internId",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        // check if duplicate ID
                        if (idArray.includes(answer)) {
                            return "This ID is already taken. Plz try another."
                        } else {
                            return true;
                        }
                    }
                    return "Please Enter Number between (1 to 9).";
                }
            },
            {
                type: "input",
                message: "What is your intern's Email? ",
                name: "internEmail",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please Enter a valid Email.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter valid School Name.";
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }
    function buildTeam() {
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    createManager();
}
mainList();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
