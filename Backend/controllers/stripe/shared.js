function generateOrderNumber(orderId) {
    return `ORD-${orderId}-${Date.now()}`;
  }
  
  function buildStripeLineItems(items, isProduct = true) {
    return items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.thumbnail ? [`${process.env.USER_FRONTEND}/uploads/${item.thumbnail}`] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));
  }
  
  module.exports = { generateOrderNumber, buildStripeLineItems };
  