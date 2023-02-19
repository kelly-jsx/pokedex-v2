import React from 'react'

type Props = {
  BtnW: string
}

export const PokeButton: React.FunctionComponent<Props> = ({
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
