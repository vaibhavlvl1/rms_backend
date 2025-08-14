const pool = require("../../utils/db");

exports.getTenantsController = async (req, res) => {
  const user_id = req.user.id;

  try {
    const [tenant_list] = await pool.query(
      `SELECT * FROM tenants WHERE user_id = ${user_id}`
    );

    res
      .status(200)
      .json({
        message: "Successfully fetched Tenants List",
        status: true,
        body: tenant_list,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed To Get Tenants List" });
  }

  res.status(200).json({
    message: "Tenants Created Succesfully",
    status: true,
    body: req.body,
  });
};
