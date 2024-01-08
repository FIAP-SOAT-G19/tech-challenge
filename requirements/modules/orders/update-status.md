# Alterar o status de um pedido

> ## Caso de sucesso

1. ✅ Atualiza o status de um pedido
2. ✅ Retorna status 200

## Sugestão
No caso do update podemos deixar que o usuário escolha quais campos quer alterar, sendo desnecessário então a validação dos campos. Para este caso podemos usar o verbo HTTP PATCH


> ## Exceções
1. ✅ Retorna 400 se o id do pedido não for fornecido
2. ✅ Retorna 400 se o id do pedido for inválido
3. ✅ Retorna 400 se o novo status do pedido não for fornecido
4. ✅ Retorna 400 se o novo status do pedido for inválido
5. ✅ Retorna 500 se houver alguma falha na hora de salvar os dados

✅
⛔