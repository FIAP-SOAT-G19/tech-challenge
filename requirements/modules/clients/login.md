# Cliente realizar login

> ## Caso de sucesso

1. ✅ Criptografa e confronta a senha do cliente
2. ✅ Login realizado com email e senha
3. ✅ Retorna status 200 com dados do cliente

> ## Exceções
1. ✅ Retorna 400 se o cliente não for encontrado
2. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados


## Objeto Client
{
  	id: string
    name: string
    email: string
    password: string
    repeatPassword:string
    cpf: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

✅
⛔
