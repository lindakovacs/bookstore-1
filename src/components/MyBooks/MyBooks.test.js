import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mock, stub } from 'sinon';
import MyBooks from './MyBooks';

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

describe("various responses to getMyBooks request", () => {
  afterEach(() => { axiosStub.restore() });

  describe("getMyBooks - request resolved but response empty", () => {
    beforeEach(() => {
      response = {};
      axiosStub = stub(axios, "get").resolves(response);
      wrapper = shallow( <MyBooks /> );
    });
    it("updates state", () => {
      const books = Object.values(wrapper.state().books)[0];
      expect(books).to.equal(undefined);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().isError).to.equal(true);
      expect(wrapper.state().errorMessage).to.equal("Invalid response from server.");
      expect(wrapper.find("p").at(1).text()).to.equal("Invalid response from server.");
    });
  });

  describe("getMyBooks - request resolved with books", () => {
    beforeEach(() => {
      response = { data: {
        books: { 
          wantToRead: [{  "book": "book 1" }],
          currentlyReading: [{ "book": "book 2" }],
          read: []
        }
      }};
      axiosStub = stub(axios, "get").resolves(response);
      wrapper = shallow( <MyBooks /> );
    });
    it("updates state", () => {
      expect(wrapper.state().books.wantToRead[0].book).to.equal("book 1");
      expect(wrapper.state().books.currentlyReading[0].book).to.equal("book 2");
      expect(wrapper.state().books.read[0]).to.equal(undefined);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().isError).to.equal(false);
      expect(wrapper.state().errorMessage).to.equal("");
    });
  });

  describe("getMyBooks - request rejected", () => {
    beforeEach(() => {
      response = { message: "test" };
      axiosStub = stub(axios, "get").rejects(response);
      wrapper = shallow( <MyBooks /> );
    });
    it("updates state", () => {
      const books = Object.values(wrapper.state().books)[0];
      expect(books).to.equal(undefined);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().isError).to.equal(true);
      expect(wrapper.state().errorMessage).to.equal("test");
      expect(wrapper.find("p").at(1).text()).to.equal("test");
    });
  });
});