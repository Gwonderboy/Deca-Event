"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikeEvent = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const dislikeEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = req.params.id;
        const event = await eventModel_1.default.findByPk(eventId);
        if (!event) {
            return res.status(404).json({
                status: `error`,
                message: `Unable to find event`,
            });
        }
        const user = await userModel_1.default.findOne({
            where: { id: userId },
        });
        if (!user?.isVerified) {
            return res.status(401).json({
                status: "error",
                message: "Only verified users can dislike an event",
            });
        }
        const userDisliker = {
            id_of_user: user.id,
            user_name: user.user_name,
        };
        const eventDisliked = event.dislikesArr.findIndex((disliker) => disliker.id_of_user === userId);
        if (eventDisliked !== -1) {
            event.dislikesArr.splice(eventDisliked, 1);
            event.dislikes--;
            await event.save();
            res.status(200).json({
                status: "success",
                method: req.method,
                message: "You undisliked this event",
                data: event,
            });
        }
        else {
            event.dislikesArr.push(userDisliker);
            event.dislikes++;
            await event.save();
            res.status(200).json({
                status: "success",
                method: req.method,
                message: "You disliked this event",
                data: event,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Unable to dislike/undislike event",
        });
    }
};
exports.dislikeEvent = dislikeEvent;
