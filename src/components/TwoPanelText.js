import React, {useContext} from 'react'
import {graphql} from 'gatsby'
import styled, {ThemeContext} from 'styled-components'
import {rgba, getContrast, readableColor} from 'polished'

import {getContrastTextColor} from '../utilities/helpers'
import BlockContent from './BlockContent'
import {Wrapper as TwoPanelTextWrapper, H1, H2, H3, H4, H5, H6, SubHeading, Container as TwoPanelTextContainer, HeadingBlock} from '../elements'
import {base, media, darkBase} from '../utilities/styles'

const Wrapper = styled(TwoPanelTextWrapper)`
  /* background-color: ${props => props.theme.colors.accent}; */
  /* color: ${props => props.theme.colors && readableColor(props.theme.colors.accent, base.colors.white, base.colors.black)} */
`

const Container = styled(TwoPanelTextContainer)`
  /* grid-gap: 50px; */
  color: ${props => props.textColor};

  a {
    color: ${props => getContrast(props.theme.colors.accent, props.theme.colors.background) > 2 ? props.theme.colors.accent : props.theme.colors.text};
  }

  ${SubHeading} {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
    color: ${props => props.textColor && rgba(props.textColor, 0.8)};

    &:after {
      /* content: "${props => props.textColor}"; */
    }
  }
  
  ${H1}, ${H2}, ${H3}, ${H4}, ${H5}, ${H6} {
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
    /* font-size: 70px; */
    color: ${props => props.textColor} !important;
  }
  
  p {
    grid-column: 1 / span 3;
    grid-row: 3 / span 1;
    margin-top: ${base.spacings.base}px;
    color: ${props => props.textColor};
    /* color: ${props => props.textColor && rgba(props.textColor, 0.8)}; */

    &:first-child {
      margin-top: 0;
    }

    strong {
      color: ${props => props.textColor};
    }
  }
`

const Side = styled.div`
  grid-column: span 1;
`

const SidesWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;

   ${media.medium`
    grid-template-columns: 1fr 1fr;
    grid-gap: ${base.spacings.base}px;
  `}
  
  ${media.large`
    grid-template-columns: 1fr 1fr;
    /* grid-gap: 100px; */
  `}
`

const TwoPanelText = (props) => {
  const {data, rawData} = props

  const themeContext = useContext(ThemeContext)

  if (themeContext.colors.useSpecial && data.isDark) {
    var textColor = getContrastTextColor(themeContext.colors.accent)
  }
  return (
    <Wrapper hasGrid lineColor={textColor} theme={data.isDark ? darkBase : base}>
      <Container textColor={textColor}>
        {data.headingBlock && <HeadingBlock {...data.headingBlock} />}

        <SidesWrap>
          {rawData.leftText &&
            <Side>
              <BlockContent blocks={rawData.leftText || []} />
            </Side>}
          {rawData.rightText &&
            <Side>
              <BlockContent blocks={rawData.rightText || []} />
            </Side>}
        </SidesWrap>
      </Container>
    </Wrapper>
  )
}

export default TwoPanelText

export const query = graphql`
  fragment TwoPanelTextFragment on SanityTwoPanelText {
    _key
    _type
    isDark
    headingBlock {
      heading
      subHeading
    }
  }
`
