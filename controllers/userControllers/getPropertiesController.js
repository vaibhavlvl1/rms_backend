const pool = require("../../utils/db");

const getPropertiesController = async (req, res) => {
  const user_id = req.user.id;
  try {
    const [properties] = await pool.query(
      "SELECT * FROM properties WHERE user_id = ?",
      [user_id]
    );

    if (properties.length === 0) {
      res
        .status(204)
        .json({ message: "No Content Found. Please add Properties first" });
    }

    res
      .status(200)
      .json({
        message: "Properties Fetched Successfully",
        status: true,
        properties: properties,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to Fetch Properties List", status: false });
  }
};

module.exports = getPropertiesController;
