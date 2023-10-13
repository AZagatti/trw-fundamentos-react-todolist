import styled, { css } from 'styled-components'

interface ButtonProps {
  $theme?: 'base' | 'edit' | 'confirm' | 'remove'
}

const getTheme = ({ $theme }: ButtonProps) => {
  if ($theme === 'edit') {
    return css`
      background-color: #1741a4;
      margin-right: 8px;
    `
  }
  if ($theme === 'confirm') {
    return css`
      background-color: #3eb726;
    `
  }
  if ($theme === 'remove') {
    return css`
      background-color: #c32121;
    `
  }
  return css`
    background-color: #3f606b;
  `
}

export const Button = styled.button<ButtonProps>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: #fff;
  &:disabled {
    background-color: #b1b1b1;
    cursor: not-allowed;
  }
  ${getTheme}
`
