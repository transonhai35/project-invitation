const Course = require('../models/Courses');
const { mongooseToObject } = require('../../util/mongooseUtil');
const MyInvitationCards = require('../models/myInvitationCards');


class CourseController {
    //[GET] /cards/:slug
    showCard(req, res, next) {
        const invitationClassic = '6554f073be14c529eb44dcb2';
        const invitationCards = '6554f073be14c529eb44dcb3';
        Course.findOne({ _id: req.params.id })
            .then((card) => {
                if (req.params.id == invitationClassic) {
                    res.render('cards/invitationClassic', {
                        card: mongooseToObject(card),
                    });
                }
                if (req.params.id == invitationCards) {
                    res.render('cards/invitationCards', {
                        card: mongooseToObject(card),
                    });
                }
            })
            .catch(next);
    }
    //[POST] /cards/create
    createCards(req, res, next) {
        let {
            params,
            name,
            grade,
            schoolYear,
            schoolName,
            time,
            location,
            author,
            image,
            fontFamily,
            role,
            fileName
        } = req.body;
        if(fileName){
            fileName.map((data) => {
                name = data.name;
                const myInvitationCards = new MyInvitationCards({
                    name,
                    grade,
                    schoolYear,
                    schoolName,
                    time,
                    location,
                    author,
                    image,
                    fontFamily,
                    role,
                });
                myInvitationCards.save()
                })
                    res.status(200).json({
                        msg: 'Đã khởi tạo',
                    })
        }
        else {
            const myInvitationCards = new MyInvitationCards({
                name,
                grade,
                schoolYear,
                schoolName,
                time,
                location,
                author,
                image,
                fontFamily,
                role,
            });
            myInvitationCards.save().then(
                res.status(200).json({
                    msg: 'Đã khởi tạo',
                }),
                );
            }
    }
    //[DELETE] /cards/:id
    destroyCard(req, res, next) {
        MyInvitationCards.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CourseController();
