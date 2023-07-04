import React from "react"

import { IconSm } from "components/Icons"
import { UserAddIcon } from "@heroicons/react/solid"

export const InviteToGroup = ({ data, render, participants }) => {
  return (
    <>
      {data?.map((userV, i) => (
        <div className="flex justify-between" key={i}>
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 rounded-full">
              <img src={userV.image} width={50} height={50} />
            </div>
            <h2 className="overflow-x-hidden w-44">{userV.name}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              title="Agregar"
              type="button"
              onClick={() => render.push(userV.id)}
            >
              <IconSm Icon={UserAddIcon} />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
