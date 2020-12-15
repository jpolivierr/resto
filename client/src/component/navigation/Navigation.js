import React from "react"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../reduxStuff/actions/actionType"
import axios from "axios"
import "./Navigation.css"

function Navigation() {
  const user = useSelector((state) => state.token.token)
  const loggedIn = useSelector((state) => state.log.loggedIn)
  const token = useSelector((state) => state.token.token.token)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch({
      type: actions.LOGGED_OUT,
    })
    dispatch({
      type: actions.REMOVE_TOKEN,
    })
    dispatch({
      type: actions.RESET_FAV_RES,
    })
    window.location.reload()
  }

  // Delete Account
  const deleteAcount = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    }
    try {
      const res = await axios.post("/profile/delete/", null, config)
      console.log(res.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  switch (loggedIn) {
    case false:
      return (
        <div className="Navigation">
          <div
            className="logo"
            onClick={() => {
              dispatch({
                type: actions.SHOWCASE_OPTION,
                payload: { showcase: 1, animation: false },
              })
            }}
          >
            {" "}
            <span>Food</span>App
          </div>
          <div className="registration">
            <div
              className="sign-up user"
              onClick={() =>
                dispatch({
                  type: actions.MODALON,
                  payload: { modaltype: "signup", OUT_WITH_ANIMATION: false },
                })
              }
            >
              Sign Up
            </div>
            <div
              className="log-in user"
              onClick={() =>
                dispatch({
                  type: actions.MODALON,
                  payload: { modaltype: "login", OUT_WITH_ANIMATION: false },
                })
              }
            >
              Log In
            </div>
          </div>
        </div>
      ) // Navigation when user is logged In
    case true:
      return (
        <div className="Navigation">
          <div
            className="logo"
            onClick={() => {
              dispatch({
                type: actions.SHOWCASE_OPTION,
                payload: { showcase: 1, animation: false },
              })
            }}
          >
            {" "}
            <span>Food</span>App
          </div>
          <div className="registration">
            <div className="sign-up user logedIn" onClick={() => {}}>
              <i className="far fa-user"></i> Hi,&nbsp; {user.name}
              <div className="account-drop-down">
                <div
                  className="edit-info account-options"
                  onClick={() =>
                    dispatch({
                      type: actions.MODALON,
                      payload: {
                        modaltype: "edit",
                        OUT_WITH_ANIMATION: false,
                      },
                    })
                  }
                >
                  Edit Info
                </div>
                <div
                  className="delete-option account-options"
                  onClick={() => {
                    deleteAcount()
                  }}
                >
                  Delete Account
                </div>
              </div>
            </div>
            <div className="log-in user" onClick={() => logout()}>
              Log out
            </div>
          </div>
        </div>
      )

    default:
      return (
        <div className="Navigation">
          <div
            className="logo"
            onClick={() => {
              dispatch({
                type: actions.SHOWCASE_OPTION,
                payload: { showcase: 1, animation: false },
              })
            }}
          >
            {" "}
            <span>Food</span>App
          </div>
          <div className="registration">
            <div
              className="sign-up user"
              onClick={() =>
                dispatch({
                  type: actions.MODALON,
                  payload: { modaltype: "signup", OUT_WITH_ANIMATION: false },
                })
              }
            >
              Sign Up
            </div>
            <div
              className="log-in user"
              onClick={() =>
                dispatch({
                  type: actions.MODALON,
                  payload: { modaltype: "login", OUT_WITH_ANIMATION: false },
                })
              }
            >
              Log In
            </div>
          </div>
        </div>
      )
  }
}

export default Navigation
