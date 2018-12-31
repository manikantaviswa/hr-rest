var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    created_on: {
        type: Date,
        default: Date.now
    }
});

// Export employee model
var Employee = mongoose.model('employee', employeeSchema);

Employee.get = (callback, limit) => {
    Employee.find(callback).limit(limit);
};

module.exports = Employee;
