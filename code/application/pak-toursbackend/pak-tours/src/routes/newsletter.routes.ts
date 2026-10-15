import { Router } from "express";
import {
  createNewsletter,
  getAllNewsletters,
  getNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../controllers/newsletter.controller.js";

const router = Router();

router.post("/", createNewsletter);

router.get("/", getAllNewsletters);

router.get("/:id", getNewsletter);

router.patch("/:id", updateNewsletter);

router.delete("/:id", deleteNewsletter);

export default router;
