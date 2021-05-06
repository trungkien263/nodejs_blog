const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const CourseSchema = new Schema({
    name: { type: String, requied: true, },
    description: { type: String, },
    image: { type: String, },
    videoId: { type: String, requied: true, },
    level: { type: String, },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
});

// custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type: 'desc',
        });
    }
    return this;
}

// add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt : true,
});

module.exports = mongoose.model('Course', CourseSchema);
