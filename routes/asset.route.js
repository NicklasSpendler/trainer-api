var { createSingleAsset, getAllAssets, getSingleAsset, updateSingleAsset } = require("../controllers/asset.controller");

module.exports = function(router) {
	router.post("/api/v1/assets", createSingleAsset);
	router.get("/api/v1/assets", getAllAssets);
	router.get("/api/v1/assets/:id", getSingleAsset);
	router.put('/api/v1/assets/:id', updateSingleAsset)
};
