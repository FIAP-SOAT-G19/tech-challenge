const crypto = require('crypto')
const bcrypt = require('bcrypt')

const clientsGenerate = (amount) => {
  const clients = []

  for (let i = 1; i <= amount; i++) {
    clients.push({
      id: crypto.randomUUID(),
      name: `Client Test ${i}`,
      email: `client${i}@email.com`,
      cpf: new Date().getTime().toString().slice(2),
      password: bcrypt.hashSync(`client${i}`, 10),
      createdAt: new Date()
    })
  }

  return clients
}
module.exports = clientsGenerate
