"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = void 0;
const eventModel_1 = require("../../models/eventModel/eventModel");
const deleteEvent = async (request, response) => {
    try {
        const userId = request.user.id;
        const eventId = request.params.id;
        const eventInfo = await eventModel_1.Event.findOne({ where: { id: eventId, owner_id: userId } });
        if (!eventInfo) {
            return response.status(404).json({
                status: `error`,
                message: `Unable to find event or you are not authorized to delete this event`,
            });
        }
        await eventModel_1.Event.destroy({ where: { id: eventId } });
        const checkEvents = await eventModel_1.Event.findOne({ where: { id: eventId } });
        if (checkEvents) {
            return response.status(200).json({
                status: "error",
                message: "Unable to delete event"
            });
        }
        return response.status(200).json({
            status: "success",
            message: "Event Deleted Successfully"
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};
exports.deleteEvent = deleteEvent;
