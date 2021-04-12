const Course = require('../models/Course');
const { multipleMongooToObject } = require('../../util/mongoose');


class MeController {

    //[GET] /me/stored/sourses
    storedCourses(req, res) {
        res.render('search');
    }

}

module.exports = new MeController();