import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Palette } from 'lucide-react'
import { CommandPalette, type CommandItem } from '@/components/library/CommandPalette'

interface GlobalPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalPalette({ open, onOpenChange }: GlobalPaletteProps) {
  const navigate = useNavigate()

  const items = useMemo<CommandItem[]>(
    () => [
      {
        id: 'nav:showcase',
        label: 'Showcase',
        group: 'Navigate',
        icon: <Box className="w-4 h-4" />,
        keywords: ['components', 'library', 'catalog'],
        onSelect: () => navigate('/showcase'),
      },
      {
        id: 'nav:design-specs',
        label: 'Design Specs',
        group: 'Navigate',
        icon: <Palette className="w-4 h-4" />,
        keywords: ['brand', 'designs', 'typography'],
        onSelect: () => navigate('/design-specs'),
      },
    ],
    [navigate],
  )

  return <CommandPalette open={open} onOpenChange={onOpenChange} items={items} />
}
