import React, {useEffect, useState} from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import styled, {ThemeProvider} from 'styled-components'
import Flickity from 'react-flickity-component'

import CaseStudyBox from './CaseStudyBox'
import {lightWatermelly, darkWatermelly, lightPulp, darkPulp, base, FlicityWrapper, transition, media} from '../utilities/styles/'
import {Button, H1, H2, SubHeading, HeadingBlock, ButtonBlock, Wrapper, Container} from '../elements/'

const flickityOptions = {
  initialIndex: 1,
  // autoPlay: 5000,
  selectedAttraction: 0.04,
  friction: 0.6,
  pageDots: false,
  prevNextButtons: false
  // wrapAround: true
}

const SliderWrapper = styled(FlicityWrapper)`
  margin:  ${base.spacings.sectionS}px 0;

  ${media.medium`
    margin:  ${base.spacings.sectionM}px 0;
  `}
  ${media.large`
    margin:  ${base.spacings.sectionL}px 0;
  `}
`

const CaseStudiesBlock = ({data}) => {
  const {headingBlock, button, caseStudies} = data

  return (
    <Wrapper hasGrid theme={darkPulp} addSpace>
      {(headingBlock.subHeading || headingBlock.heading) &&
        <HeadingBlock>
          <SubHeading>
            {headingBlock.subHeading && headingBlock.subHeading}
          </SubHeading>
          <H1 as='h2'>
            {headingBlock.heading && headingBlock.heading}
          </H1>
        </HeadingBlock>}

      <SliderWrapper>
        {typeof window !== 'undefined' &&
          <Flickity
            className='carousel' // default ''
            elementType='div' // default 'div'
            options={flickityOptions} // takes flickity options {}
            disableImagesLoaded={false} // default false
            reloadOnUpdate // default false
            static
          >
            {caseStudies.map(caseStudy => (
              <CaseStudyBox key={caseStudy._id} {...caseStudy} />
            ))}
          </Flickity>}

      </SliderWrapper>

      <ButtonBlock>
        <Button {...button} />
      </ButtonBlock>
    </Wrapper>
  )
}

export default CaseStudiesBlock
