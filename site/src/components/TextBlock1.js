import React from 'react'
import styled from 'styled-components'
import {rgba, getContrast, readableColor} from 'polished'

import {Wrapper, H1, H3, SubHeading, Container as TextBlock1Container} from '../elements'
import {base} from '../utilities/styles'
import BlockContent from './BlockContent'

const Container = styled(TextBlock1Container)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px;

  & > h1, 
  & > h2, 
  & > h3, 
  & > h4, 
  & > h5, 
  & > h6 {
    grid-column: 1 / span 1;
    color: ${props => props.theme.colors.text};

    margin-top: 0;
  }
  
  & > div {
    grid-column: 2 / span 3;

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
  const {heading} = data
  const {text} = rawData
  console.log('rawData:', rawData)

  return (
    <Wrapper hasGrid>
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
