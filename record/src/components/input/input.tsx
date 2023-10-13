import { InputHTMLAttributes } from 'react'
import * as S from './styles'

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <S.Input type="text" {...props} />
}
