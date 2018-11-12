import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ChangeStatusMenu from './ChangeStatusMenu';

describe("ChangeStatusMenu component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ChangeStatusMenu />
    );
  });

  // Accurately renders ChangeStatusMenu component
  it("renders a label and a select menu with 4 options", () => {
    expect(wrapper.find('label')).to.have.lengthOf(1);
    expect(wrapper.find('select')).to.have.lengthOf(1);
    expect(wrapper.find('option')).to.have.lengthOf(4);
  });
});