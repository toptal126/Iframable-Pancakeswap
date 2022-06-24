import { useState } from 'react'
import { Token, Currency } from '@pancakeswap/sdk'
import { Button, Text, ErrorIcon, Flex, Message, Checkbox, Link, Tag, Grid } from '@pancakeswap/uikit'
import { AutoColumn } from 'components/Layout/Column'
import { useAddUserToken } from 'state/user/hooks'
import { getBscScanLink } from 'utils'
import truncateHash from 'utils/truncateHash'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedInactiveList } from 'state/lists/hooks'
import { ListLogo } from 'components/Logo'
import { useTranslation } from 'contexts/Localization'

interface ImportProps {
  tokens: Token[]
  handleCurrencySelect?: (currency: Currency) => void
}

function ImportToken({ tokens, handleCurrencySelect }: ImportProps) {
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const [confirmed, setConfirmed] = useState(false)

  const addToken = useAddUserToken()

  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()

  return (
    <AutoColumn gap="lg">
      {tokens.map((token) => {
        const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list
        const address = token.address ? `${truncateHash(token.address)}` : null
        return (
          <Grid
            style={{ border: '1px solid #A19FAB', borderRadius: '16px', padding: '16px' }}
            key={token.address}
            gridTemplateRows="1fr 1fr 1fr"
            gridGap="4px"
          >
            {list !== undefined ? (
              <Tag
                variant="success"
                outline
                scale="sm"
                startIcon={list.logoURI && <ListLogo logoURI={list.logoURI} size="12px" />}
              >
                {t('via')} {list.name}
              </Tag>
            ) : (
              <></>
            )}
            <Flex alignItems="center">
              <Text mr="8px">{token.name}</Text>
              <Text>({token.symbol})</Text>
            </Flex>
            {chainId && (
              <>
                <Text mr="4px" fontSize={14}>
                  {token.address}
                </Text>
                <Link href={getBscScanLink(token.address, 'address', chainId)} external>
                  ({t('View on BscScan')})
                </Link>
              </>
            )}
          </Grid>
        )
      })}
      <Message variant="warning">
        <Text color="#F99D15" fontSize={24} fontWeight="bold" textAlign="center">
          {t('Trade at your own risk!')}
        </Text>
        <Text color="#A19FAB" textAlign="center">
          {t(
            'Anyone can create a BEP20 token on BSC with any name, including creating fake versions of existing tokens and tokens that claim to represent projects. If you purchase an arbitrary token, you may be unable to sell it back.',
          )}
        </Text>
        <Flex alignItems="center" onClick={() => setConfirmed(!confirmed)}>
          <Checkbox
            scale="sm"
            name="confirmed"
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />
          <Text ml="8px" style={{ userSelect: 'none' }}>
            {t('I understand')}
          </Text>
        </Flex>
      </Message>

      <Flex justifyContent="space-between" alignItems="center">
        <Button
          width="100%"
          variant="primary"
          disabled={!confirmed}
          onClick={() => {
            tokens.forEach((token) => addToken(token))
            if (handleCurrencySelect) {
              handleCurrencySelect(tokens[0])
            }
          }}
          className=".token-dismiss-button"
        >
          {t('Import')}
        </Button>
      </Flex>
    </AutoColumn>
  )
}

export default ImportToken
