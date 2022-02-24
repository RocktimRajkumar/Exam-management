const Admin = require('../model/admin.model');

exports.create = async (data) => {
    email = data.body.email;
    password = data.body.pwd;
    uname = data.body.name;
    is_active = data.body.is_active;

    if (await userExists(email))
        throw { "message": "User already exists!" }

    user_id = await Admin.find().sort({ user_id: -1 }).limit(1);
    if (user_id.length) {
        user_id = user_id[0].user_id + 1;
    }
    else {
        user_id = 1;
    }

    const admin = new Admin({
        user_id: user_id,
        email: email,
        password: password,
        uname: uname,
        is_active: is_active
    });

    try {
        const save_admin = await admin.save();
        res = save_admin;
        return { "Success ": "Admin Created", "user_id": user_id };
    } catch (err) {
        return { "error ": err };
    }
};

exports.findAll = async () => {
    admins = await Admin.find();
    count = await Admin.find().count()
    return { "records": admins, "count": count }
}

exports.findById = async (user_id) => {
    admin = await Admin.findOne({ user_id: user_id });
    return { "record": admin }
}

exports.checkUserNamePwd = async (email, pwd) => {
    admin = await Admin.findOne({ email: email, password: pwd });
    if (admin)
        return { "Login": "Success", "id": admin.user_id }
    else
        throw { "Login": "Username or Password not correct" }
}

exports.update = async (user_id, data) => {
    try {
        update_data = {
            uname: data.body.name,
            is_active: data.body.is_active,
            updated_date: new Date
        };
        const admin_update = await Admin.updateOne({ user_id: user_id }, { $set: update_data });
        return { "Success": "Updated" }
    } catch (err) {
        return { "Update Failed ": err }
    }
}

const userExists = async (email) => {
    admin = await Admin.findOne({ email: email });
    if (admin)
        return true
    else
        return false
}
