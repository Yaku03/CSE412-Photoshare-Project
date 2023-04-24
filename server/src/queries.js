const getLoginInfo = "SELECT email, password FROM \"Users\" WHERE email = $1 AND password = $2;";
const getUserByID = "SELECT * FROM \"Users\" WHERE uid = $1;";
const getUserByEmail = "SELECT email FROM \"Users\" WHERE email = $1;";
const getPhotoByTag = "SELECT p.data, p.caption FROM \"Photos\" p JOIN \"Tagged\" t ON p.pid = t.pid WHERE t.descriptor = $1;";
const getCommentDetails = "SELECT pid, text FROM \"Comments\" WHERE text = $1;";
const retrieveUrl = "SELECT data FROM \"Photos\" WHERE pid = $1;";
const getAllUrl = "SELECT pid, data, caption FROM \"Photos\";";
const getCommentByID = "SELECT pid, text FROM \"Comments\" WHERE pid=$1";
const getUserInfo = "SELECT uid, fname, lname, hometown FROM \"Users\" WHERE uid <> 1;";
const getAllFriends = "SELECT fname, lname, hometown FROM \"Friends\" JOIN \"Users\" ON \"Friends\".uid2 = \"Users\".uid WHERE \"Friends\".uid1 = $1;";
const searchUserPhotos = "SELECT DISTINCT p.data, p.caption FROM \"Photos\" p JOIN( SELECT DISTINCT \"Owns\".aid, \"Tagged\".pid FROM \"Owns\" JOIN \"Contains\" ON \"Owns\".aid = \"Contains\".aid JOIN \"Tagged\" ON \"Contains\".pid = \"Tagged\".pid JOIN \"Users\" ON \"Owns\".uid = \"Users\".uid WHERE \"Users\".uid = $1 AND \"Tagged\".descriptor = $2) AS t on p.pid = t.pid;";

// HELPER QUERIES
const checkEmailExists = "SELECT u FROM \"Users\" u WHERE u.email = $1;";

// INSERTION QUERIES
//const addUser = "INSERT INTO \"Users\" (uid, fname, lname, email, password, gender, hometown, dob) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);";
const addUser = "INSERT INTO \"Users\" (fname, lname, email, password, gender, hometown, dob) VALUES ($1, $2, $3, $4, $5, $6, $7);";
const addAlbum = "INSERT INTO \"Albums\" (name, date) VALUES ($1, $2);";
const addPhoto = "INSERT INTO \"Photos\" (data, caption) VALUES ($1, $2);";
const addComment = "INSERT INTO \"Comments\" (uid, text, date, pid) VALUES ($1, $2, $3, $4);";
const addTag = "INSERT INTO \"Tags\" (descriptor) VALUES ($1);";
const getAid = "SELECT aid FROM \"Albums\" WHERE name = $1";
const getPid = "SELECT pid FROM \"Photos\" WHERE data = $1 AND caption = $2";
const addOwnership = "INSERT INTO \"Owns\" (uid, aid) VALUES ($1, $2);";
const addFriendship = "INSERT INTO \"Friends\" (uid1, uid2, date) VALUES ($1, $2, $3);";
const likePhoto = "INSERT INTO \"Likes\" (uid, pid) VALUES ($1, $2);";
const addPhotoToAlbum = "INSERT INTO \"Contains\" (aid, pid) VALUES ($1, $2);";
const tagPhoto = "INSERT INTO \"Tagged\" (pid, descriptor) VALUES ($1, $2);";
const getUserAlbums = "SELECT a.aid, a.name FROM \"Albums\" a JOIN \"Owns\" o ON a.aid = o.aid WHERE o.uid = $1;";
const getPhotosFromAlbum = "SELECT p.pid, p.data, p.caption FROM \"Photos\" p JOIN \"Contains\" c ON p.pid = c.pid WHERE c.aid = $1;";
const friendsOfFriends = "SELECT u.uid, u.fname, u.lname, u.hometown, f.shared_friends FROM \"Users\" u JOIN (SELECT Friends2.uid2, COUNT(*) shared_friends FROM \"Friends\" JOIN \"Friends\" AS Friends2 ON \"Friends\".uid2 = Friends2.uid1 WHERE \"Friends\".uid1 = $1 AND Friends2.uid2 <> $1 AND Friends2.uid2 NOT IN (SELECT uid2 FROM \"Friends\" WHERE uid1 = $1) GROUP BY Friends2.uid2 ORDER BY shared_friends DESC) f ON u.uid = f.uid2;";
const tagRecommendation = "SELECT p.* FROM \"Photos\" p JOIN (SELECT t.pid, COUNT(*) AS tag_count FROM \"Tagged\" t JOIN \"Contains\" c ON t.pid = c.pid JOIN \"Owns\" o ON c.aid = o.aid WHERE o.uid = $1 GROUP BY t.pid ORDER BY tag_count DESC LIMIT 5) t ON p.pid = t.pid;"
// DELETION QUERIES
const deleteAlbum = "DELETE FROM \"Albums\" WHERE name = $1;";
const deletePhoto = "DELETE FROM \"Photos\" WHERE pid = $1;";
const unLike = "DELETE FROM \"Likes\" WHERE uid = $1 AND pid = $2;";
const unComment = "DELETE FROM \"Comments\" WHERE uid = $1 AND pid = $2;";
const unTag = "DELETE FROM \"Tagged\" WHERE pid = $1;";
const unFollow = "DELETE FROM \"Friends\" WHERE uid1 = $1 AND uid2 = $2;";

// SELECTION QUERIES
const getStats = "SELECT \"comment_counts\".uid, (comment_count + photo_count) AS total_count FROM (SELECT uid, COUNT(*) AS comment_count FROM \"Comments\" GROUP BY uid) AS comment_counts JOIN (SELECT uid, COUNT(pid) AS photo_count FROM \"Owns\" JOIN \"Contains\" ON \"Owns\".aid = \"Contains\".aid   GROUP BY uid) AS photo_counts ON \"comment_counts\".uid = \"photo_counts\".uid ORDER BY total_count DESC;"
const findComment = "SELECT cid FROM \"Comments\" WHERE text = $1;";
const findUserByName = "SELECT uid FROM \"Users\" WHERE CONCAT(fname, lname) = $1;";
const validateUser = "SELECT email, password FROM \"Users\" WHERE email = $1 AND password = $2;";
const searchTagAll = "SELECT data FROM \"Photos\" WHERE pid IN (SELECT pid FROM \"Tagged\" WHERE descriptor = $1);";
const getTopTags = "SELECT descriptor, COUNT(*) AS tagCount FROM \"Tagged\" GROUP BY descriptor ORDER BY tagCount DESC;";
const getTaggedPhotos = "SELECT pid from \"Tagged\" WHERE descriptor=$1;";
const totalLikes = "SELECT pid, COUNT(*) as total_likes FROM \"Likes\" WHERE pid = $1 GROUP BY pid;";

module.exports = {
    getLoginInfo,
    getUserByID,
    getUserByEmail,
    getPhotoByTag,
    getCommentDetails,
    getCommentByID,
    retrieveUrl,
    getAllUrl,
    getUserInfo,
    checkEmailExists,
    getStats,
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
    getTaggedPhotos,
    totalLikes,
    getAllFriends,
    searchUserPhotos,
    getAid,
    getPid,
    getUserAlbums,
    getPhotosFromAlbum,
    friendsOfFriends,
    tagRecommendation,
};