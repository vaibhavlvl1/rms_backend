const pool = require("../../utils/db");

exports.addRoomController = async (req, res) => {
  const { property_id, room_type, floor, rent_amount, room_name } = req.body;

  try {
    const [added_room] = await pool.query(
      "INSERT INTO rooms (property_id,room_type,floor,rent_amount,room_name) VALUES(?,?,?,?,?)",
      [property_id, room_type, floor, rent_amount, room_name]
    );

    res.status(200).json({
      message: "Room Added Successfully",
      status: true,
      room: added_room,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to Add Room . Try Again", status: false });
  }

  res.status(200).json({ message: "Room Created Successfully", status: true });
};
