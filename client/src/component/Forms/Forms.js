import React, { useState } from "react"
import Backmodal from "../Backmodal/Backmodal"
import Close from "../close/close"
import { useSelector, useDispatch } from "react-redux"
import * as actions from "../../reduxStuff/actions/actionType"
import axios from "axios"
import "./Forms.css"

function Forms(props) {
  const modal = useSelector((state) => state.modal)
  const userInfo = useSelector((state) => state.token.token)
  //------------------------------------------------------------------states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })
  const [update, setUpdate] = useState({
    name: userInfo.name,
    email: userInfo.email,
  })
  const [errorMsg, seterrorMsg] = useState({
    credentialError: "",
  })

  //------------------------------------------------------------ Get states from redux store

  // -------------------------------------------------------------assign dispatch
  const dispatch = useDispatch()
  let formout = ""
  if (modal.OUT_WITH_ANIMATION === true) {
    formout = "Formout"
  }

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

  // -------------------------------------------------------------register user function
  const registerUser = async (e) => {
    e.preventDefault()
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    const body = JSON.stringify(form)
    try {
      console.log("fired")
      const res = await axios.post("/register/", body, config)
      console.log(res)
      dispatch({
        type: actions.SET_TOKEN,
        payload: {
          token: res.data.token,
          name: res.data.name,
          email: res.data.email,
        },
      })
      dispatch({
        type: actions.SET_FAV_RES,
        payload: res.data.asset,
      })
      dispatch({ type: actions.LOGGED_IN })
      closeForm()
      setAnimation()
    } catch (error) {
      ErrorCheck(error, e)
    }
  }
  // ----------------------------------------------------------login user function
  const loginUser = async (e) => {
    e.preventDefault()
    console.log("fired")
    const config = {
      headers: { "Content-Type": "application/json" },
    }
    const body = JSON.stringify(login)
    try {
      const res = await axios.post("/login/", body, config)
      dispatch({
        type: actions.SET_TOKEN,
        payload: {
          token: res.data.token,
          name: res.data.name,
          email: res.data.email,
        },
      })
      dispatch({ type: actions.LOGGED_IN })
      if (res.data.asset.length === 0 || res.data.asset[0] === null) {
        closeForm()
      } else {
        console.log(JSON.parse(res.data.asset))
        dispatch({
          type: actions.SET_FAV_RES,
          payload: res.data.asset === [] ? [] : JSON.parse(res.data.asset),
        })
      }
      closeForm()
      setAnimation()
    } catch (error) {
      console.log(error)
      ErrorCheck(error, e)
      seterrorMsg({ ...errorMsg, credentialError: error.response.data.msg })
    }
  }

  //---------------------------------------------------------------- Edit Info
  const editInfo = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `${userInfo.token}`,
      },
    }
    const body = JSON.stringify(update)
    try {
      const res = await axios.post("/profile/update/", body, config)
      console.log(res)
      closeForm()
    } catch (error) {
      console.log(error.response.data)
    }
  }

  // -------------------------------------------------Checkst for ERRORS Didsplay Error
  const ErrorCheck = (Errors, event) => {
    console.log(Errors)
    if (Errors.response.data) {
      seterrorMsg({ ...errorMsg, credentialError: Errors.response.data.msg })
    }
    const msgErrors = Errors.response.data.errors
    const childnode = event.target.childNodes
    if (msgErrors) {
      childnode.forEach((child) => {
        // console.log(child.id)
        msgErrors.forEach((err) => {
          console.log(childnode.type)
          if (err.param === child.id) {
            const errmsg = msgErrors.find((err) => {
              return err.param === child.id
            })
            child.value = ""
            child.placeholder = errmsg.msg
            child.className = "form-input errorStyle"
          }
        })
      })
    }
  }

  //--------------------------------------------------------------- close form
  const closeForm = () => {
    dispatch({
      type: actions.OUT_WITH_ANIMATION,
    })
    setTimeout(() => {
      dispatch({
        type: actions.MODALOFF,
      })
    }, 1000)
  }

  switch (props.type) {
    case "signup": //-----------------------------------------------Signup Form
      return (
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <Backmodal />
          <form
            onSubmit={(e) => registerUser(e)}
            className={`Forms ${formout}`}
          >
            <Close />
            <div className="form-title-section">
              <h2>Signup</h2>
              <p>Please Signup to Continue</p>
            </div>
            <input
              id="name"
              type="name"
              className="form-input"
              placeholder="Your name here"
              onChange={(e) => {
                setForm({ ...form, name: e.target.value })
              }}
              value={form.name}
            />
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter email "
              onChange={(e) => {
                setForm({ ...form, email: e.target.value })
              }}
              value={form.email}
            />
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Create password "
              onChange={(e) => {
                setForm({ ...form, password: e.target.value })
              }}
              value={form.password}
            />
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Re-enter password"
              onChange={(e) => {
                setForm({ ...form, password2: e.target.value })
              }}
              value={form.password2}
            />
            <div className="button-container">
              <div className="error">{errorMsg.credentialError}</div>
              <p className="orloggin">
                Already have an account? Please{" "}
                <span
                  onClick={() => {
                    dispatch({
                      type: actions.MODALON,
                      payload: {
                        modaltype: "login",
                        OUT_WITH_ANIMATION: false,
                      },
                    })
                  }}
                >
                  Login
                </span>{" "}
              </p>
              <button>Signup</button> &nbsp;&nbsp;&nbsp;
            </div>
          </form>
        </div>
      )
    case "login": //------------------------------------------------------------Log In
      return (
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <Backmodal />
          <form
            onSubmit={(e) => loginUser(e)}
            className={`Forms login-form ${formout}`}
          >
            <Close />
            <div className="form-title-section">
              <h2>Login</h2>
              <p>Please Login to Continue</p>
            </div>

            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter email "
              onChange={(e) => {
                setLogin({ ...login, email: e.target.value })
              }}
              value={login.email}
            />
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Create password "
              onChange={(e) => {
                setLogin({ ...login, password: e.target.value })
              }}
              value={login.password}
            />
            <div className="button-container">
              <div className="error">{errorMsg.credentialError}</div>
              <p> Forget Password? </p>
              {/* Button */}
              <button
              // onClick={() => {
              //   loginUser()
              // }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )
    case "edit": //------------------------------------------------------------edit form
      return (
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <Backmodal />
          <form
            onSubmit={(e) => editInfo(e)}
            className={`Forms login-form ${formout}`}
          >
            <Close />
            <div className="form-title-section">
              <h2>Edit Info</h2>
            </div>
            <h3>Name:</h3>
            <input
              id="name"
              type="name"
              className="form-input"
              placeholder={userInfo.name}
              onChange={(e) => setUpdate({ ...update, name: e.target.value })}
              value={update.name}
            />
            <h3>Email:</h3>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder={userInfo.email}
              onChange={(e) => setUpdate({ ...update, email: e.target.value })}
              value={update.email}
            />
            <div className="button-container">
              <div className="error">{errorMsg.credentialError}</div>
              <button>Update Info</button>
            </div>
          </form>
        </div>
      )
    default:
      return null
  }
}

export default Forms
