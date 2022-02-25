const MarkSheet = require('../model/mark_sheet.model');
const Subject = require('../services/subject.services')
const Student = require('../services/student.services')

exports.create = async (data) => {
    let markSheetObj = {
        student_id: data.body.student_id,
        sub_id: data.body.sub_id,
        mark: data.body.mark
    };

    await validate(markSheetObj["student_id"],markSheetObj["sub_id"]);

    if (await marksExists(markSheetObj["student_id"], markSheetObj["sub_id"]))
        throw { "message": "Marks already present for student "+markSheetObj["student_id"]+" for subject "+markSheetObj["sub_id"]+"!" };

    mark_id = await MarkSheet.find().sort({ mark_id: -1 }).limit(1);
    if (mark_id.length) {
        mark_id = mark_id[0].mark_id + 1;
    }
    else {
        mark_id = 1;
    }

    markSheetObj["mark_id"] = mark_id;

    console.log(markSheetObj);

    const mark = new MarkSheet(markSheetObj);

    try {
        const mark_save = await mark.save();
        res = mark_save;
        return { "Success ": "MarkSheet Created", "mark_id": mark_id };
    } catch (err) {
        console.log(err)
        return { "error ": err };
    }
};

exports.findAll = async () => {
    sub = await MarkSheet.aggregate([
        {$lookup:{from:"students",localField:"student_id",foreignField:"student_id",as:"student"}},
        { $unwind:"$student" },
        {
            $match:{
                "is_active" : true
            }
        },
        {
            $group:{
                _id: {student_name: "$student.s_name", student_id: "$student_id",status: "$is_active"},
                total:{$sum: "$mark"},
                count:{$sum:1}
            }
        },
        {
            $project:{"count":"$count","total":"$total","percentage":{"$divide":["$total","$count"]},"cgpa": {"$divide":[{"$divide":["$total","$count"]},9.5]}           
            }
        }
        ]);
    count = sub.length
    return { "records": sub, "count": count }
}

exports.findById = async (mark_id) => {
    sub = await MarkSheet.findOne({ mark_id: mark_id });
    return { "record": sub }
}


exports.update = async (mark_id, data) => {
    try {
        let update_data = {
            mark: data.body.mark,
            is_active: data.body.is_active,
            updated_date: new Date
        };
        const sub_update = await MarkSheet.updateOne({ mark_id: mark_id }, { $set: update_data });
        if (sub_update)
            return { "Success": "Updated" }
        else
            return { "Failed": "Failed to Update"}
    } catch (err) {
        throw { "message": "Update failed "+err+"!" };
    }
}

exports.student_sub_mark = async (student_id, sub_id) => {
    sub = await MarkSheet.findOne({ student_id: student_id, sub_id: sub_id });
    return { "record": sub }
}

exports.student_sem_marksheet = async (student_id, sem_no) => {
    sem_marks = await MarkSheet.aggregate([
        {$lookup:{from:"subjects",localField:"sub_id",foreignField:"sub_id",as:"subject"}},
        { $unwind:"$subject" },
        {$lookup:{from:"semesters",localField:"subject.semester_id",foreignField:"sem_id",as:"semester"}},
        { $unwind:"$semester" },
        {
            $match:{
                $and:[{"student_id" : parseInt(student_id)},{"semester.sem_no": parseInt(sem_no)}]
            }
        },
        {   
            $project:{
                student_id : 1,
                mark : 40,
                sub_id: 3,
                subjects_name : "$subject.sub_name",
                semester_no : "$semester.sem_no",
            } 
        }]);
    total_marks = sem_marks.reduce((total,obj)=>obj.mark+total,0)
    total_subj = sem_marks.length
    percentage = total_marks/total_subj
    cgpa = CGPA(percentage)

    return { "records": sem_marks, "cgpa": cgpa }
}

exports.student_marksheet = async (student_id) => {
    marksheet = await MarkSheet.aggregate([
        {$lookup:{from:"subjects",localField:"sub_id",foreignField:"sub_id",as:"subject"}},
        { $unwind:"$subject" },
        {$lookup:{from:"semesters",localField:"subject.semester_id",foreignField:"sem_id",as:"semester"}},
        { $unwind:"$semester" },
        {$lookup:{from:"courses",localField:"semester.course_id",foreignField:"course_id",as:"course"}},
        { $unwind:"$course" },
        {
            $match:{
                $and:[{"student_id" : parseInt(student_id)}]
            }
        },
        {   
            $project:{
                student_id : 1,
                mark : 40,
                sub_id: 3,
                course: "$course.course_code",
                subjects_name : "$subject.sub_name",
                semester_no : "$semester.sem_no",
            } 
        }]);
    total_marks = marksheet.reduce((total,obj)=>obj.mark+total,0)
    total_subj = marksheet.length
    percentage = total_marks/total_subj
    cgpa = CGPA(percentage)
    student = await Student.findById(student_id)
    console.log(student)
    return { "records": marksheet, "cgpa": cgpa, "name": student["record"]["s_name"] }
}

const marksExists = async (student_id, sub_id) => {
    sub = await MarkSheet.findOne({ student_id: student_id, sub_id: sub_id });
    if (sub)
        return true
    else
        return false
}

const validate = async (student_id, sub_id) => {
    sub = await Subject.findById(sub_id)
    student = await Student.findById(student_id)
    if(sub["record"] == null || student["record"] == null){
        throw { "message": "Student Id or Subject Id not found!" };
    }
}

function CGPA(percentage){
    return percentage/9.5
}
