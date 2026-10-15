import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

// Create Travel Package
export const createTravelPackage: RequestHandler = async (req, res) => {
  try {
    const { location, duration, persons, amount, dailyBudget, initialMinimumBooking, description, service } = req.body;

    const newPackage = await prisma.travelPackage.create({
      data: {
        location,
        duration,
        persons,
        amount,
        dailyBudget,
        initialMinimumBooking,
        description,
        service
      },
    });

    res.status(201).json(newPackage);
  } catch (error) {
    console.error("Error creating travel package:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Travel Packages
export const getAllTravelPackages: RequestHandler = async (req, res) => {
  try {
    const packages = await prisma.travelPackage.findMany({});
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching travel packages:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single Travel Package
export const getTravelPackage: RequestHandler = async (req, res) => {
  try {
    const { id } = await req.params;
    const travelPackage = await prisma.travelPackage.findUnique({
      where: { id: Number(id) },
    });

    if (!travelPackage) {
      res.status(404).json({ message: "Travel package not found" });
      return;
    }

    res.status(200).json(travelPackage);
  } catch (error) {
    console.error("Error fetching travel package:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Travel Package
export const updateTravelPackage: RequestHandler = async (req, res) => {
  try {
    const { id } = await req.params;
    const { location, duration, persons, amount, dailyBudget, initialMinimumBooking, description } = req.body;

    const updatedPackage = await prisma.travelPackage.update({
      where: { id: Number(id) },
      data: { location, duration, persons, amount, dailyBudget, initialMinimumBooking, description },
    });

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error updating travel package:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Travel Package
export const deleteTravelPackage: RequestHandler = async (req, res) => {
  try {
    const { id } = await req.params;
    await prisma.travelPackage.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Travel package deleted successfully." });
  } catch (error) {
    console.error("Error deleting travel package:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
