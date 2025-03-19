const sequelize = require('../config/database');

// Import models directly
const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Message = require('./messages');
const Thread = require('./threads');
const OrderItem = require('./orderItem');
const Media = require('./media');
const GuestCart = require('./guestCart')
const RateLimiterLogs = require("./rateLimiterLogs");
const SocialLinks = require('./socialLinks');
const Invoice = require('./invoice');
const Classes = require('./classes');



// Define the models within an object for easier association management
const db = {
  User,
  Product,
  Order,
  Message,
  Thread,
  OrderItem,
  RateLimiterLogs,
  Media,
  GuestCart,
  SocialLinks,
  Invoice,
  Classes
};

// Manually define associations within each model
User.associate = (models) => {
  // Associate User with Threads by senderEmail and receiverEmail
  User.hasMany(models.Thread, { foreignKey: 'senderEmail', sourceKey: 'email', as: 'sentThreads' });
  User.hasMany(models.Thread, { foreignKey: 'receiverEmail', sourceKey: 'email', as: 'receivedThreads' });

  // Associate User with Orders and Messages using username and userId
  User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });

  User.hasMany(models.Message, { foreignKey: 'senderUsername', sourceKey: 'username', as: 'sentMessages', constraints: false });
  User.hasMany(models.Message, { foreignKey: 'receiverUsername', sourceKey: 'username', as: 'receivedMessages', constraints: false });
  
  
};

Product.associate = (models) => {
  // Associate Product with Orders
  Product.hasMany(models.Order, { foreignKey: 'productId', as: 'orders' });
};

Order.associate = (models) => {
  Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' }); // Association with OrderItem
};

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
  OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
};

Message.associate = (models) => {
  // Message belongs to a User by senderUsername and receiverUsername
Message.belongsTo(models.User, { foreignKey: 'senderUsername', targetKey: 'username', as: 'sender', constraints: false });
Message.belongsTo(models.User, { foreignKey: 'receiverUsername', targetKey: 'username', as: 'receiver', constraints: false });
Message.belongsTo(models.Thread, {
  foreignKey: 'threadId',
  targetKey: 'threadId', // References the unique threadId in Threads
  as: 'thread',
});



  
};

Thread.associate = (models) => {
  // Thread has many Messages linked by threadId, with a unique alias
  Thread.hasMany(models.Message, { foreignKey: 'threadId', as: 'messages' });

  // Thread is associated with Users by senderEmail and receiverEmail
  Thread.belongsTo(models.User, { foreignKey: 'senderEmail', targetKey: 'email', as: 'threadSender', constraints: false });
  Thread.belongsTo(models.User, { foreignKey: 'receiverEmail', targetKey: 'email', as: 'threadReceiver', constraints: false });
  
  Thread.belongsTo(User, {
    as: 'senderUser', // Alias for the sender
    foreignKey: 'senderEmail', // Match with Thread's senderEmail field
    targetKey: 'email', // Match with User's email field
  });
  
  Thread.belongsTo(User, {
    as: 'receiverUser', // Alias for the receiver
    foreignKey: 'receiverEmail', // Match with Thread's receiverEmail field
    targetKey: 'email', // Match with User's email field
  });
};
Product.hasMany(Media, {
  foreignKey: 'productId',
  as: 'media', // Alias for the relationship
});

Media.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'mediaProduct', // Unique alias for Media -> Product association
});

// Call the associate method to set up relationships for each model
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

GuestCart.belongsTo(Product,
   { foreignKey: 'productId',
    as: 'Product'
});

Product.hasMany(GuestCart, 
  { foreignKey: 'productId',
   as: 'Product'
   });



// Export Sequelize instance and models
db.sequelize = sequelize;

module.exports = db;
