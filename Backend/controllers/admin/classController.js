require("dotenv").config();
const Class = require("../../models/classes");

const classCreation = async (req, res) => {
  try {
    const { name, start_time, end_time, class_date, color } = req.body;

    // Ensure required fields are provided
    if (!name || !start_time || !end_time || !class_date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create the class in the database
    const classData = await Class.create(req.body);

    res.json({ success: true, classData });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Failed to create class" });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.findAll(); // Fetch all classes from the database
    res.json({ success: true, classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};

const updateClasses = async (req, res ) => {
  try {
    const {id} = req.params;
    const [updated] = await Class.update(req.body, {where: {id}})

    if (!updated) {
      return res.status(404).json({ error: "Class not found"});
    }

    const updatedClass = await Class.findByPk(id);
    res.json({success: true, class: updatedClass })

  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({error: "Failed to update class"});
  }
}

const deleteClass = async (req, res) => {
  try {
    const {id} = req.params
    const deleted = await Class.destroy({ where: {id}})

    if (!deleted) {
      return res.status(404).json({error: "Class not found"});
    }

    res.json({ success: true, message: "Class deleted successfully"})
  } catch (error) {
    console.error("Error deleting class:", error)
    res.status(500).json({ error: "Failed to delete class"})

  }
}

module.exports = { classCreation, getAllClasses, updateClasses, deleteClass };
