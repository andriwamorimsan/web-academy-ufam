import { render, screen } from '@testing-library/react'
import App from './App'


it('should render snapshot',  () => {
  const { container } = render(<App />)
  expect(container).toMatchSnapshot()
})

it('renders the landing page', async () => {
  render(<App />)
  await screen.findByRole('option', { name: 'Bengal' })

  // selecionando elementos por funcao
  const heading = screen.getByRole('heading')
  const combobox = screen.getByRole('combobox')
  const button = screen.getByRole('button')
  const img = screen.getByRole('img')

  // verificacoes sobre os elementos
  expect(heading).toHaveTextContent(/kitty directory/i)
  expect(heading).toBeInTheDocument()
  expect(combobox).toHaveDisplayValue('Select a breed')
  expect(button).toBeDisabled()
  expect(img).toBeInTheDocument()
})
