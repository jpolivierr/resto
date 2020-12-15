import React from "react"
import Results from "../../component/results/result"
import AdvanceSearch from "../../component/advanceSearch/advanceSearch"
import { useSelector } from "react-redux"
import "./resultLayout.css"

function ResultLayout() {
  const showcase = useSelector((state) => state.showcase)
  let resultAnimation
  if (showcase.animation) {
    resultAnimation = "resultanimation"
  }
  return (
    <div className={`resultLayout ${resultAnimation}`}>
      <AdvanceSearch />
      <Results />
    </div>
  )
}

export default ResultLayout
