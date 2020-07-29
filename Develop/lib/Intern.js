// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Intern extends Employee {
    constructor(name, id, email, school) {
        //name, id & email has already initialised in Employee.js
        super(name, id, email);
        this.school = school;
    }
    getSchool() {
        return this.school;
    }
}
module.exports = Intern;