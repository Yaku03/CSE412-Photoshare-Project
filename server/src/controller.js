const pool = require('../db');
const queries = require('./queries')

const getLoginInfo = (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    console.log(email, password);
    pool.query(queries.getLoginInfo, [email, password], (error, results) => {
        if(error) throw error;
        if(results.rows.length > 0) {
            res.json("Success");
        }
        else {
            res.json("Fail");
        }
    });
};

const searchUser = (req, res) => {
    const {email} = req.body;
    pool.query(queries.getUserByEmail, [email], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const searchPhoto = (req, res) => {
    const {descriptor} = req.body;
    console.log("Descriptor: " + descriptor);
    pool.query(queries.getPhotoByTag, [descriptor], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const searchUserPhoto = (req, res) => {
    const {uid, descriptor} = req.body;
    pool.query(queries.searchUserPhotos, [uid, descriptor], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const showAlbum = (req, res) => {
    const {uid} = req.body;
    pool.query(queries.getUserAlbums, [uid], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getAlbumPhotos = (req, res) => {
    const {aid} = req.body;
    console.log("Passed aid: " + aid);
    pool.query(queries.getPhotosFromAlbum, [aid], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUrl = (req, res) => {
    const {pid} = req.body;
    pool.query(queries.retrieveUrl, [pid], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getAllUrl = (req, res) => {
    pool.query(queries.getAllUrl, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const showUsers = (req, res) => {
    pool.query(queries.getUserInfo, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const displayFriends = (req, res) => {
    const {uid1} = req.body;
    pool.query(queries.getAllFriends, [uid1], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const recommendFriends = (req, res) => {
    const {uid1} = req.body;
    pool.query(queries.friendsOfFriends, [uid1], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const recommendPosts = (req, res) => {
    const {uid} = req.body;
    pool.query(queries.tagRecommendation, [uid], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const searchComment = (req, res) => {
    const {text} = req.body;
    console.log("Comment text: " + text);
    pool.query(queries.getCommentDetails, [text], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserByID = (req, res) => {
    const uid = parseInt(req.params.id);
    pool.query(queries.getUserByID, [uid], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getLeaderboard = (req, res) => {
    pool.query(queries.getStats, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};


// INSERTION QUERIES
const addUser = (req, res) => {
    const {fname, lname, email, password, gender, hometown, dob} = req.body;
    // Check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.send("Email already exists.");
        }
        // Add user to database
        pool.query(queries.addUser, [fname, lname, email, password, gender, hometown, dob], (error, results) => {
            if(error) throw error;
            res.status(201).send("User has been created successfully");
        });
    });
};

const addAlbum = (req, res) => {
    const {name, date} = req.body;
    pool.query(queries.addAlbum, [name, date], (error, results) => {
        if(error) throw error;
        res.status(201).send("Album has been created successfully");
    });
};

const addPhoto = (req, res) => {
    const {data, caption} = req.body;
    pool.query(queries.addPhoto, [data, caption], (error, results) => {
        if(error) throw error;
        res.status(201).send("Photo has been created successfully");
    });
};

const addComment = (req, res) => {
    const {uid, text, date, pid} = req.body;
    pool.query(queries.addComment, [uid, text, date, pid], (error, results) => {
        if(error) throw error;
        res.status(201).send("Comment has been created successfully");
    });
};

const getAllComments = (req, res) => {
    const {pid} = req.body;
    pool.query(queries.getCommentByID, [pid], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addTag = (req, res) => {
    const {descriptor} = req.body;
    pool.query(queries.addTag, [descriptor], (error, results) => {
        if(error) throw error;
        res.status(201).send("Tag has been created successfully");
    });
};

const addOwnership = (req, res) => {
    const {uid, aid} = req.body;
    console.log("Uid: " + uid + " Aid: " + aid);
    pool.query(queries.addOwnership, [uid, aid], (error, results) => {
        if(error) throw error;
        res.status(201).send("Ownership has been established successfully");
    });
};

const getAid = (req, res) => {
    const {name} = req.body;
    pool.query(queries.getAid, [name], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getPid = (req, res) => {
    const {data, caption} = req.body;
    pool.query(queries.getPid, [data, caption], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addFriendship = (req, res) => {
    const {uid1, uid2, date} = req.body;
    pool.query(queries.addFriendship, [uid1, uid2, date], (error, results) => {
        if(error) throw error;
        res.status(201).send("Friendship has been established successfully");
    });
};

const likePhoto = (req, res) => {
    const {uid, pid} = req.body;
    pool.query(queries.likePhoto, [uid, pid], (error, results) => {
        if(error) throw error;
        res.status(201).send("Photo has been liked successfully");
    });
};

const allLikes = (req, res) => {
    const {pid} = req.body;
    pool.query(queries.totalLikes, [pid], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addPhotoToAlbum = (req, res) => {
    const {aid, pid} = req.body;
    pool.query(queries.addPhotoToAlbum, [aid, pid], (error, results) => {
        if(error) throw error;
        res.status(201).send("Photo has been added to Album successfully");
    });
};

const tagPhoto = (req, res) => {
    const {pid, descriptor} = req.body;
    pool.query(queries.tagPhoto, [pid, descriptor], (error, results) => {
        if(error) throw error;
        res.status(201).send("Photo has been tagged successfully");
    });
};

// DELETION QUERIES
const deleteAlbum = (req, res) => {
    const {name} = req.body;
    pool.query(queries.deleteAlbum, [name], (error, results) => {
        if(error) throw error;
        res.status(200).send("Album has been deleted successfully");
    });
};


const deletePhoto = (req, res) => {
    const {pid} = req.body;
    pool.query(queries.deletePhoto, [pid], (error, results) => {
        if(error) throw error;
        res.status(200).send("Photo has been deleted successfully");
    });
};


const unlikePhoto = (req, res) => {
    const { uid, pid } = req.params;
    pool.query(queries.unLike, [uid, pid], (error, results) => {
        if(error) throw error;
        res.status(200).send("Photo has been unliked successfully");
    });
};

const uncommentPhoto = (req, res) => {
    const { uid, pid } = req.params;
    pool.query(queries.unComment, [uid, pid], (error, results) => {
        if(error) throw error;
        res.status(200).send("Photo has been uncommented successfully");
    });
};

const untagPhoto = (req, res) => {
    const pid = parseInt(req.params.pid);
    pool.query(queries.unTag, [pid], (error, results) => {
        if(error) throw error;
        res.status(200).send("Photo has been untagged successfully");
    });
};

const unfollow = (req, res) => {
    const { uid1, uid2 } = req.params;
    pool.query(queries.unFollow, [uid1, uid2], (error, results) => {
        if(error) throw error;
        res.status(200).send("Friendship has been ended successfully");
    });
};

// SELECTION QUERIES
const findComment = (req, res) => {
    const text = req.params.text;
    pool.query(queries.findComment, [text], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserByName = (req, res) => {
    const fullname = req.params.name;
    pool.query(queries.findUserByName, [fullname], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const validateUser = (req, res) => {
    const {email, pass} = req.params;
    console.log(email, ' ', pass);
    pool.query(queries.validateUser, [email, pass], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const searchTagAll = (req, res) => {
    const {description} = req.params;
    pool.query(queries.searchTagAll, [description], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getTopTags = (req, res) => {
    pool.query(queries.getTopTags, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getTaggedPhotos = (req, res) => {
    const {descriptor} = req.body;
    console.log(descriptor);
    pool.query(queries.getPhotoByTag, [descriptor], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};


module.exports = {
    getLoginInfo,
    getUserByID,
    getLeaderboard,
    searchUser,
    searchPhoto,
    searchUserPhoto,
    searchComment,
    addUser,
    addAlbum,
    addPhoto,
    addComment,
    addTag,
    addOwnership,
    addFriendship,
    likePhoto,
    allLikes,
    addPhotoToAlbum,
    tagPhoto,
    deleteAlbum,
    unlikePhoto,
    deletePhoto,
    uncommentPhoto,
    untagPhoto,
    unfollow,
    findComment,
    getUserByName,
    validateUser,
    searchTagAll,
    getTopTags,
    getTaggedPhotos,
    getUrl,
    getAllUrl,
    showUsers,
    getAllComments,
    displayFriends,
    recommendFriends,
    getAid,
    getPid,
    showAlbum,
    getAlbumPhotos,
    recommendPosts,
};