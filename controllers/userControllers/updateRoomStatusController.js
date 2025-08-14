const pool = require("../../utils/db");

exports.updateRoomStatusController = async (req, res) => {
  const { id, statusToUpdate } = req.body;

  try {
    const [response] = await pool.query(
      "UPDATE rooms SET available = ? WHERE room_id = ?",
      [statusToUpdate, id]
    );

    return res
      .status(200)
      .json({ message: "Room Set to Unavailable", status: true });
  } catch (error) {
    return res.status(500).json({ message: "update room status fail" });
  }
};
