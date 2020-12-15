import React from "react"
import "./searchbar.css"
import { useSelector } from "react-redux"
import AdvanceSearch from "../advanceSearch/advanceSearch"
// import Select from "../select/select"

function Searchbar() {
  const showcase = useSelector((state) => state.showcase)
  let sectionAnimation

  if (showcase.animation) {
    sectionAnimation = "sectionAnimation"
  }

  return (
    <div className={`search-section ${sectionAnimation}`}>
      <h1>
        Search For <span>Restaurants</span> near you
      </h1>

      <div className="search-bar">
        <AdvanceSearch
          homeSearch={showcase.showcase === 1 ? "homeSearch" : ""}
        />
      </div>
    </div>
  )
}

export default Searchbar
