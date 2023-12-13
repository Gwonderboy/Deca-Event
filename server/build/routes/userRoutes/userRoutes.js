"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegister_1 = require("../../controllers/userControllers/userRegister");
const userLogin_1 = require("../../controllers/userControllers/userLogin");
const changeProfilePic_1 = require("../../controllers/userControllers/changeProfilePic");
const authorization_1 = require("../../middleware/authorization");
const upload_1 = require("../../utilities/upload");
const userChangePassword_1 = require("../../controllers/userControllers/userChangePassword");
const router = express_1.default.Router();
router.post("/signup", userRegister_1.registerUser);
router.post("/signin", userLogin_1.userLogin);
router.patch("/change_profile_picture", authorization_1.generalAuthoriser, upload_1.upload.single("profilePic"), changeProfilePic_1.changeProfilePicture);
router.patch("/change_password", authorization_1.generalAuthoriser, userChangePassword_1.changePassword);
exports.default = router;
