export default {
  name: 'caseStudiesBlock',
  title: 'Case Studies Scroll',
  type: 'object',
  fields: [
    {
      name: 'headingBlock',
      title: 'Heading',
      type: 'headingBlock'
    },
    {
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'caseStudies'}
          ]
        }
      ],
      options: {
        sortable: true
      }
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button'
    }
  ]
}
