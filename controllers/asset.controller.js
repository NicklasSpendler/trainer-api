var { Asset } = require("../models/models");
var saveFile = require("../services/asset");

async function createSingleAsset(req, res, next) {
	try {
		let file = saveFile(req.files.file);
		let asset = await Asset.create({
			url: `${process.env.host}/file-bucket/` + file
		});
		res.json(asset);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function getAllAssets(req, res, next) {
	try {
		let assets = await Asset.findAll();
		res.json(assets);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function getSingleAsset(req, res, next) {
	try {
		let asset = await Asset.findByPk(req.params.id);
		res.json(asset);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function updateSingleAsset(req, res, next) {
	console.log('req', req.params.id);
	try {
		let result = await Asset.update({ url: req.fields.url }, {
			where: {
				id: req.params.id
			}
		})
		if (!result[0]) {
			res.status(404).end();
			return;
		}
		let asset = await Asset.findByPk(req.params.id);
        res.json(asset);
	} catch (error){
		if(error.SequelizeValidationError){
            res.status(400).end()
            return
        }
        res.status(500).end();
        console.error(error);
	}
}

module.exports = {
	createSingleAsset,
	getAllAssets,
	getSingleAsset,
	updateSingleAsset
};
