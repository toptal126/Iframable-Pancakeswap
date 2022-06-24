import { Flex, IconButton, CogIcon, useModal } from '@pancakeswap/uikit'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
}

const GlobalSettings = ({ color, mr = '8px' }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
      <IconButton
        style={{
          background: '#E272FC',
          borderRadius: '8px',
        }}
        onClick={onPresentSettingsModal}
        variant="text"
        scale="sm"
        mr={mr}
        id="open-settings-dialog-button"
      >
        <CogIcon height={20} width={20} color={color || 'textSubtle'} />
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings
