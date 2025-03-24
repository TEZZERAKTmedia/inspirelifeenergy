const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Class = sequelize.define(
  "Class",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    class_date: {
      type: DataTypes.DATEONLY, // Stores only the date (YYYY-MM-DD)
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM("one-time", "weekly", "monthly"),
      allowNull: false,
      defaultValue: "one-time",
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Decimal for price with two decimal places
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING, 
      allowNull: false, 
      defaultValue: "#3498db"
    },
    google_meet_link: {
      type: DataTypes.STRING, // Stores the generated Google Meet link
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    getterMethods: {
      duration() {
        if (this.start_time && this.end_time) {
          const start = new Date(this.start_time);
          const end = new Date(this.end_time);
          return Math.round((end - start) / 60000); // Convert milliseconds to minutes
        }
        return null;
      },
    },
  }
);

module.exports = Class;
