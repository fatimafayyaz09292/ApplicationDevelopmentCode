import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

// Interface for the Booking payload
interface Booking {
  packag: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  dailyBudget: string;
  initialBookingAmount: string;
  serviceFees: string;
  status: string; // Optional
  userId: number;
}

// Create Booking
export const createBooking: RequestHandler = async (req, res) => {
  try {
    const {
      packag,
      destination,
      departureDate,
      returnDate,
      dailyBudget,
      initialBookingAmount,
      serviceFees,
      status,
      userId,
    }: Booking = req.body;

    const booking = await prisma.booking.create({
      data: {
        packag,
        destination,
        departureDate,
        returnDate,
        dailyBudget,
        initialBookingAmount,
        serviceFees,
        userId,
        status, 
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Bookings
export const getAllBookings: RequestHandler = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true, // Include user details if necessary
      },
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single Booking
export const getBooking: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
      include: {
        user: true, // Include user details if necessary
      },
    });

    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Booking
export const updateBooking: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      destination,
      departureDate,
      returnDate,
      dailyBudget,
      initialBookingAmount,
      serviceFees,
      status,
    }: Partial<Booking> = req.body;

    const updatedBooking = await prisma.booking.update({
      where: { id: Number(id) },
      data: {
        destination,
        departureDate,
        returnDate,
        dailyBudget,
        initialBookingAmount,
        serviceFees,
        status, // Optional update
      },
    });

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Booking
export const deleteBooking: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.booking.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
