import { useState } from 'react'
import styled from 'styled-components'
import { Text, PancakeToggle, Toggle, Flex, Modal, InjectedModalProps, ThemeSwitcher } from '@pancakeswap/uikit'
import {
  useAudioModeManager,
  useExpertModeManager,
  useSubgraphHealthIndicatorManager,
  useUserExpertModeAcknowledgementShow,
  useUserSingleHopOnly,
} from 'state/user/hooks'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import QuestionHelper from '../../QuestionHelper'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import GasSettings from './GasSettings'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [audioPlay, toggleSetAudioMode] = useAudioModeManager()
  const [subgraphHealth, setSubgraphHealth] = useSubgraphHealthIndicatorManager()
  const { onChangeRecipient } = useSwapActionHandlers()

  const { t } = useTranslation()
  const { theme, isDark, setTheme } = useTheme()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (!showExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <Modal
      title={t('Settings')}
      onDismiss={onDismiss}
      // style={{ maxWidth: '420px' }}
    >
      <ScrollableContainer>
        <Flex pb="24px" flexDirection="column">
          <GasSettings />
        </Flex>
        <Flex pb="24px" flexDirection="column">
          <TransactionSettings />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb="24px">
          <Flex alignItems="center">
            <Text>{t('Expert Mode')}</Text>
            <QuestionHelper
              text={t('Bypasses confirmation modals and allows high slippage trades. Use at your own risk.')}
              placement="top-start"
              ml="4px"
            />
          </Flex>
          <Toggle id="toggle-expert-mode-button" scale="md" checked={expertMode} onChange={handleExpertModeToggle} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb="24px">
          <Flex alignItems="center">
            <Text>{t('Disable Multihops')}</Text>
            <QuestionHelper text={t('Restricts swaps to direct pairs only.')} placement="top-start" ml="4px" />
          </Flex>
          <Toggle
            id="toggle-disable-multihop-button"
            checked={singleHopOnly}
            scale="md"
            onChange={() => {
              setSingleHopOnly(!singleHopOnly)
            }}
          />
        </Flex>
      </ScrollableContainer>
    </Modal>
  )
}

export default SettingsModal
