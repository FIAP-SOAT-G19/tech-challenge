# Alterar o cadastro de um produto

> ## Caso de sucesso

1. ⛔ Atualiza os dados do produto
2. ⛔ Retorna status 200

## Sugestão
No caso do update podemos deixar que o usuário escolha quais campos quer alterar, sendo desnecessário então a validação dos campos. Para este caso podemos usar o verbo HTTP PATCH


> ## Exceções
1. ✅ Retorna 400 se o id do produto não for fornecido
2. ✅ Retorna 400 se o id do produto for inválido
3. ✅ Retorna 400 se a categoria do produto for fornecida e for inválida (snack,accompaniment,drink,dessert)
4. ✅ Retorna 400 se o preço do produto for fornecido e for inválido (preco <= 0)
5. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


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