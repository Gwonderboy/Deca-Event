"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeEvent = void 0;
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const likeEvent = async (req, res) => {
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
                message: "Only verified users can like an event",
            });
        }
        const userLiker = {
            id_of_user: user.id,
            user_name: user.user_name,
        };
        const eventLiked = event.likesArr.findIndex((liker) => liker.id_of_user === userId);
        if (eventLiked !== -1) {
            event.likesArr.splice(eventLiked, 1);
            event.likes--;
            await event.save();
            res.status(200).json({
                status: "success",
                method: req.method,
                message: "You unliked this event",
                data: event,
            });
        }
        else {
            event.likesArr.push(userLiker);
            event.likes++;
            await event.save();
            res.status(200).json({
                status: "success",
                method: req.method,
                message: "You liked this event",
                data: event,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Unable to like/unlike event",
        });
    }
};
exports.likeEvent = likeEvent;
