import React from 'react'
import styled from 'styled-components'
import shabarium from '../../assets/svg/shab.svg'
import Daltamation from '../../assets/svg/daltamation.svg'
import Twitter from '../../assets/svg/twitter.svg'
import Telegram from '../../assets/svg/telegram.svg'
import Readit from '../../assets/svg/readit.svg'
import Medium from '../../assets/svg/medium.svg'

const Wrapper = styled.div``
const H1 = styled.h1`
  color: #fff !important;
  text-align: center;

  font-size: 75px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 82.5px */
`
const P = styled.p`
  color: #b4b4b4 !important;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const Button = styled.button`
  border-radius: 8px;
  background: linear-gradient(180deg, #fd792f 0%, #ff5c00 100%);

  padding: 14px 45px;
  border: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;
`
const H2 = styled.h2`
  color: #fd792f;
  font-size: 70px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 77px */
`
const Pd = styled.p`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  @media (max-width: 866px) {
    text-align: center;
  }
`
const ComunityButton = styled.button`
  border-radius: 8px;
  background: #0d0d0d;

  display: flex;
  padding: 14px 45px;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  pointer: cursor;

  gap: 10px;
`
const Card = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 150px;
  border-radius: 20px;
  margin-bottom: 100px;
  @media (max-width: 866px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`
const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 866px) {
    flex-direction: column;
    align-items: center;
  }
`
const Image = styled.img`
  @media (max-width: 866px) {
    width: 100%;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(6, 6, 6, 0.5);
  backdrop-filter: blur(25px);

  padding: 18px 120px 17px 120px;

  align-items: center;
  gap: 919.76px;
  @media (max-width: 866px) {
    padding: 5px 10px 17px 10px;
  }
`
const Main = styled.div`

`
const HeaderMenu = styled.div`
@media (max-width: 866px) {
  display:none;
}
`

function Home() {
  return (
    <div>
      <Header>
        <img src={Daltamation} />

        <HeaderMenu>
          <img src={Twitter} alt="" />
          <img src={Telegram} alt="" />

          <img src={Readit} alt="" />
          <img src={Medium} alt="" />
        </HeaderMenu>
      </Header>
      <Main>
        <br />
        <br />

        <H1>
          Join the <br /> Dalmatian Dex
        </H1>
        <P>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis <br /> praesentium voluptatum
          deleniti atque corrupti quos <br /> dolores et quas molestias excepturi sint occaecati cupiditate
        </P>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Button>Launch App</Button>
        </div>

        <Card>
          <div>
            <H2>Get ready!</H2>
            <Pd>Dalmatian DEX is live on Shibarium Network</Pd>
            
            <ComunityButton>Join our community</ComunityButton>
          </div>
          <div>
            <Image src={shabarium} />
          </div>
        </Card>
      </Main>
      <Footer>
        <div>
          <Image src={Daltamation} />
        </div>
        <div>
          <P style={{ fontSize: '12px' }}>© 2023 Dalmatian DEX. All rights reserved.</P>
        </div>
        <div>
          <img src={Twitter} alt="" />
          <img src={Telegram} alt="" />

          <img src={Readit} alt="" />
          <img src={Medium} alt="" />
        </div>
      </Footer>
    </div>
  )
}

export default Home
