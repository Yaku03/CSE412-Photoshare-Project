const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get("/", controller.getUser);
router.get("/:id", controller.getUserByID);

// INSERTION QUERIES
router.post("/addUser", controller.addUser);
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


module.exports = router;
