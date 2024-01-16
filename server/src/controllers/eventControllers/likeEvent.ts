import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Event, { EventAttributes } from "../../models/eventModel/eventModel";
import User, { UserAttributes } from "../../models/userModel/userModel";

export const likeEvent = async (req: JwtPayload, res: Response) => {
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
        message: "Only verified users can like an event",
      });
    }

    const userLiker = {
      id_of_user: user.id,
      user_name: user.user_name,
    };

    const eventLiked = event.likesArr.findIndex(
      (liker: any) => liker.id_of_user === userId
    );

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
    } else {
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Unable to like/unlike event",
    });
  }
};
