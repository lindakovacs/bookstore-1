import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { stub, mock, spy } from 'sinon';
import ChangeStatusMenu from './ChangeStatusMenu';

let wrapper, instance, statusSpy, consoleSpy, getMyBooksSpy, getBookDetailsSpy, response, axiosStub, axiosMock;

describe("ChangeStatusMenu", () => {
  beforeEach(() => {
    consoleSpy = spy(console, "log");
    getMyBooksSpy = spy();
    getBookDetailsSpy = spy();
    wrapper = shallow(
      <ChangeStatusMenu
        listType="my-books"
        shelf="wantToRead"
        id="0ETIjwEACAAJ"
        getMyBooks={getMyBooksSpy}
        getBookDetails={getBookDetailsSpy}  />
    );
    instance = wrapper.instance();
  });
  afterEach(() => { 
    consoleSpy.restore();
  });
  it("displays 'Remove' in menu window when the reading status doesn't equal 'none'", () => {
    expect(wrapper.find("select").props().value).to.equal("wantToRead");
    expect(wrapper.find("option").at(0).text()).to.equal("Remove");
  });
  it("displays 'Not Selected' in menu window when the reading status equals 'none'", () => {
    wrapper.setProps({listType: "book-details", shelf: "none"})
    expect(wrapper.find("select").props().value).to.equal("none");
    expect(wrapper.find("option").at(0).text()).to.equal("Not Selected");
  });
  it("calls changeStatus when select option is changed", () => {
    instance = wrapper.instance();
    statusSpy = spy(instance, "changeStatus");
    const select = wrapper.find("select");
    const event = { target: { value: "read" }};
    select.simulate("change", event);
    expect(statusSpy.calledOnceWith("read", "0ETIjwEACAAJ")).to.equal(true);
  });
  it("sets state after changeStatus request resolved with no data", done => {
    response = {};
    axiosStub = stub(axios, "get").resolves(response);
    instance.changeStatus("read", "0ETIjwEACAAJ");
    setTimeout(() => {
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().isError).to.equal(true);
      expect(consoleSpy.calledWith("Invalid response from server.")).to.equal(true);
      done();
    });
    axiosStub.restore();
  });

  it("sets state after changeStatus request resolved with a valid response: listType equals my-books", done => {
    response = { data: "test" };
    axiosStub = stub(axios, "get").resolves(response);
    instance.changeStatus("read", "0ETIjwEACAAJ");
    setTimeout(() => {
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().isError).to.equal(false);
      expect(getMyBooksSpy.calledOnce).to.equal(true);
      done();
    });
    axiosStub.restore();
  });

  it("sets state after changeStatus request resolved with a valid response: listType equals book-details", done => {
    wrapper.setProps({listType: "book-details"});
    response = { data: "test" };
    axiosStub = stub(axios, "get").resolves(response);
    instance.changeStatus("read", "0ETIjwEACAAJ");
    setTimeout(() => {
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().isError).to.equal(false);
      expect(getBookDetailsSpy.calledOnce).to.equal(true);
      done();
    });
    axiosStub.restore();
  });

  it("sets state after changeStatus request rejected", done => {
    axiosStub = stub(axios, "get").rejects({ message: "test" });
    instance.changeStatus("read", "0ETIjwEACAAJ");
    setTimeout(() => {
      expect(wrapper.state().isLoading).to.equal(false);
      expect(wrapper.state().isError).to.equal(true);
      expect(consoleSpy.calledWith("test")).to.equal(true);
      done();
    });
    axiosStub.restore();
  });

});

describe("ChangeStatusMenu: service", () => {
  axiosMock = mock(axios);
  getMyBooksSpy = spy();
  wrapper = shallow(
    <ChangeStatusMenu
      listType="my-books"
      getMyBooks={getMyBooksSpy}
      getBookDetails={getBookDetailsSpy} />
  );
  instance = wrapper.instance();
  it("calls axios.get with correct url", () => {
    response = { data: "test" };
    const expectedUrl = "http://localhost:7000/bookshelf/update/0ETIjwEACAAJ/wantToRead";
    axiosMock
      .expects('get')
      .withArgs(expectedUrl)
      .once()
      .returns(Promise.resolve(response));
    instance.changeStatus("wantToRead", "0ETIjwEACAAJ");
    axiosMock.verify();
  });
  axiosMock.restore();
});