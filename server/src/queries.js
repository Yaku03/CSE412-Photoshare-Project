const getLoginInfo = "SELECT email, password FROM \"Users\" WHERE email = $1 AND password = $2;";
const getUserByID = "SELECT * FROM \"Users\" WHERE uid = $1;";

// HELPER QUERIES
const checkEmailExists = "SELECT u FROM \"Users\" u WHERE u.email = $1;";

// INSERTION QUERIES
//const addUser = "INSERT INTO \"Users\" (uid, fname, lname, email, password, gender, hometown, dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";
const addUser = "INSERT INTO \"Users\" (fname, lname, email, password, gender, hometown, dob) VALUES ($1, $2, $3, $4, $5, $6, $7);";
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
const unFollow = "DELETE FROM \"Friends\" WHERE uid1 = $1 AND uid2 = $2;";

// SELECTION QUERIES
//const getStats = "SELECT SUM(postCount + commentCount) AS totalActivity FROM (SELECT COUNT(*) AS postCount FROM \"Photos\" WHERE uid = $1 UNION ALL SELECT COUNT(*) AS commentCount FROM \"Comments\" WHERE userID = $1);";
const findComment = "SELECT cid FROM \"Comments\" WHERE text = $1;";
const findUserByName = "SELECT uid FROM \"Users\" WHERE CONCAT(fname, lname) = $1;";
const validateUser = "SELECT email, password FROM \"Users\" WHERE email = $1 AND password = $2;";
const searchTagAll = "SELECT data FROM \"Photos\" WHERE pid IN (SELECT pid FROM \"Tagged\" WHERE descriptor = $1);";
const getTopTags = "SELECT descriptor, COUNT(*) AS tagCount FROM \"Tagged\" GROUP BY descriptor ORDER BY tagCount DESC;";


module.exports = {
    getLoginInfo,
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
    unFollow,
    findComment,
    findUserByName,
    validateUser,
    searchTagAll,
    getTopTags,
};