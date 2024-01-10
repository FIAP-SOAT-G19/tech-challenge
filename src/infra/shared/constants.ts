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
    DELETE_PRODUCT: 'deleteProductSchema',
    PAYMENT: 'paymentSchema'
  },
  PAYMENT_STATUS: {
    APPROVED: 'approved',
    PROCESSING: 'processing',
    REFUSED: 'refused',
    WAITING: 'waiting'
  },
  PRODUCT_CATEGORY: {
    SNACK: 'snack',
    ACCOMPANIMENT: 'accompaniment',
    DRINK: 'drink',
    DESSERT: 'dessert'
  },
  WEBHOOK_URI: 'http://localhost:3000/api/v1/webhooks/paid_market/qrcodepayment'
}
