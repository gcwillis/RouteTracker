import { useEffect, useRef, useState } from "react"
import type { DropdownOption } from "../utils/types"

type DropdownProps = {
  label?: string
  name?: string
  value?: string | number
  options: DropdownOption[]
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
}

export default function Dropdown({
  label,
  name,
  value = "",
  options,
  placeholder = "Select",
  onChange,
  className = ""
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const strValue = String(value ?? "")
  const selected = options.find((o) => String(o.value) === strValue)
  const display = selected?.label ?? placeholder

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [])

  function choose(v: string) {
    onChange?.(v)
    setOpen(false)
  }

  return (
    <div className={`relative inline-block ${open ? "z-50" : "z-0"} ${className}`}>
      {label ? <div className="mb-1 text-sm text-gray-200">{label}</div> : null}
      <div ref={ref} className="inline-block rounded-sm">
        <button
          type="button"
          name={name}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="w-25 bg-black/20 h-10 rounded-sm p-1 select-none border-2 border-black/5 hover:border-blue-900 active:border-white flex items-center justify-center gap-2 text-white text-base"
        >
          <span className="truncate">{display}</span>
          <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path d="M5.25 7.5L10 12.25 14.75 7.5z" />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            aria-label={label ?? name}
            className="absolute z-100 mt-2 w-25 max-h-48 overflow-auto rounded-md border border-gray-700 bg-gray-800 shadow-lg divide-y divide-gray-700"
          >
            {options.length === 0 ? (
              <li className="p-2 text-sm text-gray-400">No options</li>
            ) : (
              options.map((opt) => {
                const v = String(opt.value)
                const isSelected = v === strValue
                return (
                  <li
                    key={v}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => choose(v)}
                    className={
                      "cursor-pointer px-3 py-2 text-sm " +
                      (isSelected ? "bg-blue-900 text-white" : "text-white hover:bg-black/20")
                    }
                  >
                    {opt.label}
                  </li>
                )
              })
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
