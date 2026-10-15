import express from "express";
import { 
    createBooking, 
    deleteBooking, 
    getAllBookings, 
    getBooking, 
    updateBooking 
} from "../controllers/bookings.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBooking);
router.patch("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;