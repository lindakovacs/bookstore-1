import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Search from './Search';

describe("Search component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Search />
    );
  });

  // Accurately renders the search bar
  it("renders a label, input field and submit button for the search bar", () => {
    expect(wrapper.find('p').text()).to.equal("Search for a Book");
    expect(wrapper.find('input')).to.have.lengthOf(1);
    expect(wrapper.find('button')).to.have.lengthOf(1);
  });
});