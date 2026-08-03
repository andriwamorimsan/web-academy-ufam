import type { ItemCarrinho } from '../../types/cart'
import { CartItem } from '../CartItem/CartItem'

type CartListProps = {
  items: ItemCarrinho[]
  removeItemFromCart: (id: string) => void
}

export function CartList({
  items,
  removeItemFromCart,
}: CartListProps) {
  return (
    <div className='card mb-4'>
      <div className='row card-body'>
        <h5 className='card-title mb-4 fw-light'>Produtos selecionados</h5>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Valor Unitario</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Opcoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartItem
                  item={item}
                  removeItemFromCart={removeItemFromCart}
                  key={item.produto.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
