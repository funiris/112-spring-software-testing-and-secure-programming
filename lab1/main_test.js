const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", () => {
    const myClass = new MyClass();
    const student1 = new Student();
    const student2 = new Student();

    // Adding the first student
    const studentId1 = myClass.addStudent(student1);
    expect(studentId1).to.equal(0);

    // Adding the second student
    const studentId2 = myClass.addStudent(student2);
    expect(studentId2).to.equal(1);
});

test("Test MyClass's getStudentById", () => {
    const myClass = new MyClass();
    const student1 = new Student();
    const student2 = new Student();
    student1.setName('John');
    student2.setName('Jane');
    myClass.addStudent(student1);
    myClass.addStudent(student2);

    // Getting an existing student
    const existingStudent1 = myClass.getStudentById(0);
    expect(existingStudent1.getName()).to.equal('John');

    const existingStudent2 = myClass.getStudentById(1);
    expect(existingStudent2.getName()).to.equal('Jane');

    // Getting a non-existing student
    const nonExistingStudent = myClass.getStudentById(2);
    expect(nonExistingStudent).to.be.null;
});

test("Test Student's setName", () => {
    const student = new Student();

    // Setting a valid name
    student.setName('John');
    expect(student.getName()).to.equal('John');

    // Setting an invalid name
    student.setName(123); // Setting a non-string name
    expect(student.getName()).to.equal(''); // Name should remain unchanged
});

test("Test Student's getName", () => {
    const student = new Student();

    // Getting name when it's not set
    expect(student.getName()).to.equal('');

    // Getting name after setting it
    student.setName('Jane');
    expect(student.getName()).to.equal('Jane');
});
