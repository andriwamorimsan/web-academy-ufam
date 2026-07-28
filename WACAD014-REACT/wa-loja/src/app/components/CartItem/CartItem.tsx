import type { ItemCarrinho } from '../../types/cart'
import { formatCurrency } from '../../utils/formatCurrency'

type CartItemProps = {
  item: ItemCarrinho
  removeItemFromCart: (id: string) => void
}

export function CartItem({
  item,
  removeItemFromCart,
}: CartItemProps) {
  const preco = Number(item.produto.preco)
  const total = preco * item.quantidade

  return (
    <tr>
      <td>{item.produto.nome}</td>
      <td>{formatCurrency(preco)}</td>
      <td>{item.quantidade}</td>
      <td>{formatCurrency(total)}</td>
      <td>
        <button
          className='btn btn-danger btn-sm'
          type='button'
          onClick={() => removeItemFromCart(String(item.produto.id))}
        >
          Remover
        </button>
      </td>
    </tr>
  )
}
