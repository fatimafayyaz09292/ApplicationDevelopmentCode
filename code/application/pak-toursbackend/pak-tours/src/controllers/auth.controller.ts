import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "Secret123";
const prisma = new PrismaClient();

// Interface for user data
interface IUserData {
  name: string;
  email: string;
  destination: string;
  password: string;
  role?: string;
  preferredDestination?: string;
  preferredTravelDates?: string;
  travelType: string;
}

// Sign up
export const signUp: RequestHandler = async (req, res): Promise<void> => {
  try {
    const {
      name,
      email,
      destination,
      password,
      role,
      preferredDestination,
      preferredTravelDates,
      travelType,
    }: IUserData = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "This user already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        destination,
        password: hashedPassword,
        role: role || "user",
        preferredDestination,
        preferredTravelDates,
        travelType,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Sign in
export const signIn: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { email, password }: IUserData = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update user
export const updateUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      destination,
      preferredDestination,
      preferredTravelDates,
      travelType,
      role,
    } = req.body;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name || user.name,
        email: email || user.email,
        destination: destination || user.destination,
        preferredDestination: preferredDestination || user.preferredDestination,
        preferredTravelDates: preferredTravelDates || user.preferredTravelDates,
        travelType: travelType || user.travelType,
        role: role || user.role,
      },
    });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
export const deleteUser: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await prisma.user.delete({ where: { id: Number(id) } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by ID
export const getUserById: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { bookings: true }, // Include related bookings
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// import { PrismaClient } from "@prisma/client";
// import { RequestHandler } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const JWT_SECRET = "Secret123";
// const prisma = new PrismaClient();


// // Interface for user data
// interface IUserData {
//   name: string;
//   email: string;
//   destination: string;
//   password: string;
//   role: string;
// }

// // Sign up
// export const signUp: RequestHandler = async (req, res): Promise<void> => {
//   try {
//     const { name, email, destination, password, role }: IUserData = req.body;

//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       res.status(400).json({ message: "This user already exists" });
//       return;
//     }

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         destination,
//         password,
//         role
//       },
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Sign in
// export const signIn: RequestHandler = async (req, res): Promise<void> => {
//   try {
//     const { email, password }: IUserData = req.body;

//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     // if (!isValidPassword) {
//     //   res.status(400).json({ message: "Incorrect password" });
//     //   return;
//     // }

//     const token = jwt.sign(
//       { userId: user.id, name: user.name, email: user.email },
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({ user, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // Fetch user profile
// export const fetchUserProfile: RequestHandler = async (req, res): Promise<void> => {
//   try {
//     const { id } = req.params;

//     const user = await prisma.user.findUnique({ where: { id: Number(id) } });
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update profile
// export const updateProfile: RequestHandler = async (req, res): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { name, email, password, destination, role }: { name?: string; email?: string; password?: string; destination?:string; role?:string } = req.body;

//     const existingUser = await prisma.user.findUnique({ where: { id: Number(id) } });
//     if (!existingUser) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     const updateData: { name?: string; email?: string; password?: string; destination?:string; role?:string } = {};
//     if (name) updateData.name = name;
//     if (email) updateData.email = email;
//     if (password) updateData.password = await bcrypt.hash(password, 10);
//     if (destination) updateData.destination = destination;
//     if(role) updateData.role = role;

//     const updatedUser = await prisma.user.update({
//       where: { id: Number(id) },
//       data: updateData,
//     });

//     res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// };


// // Delete user profile
// export const deleteProfile: RequestHandler = async (req, res): Promise<void> => {
//   try {
//     const { id } = req.params;

//     await prisma.user.delete({ where: { id: Number(id) } });

//     res.status(200).json({ message: "Profile deleted successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
