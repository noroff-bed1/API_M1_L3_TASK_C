var express = require('express');
var router = express.Router();
var TutorialService = require('../services/TutorialService');
const { Op } = require('sequelize');
var db = require('../models');
var tutorialService = new TutorialService(db);

/* GET tutorials listing. */
router.get('/', async function (req, res, next) {
	const { sort, title, description, published, page, size } = req.query;
	const order = sort ? sort.split(',').map((pair) => pair.split(':')) : [];
	const titleCondition = title ? { title: { [Op.like]: `%${title}%` } } : null;
	const descCondition = description ? { description: { [Op.like]: `%${description}%` } } : null;
	const publishedCondition = published ? { published: { [Op.like]: `%${published}%` } } : null;
	const condition = { [Op.and]: [titleCondition, descCondition, publishedCondition] };
	const pagination = getPagination(page, size);
	const tutorials = await tutorialService.getAll(condition, order, pagination);
	res.render('tutorials', { tutorials: tutorials });
});

const getPagination = (page, size) => {
	const limit = size ? +size : 5;
	const offset = page ? (page - 1) * limit : 0;
	return { limit, offset };
};

module.exports = router;

