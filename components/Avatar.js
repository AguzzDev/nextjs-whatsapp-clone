import Image from "next/image";

export function Avatar() {
    return (
        <Image src="/avatar.png" height={45} width={45} className="rounded-full cursor-pointer object-cover" />
    )
}
