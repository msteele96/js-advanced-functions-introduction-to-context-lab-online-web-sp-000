// Your code here
function createEmployeeRecord([firstName, familyName, title, rate]) {
    const employee = {
        firstName: firstName, 
        familyName: familyName, 
        title: title, 
        payPerHour: rate, 
        timeInEvents: [], 
        timeOutEvents: []
    }

    return employee
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeObj, timeStamp) {
    const time = timeStamp.split(" ")[1]
    const date = timeStamp.split(" ")[0]
    const timeInObj = {}

    timeInObj.type = "TimeIn"
    timeInObj.hour = parseInt(time)
    timeInObj.date = date
    
    employeeObj.timeInEvents.push(timeInObj)
    
    return employeeObj
}

function createTimeOutEvent(employeeObj, timeStamp) {
    const time = timeStamp.split(" ")[1]
    const date = timeStamp.split(" ")[0]
    const timeOutObj = {}

    timeOutObj.type = "TimeOut"
    timeOutObj.hour = parseInt(time)
    timeOutObj.date = date
    
    employeeObj.timeOutEvents.push(timeOutObj)
    
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    const timeIn = employeeObj.timeInEvents.find(element => element.date === date).hour
    const timeOut = employeeObj.timeOutEvents.find(element => element.date === date).hour

    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employeeObj, date) {
    const hours = hoursWorkedOnDate(employeeObj, date)
    const rate = employeeObj.payPerHour

    return rate * hours
}

function allWagesFor(employeeObj) {
    const dates = employeeObj.timeInEvents.map(event => event.date)
    return dates.reduce(function(runningTotal, date){
        return runningTotal + wagesEarnedOnDate(employeeObj, date)
    }, 0)
}

function findEmployeeByFirstName(employeeObjs, firstName) {
    return employeeObjs.find(info => info.firstName === firstName)    
}

function calculatePayroll(employeeObjs) {
    return employeeObjs.reduce(function(wages, employee){
        return wages + allWagesFor(employee)
    }, 0)
}