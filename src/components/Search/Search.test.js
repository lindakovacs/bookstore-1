import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mock, stub, spy } from 'sinon';
import Search from './Search';

let response, wrapper, instance, buttonSpy, debouncedSpy, consoleSpy, axiosStub, axiosMock;

describe("Search: basic funcitonality", () => {
  beforeEach(() => {
    wrapper = shallow( <Search /> );
  });
  it("doesn't render results field before search input is entered", () => {
    expect(wrapper.find('p')).to.have.lengthOf(1);
    expect(wrapper.find('p').text()).to.equal("Search for a Book");
  });
  it("calls searchbooks when search button is clicked", () => {
    wrapper.setState({userInput: "test"})
    instance = wrapper.instance();
    buttonSpy = spy(instance, "searchBooks");
    const button = wrapper.find("button");
    button.simulate("click");
    expect(buttonSpy.calledOnceWith("test")).to.equal(true);
  });
  it("sets state and calls debouncedSearch when input is entered in search box", () => {
    wrapper.setState({userInput: "test"})
    instance = wrapper.instance();
    debouncedSpy = spy(instance, "debouncedSearch");
    const input = wrapper.find("input");
    const event = { target: { value: "test" }};
    event.persist = () => {};
    input.simulate("change", event);
    expect(wrapper.state().userInput).to.equal("test");
    expect(debouncedSpy.calledOnceWith("test")).to.equal(true);
  });
});

describe("Search: service", () => {
  axiosMock = mock(axios);
  wrapper = shallow( <Search /> );
  it("calls getBookDetails with correct url and sets state as if no response is received", () => {
    response = { data: { books: [{ title: "book" }] }};
    const expectedUrl = `http://localhost:7000/books/search/test`;
    instance = wrapper.instance();
    axiosMock
      .expects('get')
      .withArgs(expectedUrl)
      .once()
      .returns(Promise.resolve(response));
    instance.searchBooks("test");
    axiosMock.verify();
    expect(wrapper.state().isLoading).to.equal(true);
    expect(wrapper.find("p").at(1).text()).to.equal("Loading...");
  });
  axiosMock.restore();
});

describe("Search: various responses to debouncedSearch request", () => {
  beforeEach(() => {
    consoleSpy = spy(console, "log");
    wrapper = shallow( <Search /> );
    instance = wrapper.instance();
  });
  afterEach(() => { 
    axiosStub.restore();
    consoleSpy.restore(); 
  });

  it("request resolved with no data", done => {
    response = { data: "" };
    axiosStub = stub(axios, "get").resolves(response);
    instance.debouncedSearch("search input");
    setTimeout(() => {
      expect(wrapper.state().books[0]).to.equal(undefined);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().userInput).to.equal("");
      expect(wrapper.state().booksSearched).to.equal(true);
      expect(wrapper.find("p").at(1).text()).to.equal("SEARCH RESULTS");
      expect(consoleSpy.calledWith("Invalid response from server")).to.equal(true);
      done();
    }, 300);
  });

  it("request resolved with at least 1 book", done => {
    response = { data: { books: [{ title: "test book" }] }};
    axiosStub = stub(axios, "get").resolves(response);
    instance.debouncedSearch("search input");
    setTimeout(() => {
      expect(wrapper.state().books[0].title).to.equal("test book");
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().userInput).to.equal("");
      expect(wrapper.state().booksSearched).to.equal(true);
      expect(wrapper.find("p").at(1).text()).to.equal("SEARCH RESULTS");
      done();
    }, 300);
  });

  it("request resolved with 0 books", done => {
    response = { data: { books: [] }};
    axiosStub = stub(axios, "get").resolves(response);
    instance.debouncedSearch("search input");
    setTimeout(() => {
      expect(wrapper.state().books[0]).to.equal(undefined);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().userInput).to.equal("");
      expect(wrapper.state().booksSearched).to.equal(true);
      expect(wrapper.find("p").at(1).text()).to.equal("SEARCH RESULTS");
      done();
    }, 300);
  });

  it("request rejected", done => {
    axiosStub = stub(axios, "get").rejects({ message: "test" });
    instance.debouncedSearch("search input");
    setTimeout(() => {
      expect(wrapper.state().books[0]).to.equal(undefined);
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().userInput).to.equal("");
      expect(wrapper.state().booksSearched).to.equal(true);
      expect(wrapper.find("p").at(1).text()).to.equal("SEARCH RESULTS");
      expect(consoleSpy.calledWith("test")).to.equal(true);
      done();
    }, 300);
  });

});