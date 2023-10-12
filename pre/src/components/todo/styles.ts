import styled, { css } from 'styled-components'

interface ItemProps {
  $isCompleted: boolean
}

export const Item = styled.li<ItemProps>`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  > div {
    display: flex;
  }
  > p {
    word-break: break-word;
    font-size: 14px;
    padding: 0 8px;
    ${({ $isCompleted }) =>
      $isCompleted &&
      css`
        text-decoration: line-through;
      `}
  }
`
