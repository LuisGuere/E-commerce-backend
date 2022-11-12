const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: string,
            require: true,
            unique: true,
        },
        lastname :{
            type: String
        },
        age: {
            type: Number,
            min: [18, "Tienes que ser mayor de edad"],
            max: [100, "Has superado el ranfo de edad"]
        },
        mail: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email inválido"],
        },
        category : {
            type: String,
            enum: ["client", "admin", "vendor", "mod"]
        },
        password :{
            type: String
        },
        salt : {
            type: String
        },
        img: {
            type: String,
            default: "https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231709/thesomeday123170900021.jpg"
          },
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.encryptString = function (stringToEncrypt, salt) {
    return crypto
    .pbkdf2Sync(stringToEncrypt, salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.hashPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = this.stringToEncrypt(password, this.salt);
};

UserSchema.methods.verifyPassword = function (password) {
    return this.password === this.encryptString(password, this.salt);
}

UserSchema.methods.generateJWT = function () {
    return jwt.sign({idUser: this._id, type: this.category}, process.env.SECRET);
};

UserSchema.methods.onSingGenerateJWT = function () {
    return {
        idUser: this._id,
        type: this.category,
        token: this.generateJWT(),
    };
};

mongoose.model("User", UserSchema, "userCollection");
