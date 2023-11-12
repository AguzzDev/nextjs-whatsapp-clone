import { useRef, useState } from "react";

export const useDebounce = (inputRef:React.RefObject<HTMLInputElement>) => {
  const [input, setInput] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setInput(inputRef.current!.value);
    }, 500);
  };

  return { handleChange, input };
};
