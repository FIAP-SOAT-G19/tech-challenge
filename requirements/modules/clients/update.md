# Alterar o cadastro de um cliente

> ## Caso de sucesso

1. ✅ Atualiza os dados do cliente
2. ✅ Retorna status 200

## Sugestão
No caso do update podemos deixar que o usuário escolha quais campos quer alterar, sendo desnecessário então a validação dos campos. Para este caso podemos usar o verbo HTTP PATCH

> ## Exceções
1. ✅ Retorna 400 se o id do cliente não for fornecido
2. ✅ Retorna 400 se o id do cliente for inválido
3. ✅ Retorna 400 se o email for fornecido e se já estiver em uso por outro cliente
4. ✅ Retorna 400 se o cpf for fornecido e já estiver em uso por outro cliente
5. ✅ Retorna 500 se houver alguma falha na hora de atualizar os dados


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
