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
    CLIENT: 'clientSchema',
    UPDATE_CLIENT: 'updateClientSchema',
    EMPLOYEE: 'employeeSchema',
    PRODUCT: 'productSchema',
    GET_PRODUCT: 'getProductSchema',
    UPDATE_PRODUCT: 'updateProductSchema',
    DELETE_PRODUCT: 'deleteProductSchema'
  },
  PAYMENT: {
    DEFAULT_TITLE: 'Tech-Challenge Payment'
  },
  PAID_MARKET: {
    STATUS_APPROVED: 'approved',
    STATUS_REFUSED: 'refused',
    PRODUCT_CATEGORY: {
      SNACK: 'snack',
      ACCOMPANIMENT: 'accompaniment',
      DRINK: 'drink',
      DESSERT: 'dessert'
    }
  },
  PRODUCT_CATEGORY: {
    SNACK: 'snack',
    ACCOMPANIMENT: 'accompaniment',
    DRINK: 'drink',
    DESSERT: 'dessert'
  }
}
