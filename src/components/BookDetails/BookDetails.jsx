import React from "react";
import "./BookDetails.css";
import ChangeStatusMenu from "../ChangeStatusMenu/ChangeStatusMenu"
import testImage from "../../images/worker-thumb.jpg"

function BookDetails(props) {
  return (
    <div className="book-details">
    <section><p>BOOK DETAILS</p></section>
    <div className="panel">
      <div className="media">
        <div className="thumb-group">
          <img src={testImage} alt="book thumbnail"/>
          <p><i>Currently Reading</i></p>
        </div>
        <div className="media-body ml-4">
          <h3 className="mt-0 search-title">Last Call of the Wind</h3>
          <h5>A twisty, fun PI Mystery</h5>
          <p><i>by Libby Kurtch</i></p>
          <p>Unfazed after finding a body behind the Dumpster of her bar, Janet Black is ready for business as usual until police start eyeing her boyfriend as the possible killer. When the victim's teetotaling daughter decides to take up residence in the corner booth until the murderer is caught, Janet is forced to get involved. She'd rather be dealing with unruly customers, but instead Janet reluctantly mounts her own investigation to find out if the dead man's complicated past could have anything to do with his death, whether an unreliable employee's absence is mere coincidence, and why police are purposefully feeding her bad information about the case. Janet's sharp tongue and coarse personality make her the guilty pleasure heroine you've always wanted. </p>
          <div className="details">
            <p>2018</p>
            <p>375 pages</p>
            <p>English</p>
          </div>
          <hr/>
          <ChangeStatusMenu />
        </div>
      </div>
    </div>
  </div>
  );
}

export default BookDetails;