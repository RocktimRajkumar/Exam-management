const Subject = require('../model/subject.model');

exports.create = async (data) => {
    let subObj = {
        sub_name: data.body.name,
        semester_id: data.body.semester_id
    };

    if (await subjectSemesterExists(subObj["sub_name"], subObj["semester_id"]))
        throw { "message": "Subject "+subObj["sub_name"]+" already present for semester "+subObj["semester_id"]+"!" };

    sub_id = await Subject.find().sort({ sub_id: -1 }).limit(1);
    console.log(sub_id);
    if (sub_id.length) {
        sub_id = sub_id[0].sub_id + 1;
    }
    else {
        sub_id = 1;
    }

    subObj["sub_id"] = sub_id;

    console.log(subObj);

    const sub = new Subject(subObj);

    try {
        const sub_save = await sub.save();
        res = sub_save;
        return { "Success ": "Subject Created", "sub_id": sub_id };
    } catch (err) {
        return { "error ": err };
    }
};

exports.findAll = async () => {
    sub = await Subject.find();
    count = await Subject.find().count()
    return { "records": sub, "count": count }
}

exports.findById = async (sub_id) => {
    sub = await Subject.findOne({ sub_id: sub_id });
    return { "record": sub }
}


exports.update = async (sub_id, data) => {
    try {
        let update_data = {
            sub_name: data.body.name,
            semester_id: data.body.semester_id,
            is_active: data.body.is_active,
            updated_date: new Date
        };
        const sub_update = await Subject.updateOne({ sub_id: sub_id }, { $set: update_data });
        if (sub_update)
            return { "Success": "Updated" }
        else
            return { "Failed": "Failed to Update"}
    } catch (err) {
        throw { "message": "Update failed "+err+"!" };
    }
}

const subjectSemesterExists = async (sub_name, semester_id) => {
    sub = await Subject.findOne({ sub_name: sub_name, semester_id: semester_id });
    if (sub)
        return true
    else
        return false
}
