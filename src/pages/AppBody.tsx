import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 566px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #16141d;
  background: #0c0c0c;
  backdrop-filter: blur(7.5px);
  padding: 1rem;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
