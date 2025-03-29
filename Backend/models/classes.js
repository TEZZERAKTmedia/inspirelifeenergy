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
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    frequency: {
      type: DataTypes.ENUM("one-time", "weekly", "monthly"),
      allowNull: false,
      defaultValue: "one-time",
    },
    frequency_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    frequency_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "#3498db",
    },
    google_meet_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zoom_meet_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
    subscription_required: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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
          return Math.round((end - start) / 60000); // minutes
        }
        return null;
      },
    },
  }
);

module.exports = Class;
