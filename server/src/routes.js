const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.post("/login", controller.getLoginInfo);
router.post("/usersearch", controller.searchUser);
router.post("/photosearch", controller.searchPhoto);
router.post("/userPhotos", controller.searchUserPhoto);
router.post("/userAlbum", controller.showAlbum);
router.post("/photoAlbum", controller.getAlbumPhotos);
router.post("/url", controller.getUrl);
router.post("/commentsearch", controller.searchComment);
router.post("/tagcount", controller.getTopTags);
router.post("/taggedphotos", controller.getTaggedPhotos);
router.get("/:id", controller.getUserByID);
router.get("/comment/:text", controller.findComment);
router.get("/finduser/:name", controller.getUserByName);
router.get("/validate/:email/:pass", controller.validateUser);
router.get("/alltag/:description", controller.searchTagAll);
router.post("/leaderboard", controller.getLeaderboard);
router.post("/featured", controller.getAllUrl);
router.post("/findfriends", controller.showUsers);
router.post("/allfriends", controller.displayFriends);
router.post("/friendrec", controller.recommendFriends);
router.post("/tagrec", controller.recommendPosts);

// INSERTION QUERIES
router.post("/signup", controller.addUser);
router.post("/album", controller.addAlbum);
router.post("/photo", controller.addPhoto);
router.post("/comment", controller.addComment);
router.post("/allcomments", controller.getAllComments);
router.post("/tag", controller.addTag);
router.post("/owner", controller.addOwnership);
router.post("/aid", controller.getAid);
router.post("/pid", controller.getPid);
router.post("/friend", controller.addFriendship);
router.post("/like", controller.likePhoto);
router.post("/totallikes", controller.allLikes);
router.post("/contains", controller.addPhotoToAlbum);
router.post("/tagged", controller.tagPhoto);

// DELETION QUERIES
router.post("/delAlbum", controller.deleteAlbum);
router.post("/delPhoto", controller.deletePhoto);
router.delete("/unlike/:uid/:pid", controller.unlikePhoto);
router.delete("/uncomment/:uid/:pid", controller.uncommentPhoto);
router.delete("/untag/:pid", controller.untagPhoto);
router.delete("/unfollow/:uid1/:uid2", controller.unfollow);


module.exports = router;
