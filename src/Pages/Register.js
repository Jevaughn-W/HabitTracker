import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormGroup,
  Button,
  Link,
  Box,
  CircularProgress,
  Tooltip,
  Typography
} from "@mui/material";
import {
  faCheck,
  faTimes,
  faCoffee,
  faMusic,
  faBicycle,
  faBolt,
  faHeartbeat,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Gym from "../Images/Gym.jpg";

const iconList = [
  { name: "faCoffee", icon: faCoffee },
  { name: "faMusic", icon: faMusic },
  { name: "faBicycle", icon: faBicycle },
  { name: "faBolt", icon: faBolt },
  { name: "faHeartbeat", icon: faHeartbeat },
  { name: "faFutbol", icon: faFutbol },
];

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const REGISTER_URL = "/register";

export default function Register(props) {
  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const navLogin = () => {
    navigate("/login");
  };
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [EmailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isRedirecting, setIsRedirecting] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(null);

  toast.configure();
  const handleSuccess = useCallback(() => {
    toast.success("Successful Registration!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: true,
      pauseOnFocusLoss: false,
    });
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const avatar = selectedIcon?.iconName ?? "faCoffee";
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ avatar, firstName, lastName, user, email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      handleSuccess();
      setTimeout(() => {
        setIsRedirecting(false);
        navigate(from, { replace: true });
      }, 1000);
      setFirstName("");
      setLastName("");
      setEmail("");
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "70vh",
  };

  const avatarStyle = { backgroundColor: "#007bff" };

  const textStyle = { margin: "8px 0px", width: "95%" };

  const buttonStyles = {
    backgroundColor: "#ccc",
    borderRadius: "50%",
    height: "50px",
    width:"50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    cursor: "pointer",
    margin: "10px",
    transition: "background-color 0.3s ease-in-out",
  };

  const selectedButtonStyles = {
    ...buttonStyles,
    backgroundColor: "#007bff",
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
  };

  const incorrectUsernameTip = (
    <Typography>
      4 to 24 characters.
      <br />
      Must begin with a letter.
      <br />
      Letters, numbers, underscores, hyphens allowed.
    </Typography>
  );

  const incorrectEmailTip = (
    <Typography>
      Must be a valid email (Follow this format: user@email.com).
    </Typography>
  );

  const incorrectPasswordTip = (
    <Typography>
      8 to 24 characters.
      <br />
      Must include uppercase and lowercase letters, a number and a special
      character.
      <br />
      Allowed special characters: <span aria-label="exclamation mark">
        !
      </span>{" "}
      <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{" "}
      <span aria-label="dollar sign">$</span>{" "}
      <span aria-label="percent">%</span>
    </Typography>
  );

  const incorrectPasswordMatch = (
    <Typography>Must match the first password input field.</Typography>
  );

  return (
    <>
      {success ? (
        <Box
          mt={50}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <CircularProgress size={120} />
        </Box>
      ) : (
        <Grid>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              margin: "70px auto",
              justifyContent: "center",
              "& > :not(style)": {
                m: 0,
              },
            }}
          >
            <Paper
              elevation={10}
              style={paperStyle}
              sx={{
                backgroundImage: `url(${Gym})`,
                backgroundSize: "cover",
                position: "relative",
              }}
            ></Paper>
            <Paper elevation={10} style={paperStyle}>
              <Grid align="center" sx={{minWidth:"500px"}}>
                <Avatar style={avatarStyle}>
                  <LockOutlinedIcon />
                </Avatar>
                <h2>Register Here</h2>
                <FormGroup onSubmit={handleSubmit}>
                  <div style={containerStyles}>
                    {iconList.map((icon) => (
                      <button
                        key={icon.name}
                        onClick={() => setSelectedIcon(icon.icon)}
                        style={
                          selectedIcon === icon.icon
                            ? selectedButtonStyles
                            : buttonStyles
                        }
                      >
                        <FontAwesomeIcon
                          icon={icon.icon}
                          style={{
                            fontSize: "24px",
                            color: selectedIcon === icon.icon ? "#fff" : "#333",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    placeholder="John"
                    style={textStyle}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    placeholder="Doe"
                    style={textStyle}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="username"
                      label="Username"
                      variant="outlined"
                      placeholder="Username"
                      style={textStyle}
                      ref={userRef}
                      onChange={(e) => setUser(e.target.value)}
                      required
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                    />

                    <span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validName ? "valid" : "hide"}
                      />
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validName || !user ? "hide" : "invalid"}
                      />
                    </span>
                    <Tooltip
                      title={incorrectUsernameTip}
                      open={userFocus && user && !validName}
                      placement="right"
                      arrow
                    >
                      <span>
                        <FontAwesomeIcon />
                      </span>
                    </Tooltip>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      placeholder="user@email.com"
                      style={textStyle}
                      ref={emailRef}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="uidnote"
                    />
                    <span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validEmail ? "valid" : "hide"}
                      />
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validEmail || !user ? "hide" : "invalid"}
                      />
                    </span>
                    <Tooltip
                      title={incorrectEmailTip}
                      open={EmailFocus && email && !validEmail}
                      placement="right"
                      arrow
                    >
                      <span>
                        <FontAwesomeIcon />
                      </span>
                    </Tooltip>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      //Must be 6 characters minimum
                      placeholder="xxxxxx"
                      style={textStyle}
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="uidnote"
                    />
                    <span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validPwd ? "valid" : "hide"}
                      />
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validPwd || !pwd ? "hide" : "invalid"}
                      />
                    </span>

                    <Tooltip
                      title={incorrectPasswordTip}
                      open={pwdFocus && !validPwd}
                      placement="right"
                      arrow
                    >
                      <span>
                        <FontAwesomeIcon />
                      </span>
                    </Tooltip>
                  </div>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="confirm_pwd"
                      label="Confirm Password"
                      variant="outlined"
                      type="password"
                      //Must be 6 characters minimum
                      placeholder="xxxxxx"
                      style={textStyle}
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />

                    <span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validMatch && matchPwd ? "valid" : "hide"}
                      />
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validMatch || !matchPwd ? "hide" : "invalid"}
                      />
                    </span>
                    <Tooltip
                      title={incorrectPasswordMatch}
                      open={matchFocus && !validMatch}
                      placement="right"
                      arrow
                    >
                      <span>
                        <FontAwesomeIcon />
                      </span>
                    </Tooltip>
                  </div>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disabled={
                      !validName || !validPwd || !validMatch ? true : false
                    }
                    sx={{width:"95%"}}
                  >
                    Register
                  </Button>
                  <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                </FormGroup>
                <p>
                  Already registered?
                  <br />
                  <span className="line">
                    <Link onClick={navLogin}>Sign In</Link>
                  </span>
                </p>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      )}
    </>
  );
}
