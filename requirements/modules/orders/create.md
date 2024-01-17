# Cadastrar um novo pedido

> ## Caso de sucesso

1. ✅ Salva os dados do pedido
2. ✅ Retorna status 201 com id do pedido

## Sugestão
Como o cliente pode se identificar ou não, o campo clientId pode ser opcional

> ## Exceções
1. ✅ Retorna 400 se o id do cliente for fornecido e for inválido
1. ✅ Retorna 400 se o valor total não for fornecido ou for inválido

> ## Exceções
1. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados

## Table Order
{
  	id: string
    clientId: string
    totalValue: number
    createdAt: Date
    updatedAt: Date
    paidAt: Date
}

## Input Order {
    products: [{
      id: string
      name: string
      category: string
      price: number
      description: string
      image: string
      amount: number
    }],
    clientId?: string
  }

## Input ProcessPayment
  "external_reference": 12345,
  "title": "Product order",
  "total_amount": 100,
  "items": [
    {
      "sku_number": "A123K9191938",
      "category": "marketplace",
      "title": "Point Mini",
      "description": "This is the Point Mini",
      "unit_price": 100,
      "amount": 1,
      "unit_measure": "unit",
      "total_amount": 100
    }
  ],
  "sponsor": {
    "id": 446566691
  }

✅
⛔
