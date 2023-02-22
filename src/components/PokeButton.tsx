import React from 'react'

type Props = {
  children: React.ReactElement
  BtnW?: string
  handleClick?: () => void
}

export const PokeButton = ({ children, BtnW, handleClick }: Props) => (
  <button
    className="btn-primary btn hover:btn-secondary"
    style={{ width: BtnW }}
    onClick={handleClick}
  >
    {children}
  </button>
)
