import APITENOR from "lib/apiTenor"
import React, { useEffect, useRef, useState } from "react"

export const MenuGifs = ({ menu, setMenu, setMessage }) => {
  const [listGifs, setListGifs] = useState([])
  const searchGifRef = useRef()
  const debounceRef = useRef<NodeJS.Timeout>()

  const searchGif = async () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
      setListGifs([])
    }
    debounceRef.current = setTimeout(async () => {
      const inputGif = searchGifRef.current.value

      const { data } = await APITENOR.get(
        `${inputGif === "" ? "/trending" : "/search"}`,
        {
          params: {
            q: inputGif !== "" && searchGifRef.current.value,
            key: "GKR149X8LSDJ",
          },
        }
      )

      const dataBody = data.results.map(({ media }) =>
        media.map(({ gif }) => gif.url)
      )
      setListGifs(dataBody)
    }, 700)
  }

  useEffect(() => {
    if (menu) {
      searchGifRef.current.focus()
    }
  }, [menu])

  return (
    <>
      {menu && (
        <div className="absolute left-0 z-50 w-full overflow-y-scroll bottom-14 h-72 bg-gray1">
          <input
            placeholder="Busca un gif"
            ref={searchGifRef}
            onChange={searchGif}
            className="w-1/4 py-1 m-3 rounded-md bg-gray7"
          />
          {listGifs.length > 1 ? (
            <div className="grid grid-cols-6 gap-5 mx-4">
              {listGifs.map((gif, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setMessage({type:"gif",message:gif[0]})
                    setMenu(false)
                  }}
                >
                  <img src={gif} alt="gif" className="w-32 h-32" />
                </button>
              ))}
            </div>
          ) : (
            <h1>load</h1>
          )}
        </div>
      )}
    </>
  )
}
