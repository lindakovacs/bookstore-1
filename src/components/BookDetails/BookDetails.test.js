import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import BookDetails from './BookDetails';

describe("BookDetails component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BookDetails
        match={{params: {id: "qKydDAAAQBAJ"}}} />
    );
  });

  // Makes all appropriate AJAX calls and updates state accordingly
  const mountSpy = spy(BookDetails.prototype, "componentDidMount");
  it("calls componentDidMount, which calls getBookDetails and updates state.isLoading to true", () => {
    expect(mountSpy.calledOnce).to.equal(true);
    expect(wrapper.state().isLoading).to.equal(true);
  });
});

describe("BookDetails component", () => {
  let wrapper;
  beforeEach(() => {
    const resolved = new Promise((r) => r({ data: { books: [
      {
        id: "qKydDAAAQBAJ",
        title: "Add a Pinch",
        subtitle: "Easier, Faster, Fresher Southern Classics",
        authors: ["Robyn Stone"],
        publisher: "Clarkson Potter",
        publishedDate: "2017-03-28",
        description:
          "With a foreword by Ree Drummond, this beautiful book has 100 easier, faster, lightened-up Southern recipes, from the blogger behind the popular Add a Pinch website.",
        industryIdentifiers: [
          {
            type: "ISBN_13",
            identifier: "9780553496420"
          },
          {
            type: "ISBN_10",
            identifier: "0553496425"
          }
        ],
        readingModes: {
          text: true,
          image: false
        },
        pageCount: 240,
        printType: "BOOK",
        categories: ["Cooking"],
        maturityRating: "NOT_MATURE",
        allowAnonLogging: false,
        contentVersion: "1.2.1.0.preview.2",
        panelizationSummary: {
          containsEpubBubbles: false,
          containsImageBubbles: false
        },
        imageLinks: {
          smallThumbnail:
            "http://books.google.com/books/content?id=qKydDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail:
            "http://books.google.com/books/content?id=qKydDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        language: "en",
        previewLink:
          "http://books.google.com/books?id=qKydDAAAQBAJ&printsec=frontcover&dq=cooking+salmon:intitle&hl=&cd=1&source=gbs_api",
        infoLink:
          "https://play.google.com/store/books/details?id=qKydDAAAQBAJ&source=gbs_api",
        canonicalVolumeLink:
          "https://market.android.com/details?id=book-qKydDAAAQBAJ",
        shelf: "wantToRead"
      }
    ]}} ));
    stub(axios, 'get').withArgs("http://localhost:7000/book/qKydDAAAQBAJ").returns(resolved);
    wrapper = shallow(
      <BookDetails
        match={{params: {id: "qKydDAAAQBAJ"}}} />
    );
  });

  it("updates state when getBookDetails successfully returns books", () => {
    console.log(wrapper.state());
    expect(wrapper.state().isLoading).to.equal(false);
    // expect(getSpy.calledOnce).to.equal(true);
    // instance.componentDidMount.restore();
  });



  // it("renders a title, subtitle, author, description, details and change status select menu", () => {
  //   expect(wrapper.find('h3')).to.have.lengthOf(1);
  //   expect(wrapper.find('h5')).to.have.lengthOf(1);
  //   expect(wrapper.find('i')).to.have.lengthOf(2);
  //   expect(wrapper.find('p')).to.have.lengthOf(7);
  //   expect(wrapper.find('p').children('i')).to.have.lengthOf(2);
  //   expect(wrapper.find('section').children('p')).to.have.lengthOf(1);
  //   expect(wrapper.find('.details').children('p')).to.have.lengthOf(3);
  // });
});