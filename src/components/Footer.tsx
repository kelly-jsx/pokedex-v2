import React from 'react'

import { ImGithub, ImLinkedin } from 'react-icons/im'

import Logo from 'assets/pokemon.svg'

export const Footer = () => (
  <footer className="footer items-center bg-neutral p-4 text-neutral-content">
    <div className="grid-flow-col items-center">
      <a href="#" className="btn-ghost btn">
        <img src={Logo} alt="" className="h-9" />
      </a>
      <p>Kelly-JSX</p>
    </div>
    <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a
        href="https://www.linkedin.com/in/sebastian-b%C5%82och-165681264/"
        className="btn-ghost btn-square btn text-primary hover:text-secondary"
        target="_blank"
        rel="noreferrer"
      >
        <ImLinkedin className="h-6 w-6" />
      </a>
      <a
        href="https://github.com/kelly-jsx"
        className="btn-ghost btn-square btn text-primary hover:text-secondary"
        target="_blank"
        rel="noreferrer"
      >
        <ImGithub className="h-6 w-6" />
      </a>
    </div>
  </footer>
)
