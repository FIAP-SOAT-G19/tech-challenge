# Cadastrar um novo produto

> ## Caso de sucesso

1. ✅ Salva os dados do produto
2. ✅ Retorna status 201 com id do produto

> ## Exceções
1. ✅ Retorna 400 se o nome do produto não for fornecido
2. ✅ Retorna 400 se a categoria do produto não for fornecida
3. ✅ Retorna 400 se a categoria do produto for inválida (snack,accompaniment,drink,dessert)
4. ✅ Retorna 400 se o preço do produto não for fornecido
5. ✅ Retorna 400 se o preço do produto for inválido (preco <= 0)
6. ✅ Retorna 400 se a descrição do produto não for fornecida
7. ✅ Retorna 400 se a imagem do produto não for fornecida
8. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


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