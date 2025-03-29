require("dotenv").config();
const Class = require("../../models/classes");

// Assuming we have already imported the Class model at the top:
// const { Class } = require('../models');  (adjust import as needed)

const classCreation = async (req, res) => {
  const {
    name,
    start_time,
    end_time,
    price,
    color,
    frequency,
    frequency_start_date,
    frequency_end_date,
    subscription_required
  } = req.body;

  // Validate required fields
  if (!name || !start_time || !end_time || !frequency || !price) {
    return res.status(400).json({
      error: "Missing required fields: 'name', 'start_time', 'end_time', 'price' and 'frequency' are required."
    });
  }

  // Validate frequency value
  const allowedFrequencies = ["one-time", "weekly", "monthly"];
  if (!allowedFrequencies.includes(frequency)) {
    return res.status(400).json({
      error: "Invalid frequency. Must be one of: 'one-time', 'weekly', or 'monthly'."
    });
  }

  // Prepare recurrence date variables, with conditional requirements
  let freqStartDate = null;
  let freqEndDate = null;
  if (frequency !== "one-time") {
    // For weekly or monthly, the recurrence start/end dates must be provided
    if (!frequency_start_date || !frequency_end_date) {
      return res.status(400).json({
        error: "frequency_start_date and frequency_end_date are required for recurring classes (weekly or monthly)."
      });
    }
    // Convert recurrence dates to Date objects (to ensure valid format)
    freqStartDate = new Date(frequency_start_date);
    freqEndDate = new Date(frequency_end_date);
    if (isNaN(freqStartDate) || isNaN(freqEndDate)) {
      return res.status(400).json({
        error: "Invalid date format for frequency_start_date or frequency_end_date."
      });
    }
    // Ensure the frequency_end_date is not before the frequency_start_date
    if (freqEndDate < freqStartDate) {
      return res.status(400).json({
        error: "frequency_end_date must be on or after frequency_start_date."
      });
    }
  }

  // Convert start_time and end_time to Date objects (ensure valid date-time)
  const startTime = new Date(start_time);
  const endTime = new Date(end_time);
  if (isNaN(startTime) || isNaN(endTime)) {
    return res.status(400).json({
      error: "Invalid date format for start_time or end_time."
    });
  }
  if (endTime <= startTime) {
    return res.status(400).json({
      error: "end_time must be after start_time."
    });
  }

  try {
    // Create a new class record with recurrence metadata
    const newClass = await Class.create({
      name: name,
      start_time: startTime,
      end_time: endTime,
      color: color || null,
      frequency: frequency,
      price: price,
      // Only set recurrence dates if applicable (otherwise they remain null)
      frequency_start_date: freqStartDate,
      frequency_end_date: freqEndDate,
      // Ensure subscription_required is a boolean (default to false if undefined)
      subscription_required: subscription_required ? true : false
    });

    // Respond with the created class record (could be filtered or sanitized as needed)
    return res.status(201).json(newClass);
  } catch (err) {
    console.error("Error creating class:", err);
    return res.status(500).json({ error: "Internal server error while creating class." });
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
