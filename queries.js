const getUser = "SELECT * FROM \"Users\";";
const getUserByID = "SELECT * FROM \"Users\" WHERE uid = $1;";

// HELPER QUERIES
const checkEmailExists = "SELECT u FROM \"Users\" u WHERE u.email = $1;";

// INSERTION QUERIES
const addUser = "INSERT INTO \"Users\" (uid, fname, lname, email, password, gender, hometown, dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";
const addAlbum = "INSERT INTO \"Albums\" (aid, name, date) VALUES ($1, $2, $3);";
const addPhoto = "INSERT INTO \"Photos\" (pid, data, caption) VALUES ($1, $2, $3);";
const addComment = "INSERT INTO \"Comments\" (cid, uid, text, date, pid) VALUES ($1, $2, $3, $4, $5);";
const addTag = "INSERT INTO \"Tags\" (descriptor) VALUES ($1);";
const addOwnership = "INSERT INTO \"Owns\" (uid, aid) VALUES ($1, $2);";
const addFriendship = "INSERT INTO \"Friends\" (uid1, uid2, date) VALUES ($1, $2, $3);";
const likePhoto = "INSERT INTO \"Likes\" (uid, pid) VALUES ($1, $2);";
const addPhotoToAlbum = "INSERT INTO \"Contains\" (aid, pid) VALUES ($1, $2);";
const tagPhoto = "INSERT INTO \"Tagged\" (pid, descriptor) VALUES ($1, $2);";

// DELETION QUERIES
const deleteAlbum = "DELETE FROM \"Albums\" WHERE aid = $1;";
const deletePhoto = "DELETE FROM \"Photos\" WHERE pid = $1;";
const unLike = "DELETE FROM \"Likes\" WHERE uid = $1 AND pid = $2;";
const unComment = "DELETE FROM \"Comments\" WHERE uid = $1 AND pid = $2;";
const unTag = "DELETE FROM \"Tagged\" WHERE pid = $1;";


module.exports = {
    getUser,
    getUserByID,
    checkEmailExists,
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
    deletePhoto,
    unLike,
    unComment,
    unTag,
};