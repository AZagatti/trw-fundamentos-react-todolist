import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('<Button />', () => {
  it.each(['base', 'edit', 'confirm', 'remove'] as const)(
    'can render with %s theme',
    (theme) => {
      render(<Button $theme={theme}>Button</Button>)
      expect(screen.getByText(/button/i)).toMatchSnapshot()
    }
  )
})
