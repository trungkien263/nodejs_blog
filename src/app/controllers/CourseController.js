const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');


class CourseController {

    //[GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(Course => {
                res.render('courses/show', { Course: mongooseToObject(Course) });
            })
            .catch(next);
        

        // res.send('Course detail - ' + req.params.slug);
    }

}

module.exports = new CourseController;