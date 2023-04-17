const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.post("/login", controller.getLoginInfo);
router.get("/tagcount", controller.getTopTags);
router.get("/:id", controller.getUserByID);
router.get("/comment/:text", controller.findComment);
router.get("/finduser/:name", controller.getUserByName);
router.get("/validate/:email/:pass", controller.validateUser);
router.get("/alltag/:description", controller.searchTagAll);

// INSERTION QUERIES
router.post("/signup", controller.addUser);
router.post("/album", controller.addAlbum);
router.post("/photo", controller.addPhoto);
router.post("/comment", controller.addComment);
router.post("/tag", controller.addTag);
router.post("/owner", controller.addOwnership);
router.post("/friend", controller.addFriendship);
router.post("/like", controller.likePhoto);
router.post("/contains", controller.addPhotoToAlbum);
router.post("/tagged", controller.tagPhoto);

// DELETION QUERIES
router.delete("/delAlbum/:id", controller.deleteAlbum);
router.delete("/delPhoto/:id", controller.deletePhoto);
router.delete("/unlike/:uid/:pid", controller.unlikePhoto);
router.delete("/uncomment/:uid/:pid", controller.uncommentPhoto);
router.delete("/untag/:pid", controller.untagPhoto);
router.delete("/unfollow/:uid1/:uid2", controller.unfollow);


module.exports = router;
