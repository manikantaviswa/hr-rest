Employee = require('./employee.model');
const multer = require('multer');
const ROOT = 'E:/Mani/profiles/uploads';
const FORMAT = '.jpeg';
exports.search = (req, res) => {
    Employee.get((err, emps) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Employees retrieved successfully",
            data: emps
        });
    });
};

exports.get = (req, res) => {
    Employee.findById(req.params.id, (err, employee) => {
        if (err)
            res.send(err);
        res.json({
            message: 'Employee retrieved successfully',
            data: employee
        });
    });
};

const save = (req, res, employee) => {
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.gender = req.body.gender;
    employee.phone = req.body.phone;
    employee.status = req.body.status || 'A';
    employee.save((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                message: req.params.id ? 'Updated employee' : 'New employee created',
                data: employee
            });
        }
    });
};

exports.save = (req, res) => {
    if (!req.params.id) {
        let employee = new Employee();
        save(req, res, employee);
    } else {
        Employee.findById(req.params.id, (err, employee) => {
            if (err)
                res.send(err);
            else
                save(req, res, employee);
        });
    }
};

exports.delete = (req, res) => {
    Employee.remove({ _id: req.params.id }, (err, resp) => {
        if (err) {
            res.send(err);
        } else {
            res.json({
                status: 'success',
                message: 'Contact deleted'
            });
        }
    });
};

exports.uploadPhoto = (req, res) => {
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, ROOT);
        },
        filename: function (req, file, callback) {
            const fileName = req.params.id + FORMAT;
            callback(null, fileName);
        }
    });
    const upload = multer({ storage: storage });

    upload.single('myfile')(req, res, (err) => {
        res.send( err || {
            status: 'success',
            message: 'Uploaded successfully'
        });
    });
}

exports.getPhoto = (req, res) => {
    res.sendFile(`${ROOT}\/${req.params.id}${FORMAT}`);
}
