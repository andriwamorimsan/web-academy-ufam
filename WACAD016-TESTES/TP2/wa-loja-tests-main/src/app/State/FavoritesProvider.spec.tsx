import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useFavoritesContext } from '../hooks/useFavoritesContext'
import { FavoritesProvider } from './FavoritesProvider'

const FavoritesConsumer = () => {
  const { favorites, setFavorites } = useFavoritesContext()

  return (
    <>
      <span>Quantidade: {favorites.length}</span>
      <button onClick={() => setFavorites([])}>Limpar favoritos</button>
    </>
  )
}

describe('FavoritesProvider', () => {
  it('deve fornecer o estado dos favoritos e a função setFavorites aos componentes filhos', async () => {
    render(
      <FavoritesProvider>
        <FavoritesConsumer />
      </FavoritesProvider>
    )

    expect(screen.getByText('Quantidade: 0')).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole('button', { name: /Limpar favoritos/i })
    )

    expect(screen.getByText('Quantidade: 0')).toBeInTheDocument()
  })

  it('deve expor os valores de contexto padrão fora do provider', async () => {
    render(<FavoritesConsumer />)

    expect(screen.getByText('Quantidade: 0')).toBeInTheDocument()

    await userEvent.click(
      screen.getByRole('button', { name: /Limpar favoritos/i })
    )

    expect(screen.getByText('Quantidade: 0')).toBeInTheDocument()
  })
})
