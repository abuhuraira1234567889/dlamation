import React from 'react'
import styled from 'styled-components'
import './index.css'

import Dalmation from '../../assets/svg/daltamation.svg'
import Circle from '../../assets/svg/threecircle.svg'
import Tele from '../../assets/svg/telegram.svg'
import Twitter from '../../assets/svg/twitter.svg'
import Readit from "../../assets/svg/readit.svg"
import Medium from "../../assets/svg/medium.svg"

const Wrapper = styled.div``

function Footer() {
  return (
    <>
      <footer>
        <div className="content">
          <div className="link-boxes">
            <ul className="box">
              <img src={Dalmation} />
              <li style={{ color: '#737373' }}>© 2023 Dalmatian DEX. All rights reserved.</li>
              <div className="lowerBox">
                <img src={Circle} />
                <li style={{color:"white"}}>$1,084.589</li>
              </div>
              <br />
              <div className="lowerBox">
                <p style={{color:"#FD792F",fontSize:"10px",marginRight:"10px"}}>TVL</p>
                <li style={{color:"white"}}>$1,084.589</li>
              </div>
            </ul>
            <ul className="box">
              <li className="link_name">Resources</li>
              <li>
                <a href="#">Audit </a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Contracts</a>
              </li>
              <li>
                <a href="#">Doc</a>
              </li>
            </ul>
            <ul className="box">
              <li className="link_name">Help</li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Guides</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
            <ul className="box">
              <li className="link_name">Tools</li>
              <li>
                <a href="#">Analytics</a>
              </li>
              <li>
                <a href="#">Bridge</a>
              </li>
              <li>
                <a href="#">CoinGecko</a>
              </li>
              <li>
                <a href="#">DexTools</a>
              </li>
              <li>
                <a href="#">Gecko Terminal</a>
              </li>
              <li>
                <a href="#">Governance</a>
              </li>
            </ul>
            <ul className="box">
              <li className="link_name">Ecosystem</li>
              <li>
                <a href="#">Create a Nitro pool</a>
              </li>
              <li>
                <a href="#">My Nitro pools</a>
              </li>
            </ul>
            <ul className="box">
              <li className="link_name">Socials</li>
              <div>
                <img src={Twitter}/>
                <img src={Tele}/>

                <img src={Medium}/>

                <img src={Readit}/>

              </div>
            </ul>
          </div>
        </div>
      
      </footer>
    </>
  )
}

export default Footer
