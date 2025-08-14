exports.dashboardController = (req, res) => {
  console.log("Homepage reached");
  res.status(200).json({ dashboard: "Succedsscufl" });
};
