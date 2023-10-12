import styled, { css } from 'styled-components'

interface ButtonProps {
  $theme?: 'base' | 'edit' | 'confirm' | 'remove'
}

export const getTheme = ({ $theme }: ButtonProps) => {
  if ($theme === 'edit') {
    return css`
      background-color: #1741a4;
      color: #fff;
      margin-right: 8px;
    `
  }
  if ($theme === 'confirm') {
    return css`
      background-color: #3eb726;
      color: #fff;
    `
  }
  if ($theme === 'remove') {
    return css`
      background-color: #c32121;
      color: #fff;
    `
  }
  return css`
    background-color: #3f606b;
    color: #fff;
  `
}

export const Button = styled.button<ButtonProps>`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  ${getTheme}
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`
