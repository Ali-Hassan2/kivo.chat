import { Label } from './ui/label'
import { Switch } from './ui/switch'

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Is Accepting Messages</Label>
    </div>
  )
}
