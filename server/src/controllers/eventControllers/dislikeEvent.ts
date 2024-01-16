import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import User, { UserAttributes } from "../../models/userModel/userModel";

export const dislikeEvent = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({
        status: `error`,
        message: `Unable to find event`,
      });
    }

    const user = await User.findOne({
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

    const eventDisliked = event.dislikesArr.findIndex(
      (disliker:any) => disliker.id_of_user === userId
    );

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
    } else {
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Unable to dislike/undislike event",
    });
  }
};
