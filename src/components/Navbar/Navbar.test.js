import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Navbar from './Navbar';

describe("Navbar component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Navbar />
    );
  });

  // Accurately renders the navbar
  it("renders a navbar with photo on left, logo center and two NavLinks", () => {
    expect(wrapper.find('.navbar')).to.have.lengthOf(1);
    expect(wrapper.find('img').at(0).prop("src")).to.equal("MyReadingRoom-nav-photo.jpg");
    expect(wrapper.find('img').at(1).prop("src")).to.equal("MyReadingRoom-logo.svg");
    expect(wrapper.find('li')).to.have.lengthOf(2);
  });
});