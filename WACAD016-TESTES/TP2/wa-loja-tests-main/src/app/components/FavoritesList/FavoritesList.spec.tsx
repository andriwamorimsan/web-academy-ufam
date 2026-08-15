import { calculatePriceWithDiscount } from '@/app/helpers'
import { mockProducts } from '@/app/mocks/products'
import { FavoritesContext } from '@/app/State/FavoritesProvider'
import { render, screen } from '@testing-library/react'
import FavoritesList from './FavoritesList'

const renderFavoritesList = (favorites: Product[] = []) => {
  const setFavorites = jest.fn()

  render(
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      <FavoritesList />
    </FavoritesContext.Provider>
  )

  return { setFavorites }
}

describe('FavoritesList', () => {
  it('deve renderizar a mensagem de favoritos vazios quando não houver favoritos', () => {
    renderFavoritesList()

    expect(screen.getByText('Lista de favoritos:')).toBeInTheDocument()
    expect(screen.getByText(/Sua lista de favoritos/i)).toBeInTheDocument()
    expect(screen.getByText('Quantidade de produtos: 0')).toBeInTheDocument()
    expect(screen.getByText('Valor total: R$ 0')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('deve renderizar os produtos favoritos com a quantidade e o valor total', () => {
    const favorites = [mockProducts[0], mockProducts[1]]
    const totalValue = favorites.reduce((acc, product) => {
      return (
        acc +
        calculatePriceWithDiscount(Number(product.preco), product.desconto)
      )
    }, 0)

    renderFavoritesList(favorites)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Produto')).toBeInTheDocument()
    expect(screen.getByText('Quantidade de produtos: 2')).toBeInTheDocument()
    expect(screen.getByText(`Valor total: R$ ${totalValue}`)).toBeInTheDocument()

    favorites.forEach((favorite) => {
      expect(screen.getByText(favorite.nome)).toBeInTheDocument()
      expect(screen.getByAltText(favorite.fotos[0].titulo)).toBeInTheDocument()
    })
    expect(screen.getAllByText('descrição legal')).toHaveLength(2)
  })
})

// tava dando esse error:  console.error
//       Warning: React does not recognize the `fetchPriority` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `fetchpriority` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
//           at img
//           at C:\projetos\web-academy-ufam\WACAD016-TESTES\TP2\wa-loja-tests-main\node_modules\next\src\client\image-component.tsx:212:5
//           at C:\projetos\web-academy-ufam\WACAD016-TESTES\TP2\wa-loja-tests-main\node_modules\next\src\client\image-component.tsx:372:5
//           at td
//           at tr
//           at favoriteItem (C:\projetos\web-academy-ufam\WACAD016-TESTES\TP2\wa-loja-tests-main\src\app\components\FavoriteItem\FavoriteItem.tsx:10:3)
//           at tbody
//           at table
//
//ideia é add React.createElement na parte dos props  return <img {...props} />; ===   return React.createElement("img", props);