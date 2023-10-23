# Cadastrar um novo funcionário

> ## Caso de sucesso

1. ✅ Criptografa a senha do funcionário
2. ✅ Salva os dados do funcionário
3. ✅ Retorna status 201 com id do funcionário

> ## Exceções
1. ✅ Retorna 400 se o nome do funcionário não for fornecido
2. ✅ Retorna 400 se o email do funcionário não for fornecido
3. ✅ Retorna 400 se o cpf do funcionário não for fornecido
4. ✅ Retorna 400 se a senha do funcionário não for fornecida
5. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto Client
{
  	id: string
    name: string
    email: string
    password: string
    cpf: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

✅
⛔
