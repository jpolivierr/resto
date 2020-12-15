import React from "react"
import * as actions from "../../reduxStuff/actions/actionType"
import { useDispatch } from "react-redux"

function Close() {
  const Style = {
    position: "absolute",
    fontSize: "2rem",
    right: "10px",
    top: "10px",
    transform: "rotate(45deg)",
    cursor: "pointer",
    color: "rgb(104, 104, 104)",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    padding: "0",
  }

  const dispatch = useDispatch()

  const setStates = () => {
    dispatch({
      type: actions.OUT_WITH_ANIMATION,
    })

    setTimeout(() => {
      dispatch({
        type: actions.MODALOFF,
      })
    }, 1000)
  }

  return (
    <div className="close" style={Style} onClick={() => setStates()}>
      +
    </div>
  )
}

export default Close
