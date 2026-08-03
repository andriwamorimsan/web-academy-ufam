import { formatCurrency } from '../../utils/formatCurrency'

type CartSummaryProps = {
  totalItems: number
  totalValue: number
}

export function CartSummary({ totalItems, totalValue }: CartSummaryProps) {
  return (
    <div className='card mb-4'>
      <div className='card-body'>
        <h5 className='card-title mb-4 fw-light'>Resumo do Carrinho</h5>
        <p className='card-text fw-medium'>
          Quantidade total: {totalItems}
        </p>
        <p className='card-text fw-medium'>
          Valor total: {formatCurrency(totalValue)}
        </p>
      </div>
    </div>
  )
}
