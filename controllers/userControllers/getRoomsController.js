const pool = require("../../utils/db");

exports.getRoomsController = async (req, res) => {
  const { property_id } = req.body;

  try {
    const [rooms] = await pool.query(
      `SELECT * FROM rooms WHERE property_id = ? AND available = 1 `,
      [property_id]
    );

    if (rooms.length === 0) {
      return res
        .status(200)
        .json({ message: "No Rooms Available.", status: true, rooms: rooms });
    }
    return res.status(200).json({
      message: "rooms fetched successfull",
      status: true,
      rooms: rooms,
    });
  } catch (error) {
    res.status(500).json({ message: "server Error", status: false });
  }
};
