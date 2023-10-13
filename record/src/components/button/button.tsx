import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import * as S from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'base' | 'edit' | 'confirm' | 'remove'
}

export const Button = ({
  children,
  theme = 'base',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <S.Button
      type="button"
      $theme={theme}
      {...props}
    >
      {children}
    </S.Button>
  )
}