import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BookDetails from './BookDetails';

describe("BookDetails component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BookDetails />
    );
  });

  // Accurately renders Book Details component
  it("renders a thumbnail", () => {
    expect(wrapper.find('img')).to.have.lengthOf(1);
    expect(wrapper.find('img').prop('src')).to.equal('worker-thumb.jpg');
  });
  it("renders a title, subtitle, author, description, details and change status select menu", () => {
    expect(wrapper.find('h3')).to.have.lengthOf(1);
    expect(wrapper.find('h5')).to.have.lengthOf(1);
    expect(wrapper.find('i')).to.have.lengthOf(2);
    expect(wrapper.find('p')).to.have.lengthOf(7);
    expect(wrapper.find('p').children('i')).to.have.lengthOf(2);
    expect(wrapper.find('section').children('p')).to.have.lengthOf(1);
    expect(wrapper.find('.details').children('p')).to.have.lengthOf(3);
  });
});