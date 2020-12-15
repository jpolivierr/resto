import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import * as actions from "../../reduxStuff/actions/actionType"
// import Map from "../../component/map/map"
import axios from "axios"
import "./result.css"

function Result() {
  //------------------------------------------------------------assign dispatch
  const dispatch = useDispatch()
  //------------------------------------------------------------get state from store
  const loading = useSelector((state) => state.loading)
  const token = useSelector((state) => state.token.token.token)
  const fav_Res = useSelector((state) => state.fav_res.fav_res)
  const showFavorites = useSelector((state) => state.show_favorites)
  const log = useSelector((state) => state.log.loggedIn)
  const reduxResult = useSelector((state) => state.result.Results)
  // console.log(reduxResult)
  //--------------------------------------------------------------State variables
  // const storage = JSON.parse(localStorage.getItem("restaurant"))
  const [Results, setResults] = useState(
    reduxResult.length === 0 ? [] : reduxResult
  )
  console.log(Results)
  const restaurants = !showFavorites ? reduxResult : fav_Res
  const [selected, setSelected] = useState({
    newresult: reduxResult.length === 0 ? [] : reduxResult[0],
  })
  const [likedError, setLikedError] = useState({
    errorStyle: "",
    errorMsg: "",
  })

  //------------------------------------------------------------UseEffect
  useEffect(() => {
    if (reduxResult.length === 0) {
      dispatch({
        type: actions.LOADING,
        payload: true,
      })
      const globalResults = {}
      console.log("fetching from server......")
      const config = {
        headers: { "Content-Type": "application/json" },
      }
      axios
        .get("/getRestaurant", config)
        .then((res) => {
          globalResults.resultsShown = res.data.results_shown
          const restaurants = res.data.restaurants.map((res) => {
            return res.restaurant
          })
          globalResults.restaurants = restaurants
          globalResults.restaurants.forEach((res) => {
            res.address = res.location.address
          })
          localStorage.setItem("restaurant", JSON.stringify(globalResults))
          setResults(globalResults.restaurants)
          dispatch({
            type: actions.PUSH_RESULT,
            payload: globalResults.restaurants,
          })
          setSelected({
            ...selected,
            newresult: globalResults.restaurants[0],
          })
          dispatch({
            type: actions.LOADING,
            payload: false,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [reduxResult.length, dispatch, selected])

  const selectedRes = (e) => {
    //--------------------------------------------------------------------- show full result on click
    if (e.target.id !== "like" && e.target.className !== "like") {
      const singleRestaurant = reduxResult.find((res) => {
        return res.id === e.target.id
      })
      setSelected({ ...setSelected, newresult: singleRestaurant })
    }
    if (e.target.id === "like" && log) {
      // -------------------------------------------------remove favorite restaurant to favRes array
      if (e.target.className.includes("clicked") && e.target.id === "like") {
        dispatch({
          type: actions.REMOVE_FAV_RES,
          payload: e.target.dataset.resid,
          token: token,
        })
        const newstyle = e.target.className.replace("clicked", "")
        e.target.className = newstyle
        const newResult = reduxResult.find((res) => {
          return res.id === e.target.dataset.resid
        })
        console.log((newResult.liked = " "))
      } else if (
        //---------------------------------------------------------- add restaurant to favRes Array
        !e.target.className.includes("clicked") &&
        e.target.id === "like"
      ) {
        e.target.className += " clicked"
        console.log(reduxResult)
        const savedRes = reduxResult.find((res) => {
          return res.id === e.target.dataset.resid
        })
        dispatch({
          type: actions.ADD_FAV_RES_To_DATABASE,
          payload: savedRes,
          token: token,
        })
      }
    } else if (e.target.id === "like" && !log) {
      //----------------------------------------------------- set Error Message if user is not logged In
      dispatch({
        type: actions.MODALON,
        payload: { modaltype: "signup", OUT_WITH_ANIMATION: false },
      })
      setTimeout(() => {
        setLikedError({ ...likedError, errorStyle: "", errorMsg: "" })
      }, 2000)
    }
  }
  // --------------------------------------------------displayes all the info for the selected restaurant
  const resultToDisplay = selected.newresult
  switch (restaurants) {
    case undefined:
      return null
    default:
      return (
        <div
          className={`result ${
            loading.loading === true ? "result-is-loading" : ""
          } `}
        >
          {loading.loading === true ? (
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          ) : (
            ""
          )}
          <div className="snip-result">
            {restaurants.map((res) => {
              if (res === undefined || !res) {
                return null
              }
              fav_Res.forEach((favRes) => {
                if (favRes === undefined || favRes === null) {
                  return null
                }
                if (parseInt(favRes.id) === res.R.res_id) {
                  res.liked = " clicked"
                }
              })
              const resId = res.R.res_id
              const rating = res.user_rating.aggregate_rating
              return (
                <div
                  key={resId}
                  className="box"
                  id={resId}
                  onClick={(e) => selectedRes(e)}
                >
                  <div className="like">
                    <i
                      id="like"
                      data-resid={resId}
                      className={`far fa-heart ${res.liked}`}
                    ></i>
                  </div>
                  <div id={resId} className="img"></div>
                  <h2 className="pad" id={resId}>
                    {res.name}
                  </h2>
                  <div id={resId} className="basic-info pad">
                    Rating: &nbsp;<i className="fas fa-star"></i> {rating}{" "}
                    &nbsp;| &nbsp; Currency: &nbsp; {res.currency}
                    {res.currency}
                    {res.currency} &nbsp;| &nbsp; Cuisine: &nbsp; {res.cuisines}
                  </div>
                  <div id={resId} className="open-hours info pad">
                    <i id={resId} className="fas fa-clock"></i>

                    {res.timings}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="full-result">
            <div className="main-img">
              <div className="main-img-box">
                <h2>{resultToDisplay.name}</h2>
                <p>Cuisine: {resultToDisplay.cuisines}</p>
              </div>
            </div>
            <div className="link-bar">
              <div
                className="menu r-btn"
                onClick={() => window.open(resultToDisplay.menu_url)}
              >
                <i className="fas fa-book-reader"></i> Menu
              </div>
              <div className="call r-btn">
                <i className="fas fa-phone"></i> Call
              </div>
              <div
                className="website r-btn"
                onClick={() => window.open(resultToDisplay.url)}
              >
                <i className="fas fa-globe"></i> Website
              </div>
            </div>

            <div className="link-info">
              <h2>Info:</h2>
              <div className="address r-info">
                <span></span> {resultToDisplay.address}
              </div>
              <div className="Phone r-info">
                <span></span> {resultToDisplay.phone_numbers}
              </div>
              <div className="open-hours r-info">
                <span></span> {resultToDisplay.timings}
              </div>
            </div>
            <h2>Photos</h2>
            <div className="restaurant-photos">
              <div className="small-img small-img-1"></div>
              <div className="small-img small-img-2"></div>
              <div className="small-img small-img-3"></div>
              <div className="small-img small-img-4"></div>
              <div className="small-img small-img-5"></div>
              <div className="small-img small-img-6"></div>
            </div>
          </div>
          {/* 
          {loading.loading ? (
            <div className="searching">Searching...</div>
          ) : (
            <Map addressResult={reduxResult} />
          )} */}
        </div>
      )
  }
}

export default Result
