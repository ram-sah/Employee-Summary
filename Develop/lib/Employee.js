// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    //Below Code will remove the redundancy of adding a getRole function to the other child classes
    getRole() {
        return this.constructor.name;
    }
}

module.exports = Employee;
