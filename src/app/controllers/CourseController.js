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

    //[GET] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(res.redirect(`/`))
            .catch(error => {
                
            });

        
    }

}

module.exports = new CourseController();