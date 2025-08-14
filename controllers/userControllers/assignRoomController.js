const pool = require("../../utils/db");

exports.assignRoomController = async (req, res) => {
  const { date_of_residence, room_id, tenant_id } = req.body;
  console.log(req.body);

  try {
    const [rows] = await pool.query(
      "INSERT INTO room_tenant_map (date_of_residence,tenant_id,room_id,is_active) VALUES(?,?,?,?)",
      [date_of_residence, tenant_id, room_id, 1]
    );

    return res.status(200).json({
      message: "Room Assigned To Tenant",
      status: true,
      body: rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error in assingning room" });
  }
};
