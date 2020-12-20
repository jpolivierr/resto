import React, { useState } from "react"
import Select from "../select/select"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../reduxStuff/actions/actionType"
import axios from "axios"
import "./advanceSearch.css"

function AdvanceSearch(props) {
  // --------------------------------------------------sTATES
  const [filter, setFilter] = useState({
    city: "",
    cuisine: { name: "Cuisine", id: null },
    rating: "Rating",
    sort: "Sort-by",
  })
  // const initialState = {
  //   city: "",
  //   cuisine: { name: "Cuisine", id: null },
  //   rating: "Rating",
  //   sort: "Sort-by",
  // }
  const [errMsg, setErrMsg] = useState({
    errmsg: "",
    cityerror: "",
    resultErrorStyle: '',
    resultErrorMsg: ''
  })
  //get state value from store
  // const storage = JSON.parse(localStorage.getItem("restaurant"))
  const showcase = useSelector((state) => state.showcase)
  const loading = useSelector((state) => state.loading.loading)
  // const result = storage === null ? "" : storage.resultsShown
  const favorites = useSelector((state) => state.show_favorites)
  const log = useSelector((state) => state.log.loggedIn)
  // const resResult = useSelector((state)=> state.result.Results.restaurants)
  // console.log(result)
  //assign Dispatch
  const dispatch = useDispatch()
  //update Filter
  function updateFilter(Parent, value, cuisineId) {
    switch (Parent) {
      case "cuisine":
        setFilter({ ...filter, cuisine: { name: value, id: cuisineId } })
        break
      case "rating":
        setFilter({ ...filter, rating: value })
        break
      case "sort":
        setFilter({ ...filter, sort: value })
        break
      default:
        return null
    }
  }
  // changes the showcase with animation
  const setAnimation = () => {
    dispatch({
      type: actions.SHOWCASE_OPTION,
      payload: { showcase: 1, animation: true },
    })
    setTimeout(() => {
      dispatch({
        type: actions.SHOWCASE_OPTION,
        payload: { showcase: 2, animation: true },
      })
    }, 230)
  }
  //update City
  const updateCity = (e) => {
    setFilter({ ...filter, city: e.target.value })
  }
  //Favorites Button
  const favButton = () => {
    if (log === false) {
      dispatch({
        type: actions.HIDE_FAVORITES,
      })
      dispatch({
        type: actions.MODALON,
        payload: { modaltype: "signup", OUT_WITH_ANIMATION: false },
      })
    } else {
      dispatch({
        type: actions.SHOW_FAVORITES,
      })
    }
  }
  const setResultErrorMsg = () =>{
    setErrMsg({...errMsg, resultErrorStyle: 'error-msg',
    resultErrorMsg: 'No result found for this search criteria. Please try a different search.'
  })
  }
  const clearResultErrorMsg = () =>{
    setErrMsg({...errMsg, resultErrorStyle: '',
    resultErrorMsg: ''
  })}
  //Fetches all restaurants
  const getRestaurants = async () => {
    setErrMsg({ ...errMsg, cityerror: "" })
    clearResultErrorMsg()
    if (filter.city === "") {
      return setErrMsg({ ...errMsg, cityerror: "city-error" })
    }
    // const globalResults = {}
    dispatch({
      type: actions.LOADING,
      payload: true,
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
        "user-key": "2ee72a448846f7fcc7d50a9a84cd7535",
      },
    }
    const body = {
      city: filter.city,
      cuisine: filter.cuisine.id,
    }
    try {
      const res = await axios.post("/getRestaurant", body, config)
      const globalResults = {}
      globalResults.resultsShown = res.data.results_shown
      const restaurants = res.data.restaurants.map((res) => {
        return res.restaurant
      })
      globalResults.restaurants = restaurants
      globalResults.restaurants.forEach((res) => {
        res.address = res.location.address
      })
      if(globalResults.resultsShown === 0){
        setResultErrorMsg()
        setTimeout(()=>{clearResultErrorMsg()},5000)
        dispatch({
          type: actions.LOADING,
          payload: false,
        })
        return null
      }
      localStorage.setItem("restaurant", JSON.stringify(globalResults))
      dispatch({
        type: actions.PUSH_RESULT,
        payload: globalResults.restaurants,
      })

      dispatch({
        type: actions.LOADING,
        payload: false,
      })
      const animation = showcase.showcase === 1 ? setAnimation() : null
      console.log(animation)
    } catch (error) {
      console.log(error)
    }
  }
  // let r = result === undefined ? "" : result
  return (
    <div className={`advance-search ${props.homeSearch}`}>
      <div style={{position: 'absolute'}} className={errMsg.resultErrorStyle}> {errMsg.resultErrorMsg}.</div>
      {/* <h2>Result : {r}</h2> */}
      <div //--------------------------------------------------CITY
        id="city"
        className={`select active select-from-advance city-home-style ${errMsg.cityerror}`}
      >
        <input
          onChange={(e) => updateCity(e)}
          type="text"
          placeholder="Type your city"
          value={filter.city}
        />
      </div>
      {/* //--------------------------------------------------CUISINE */}
      <Select
        filterType="cuisine"
        type="select-from-advance"
        selectedName="Category"
        updateFilter={updateFilter}
        cuisineValue={filter.cuisine.name}
        homeStyle={showcase.showcase === 1 ? "cuisine-home-style" : ""}
      />

      {/*---------------------------------------------------- Search button */}
      <button
        onClick={() => {
          getRestaurants()
        }}
        className={
          showcase.showcase === 1
            ? `button-home-style ${loading === true ? "button-loading" : ""} `
            : ""
        }
      >
        {loading === true ? (
          <div className="lds-rippless">
            <div></div>
            <div></div>
          </div>
        ) : (
          ""
        )}
        <i className="fas fa-search"></i>
      </button>
      {/*------------------------------------------ clear button */}
      {/* //-------------------------------------------------- SHOW FAVORITES*/}
      <div
        onClick={() => favButton()}
        id="sort"
        className={`select active fav_style ${
          favorites === true ? "fav_on" : ""
        } `}
      >
        Favorites
        <div className={`fav_msg ${errMsg.errMsg}`}>
          You must have an account to view favorite restaurants. Please login or
          create an account
        </div>
      </div>
    </div>
  )
}
export default AdvanceSearch
