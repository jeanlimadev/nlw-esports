import { InputHTMLAttributes } from "react"
import * as SelectGames from '@radix-ui/react-select'
import { Check, CaretDown } from 'phosphor-react'
import { Game } from "../../App"


interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Game[]
}

export function Select({ data, placeholder }: SelectProps) {
  return (
    <SelectGames.Root>
      <SelectGames.Trigger aria-label="game" className='relative flex justify-between align-center bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'>
        <SelectGames.Value placeholder={placeholder}/>
        <SelectGames.Icon>
          <CaretDown size={20} />
        </SelectGames.Icon>
      </SelectGames.Trigger>

      <SelectGames.Portal>
        <SelectGames.Content>
          <SelectGames.ScrollUpButton />
          <SelectGames.Viewport className='absolute w-[100%] px-1 flex-col bg-zinc-900 rounded text-sm text-white'>
            {
              data.map(item => {
                return (
                  <SelectGames.Item
                    value={item.id} 
                    className='flex justify-between items-center py-3 px-3 hover:bg-zinc-600'
                    id='game'
                    key={item.id}
                  >
                    <SelectGames.ItemText>
                      { item.title }
                    </SelectGames.ItemText>
                    <SelectGames.ItemIndicator>
                      <Check size={20} />
                    </SelectGames.ItemIndicator>
                  </SelectGames.Item>
                )
              })
            }
            <SelectGames.Separator />
          </SelectGames.Viewport>
          <SelectGames.ScrollDownButton />
        </SelectGames.Content>
      </SelectGames.Portal>
    </SelectGames.Root>
  )
}