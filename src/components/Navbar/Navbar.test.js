import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';

describe("Navbar", () => {
  const wrapper = shallow( <Navbar /> );
  it("NavLinks contains correctly passed prop", () => {
    expect(wrapper.find(NavLink)).to.have.lengthOf(2);
    expect(wrapper.find(NavLink).at(0).props().to).to.equal("/my-books");
    expect(wrapper.find(NavLink).at(1).props().to).to.equal("/search");
  });
});