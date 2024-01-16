import {Response} from 'express';
import {JwtPayload} from 'jsonwebtoken';
import {Event, EventAttributes} from '../../models/eventModel/eventModel'

export const deleteEvent = async (request: JwtPayload, response: Response) => {
    try {
      const userId = request.user.id;
      const eventId = request.params.id;
      const eventInfo = await Event.findOne({ where: { id: eventId, owner_id: userId } }) as unknown as EventAttributes;
  
      if (!eventInfo) {
          return response.status(404).json({
            status: `error`,
            message: `Unable to find event or you are not authorized to delete this event`,
          });
      }
      
      await Event.destroy({where: {id:eventId}})
      
      const checkEvents = await Event.findOne({where: {id:eventId}})

      if(checkEvents){
        return response.status(200).json({
            status: "error",
            message: "Unable to delete event"
          });
      }
      return response.status(200).json({
        status: "success",
        message: "Event Deleted Successfully"
      });
    } catch (error: any) {
      console.log(error.message);
      return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  };