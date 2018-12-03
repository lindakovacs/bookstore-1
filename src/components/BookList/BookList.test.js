import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import BookList from "./BookList";
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu";

describe("BookList component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BookList
        books={[
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
        ]}
        list-type="my-books"
      />
    );
  });

  // Accurately renders BookList component
  it.only("renders a media object with thumbnail and book details", () => {
    console.log(wrapper.props());
    expect(wrapper.find(".panel")).to.have.lengthOf(1);
    expect(wrapper.find("img").prop("src")).to.equal("worker-thumb.jpg");
    expect(wrapper.find(".media-body")).to.have.lengthOf(1);
    expect(wrapper.find(ChangeStatusMenu)).to.have.lengthOf(1);
  });
});
