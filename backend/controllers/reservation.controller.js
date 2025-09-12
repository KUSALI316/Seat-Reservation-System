import Reservation from "../models/reservation.model.js";
import Seat from "../models/seat.model.js";

// Create Reservation
export const createReservation = async (req, res) => {
  const { seatId, date, timeSlot } = req.body;

  try {
    // Ensure seat exists
    const seat = await Seat.findById(seatId);
    if (!seat || seat.status !== "available") {
      return res.status(400).json({ message: "Seat not available" });
    }

    // Check if already reserved
    const existing = await Reservation.findOne({
      seat: seatId,
      date,
      timeSlot,
      status: "active"
    });
    if (existing) return res.status(400).json({ message: "Seat already booked" });

    const reservation = await Reservation.create({
      intern: req.user.id,
      seat: seatId,
      date,
      timeSlot
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// Get logged-in user's reservations
export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ intern: req.user.id })
      .populate("seat")
      .sort({ date: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// Cancel reservation
export const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    if (reservation.intern.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    reservation.status = "cancelled";
    await reservation.save();
    res.json({ message: "Reservation cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling reservation", error });
  }
};

// Admin: get all reservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("intern", "name email")
      .populate("seat", "seatNumber location")
      .sort({ date: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all reservations", error });
  }
};


