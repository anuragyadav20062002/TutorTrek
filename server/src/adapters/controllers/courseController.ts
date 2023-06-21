import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { CourseRepositoryMongoDbInterface } from '../../frameworks/database/mongodb/repositories/courseReposMongoDb';
import { CourseDbRepositoryInterface } from '../../app/repositories/courseDbRepository';
import { addCourses } from '../../app/usecases/instructor/addCourse';
import { AddCourseInfoInterface } from '../../types/instructor/courseInterface';

const courseController = (
  courseDbRepository: CourseDbRepositoryInterface,
  courseDbRepositoryImpl: CourseRepositoryMongoDbInterface
) => {
    const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl())

    const addCourse = asyncHandler(async(req:Request,res:Response) =>{
        const course:AddCourseInfoInterface = req.body
        console.log(req.files)
        if (req.files) {
            const files = Array.isArray(req.files) ? req.files : Object.values(req.files)[0];
            course.thumbnail = files[0].path;
          } 
        const response = await addCourses(course,dbRepositoryCourse)
        res.status(200).json({
            status:'success',
            message:'Successfully added new course,course will be published after verification',
            data:response
        })

    })
    return {
        addCourse
    }
};

export default courseController
