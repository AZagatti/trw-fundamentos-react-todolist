import { render, screen } from "@testing-library/react"
import { Input } from "./input"

describe('<Input />', () => {
  it('can render correctly', () => {
    render(<Input placeholder="Input" />)
    expect(screen.getByPlaceholderText(/input/i)).toMatchSnapshot()
  })
})