import express from "express";
import { createEvents } from "../../controllers/eventControllers/createEvent";
import { getUpcomingEvents } from "../../controllers/eventControllers/getUpcomingEvents";
import { getSingleEvent } from "../../controllers/eventControllers/getSingleEvent";
import { userEvent } from "../../controllers/eventControllers/userEvent";
import { generalAuthoriser } from "../../middleware/authorization";
import { upload } from "../../utilities/upload";
import { addComment } from "../../controllers/eventControllers/addComment";
import { likeEvent } from "../../controllers/eventControllers/likeEvent";
import { dislikeEvent } from "../../controllers/eventControllers/dislikeEvent";

const router = express.Router();

router.post(
  "/create",
  generalAuthoriser,
  upload.single("event_image"),
  createEvents
);
router.get("/upcoming_events", generalAuthoriser, getUpcomingEvents);
router.get("/get-single-event/:id", generalAuthoriser, getSingleEvent);
router.get("/get-my-events", generalAuthoriser, userEvent);
router.post("/add-comment/:id", generalAuthoriser, addComment);
router.post("/like/:id", generalAuthoriser, likeEvent);
router.post("/dislike/:id", generalAuthoriser, dislikeEvent);

export default router;
