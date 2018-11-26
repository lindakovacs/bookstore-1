import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';

describe("App component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <App /> );
  });

  // Accurately renders App container
  it("renders one div and one main elements", () => {
    expect(wrapper.find('div')).to.have.lengthOf(1);
    expect(wrapper.find('main')).to.have.lengthOf(1);
  });

});