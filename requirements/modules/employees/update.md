# Alterar o cadastro de um funcionário

> ## Caso de sucesso

1. ✅ Atualiza os dados do funcionário
2. ✅ Retorna status 200

## Sugestão
No caso do update podemos deixar que o usuário escolha quais campos quer alterar, sendo desnecessário então a validação dos campos. Para este caso podemos usar o verbo HTTP PATCH

> ## Exceções
1. ✅ Retorna 400 se o id do funcionário não for fornecido
2. ✅ Retorna 400 se o id do funcionário for inválido
3. ✅ Retorna 400 se o email for fornecido e se já estiver em uso por outro funcionário
4. ✅ Retorna 400 se o cpf for fornecido e já estiver em uso por outro funcionário
5. ✅ Retornar 400 se houver erro na validação de algum input
6. ✅ Retorna 500 se houver alguma falha na hora de atualizar os dados


## Objeto de update Client
{
  	id: string
    name: string
    email: string
    password: string
    cpf: string
}

✅
⛔
