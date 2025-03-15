const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const xss = require('xss');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isOptedInForPromotions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isOptedInForEmailUpdates: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  hasAcceptedPrivacyPolicy: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  privacyPolicyAcceptedAt: {
    type: DataTypes.DATE,
  },
  hasAcceptedTermsOfService: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  termsAcceptedAt: {
    type: DataTypes.DATE,
  },

  // Clearly indicate paying customers
  isPayingCustomer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  // Testimonial text
  testimonial: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // Testimonial submission date
  testimonialSubmittedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  // Testimonial moderation/approval
  testimonialApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  hooks: {
    beforeValidate: (user) => {
      user.username = xss(user.username);
      user.email = xss(user.email);
      user.password = xss(user.password);
      user.phoneNumber = user.phoneNumber ? xss(user.phoneNumber) : null;
      user.verificationToken = user.verificationToken ? xss(user.verificationToken) : null;
      user.testimonial = user.testimonial ? xss(user.testimonial) : null;
    }
  }
});

// Define associations
User.associate = (models) => {
  User.hasMany(models.Order, {
    foreignKey: 'userId',
    as: 'orders'
  });
  User.hasMany(models.Message, {
    foreignKey: 'senderUsername',
    sourceKey: 'username',
    as: 'sentMessages'
  });
};

module.exports = User;
