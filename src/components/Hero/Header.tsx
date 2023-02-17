import React from 'react'

import Logo from '../../assets/pokemon.svg'

import { ImGithub, ImLinkedin } from 'react-icons/im'

export const Header = () => (
  <div className="navbar absolute top-0 bg-base-100/30">
    <div className="flex-1">
      <a href="#" className="btn-ghost btn">
        <img src={Logo} alt="" className="h-9" />
      </a>
    </div>
    <div className="flex-none">
      <a
        href="https://www.linkedin.com/in/sebastian-b%C5%82och-165681264/"
        className="btn-ghost btn-square btn text-primary"
        target="_blank"
        rel="noreferrer"
      >
        <ImLinkedin className="h-6 w-6" />
      </a>
      <a
        href="https://github.com/kelly-jsx"
        className="btn-ghost btn-square btn text-primary"
        target="_blank"
        rel="noreferrer"
      >
        <ImGithub className="h-6 w-6" />
      </a>
    </div>
  </div>
)
