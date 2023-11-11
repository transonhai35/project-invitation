const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const MyInvitationCards = new Schema(
    {
        title: { type: String },
        name: { type: String },
        description: { type: String },
        grade: { type: String },
        schoolYear: { type: String },
        schoolName: { type: String },
        time: { type: String },
        location: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        author: { type: String },
        image: { type: String },
        fontFamily: { type: String },
        role: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('MyInvitationCards', MyInvitationCards);
