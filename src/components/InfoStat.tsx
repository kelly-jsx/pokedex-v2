import React from 'react'

type Props = {
  statName: string
  statNumber: string
}

export const InfoStat: React.FunctionComponent<Props> = ({
  statName,
  statNumber
}) => (
  <div className="grid grid-cols-5 items-center gap-3">
    <p>{statName}</p>
    <p className="font-bold">{statNumber}</p>
    <progress
      className="progress progress-secondary col-span-3 bg-base-300"
      value={statNumber}
      max="100"
    ></progress>
  </div>
)
