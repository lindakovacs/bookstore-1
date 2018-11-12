import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import BookList from './BookList';
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu"

describe("BookList component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BookList />
    );
  });

  // Accurately renders BookList component
  it("renders a media object with thumbnail and book details", () => {
    expect(wrapper.find('.panel')).to.have.lengthOf(1);
    expect(wrapper.find('img').prop('src')).to.equal('worker-thumb.jpg');
    expect(wrapper.find('.media-body')).to.have.lengthOf(1);
    expect(wrapper.find(ChangeStatusMenu)).to.have.lengthOf(1);
  });
});