import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import styles from './button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'base' | 'edit' | 'confirm' | 'remove'
}

export const Button = ({ children, theme = 'base', className, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={`${className ?? ''} ${styles.button} ${styles[theme]}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}