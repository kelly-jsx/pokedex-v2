import React from 'react'

type ButtonProps = {
  BtnW: string
}

export const PokeButton: React.FunctionComponent<ButtonProps> = ({
  children,
  BtnW
}) => (
  <button
    className="btn-primary btn hover:btn-secondary"
    style={{ width: BtnW }}
  >
    {children}
  </button>
)
