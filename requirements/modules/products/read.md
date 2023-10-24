# Listar produtos

> ## Caso de sucesso

1. ✅ Retorna uma lista de todos os produtos
2. ✅ Retorna um array vazio ou nulo se não houver produtos cadastrados
3. ✅ Retorna os dados de um produto filtrado por (id ou categoria)
4. ✅ Retorna um array vazio ou nulo se não houver produto com algum dos filtros fornecidos

> ## Exceções
1. ✅ Retorna 500 se houver alguma falha na hora de consultar os dados


## Objeto Product
{
  	id: string
    name: string
    category: string
    price: number
    description: string
    image: string
    createdAt: Date
    updatedAt: Date
}

✅
⛔