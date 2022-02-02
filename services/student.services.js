const Student = require('../model/student.model');

exports.create = async (data) => {
    let studentObj = {
        s_name: data.body.name,
        state: data.body.state,
        pincode: data.body.pincode,
        district: data.body.district,
        city: data.body.city,
        phone: data.body.phone,
        email: data.body.email,
        gender: data.body.gender,
        dob: data.body.dob,
        dept_id: data.body.dept_id,
        batch: data.body.batch,
        rollno: data.body.rollno,
        password: data.body.pwd
    };

    if (await userExists(studentObj["email"], studentObj["phone"]))
        throw { "message": "User already exists!" }

    user_id = await Student.find().sort({ student_id: -1 }).limit(1);
    if (user_id.length) {
        user_id = user_id[0].student_id + 1;
    }
    else {
        user_id = 1;
    }

    studentObj["student_id"] = user_id;

    console.log(studentObj)

    const student = new Student(studentObj);

    try {
        const save_student = await student.save();
        res = save_student;
        return { "Success ": "Student Created", "user_id": user_id };
    } catch (err) {
        return { "error ": err };
    }
};

exports.findAll = async () => {
    students = await Student.find();
    count = await Student.find().count()
    return { "records": students, "count": count }
}

exports.findById = async (user_id) => {
    student = await Student.findOne({ student_id: user_id });
    return { "record": student }
}

exports.checkUserNamePwd = async (email, pwd) => {
    student = await Student.findOne({ email: email, password: pwd, is_active: true });
    if (student)
        return { "Login": "Success" }
    else
        throw { "Login": "Username or Password not correct" }
}

exports.update = async (user_id, data) => {
    try {
        let update_data = {
            s_name: data.body.name,
            state: data.body.state,
            pincode: data.body.pincode,
            district: data.body.district,
            city: data.body.city,
            gender: data.body.gender,
            dob: data.body.dob,
            dept_id: data.body.dept_id,
            batch: data.body.batch,
            rollno: data.body.rollno,
            password: data.body.pwd,
            is_active: data.body.is_active,
            updated_date: new Date
        };
        const student_update = await Student.updateOne({ student_id: user_id }, { $set: update_data });
        return { "Success": "Updated" }
    } catch (err) {
        return { "Update Failed ": err }
    }
}

const userExists = async (email, phone) => {
    admin = await Student.findOne({ $or: [{ email: email }, { phone: phone }] });
    if (admin)
        return true
    else
        return false
}
