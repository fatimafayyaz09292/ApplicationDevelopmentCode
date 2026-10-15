import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

// Create Newsletter
export const createNewsletter: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;

    const newsletter = await prisma.newsletter.create({
      data: {
        email,
      },
    });

    res.status(201).json(newsletter);
  } catch (error) {
    console.error("Error creating newsletter:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Newsletters
export const getAllNewsletters: RequestHandler = async (req, res) => {
  try {
    const newsletters = await prisma.newsletter.findMany();
    res.status(200).json(newsletters);
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single Newsletter by ID
export const getNewsletter: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const newsletter = await prisma.newsletter.findUnique({
      where: { id: Number(id) },
    });

    if (!newsletter) {
      res.status(404).json({ message: "Newsletter not found" });
      return;
    }

    res.status(200).json(newsletter);
  } catch (error) {
    console.error("Error fetching newsletter:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Newsletter
export const updateNewsletter: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const updatedNewsletter = await prisma.newsletter.update({
      where: { id: Number(id) },
      data: { email },
    });

    res.status(200).json(updatedNewsletter);
  } catch (error) {
    console.error("Error updating newsletter:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Newsletter
export const deleteNewsletter: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.newsletter.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Newsletter deleted successfully." });
  } catch (error) {
    console.error("Error deleting newsletter:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
