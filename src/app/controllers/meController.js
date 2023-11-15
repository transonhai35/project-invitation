const Course = require('../models/Courses');
const MyInvitationCards = require('../models/myInvitationCards');
const {
    mongooseToObject,
    mutipleMongooseToObject,
} = require('../../util/mongooseUtil');

class MeController {
    //[GET] /me/stored/courses
    storedCards(req, res, next) {
        MyInvitationCards.find({ author: req.params.id })
            .then((data) => {
                if (!data) {
                    res.status(500).json({
                        msg: 'Bạn chưa tạo được một thiệp nào, hãy đi tạo thiệp mời',
                    });
                } else {
                    res.render('me/storedCards', {
                        cards: mutipleMongooseToObject(data),
                    });
                }
            })
            .catch(next);
    }

    //[GET] /me/stored/courses
    myHome(req, res, next) {
        Course.find({})
            .then((cards) => {
                
                res.render('me/my-home', {
                    cards: mutipleMongooseToObject(cards),
                });
            })
            .catch(next);
    }

    //[GET] /cards/:slug
    showMyCard(req, res, next) {
        const invitationCards = '6554f073be14c529eb44dcb3';
        const invitationClassic = '6554f073be14c529eb44dcb2';
        MyInvitationCards.findOne({ _id: req.params.id })
            .then((card) => {
                if (card.role == invitationClassic) {
                    res.render('me/invitationClassicEdit', {
                        card: mongooseToObject(card),
                    });
                }
                if (card.role == invitationCards) {
                    res.render('me/invitationCardsEdit', {
                        card: mongooseToObject(card),
                    });
                }
            })
            .catch(next);
    }

    //[POST] /myCards/:id
    updateMyCard(req, res, next) {
        let {
            params,
            name,
            grade,
            schoolYear,
            schoolName,
            time,
            location,
        } = req.body;
        MyInvitationCards.updateOne(
            { _id: params },
            {
                name,
                grade,
                schoolYear,
                schoolName,
                time,
                location,
            },
        ).then(
            res.status(200).json({
                msg: 'Đã khởi tạo',
            }),
        );
    }
}

module.exports = new MeController();
