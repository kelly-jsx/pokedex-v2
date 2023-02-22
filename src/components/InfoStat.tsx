import React from 'react'

type Props = {
  statName: string
  statNumber: string
}

export const InfoStat = ({ statName, statNumber }: Props) => (
  <div className="grid grid-cols-3 items-center gap-3">
    <p className="uppercase">{statName}</p>
    <div className="col-span-2 flex items-center gap-2">
      <p className="font-bold">{statNumber}</p>
      <progress
        className="progress progress-secondary bg-base-300"
        value={statNumber}
        max="100"
      ></progress>
    </div>
  </div>
)
