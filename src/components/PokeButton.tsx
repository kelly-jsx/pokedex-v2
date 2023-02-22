import React from 'react'

type Props = {
  children: React.ReactElement
  BtnW: string
}

export const PokeButton = ({ children, BtnW }: Props) => (
  <button
    className="btn-primary btn hover:btn-secondary"
    style={{ width: BtnW }}
  >
    {children}
  </button>
)
