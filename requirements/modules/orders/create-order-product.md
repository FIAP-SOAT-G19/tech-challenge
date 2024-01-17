# Relacionar o pedido com os produtos escolhidos

> ## Caso de sucesso

1. ✅ Salva os dados do pedido e seus respectivos produtos
2. ✅ Retorna status 201

> ## Exceções
1. ✅ Retorna 400 se o id do produto não for fornecido
2. ✅ Retorna 400 se o id do produto for inválido
3. ✅ Retorna 400 se o id do pedido não for fornecido
4. ✅ Retorna 400 se o id do pedido for inválido
5. ✅ Retorna 400 se a quantidade de produtos selecionada não for fornecida
6. ✅ Retorna 400 se a quantidade de produtos selecionada for <= 0
7. ✅ Retorna 400 se o preço do produto não for fornecido

> ## Exceções
1. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto Order
{
  id: string
  productId: string
  orderId: string
  amount: number
  productPrice: number
  createdAt: Date
}

✅
⛔