const pool = require("../../utils/db");

exports.addPropertyController = async (req, res) => {
  console.log(req.user.id, req.body);
  const { property_name, property_address, property_city, property_state } =
    req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
      req.user.id,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Unauthorized. Login Again" });
    }

    const user = users[0];

    const [inserted_row] = await pool.query(
      "INSERT INTO properties (user_id,name,address,city,state) VALUES(?,?,?,?,?)",
      [
        user.user_id,
        property_name,
        property_address,
        property_city,
        property_state,
      ]
    );
  } catch (error) {
    console.log(error, "unable to create a property");
  }

  res.status(200).json({
    message: "property created successfully",
    ststus: true,
    user_id: req.user,
    body: req.body,
  });
};
