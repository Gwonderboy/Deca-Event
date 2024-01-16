"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middleware/authorization");
const deleteEvent_1 = require("../../controllers/adminControllers/deleteEvent");
const blockedEvent_1 = require("../../controllers/adminControllers/blockedEvent");
const unblockEvent_1 = require("../../controllers/adminControllers/unblockEvent");
const getComments_1 = require("../../controllers/adminControllers/getComments");
const router = express_1.default.Router();
router.delete("/deleteEvent", authorization_1.adminAuthoriser, deleteEvent_1.deleteEvents);
router.post("/blockedEvent", authorization_1.adminAuthoriser, blockedEvent_1.eventBlocked);
router.post("/unblockEvent", authorization_1.adminAuthoriser, unblockEvent_1.eventUnblocked);
router.get("/getComments", getComments_1.getUserComments);
exports.default = router;
