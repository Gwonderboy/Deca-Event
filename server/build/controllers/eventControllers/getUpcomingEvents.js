"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcomingEvents = void 0;
const sequelize_1 = require("sequelize");
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const getUpcomingEvents = async (request, response) => {
    try {
        const presentDay = new Date();
        const getUpcomingEvents = await eventModel_1.default.findAll({ where: { event_start_date: {
                    [sequelize_1.Op.gt]: presentDay
                },
                isBlocked: false
            } });
        if (getUpcomingEvents.length === 0) {
            return response.status(404).json({
                message: `No Upcoming Events found`
            });
        }
        return response.status(200).json({
            status: 'Success',
            method: request.method,
            message: `Upcoming events found successfully`,
            data: getUpcomingEvents
        });
    }
    catch (error) {
        response.status(400).json({
            status: 'error',
            method: request.method,
            message: 'Error'
        });
    }
};
exports.getUpcomingEvents = getUpcomingEvents;
