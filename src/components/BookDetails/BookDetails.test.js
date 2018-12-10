import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mock, stub } from 'sinon';
import BookDetails from './BookDetails';

let response, wrapper, axiosStub, axiosMock;

describe("BookDetails service via componentDidMount", () => {
  axiosMock = mock(axios);
  it("calls getBookDetails with correct url and sets state as if no response is received", () => {
    response = { data: { book: { title: "book" }}};
    const expectedUrl = `http://localhost:7000/book/qKydDAAAQBAJ`;
    axiosMock
      .expects('get')
      .withArgs(expectedUrl)
      .once()
      .returns(Promise.resolve(response));
    wrapper = shallow(
      <BookDetails  match={{params: {id: "qKydDAAAQBAJ"}}} />
    );
    axiosMock.verify();
    expect(wrapper.state().isLoading).to.equal(true);
    expect(wrapper.find("p").text()).to.equal("Loading...");
  });
  axiosMock.restore();
});

describe("various responses to getBookDetails request", () => {
  afterEach(() => { axiosStub.restore() });

  describe("getBookDetails - request resolved with error message", () => {
    beforeEach(() => {
      response = { data: { error: "test" } };
      axiosStub = stub(axios, "get").resolves(response);
      wrapper = shallow(
        <BookDetails match={{ params: { id: "qKydDAAAQBAJ" }}} />
      );
    });
    it("updates state", () => {
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().isError).to.equal(true);
      expect(wrapper.state().errorMessage).to.equal("test");
      expect(wrapper.find("p").text()).to.equal("test");
    });
  });

  describe("getBookDetails - request resolved with book", () => {
    beforeEach(() => {
      response = { data: { book: { title: "book" }}};
      axiosStub = stub(axios, "get").resolves(response);
      wrapper = shallow(
        <BookDetails match={{ params: { id: "qKydDAAAQBAJ" }}} />
      );
    });
    it("updates state", () => {
      expect(wrapper.state().isError).to.equal(false);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().books[0].title).to.equal("book");
      expect(wrapper.find("p").text()).to.equal("BOOK DETAILS");
    });
  });

  describe("getBookDetails - request rejected", () => {
    beforeEach(() => {
      response = { message: "test" };
      axiosStub = stub(axios, "get").rejects(response);
      wrapper = shallow(
        <BookDetails match={{ params: { id: "qKydDAAAQBAJ" }}} />
      );
    });
    it("updates state", () => {
      expect(wrapper.state().isError).to.equal(true);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().errorMessage).to.equal("test");
      expect(wrapper.find("p").text()).to.equal("test");
    });
  });

  describe("getBookDetails - request resolved but response empty", () => {
    beforeEach(() => {
      response = { data: "no book property" };
      axiosStub = stub(axios, "get").resolves(response);
      wrapper = shallow(
        <BookDetails match={{params: {id: "qKydDAAAQBAJ"}}} />
      );
    });
    it("updates state", () => {
      expect(wrapper.state().isError).to.equal(true);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().errorMessage).to.equal("No book found.");
      expect(wrapper.find("p").text()).to.equal("No book found.");
    });
  });
});