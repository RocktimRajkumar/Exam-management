const Department = require('../model/department.model');

exports.create = async (data) => {
    let deptObj = {
        dept_code: data.body.code,
        dept_name: data.body.name,
    };

    if (await deptCodeExists(deptObj["dept_code"]))
        throw { "message": "Dept Code already present!" }

    dept_id = await Department.find().sort({ dept_id: -1 }).limit(1);
    console.log(dept_id);
    if (dept_id.length) {
        dept_id = dept_id[0].dept_id + 1;
    }
    else {
        dept_id = 1;
    }

    deptObj["dept_id"] = dept_id;

    console.log(deptObj)

    const dept = new Department(deptObj);

    try {
        const dept_save = await dept.save();
        res = dept_save;
        return { "Success ": "Department Created", "dept_id": dept_id };
    } catch (err) {
        return { "error ": err };
    }
};

exports.findAll = async () => {
    departments = await Department.find();
    count = await Department.find().count()
    return { "records": departments, "count": count }
}

exports.findById = async (d_id) => {
    department = await Department.findOne({ dept_id: d_id });
    return { "record": department }
}


exports.update = async (d_id, data) => {
    try {
        let update_data = {
            dept_name: data.body.name,
            is_active: data.body.is_active,
            updated_date: new Date
        };
        const dept_update = await Department.updateOne({ dept_id: d_id }, { $set: update_data });
        return { "Success": "Updated" }
    } catch (err) {
        return { "Update Failed ": err }
    }
}

const deptCodeExists = async (d_code) => {
    dept = await Department.findOne({ dept_code: d_code });
    if (dept)
        return true
    else
        return false
}
