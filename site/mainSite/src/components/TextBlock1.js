import React from 'react'
import styled from 'styled-components'
import {rgba, getContrast, readableColor} from 'polished'

import {Wrapper, H1, H3, SubHeading, Container as TextBlock1Container} from '../elements'
import {base, darkBase, media} from '../utilities/styles'
import BlockContent from './BlockContent'

const Container = styled(TextBlock1Container)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: calc(${base.spacings.base}px / 2);

  ${media.medium`
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: ${base.spacings.base}px;
  `}
  
  ${media.large`
    grid-gap: ${base.spacings.base}px;
  `}

  & > h1, 
  & > h2, 
  & > h3, 
  & > h4, 
  & > h5, 
  & > h6 {
    grid-column: 1 / span 1;
    color: ${props => props.theme.colors.text};
    margin: 0;
  }
  
  & > div {
    grid-column: span 1;

    ${media.medium`
      grid-column: 2 / span 3;
    `}

    p:first-of-type {
      margin-top: 0;
    }
  }

  /* strong {
    color: ${props => props.theme.colors.accent};
  } */
`

const Text = styled.div``

const TextBlock1 = (props) => {
  const {data, rawData} = props
  const {heading, isDark} = data
  const {text} = rawData

  return (
    <Wrapper hasGrid theme={isDark ? darkBase : base}>
      <Container>
        <h3>{heading || ''}</h3>
        {text &&
          <Text>
            <BlockContent blocks={text || []} />
          </Text>}
      </Container>
    </Wrapper>
  )
}

export default TextBlock1
