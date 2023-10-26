# Listar clientes

> ## Caso de sucesso

1. ✅ Retorna uma lista de todos os clientes
2. ✅ Retorna erro de cliente não encontrado se não houver clientes cadastrados
3. ✅ Retorna os dados de um cliente filtrado por (id, cpf ou email)
4. ✅ Retorna erro de cliente não encontrado se não houver cliente com algum dos filtros fornecidos

> ## Exceções
1. ✅ Retorna 500 se houver alguma falha na hora de consultar os dados


## Objeto Client
{
  	id: string
    name: string
    email: string
    cpf: string
    createdAt: Date
    updatedAt: Date
}

✅
✅
