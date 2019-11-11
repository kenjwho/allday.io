import React from 'react'
import styled from 'styled-components'
import {graphql, Link} from 'gatsby'
import Image from 'gatsby-image'

import {Wrapper, Container as LogoGridContainer, HeadingBlock, Button, ButtonBlock as LogoGridButtonBlock} from '../elements'
import {base, darkBase, media, mqs, transition} from '../utilities/styles'

const LogoGridWrap = styled(Wrapper)`

`

const Container = styled(LogoGridContainer)`

`

const Logo = styled(Image)`

`

const LogosWrap = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;

  /* ${mqs({
    property: 'padding',
    valueBase: `${base.spacings.sectionS}px`,
    valueM: `${base.spacings.sectionS}px`,
    valueL: `${base.spacings.sectionM}px`,
    valueXL: `${base.spacings.sectionL}px`
  })}; */

  li {
    width: 50%;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mqs({
      property: 'margin-bottom',
      valueBase: `${base.spacings.sectionS}px`,
      valueM: `${base.spacings.sectionS}px`,
      valueL: `${base.spacings.sectionM}px`,
      valueXL: `${base.spacings.sectionL}px`
    })};

    ${media.medium`
      width: calc(100% / ${props => props.columns > 3 ? 3 : props.columns});
    `}

    ${media.large`
      width: calc(100% / ${props => props.columns});
    `}

    a {
      width: 60%;

      img {
        width: 100%;
        max-height: 120px;
        ${(transition({duration: '.2s'}))} !important;
        object-fit: contain !important;
        tranform-orgin: center;
      }

      &:hover {
        img.SVG {
          transform: scale(1.1);
        }

        .notSVG img {
          top: 50% !important;
          transform: translateY(-50%) scale(1.1);
        }
      }

      .notSVG img {
        top: 50% !important;
        transform: translateY(-50%);
      }
    }
  }

  ${({convertToBW, isDark}) => convertToBW && isDark && `
    img.SVG {
      filter: grayscale(100%) invert(100%) brightness(2) contrast(2);

      &:hover {
        filter: unset;
      }
    }

    .notSVG img {
      filter: grayscale(100%) invert(100%) brightness(10);

      &:hover {
        filter: unset;
      }
    }
  `}

  ${({convertToBW, isDark}) => convertToBW && !isDark && `
    img.SVG {
      filter: grayscale(100%) contrast(2) brightness(1);

      &:hover {
        filter: unset;
      }
    }

    .notSVG img {
      filter: grayscale(100%) brightness(0);

      &:hover {
        filter: unset;
      }
    }
  `}
`

const ButtonBlock = styled(LogoGridButtonBlock)`
  margin-top: 0;

  ${mqs({
    property: 'margin-bottom',
    valueBase: base.spacings.sectionS + 'px',
    valueM: base.spacings.sectionM + 'px',
    valueL: base.spacings.sectionL + 'px'
  })};
`

const LogoGrid = ({data}) => {
  const {headingBlock, isDark, logos, button, columns, convertToBW} = data
  const {heading, subHeading} = headingBlock

  return (
    <LogoGridWrap noSpaceBottom hasGrid theme={isDark ? darkBase : base}>
      <Container>

        {(heading || subHeading) && (
          <HeadingBlock {...headingBlock} />
        )}

        {logos && (
          <LogosWrap count={logos.length} columns={columns} convertToBW={convertToBW} isDark={isDark}>
            {logos.map((logo, i) => {
              console.log('logo:', logo)
              return (
                <li key={logo._key}>
                  <a href={logo.url} target='_blank' rel='noopener noreferrer'>
                    {logo.image.asset.mimeType === 'image/svg+xml' ? (
                      <img className='SVG' src={logo.image.asset.fluid.src} />
                    ) : (
                      <Logo className='notSVG' fluid={logo.image.asset.fluid} />
                    )}
                  </a>
                </li>
              )
            })}
          </LogosWrap>
        )}

        {button && (
          <ButtonBlock>
            <Button {...button} />
          </ButtonBlock>
        )}
      </Container>
    </LogoGridWrap>
  )
}

export default LogoGrid

export const query = graphql`
  fragment LogoGridFragment on SanityLogoGrid {
    _key
    _type
    columns
    headingBlock {
      heading
      subHeading
    }
    isDark
    convertToBW
    logos {
      _key
      image {
        asset {
          mimeType
          metadata {
            _type
          }
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
        alt
      }
      url
    }
    button {
      ...ButtonFragment
    }
  }
`