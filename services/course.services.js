const Course = require('../model/course.model');

exports.create = async (data) => {
    let courseObj = {
        course_code: data.body.code,
        course_name: data.body.name,
        course_duration: data.body.duration,
        dept_id: data.body.dept_id
    };

    if (await courseCodeExists(courseObj["course_code"]))
        throw { "message": "Course Code already present!" }

    course_id = await Course.find().sort({ course_id: -1 }).limit(1);
    console.log(course_id);
    if (course_id.length) {
        course_id = course_id[0].course_id + 1;
    }
    else {
        course_id = 1;
    }

    courseObj["course_id"] = course_id;

    console.log(courseObj)

    const course = new Course(courseObj);

    try {
        const course_save = await course.save();
        res = course_save;
        return { "Success ": "Course Created", "course_id": course_id };
    } catch (err) {
        return { "error ": err };
    }
};

exports.findAll = async () => {
    courses = await Course.aggregate([
        {$lookup:{from:"departments",localField:"dept_id",foreignField:"dept_id",as:"dept"}},
        { $unwind:"$dept" },
        {   
            $project:{
                _id: 1,
                course_id : 2,
                course_name : 3,
                course_code: 4,
                dept_id: 5,
                dept_code: "$dept.dept_code",
                is_active: 7,
                created_date: 8,
                updated_date: 9
            } 
        }]);
    count = await Course.find().count()
    return { "records": courses, "count": count }
}

exports.findById = async (course_id) => {
    course = await Course.aggregate([
        {$lookup:{from:"departments",localField:"dept_id",foreignField:"dept_id",as:"dept"}},
        { $unwind:"$dept" },
        {
            $match:{
                $and:[{"course_id" : parseInt(course_id)}]
            }
        },
        {   
            $project:{
                _id: 1,
                course_id : 2,
                course_name : 3,
                course_code: 4,
                dept_id: 5,
                dept_code: "$dept.dept_code",
                is_active: 7,
                created_date: 8,
                updated_date: 9
            } 
        }]);
    // course = await Course.findOne({ course_id: course_id });
    return { "record": course }
}


exports.update = async (d_id, data) => {
    try {
        let update_data = {
            course_name: data.body.name,
            course_duration: data.body.duration,
            dept_id: data.body.dept_id,
            is_active: data.body.is_active,
            updated_date: new Date
        };
        const course_update = await Course.updateOne({ course_id: d_id }, { $set: update_data });
        return { "Success": "Updated" }
    } catch (err) {
        return { "Update Failed ": err }
    }
}

const courseCodeExists = async (course_code) => {
    course = await Course.findOne({ course_code: course_code });
    if (course)
        return true
    else
        return false
}
