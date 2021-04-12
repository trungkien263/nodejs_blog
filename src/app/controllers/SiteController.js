const Course = require('../models/Course');
const { multipleMongooToObject } = require('../../util/mongoose');


class SiteController {

    // [GET] /
    index(req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', { 
                    courses: multipleMongooToObject(courses)
                });
            })
            .catch(next); //error => next(error)

    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }

}

module.exports = new SiteController;