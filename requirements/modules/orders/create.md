# Cadastrar um novo pedido

> ## Caso de sucesso

1. ⛔ Salva os dados do pedido
2. ⛔ Retorna status 201 com id do pedido

## Sugestão
Como o cliente pode se identificar ou não, o campo clientId pode ser opcional

> ## Exceções
1. ⛔ Retorna 400 se o id do cliente for fornecido e for inválido
2. ⛔ Retorna 400 se o id dos produtos não forem fornecidos
3. ⛔ Retorna 400 se a quantidade de produtos for  <= 0

> ## Exceções
1. ⛔ Retorna 500 se houver alguma falha na hora de salvar os dados

## Objeto Order
{
  	id: string
    clientId: string
    totalValue: number
    createdAt: Date
    updatedAt: Date
    paidAt: Date
}

✅
⛔