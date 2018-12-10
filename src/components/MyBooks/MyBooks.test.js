import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mock, stub } from 'sinon';
import MyBooks from './MyBooks';
import BookList from '../BookList/BookList';

let response, wrapper, axiosStub, axiosMock;

describe("MyBooks service via componentDidMount", () => {
  axiosMock = mock(axios);
  it("calls getMyBooks with correct url and sets state as if no response is received", () => {
    response = { data: { books: { title: "book" }}};
    const expectedUrl = `http://localhost:7000/bookshelf`;
    axiosMock
      .expects('get')
      .withArgs(expectedUrl)
      .once()
      .returns(Promise.resolve(response));
    wrapper = shallow( <MyBooks /> );
    axiosMock.verify();
    expect(wrapper.state().isLoading).to.equal(true);
    expect(wrapper.find("p").at(1).text()).to.equal("Loading...");
  });
  axiosMock.restore();
});

describe.only("various responses to getMyBooks request", () => {
  afterEach(() => { axiosStub.restore() });

  describe("getBookDetails - request resolved but response empty", () => {
    beforeEach(() => {
      response = {};
      axiosStub = stub(axios, "get").resolves(response);
      wrapper = shallow( <MyBooks /> );
    });
    it("updates state", () => {
      expect(myBooksSpy.throws()).to.equal(true);
      // expect(consoleSpy.calledOnce()).to.equal(true);
      // expect(wrapper.state().isError).to.equal(true);
      // expect(wrapper.state().isLoading).to.equal(false);
      // expect(wrapper.state().errorMessage).to.equal("No book found.");
      // expect(wrapper.find("p").text()).to.equal("No book found.");
    });
  });

  // describe("getBookDetails - request resolved with books", () => {
  //   beforeEach(() => {
  //     response = { data: { book: { title: "book" }}};
  //     axiosStub = stub(axios, "get").resolves(response);
  //     wrapper = shallow( <MyBooks /> );
  //   });
  //   it("updates state", () => {
  //     expect(wrapper.state().isError).to.equal(false);
  //     expect(wrapper.state().isLoading).to.equal(false);
  //     expect(wrapper.state().books[0].title).to.equal("book");
  //     expect(wrapper.find("p").text()).to.equal("BOOK DETAILS");
  //   });
  // });

  // describe("getBookDetails - request rejected", () => {
  //   beforeEach(() => {
  //     response = { message: "test" };
  //     axiosStub = stub(axios, "get").rejects(response);
  //     wrapper = shallow( <MyBooks /> );
  //   });
  //   it("updates state", () => {
  //     expect(wrapper.state().isError).to.equal(true);
  //     expect(wrapper.state().isLoading).to.equal(false);
  //     expect(wrapper.state().errorMessage).to.equal("test");
  //     expect(wrapper.find("p").text()).to.equal("test");
  //   });
  // });
});