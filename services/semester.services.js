const Semester = require('../model/semester.model');

exports.create = async (data) => {
    let semObj = {
        sem_no: data.body.no,
        course_id: data.body.course_id
    };

    if (await semCourseExists(semObj["sem_no"], semObj["course_id"]))
        throw { "message": "Semester "+semObj["sem_no"]+" for following course already present!" }

    sem_id = await Semester.find().sort({ sem_id: -1 }).limit(1);
    console.log(sem_id);
    if (sem_id.length) {
        sem_id = sem_id[0].sem_id + 1;
    }
    else {
        sem_id = 1;
    }

    semObj["sem_id"] = sem_id;

    console.log(semObj)

    const sem = new Semester(semObj);

    try {
        const sem_save = await sem.save();
        res = sem_save;
        return { "Success ": "Semester Created", "sem_id": sem_id };
    } catch (err) {
        return { "error ": err };
    }
};

exports.findAll = async () => {
    sem = await Semester.aggregate([
        {$lookup:{from:"courses",localField:"course_id",foreignField:"course_id",as:"course"}},
        { $unwind:"$course" },
        {   
            $project:{
                _id: 1,
                sem_id : 2,
                sem_no : 3,
                course_id: 4,
                course_code: "$course.course_code",
                is_active: 7,
                created_date: 8,
                updated_date: 9
            } 
        }]);
    count = await Semester.find().count()
    return { "records": sem, "count": count }
}

exports.findById = async (sem_id) => {
    sem = await Semester.aggregate([
        {$lookup:{from:"courses",localField:"course_id",foreignField:"course_id",as:"course"}},
        { $unwind:"$course" },
        {
            $match:{
                $and:[{"sem_id" : parseInt(sem_id)}]
            }
        },
        {   
            $project:{
                _id: 1,
                sem_id : 2,
                sem_no : 3,
                course_id: 4,
                course_code: "$course.course_code",
                is_active: 7,
                created_date: 8,
                updated_date: 9
            } 
        }]);
    return { "record": sem }
}


exports.update = async (sem_id, data) => {
    try {
        let update_data = {
            sem_no: data.body.no,
            course_id: data.body.course_id,
            is_active: data.body.is_active,
            updated_date: new Date
        };
        const sem_update = await Semester.updateOne({ sem_id: sem_id }, { $set: update_data });
        return { "Success": "Updated" }
    } catch (err) {
        return { "Update Failed ": err }
    }
}

const semCourseExists = async (sem_no, course_id) => {
    sem = await Semester.findOne({ sem_no: sem_no, course_id: course_id });
    if (sem)
        return true
    else
        return false
}

exports.validateSemesterId = async(sem_id) => {
    sem = await Semester.findOne({sem_id: sem_id});
    if (sem == null)
        throw {"message": "Semester not found for "+sem_id+"!"};
}