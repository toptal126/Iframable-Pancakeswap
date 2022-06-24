import styled from 'styled-components'
import {
  ChartIcon,
  Flex,
  Heading,
  HistoryIcon,
  IconButton,
  NotificationDot,
  Text,
  useModal,
  ChartDisableIcon,
} from '@pancakeswap/uikit'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useExpertModeManager } from 'state/user/hooks'
import RefreshIcon from 'components/Svg/RefreshIcon'

interface Props {
  title: string
  noConfig?: boolean
  hasAmount: boolean
  onRefreshPrice: () => void
}

const CurrencyInputContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const ColoredIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.textSubtle};
`

const CurrencyInputHeader: React.FC<Props> = ({ title, hasAmount, onRefreshPrice }) => {
  const [expertMode] = useExpertModeManager()
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)

  return (
    <CurrencyInputContainer>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column" alignItems="flex-between" width="100%" mr={18}>
          <Heading as="h2">{title}</Heading>
        </Flex>
        <Flex>
          <NotificationDot show={expertMode}>
            <GlobalSettings color="textSubtle" mr="0" />
          </NotificationDot>
        </Flex>
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
