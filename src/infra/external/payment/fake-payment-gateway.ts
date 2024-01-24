import { IExternalPayment } from '@/application/interfaces/external/payment/external-payment.interface'
import { ProcessPaymentInput } from '@/application/interfaces/gateways/payment/process-payment-gateway.interface'
import constants from '@/infra/shared/constants'
import axios from 'axios'

export class ExternalProcessPayment implements IExternalPayment {
  async processPayment (input: ProcessPaymentInput): Promise<void> {
    const isEvenNumber = (+input.creditCard.number.slice(-1)) % 2 === 0

    let status
    let reason

    if (isEvenNumber) {
      status = 'approved'
      reason = null
    } else {
      status = 'refused'
      reason = this.getRandomMessage()
    }

    const webHookUri = constants.WEBHOOK_URI
    const data = {
      orderNumber: input.orderNumber,
      status,
      reason
    }

    setTimeout(async () => {
      try {
        await axios.post(webHookUri, data)
      } catch (error: any) {
        throw new Error(error)
      }
    }, 30 * 1000)
  }

  getRandomMessage(): string {
    const messages = [
      'Saldo insuficiente',
      'Cartão bloqueado',
      'Cartão expirado',
      'Cartão inválido',
      'Número de parcelas ultrapassa o permitido',
      'Código de segurança inválido',
      'Venda não autorizada. Contate o emissor do seu cartão',
      'Transação negada - Venda não autorizada',
      'Cartão vencido ou data de vencimento incorreta'
    ]

    const randomIndex = Math.floor(Math.random() * messages.length)

    return messages[randomIndex]
  }
}
