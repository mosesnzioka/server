import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createNotification(req, res) {
  const { receiverId, poolId, message } = req.body;
  const senderId = req.userId;

  try {
    const senderExists = await prisma.user.findUnique({
      where: { id: senderId },
    });
    const receiverExists = await prisma.user.findUnique({
      where: { id: receiverId },
    });
    const poolExists = await prisma.pool.findUnique({ where: { id: poolId } });

    if (!senderExists) {
      return res.status(400).json({ message: "Invalid senderId" });
    }
    if (!receiverExists) {
      return res.status(400).json({ message: "Invalid receiverId" });
    }
    if (!poolExists) {
      return res.status(400).json({ message: "Invalid poolId" });
    }

    const notification = await prisma.notification.create({
      data: { message, senderId, receiverId, poolId },
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function currentUser(req, res) {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, firstname: true, lastname: true, email: true },
    });

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNotificationStatus(req, res) {
  const { notificationId, status } = req.body;

  try {
    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: { status },
      include: { sender: true, receiver: true },
    });

    await prisma.notification.create({
      data: {
        message: `Your request has been ${status} by ${updatedNotification.receiver.firstname} ${updatedNotification.receiver.lastname}`,
        senderId: updatedNotification.receiverId,
        receiverId: updatedNotification.senderId,
        poolId: updatedNotification.poolId,
      },
    });

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Error updating notification status:", error);
    res.status(500).json({ message: "Failed to update notification status" });
  }
}

export async function getDriverNotifications(req, res) {
  const driverId = req.userId;

  try {
    const notifications = await prisma.notification.findMany({
      where: { receiverId: driverId },
      include: {
        sender: {
          select: { firstname: true, lastname: true },
        },
        pool: {
          select: { location: true, destination: true },
        },
      },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNotification(req, res) {
  const { id } = req.params;

  try {
    const notification = await prisma.notification.delete({
      where: { id },
    });

    res
      .status(200)
      .json({ message: "Notification deleted successfully", notification });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Failed to delete notification" });
  }
}
