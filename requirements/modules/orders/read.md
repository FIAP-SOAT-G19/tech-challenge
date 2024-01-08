# Listar pedidos

> ## Caso de sucesso

1. ✅ Retorna uma lista de todos os pedidos
2. ✅ Retorna um array vazio ou nulo se não houver pedidos cadastrados
3. ✅ Retorna os dados de um pedido filtrado por (id ou status)
4. ✅ Retorna um array vazio ou nulo se não houver pedido com algum dos filtros fornecidos

> ## Exceções
1. ✅ Retorna 500 se houver alguma falha na hora de consultar os dados


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