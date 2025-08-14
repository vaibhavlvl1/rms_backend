const pool = require("../../utils/db");

exports.addTenantController = async (req, res) => {
  const {
    fullname,
    phone,
    id_proof_type,
    id_proof_number,
    permanent_address,
    job_title,
    company_name,
    residence_start,
    residence_end,
  } = req.body;

  try {
    const user_id = req.user.id;
    console.log(user_id);
    console.log(req.body);

    const [added_room] = await pool.query(
      "INSERT INTO tenants (user_id,full_name,phone,id_proof_type,id_proof_number,permanent_address,job_title,company_name,residence_start,is_active) VALUES(?,?,?,?,?,?,?,?,?,?)",
      [
        user_id,
        fullname,
        phone,
        id_proof_type,
        id_proof_number,
        permanent_address,
        job_title,
        company_name,
        residence_start,

        1,
      ]
    );

    if (added_room.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Tenant Added succefully", status: true });
    } else {
      return res
        .status(500)
        .json({ message: "sql query failed", status: false });
    }
  } catch (error) {
    console.log(error.sqlMessage, "this the culprit");
    return res
      .status(500)
      .json({ message: "Failed To Add Tenant", status: false });
  }
};
