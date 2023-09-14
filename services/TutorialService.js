class TutorialService {
	constructor(db) {
		this.client = db.sequelize;
		this.tutorial = db.tutorial;
	}

	async getAll(condition, order, pagination) {
		let res = await this.tutorial
			.findAll({
				limit: pagination.limit,
				offset: pagination.offset,
				where: condition,
				order: order,
			})
			.catch(function (err) {
				console.log(err);
			});
			return res
	}
}
module.exports = TutorialService;
// Look at findAndCountAll for pagination

