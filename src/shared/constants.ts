export default {
  ORDER_STATUS: {
    WAITING_PAYMENT: 'waitingPayment',
    RECEIVED: 'received',
    IN_PREPARATION: 'InPreparation',
    PREPARED: 'prepared',
    FINALIZED: 'finalized',
    CANCELED: 'canceled'
  },
  SCHEMAS: {
    ORDER: 'orderSchema',
    PRODUCT: 'productSchema',
    GET_PRODUCT: 'getProductSchema',
    UPDATE_PRODUCT: 'updateProductSchema',
    DELETE_PRODUCT: 'deleteProductSchema'
  },
  PAYMENT: {
    DEFAULT_TITLE: 'Tech-Challenge Payment'
  },
  PRODUCT_CATEGORY: {
    SNACK: 'snack',
    ACCOMPANIMENT: 'accompaniment',
    DRINK: 'drink',
    DESSERT: 'dessert'
  }
}
