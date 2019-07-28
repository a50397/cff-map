import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ContentPanel from '../../src/components/ContentPanel.vue'

describe('ContentPanel.vue', () => {
  it('renders props.msg when passed', () => {
    const headline = 'Different Message'
    const wrapper = shallowMount(ContentPanel, {
      propsData: { headline }
    })
    expect(wrapper.text()).to.include(headline)
  })
})
