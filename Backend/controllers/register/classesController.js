require("dotenv").config();
const Class = require('../../models/classes');


const getAllClasses = async (req, res) => {
    try {
      const classes = await Class.findAll({
        where: { available: true },
        attributes: [
          "id",
          "name",
          "price",
          
          "start_time",  // ✅ Corrected
          "end_time",    // ✅ Corrected
          "color"
        ],
      });
  
      res.json({ success: true, classes });
    } catch (error) {
      console.error("Error fetching classes:", error);
      res.status(500).json({ error: "Failed to fetch classes" });
    }
  };
  

module.exports = {getAllClasses};