import { ChainId, TokenAmount } from '@uniswap/sdk'
import React, { useState } from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import Dalimation from '../../assets/svg/daltamation.svg'

import Logo from '../../assets/svg/logo.svg'
import LogoDark from '../../assets/svg/logo_white.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances, useAggregateUniBalance } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE, ExternalLink, CloseIcon } from '../../theme'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import UniBalanceContent from './UniBalanceContent'
import usePrevious from '../../hooks/usePrevious'
import Shabrium from '../../assets/svg/shablogo.svg'
import './index.css'
import Humberger from '../../assets/svg/humpburger.svg'
import Down from '../../assets/svg/downgreen.svg'
import LightDown from '../../assets/svg/LightDown.svg'
import CloseIcons from "../../assets/svg/close.png"

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;

  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1rem;

  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  @media(max-width:990px){
    flex-direction:column !important;
    align-items: flex-start;
    padding:20px
  }

  `};
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
`};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg4)};
  } */
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 200;
  background-color: ${({ theme }) => theme.bg3};
  background: #ffb800;
  // background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;
  font-weight: 200;
  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `}
  color: #ffffff;
  font-weight: 400;
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: #ffffff;
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 200;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: #ffffff;
  }

  :hover,
  :focus {
    color: #ffffff;
    font-weight: 400;
  }
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: #ffffff;
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 200;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: #ffffff;
  }

  :hover,
  :focus {
    color: #ffffff;
    text-decoration: none;
    font-weight: 400;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
`}
`

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'Mainnet',

  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const [navOpen, setNavOpen] = useState(false)
  const [active, setActive] = useState(1)

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance()

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0'
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(false);

  function onDismiss (){
    setShow(false);
  }

  return (
    <>
      <HeaderFrame>
        <ClaimModal />
        <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
          <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
        </Modal>
        <HeaderRow>
          <Title href=".">
            <UniIcon>
              <img src={Dalimation} alt="logo" />
            </UniIcon>
          </Title>
          <div className={navOpen ? 'navbarOpen' : 'navshow'}>
            <div className="dropdown">
              <button
                onClick={() => {
                  setActive(1)
                }}
                className={active === 1 ? 'dropColor' : 'dropbtn'}
              >
                Trade
                <span style={{ marginLeft: '7px' }}>
                  <img src={active === 1 ? Down : LightDown} />
                </span>
              </button>
              <div className="dropdown-content">
                <a href="#">Swap</a>
                <a href="/#/add"> Liquidity</a>
                {/* <a href="#">Link 3</a> */}
              </div>
            </div>
            <div className="dropdown">
              <button
                onClick={() => {
                  setActive(2)
                }}
                className={active === 2 ? 'dropColor' : 'dropbtn'}
              >
                Earn
                <span style={{ marginLeft: '7px' }}>
                  <img src={active === 2 ? Down : LightDown} />
                </span>
              </button>
              {/* <div className="dropdown-content">
                <a href="#">Swap</a>
                <a href="#"> Liquidity</a>
               
              </div> */}
            </div>
            <div className="dropdown">
              <button
                onClick={() => {
                  setActive(3)
                }}
                className={active === 3 ? 'dropColor' : 'dropbtn'}
              >
                xDAL
                <span style={{ marginLeft: '7px' }}>
                  <img src={active === 3 ? Down : LightDown} />
                </span>
              </button>
              {/* <div className="dropdown-content">
                <a href="#">Swap</a>
                <a href="#"> Liquidity</a>
               
              </div> */}
            </div>
            <div className="dropdown">
              <button
                onClick={() => {
                  setActive(4)
                }}
                className={active === 4 ? 'dropColor' : 'dropbtn'}
              >
                Round Table
              </button>
            </div>
            <div className="dropdown">
              <button
                onClick={() => {
                  setActive(5)
                }}
                className={active === 5 ? 'dropColor' : 'dropbtn'}
              >
                Launchpad
              </button>
            </div>
            <div className="dropdown">
              <button
                onClick={() => {
                  setActive(6)
                }}
                className={active === 6 ? 'dropColor' : 'dropbtn'}
              >
                More
              </button>
            </div>
          </div>

          {/* <HeaderLinks>
            <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
              {t('Trade')}
            </StyledNavLink>
            <StyledNavLink
              id={`pool-nav-link`}
              to={'/pool'}
              isActive={(match, { pathname }) =>
                Boolean(match) ||
                pathname.startsWith('/add') ||
                pathname.startsWith('/remove') ||
                pathname.startsWith('/create') ||
                pathname.startsWith('/find')
              }
            >
              {t('Earn')}
            </StyledNavLink>
            <StyledNavLink id={`stake-nav-link`} to={'/uni'}>
              xDAL
            </StyledNavLink>
            <StyledNavLink id={`stake-nav-link`} to={'/vote'}>
              Vote
            </StyledNavLink>
            <StyledNavLink id={`stake-nav-link`} to={'/vote'}>
              Round Table
            </StyledNavLink>
            <StyledNavLink id={`stake-nav-link`} to={'/vote'}>
              Launchpad
            </StyledNavLink>
            <StyledNavLink id={`stake-nav-link`} to={'/vote'}>
              More
            </StyledNavLink>
          </HeaderLinks> */}
        </HeaderRow>
        <div
          onClick={() => {
            setNavOpen(!navOpen)
          }}
          className="burger"
        >
          <img style={{ width: '50px' }} src={Humberger} />
        </div>
        <HeaderControls>
          <HeaderElement>
            {/* <UNIWrapper>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? (
                    <Dots>Claiming UNI</Dots>
                  ) : (
                    <HideSmall>
                      {chainId && NETWORK_LABELS[chainId] && (
                        <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
                      )}
                    </HideSmall>
                  )}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper> */}

            <div className="dropdown">
              <button
                style={{ background: 'transparent', border: 'none', width: '150px' }}
                onClick={() => {
                  setActive(1)
                }}
              >
                <div style={{ display: 'flex' }}>
                  <img src={Shabrium} />
                  <p style={{ marginLeft: '10px', marginRight: '10px', color: 'white' }}>Puppy Net
                  <span style={{ marginLeft: '7px' }}>
                  <img src={active === 1 ? Down : LightDown} />
                </span>
                  </p>
                </div>
              </button>
              <div onClick={() => {setShow(!show)}} style={{ width: '100px' }} className="dropdown-content">
                <div style={{ display: 'flex', paddingLeft: '10px' }}>
                  <img src={Shabrium} />
                  <a href="#">Shibarium</a>
                </div>

                {/* <a href="#">Link 3</a> */}
              </div>
            </div>

            {/* {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? <Dots>Claiming UNI</Dots> : 'Claim UNI'}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}
          {!availableClaim && aggregateBalance && (
            <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                {account && (
                  <HideSmall>
                    <TYPE.white
                      style={{
                        paddingRight: '.4rem'
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={','}
                        duration={1}
                      />
                    </TYPE.white>
                  </HideSmall>
                )}
                UNI
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}  */}
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {/* {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} ETH
                </BalanceText>
              ) : null} */}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          {/* <HeaderElementWrap>
            <Settings />
            <Menu />
          </HeaderElementWrap> */}
        </HeaderControls>
      </HeaderFrame>

      {show && (
        <div
          style={{
            position: 'absolute',
            color: 'white',
            right: '5%',
            top: '10%',
            background: '#FD792F',
            width: '300px',
            textAlign: 'center',
            padding: '10px 0px',
            zIndex: 1000,
            display:"flex",
            justifyContent:"space-around",
            fontWeight: "bold",
            borderRadius: "5px",
            
          }}
        >
          
          <div >Coming Soon</div>
          <img onClick={()=>{setShow(false)}} style={{width:"20px",cursor:"pointer"}} src={CloseIcons} alt="" />
        </div>
      )}
    </>
  )
}
