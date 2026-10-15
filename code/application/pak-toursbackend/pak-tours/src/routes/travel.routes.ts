import express from "express";
import { 
    createTravelPackage, 
    deleteTravelPackage, 
    getAllTravelPackages, 
    getTravelPackage, 
    updateTravelPackage 
} from "../controllers/travel.package.controller.js";
const router = express.Router();

// Travel Package Routes
router.post("/", createTravelPackage);
router.get("/", getAllTravelPackages);
router.get("/:id", getTravelPackage);
router.patch("/:id", updateTravelPackage);
router.delete("/:id", deleteTravelPackage);

export default router;