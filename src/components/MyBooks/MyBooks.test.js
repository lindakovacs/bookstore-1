import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MyBooks from './MyBooks';
import BookList from '../BookList/BookList';

describe("MyBooks component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <MyBooks /> );
  });

  // Accurately renders a page with failed server query
  it("renders a 'MY BOOKS' header and a 'Looading...' message ", () => {
    let pTags = wrapper.find('p');
    console.log(wrapper.debug());
    expect(pTags).to.have.lengthOf(2);
    expect(pTags.at(0).text()).to.equal("MY BOOKS");
    expect(pTags.at(1).text()).to.equal("Loading...");
  });

  // Accurately renders a page with successful response from server
  it("renders a 'MY BOOKS' header and three category headers & booklists", () => {
    wrapper.setState({ 
      books: { wantToRead: [], currentlyReading: [], read: [] }, 
      isLoading: false
    });
    let pTag = wrapper.find('p');
    let categories = wrapper.find('h2');
    let lists = wrapper.find(BookList);
    expect(pTag).to.have.lengthOf(1);
    expect(pTag.at(0).text()).to.equal("MY BOOKS");
    expect(categories).to.have.lengthOf(3);
    expect(categories.at(0).text()).to.equal("Future Reads");
    expect(categories.at(1).text()).to.equal("Currently Reading");
    expect(categories.at(2).text()).to.equal("Already Read");
    expect(lists).to.have.lengthOf(3);
  });
});