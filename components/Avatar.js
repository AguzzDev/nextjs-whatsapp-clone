import Link from "next/link"
import { useSockets } from "context/SocketContext"

export function Avatar() {
  const { user } = useSockets()

  return (
    <>
      <div className="flex items-center space-x-3">
        {!user?.image ? (
          <Link href="/">
            <div className="h-10 w-10 rounded-full bg-white" />
          </Link>
        ) : (
          <img
            src={user.photoURL}
            height={45}
            width={45}
            className="rounded-full cursor-pointer object-cover"
          />
        )}
        <h1 className="text-white text-xl font-bold">{user}</h1>
      </div>
    </>
  )
}
