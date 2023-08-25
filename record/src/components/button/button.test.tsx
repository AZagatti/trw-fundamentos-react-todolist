import { render, screen } from "@testing-library/react"
import { Button } from "./button"

describe('<Button />', () => {
  it('can render with base class without theme prop', () => {
    render(<Button>Button</Button>)
    expect(screen.getByText(/button/i)).toHaveClass('base')
  })
  it.each([
    'base',
    'edit',
    'confirm',
    'remove'
  ] as const)('can render with %s class', (theme) => {
    render(<Button theme={theme}>Button</Button>)
    expect(screen.getByText(/button/i)).toHaveClass(theme)
  })
})