import React from "react"
import Image from "next/image"

interface AvatarProps {
  img: string
  title?: string
}

export function Avatar({ img, title }: AvatarProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 relative">
        <Image
          src={img}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      {title && (
        <h1 className="text-lg md:text-xl text-white font-medium">{title}</h1>
      )}
    </div>
  )
}
