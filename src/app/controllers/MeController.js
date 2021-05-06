const Course = require('../models/Course');
const { multipleMongooToObject } = require('../../util/mongoose');


class MeController {

    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('./me/stored-courses', {
                    deletedCount: deletedCount, // == deletedCount,
                    courses: multipleMongooToObject(courses)
                })
            )
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {

        //     })
        //     .catch(() => { });

        // Course.find({})
        //     .then(courses => res.render('./me/stored-courses', {
        //         courses: multipleMongooToObject(courses)
        //     }))
        //     .catch(next);
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('./me/trash-courses', {
                courses: multipleMongooToObject(courses)
            }))
            .catch(next);
    }

}

module.exports = new MeController();