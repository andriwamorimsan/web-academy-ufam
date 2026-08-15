import { calculatePriceWithDiscount } from '@/app/helpers'
import { mockProducts } from '@/app/mocks/products'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FavoriteItem from './FavoriteItem'

describe('FavoriteItem', () => {
  const renderFavoriteItem = (
    favoriteItem: Product,
    setFavorites: React.Dispatch<React.SetStateAction<Product[]>> = () => {}
  ) => {
    return render(
      <table>
        <tbody>
          <FavoriteItem
            favoriteItem={favoriteItem}
            setFavorites={setFavorites}
          />
        </tbody>
      </table>
    )
  }

  it('deve renderizar corretamente as informações do item favorito', () => {
    const favoriteItem = mockProducts[0]
    const priceWithDiscount = calculatePriceWithDiscount(
      Number(favoriteItem.preco),
      favoriteItem.desconto
    ).toFixed(2)

    renderFavoriteItem(favoriteItem)

    expect(screen.getByText(favoriteItem.nome)).toBeInTheDocument()
    expect(screen.getByText(favoriteItem.descricao)).toBeInTheDocument()
    expect(screen.getByText(`R$ ${priceWithDiscount}`)).toBeInTheDocument()
    expect(screen.getByText(`${favoriteItem.desconto}%`)).toBeInTheDocument()
    expect(
      screen.getByAltText(favoriteItem.fotos[0].titulo)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Remover/i })
    ).toBeInTheDocument()
  })

  it('deve remover o item favorito selecionado ao clicar no botão de remover', async () => {
    const favoriteItem = mockProducts[0]
    const remainingItem = mockProducts[1]
    const setFavorites = jest.fn()

    renderFavoriteItem(favoriteItem, setFavorites)

    await userEvent.click(screen.getByRole('button', { name: /Remover/i }))

    expect(setFavorites).toHaveBeenCalledTimes(1)

    const updateFavorites = setFavorites.mock.calls[0][0]
    expect(updateFavorites([favoriteItem, remainingItem])).toEqual([
      remainingItem
    ])
  })
})
