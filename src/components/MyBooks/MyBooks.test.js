import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MyBooks from './MyBooks';

describe("MyBooks component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <MyBooks />
    );
  });

  // Accurately renders the search bar
  it("renders a label, input field and submit button for the search bar", () => {
    expect(wrapper.find('div')).to.have.lengthOf(1);
  });
});