import Seat from "../models/seat.model.js";

// Create Seat (Admin)
export const createSeat = async (req, res) => {
  try {
    const seat = await Seat.create(req.body);
    res.status(201).json(seat);
  } catch (error) {
    res.status(500).json({ message: "Error creating seat", error });
  }
};

// Get all seats
export const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seats", error });
  }
};

// Update Seat (Admin)
export const updateSeat = async (req, res) => {
  try {
    const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!seat) return res.status(404).json({ message: "Seat not found" });
    res.json(seat);
  } catch (error) {
    res.status(500).json({ message: "Error updating seat", error });
  }
};

// Delete Seat (Admin)
export const deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);
    if (!seat) return res.status(404).json({ message: "Seat not found" });
    res.json({ message: "Seat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting seat", error });
  }
};
