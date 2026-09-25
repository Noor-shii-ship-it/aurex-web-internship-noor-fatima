// Week 4 - JavaScript Exercises

// 1. Variables
const studentName = "Noor Fatima";
let age = 20;

console.log("Student:", studentName);
console.log("Age:", age);


// 2. Condition
let marks = 75;

if (marks >= 50) {
    console.log("Result: Pass");
} else {
    console.log("Result: Fail");
}


// 3. Function
function greetStudent(name) {
    return "Hello, " + name + "!";
}

console.log(greetStudent(studentName));


// 4. Array
const skills = ["HTML", "CSS", "JavaScript"];

skills.forEach(function (skill) {
    console.log("Skill:", skill);
});


// 5. Object
const student = {
    name: "Noor Fatima",
    domain: "Full-Stack Web Development",
    week: 4
};

console.log("Student Name:", student.name);
console.log("Domain:", student.domain);
console.log("Current Week:", student.week);
