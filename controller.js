const pool = require('../db');
const queries = require('./queries')

const getUser = (req, res) => {
    pool.query(queries.getUser, (error, results) => {
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


// INSERTION QUERIES
const addUser = (req, res) => {
    const {uid, fname, lname, email, password, gender, hometown, dob} = req.body;
    // Check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.send("Email already exists.");
        }
        // Add user to database
        pool.query(queries.addUser, [uid, fname, lname, email, password, gender, hometown, dob], (error, results) => {
            if(error) throw error;
            res.status(201).send("User has been created successfully");
        });
    });
};

const addAlbum = (req, res) => {
    const {aid, name, date} = req.body;
    pool.query(queries.addAlbum, [aid, name, date], (error, results) => {
        if(error) throw error;
        res.status(201).send("Album has been created successfully");
    });
};

const addPhoto = (req, res) => {
    const {pid, data, caption} = req.body;
    pool.query(queries.addPhoto, [pid, data, caption], (error, results) => {
        if(error) throw error;
        res.status(201).send("Photo has been created successfully");
    });
};

const addComment = (req, res) => {
    const {cid, uid, text, date, pid} = req.body;
    pool.query(queries.addComment, [cid, uid, text, date, pid], (error, results) => {
        if(error) throw error;
        res.status(201).send("Comment has been created successfully");
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
    pool.query(queries.addOwnership, [uid, aid], (error, results) => {
        if(error) throw error;
        res.status(201).send("Ownership has been established successfully");
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
    const aid = parseInt(req.params.id);
    pool.query(queries.deleteAlbum, [aid], (error, results) => {
        if(error) throw error;
        res.status(200).send("Album has been deleted successfully");
    });
};


const deletePhoto = (req, res) => {
    const pid = parseInt(req.params.id);
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



module.exports = {
    getUser,
    getUserByID,
    addUser,
    addAlbum,
    addPhoto,
    addComment,
    addTag,
    addOwnership,
    addFriendship,
    likePhoto,
    addPhotoToAlbum,
    tagPhoto,
    deleteAlbum,
    unlikePhoto,
    deletePhoto,
    uncommentPhoto,
    untagPhoto,
};