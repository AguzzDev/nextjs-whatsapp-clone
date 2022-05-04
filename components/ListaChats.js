import Image from 'next/image'
import { useRef, useState } from 'react'
import { ChevronRightIcon, SearchIcon } from '@heroicons/react/solid'

import { IconSm } from './Icons'
import { Conversaciones } from 'components/ChatSection/Conversaciones'

export function ListaChat() {
  const debounceRef = useRef()
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    if (debounceRef.current) {
      debounceRef.current.clearTimeout()
    }
    setTimeout(() => {
      setQuery(e.target.value)
    }, 500)
  }

  return (
    <div className='flex flex-col h-full select-none'>
      <div className='flex flex-row py-5 px-5 bg-gray7 cursor-pointer'>
        <div className='mr-5'>
          <Image src='/notification.svg' height={45} width={45} className='object-cover' />
        </div>
        <div>
          <h2 className='text-gray5'>Recibe notificaciones de mensajes nuevos</h2>
          <div className='flex flex-row'>
            <p className='text-gray4 text-sm hover:underline'>Activar notificaciones de escritorio</p>
            <div className='my-auto text-gray4'>
              <IconSm Icon={ChevronRightIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row bg-black1 py-2 border-b border-border'>
        <div className='flex flex-row w-11/12 mx-auto rounded-md bg-gray1' style={{ padding: '8px' }}>
          <div className='my-auto pl-3 pr-5 text-gray4'>
            <IconSm Icon={SearchIcon} />
          </div>
          <input onChange={(e) => handleSearch(e)} className='bg-gray1 w-full text-gray4 text-sm outline-none' placeholder='Busca un chat o inicia uno nuevo' />
        </div>
      </div>
      <div className='bg-black1 h-5/6 overflow-y-scroll px-1'>
        <Conversaciones search={query} />
      </div>
    </div>
  )
}
