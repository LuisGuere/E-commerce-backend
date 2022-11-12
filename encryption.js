const crypto = require("crypto");
const salt = "asdasdnuinlasbndui";

const encrypt = (password) => {
    return crypto.pbkdf2Sync(password, salt, 10000, 10, "sha512").toString("hex");
};

