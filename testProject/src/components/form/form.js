import React, { useState } from "react";
import style from "./style.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { InputMask } from "primereact/inputmask";
import { Button } from "react-bootstrap";
import { authActions, signOut } from "../../store/authorizationSlices/auth";
import { useDispatch } from "react-redux";

function maskFormat(text) {
  let arr = text.split("-");
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Number(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr.join("");
}

const Form = () => {
  const [value, setValue] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [showRobot, setShowRobot] = useState(false);
  const [emptyVerifyCode, setEmptyVerifyCode] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);
  const dispatch = useDispatch();
  const onChangeINK = (e) => {
    let number = e.target.value;
    if (maskFormat(number).length === 21) {
      setShowRobot(true);
      setValue(number);
      return;
    }
    setEmptyError(false);
    setValue(number);
  };
  const onChangeEmpty = () => {
    if (value === "" || maskFormat(value).length !== 21) {
      setEmptyError(true);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onChangeEmpty();
    if (!verifyCode && showRobot) {
      setEmptyVerifyCode(true);
      return;
    }
    // console.log(value);
    dispatch(authActions.setInk(value));
  };
  const onChangeReCapcha = (key) => {
    setVerifyCode(true);
    setEmptyVerifyCode(false);
    console.log(key);
  };
  const onClickExit = () => {
    dispatch(signOut());
  };
  return (
    <>
      <form class={style.form} onSubmit={onSubmit}>
        <label htmlFor="id">ИНК</label>
        <InputMask
          autoClear={false}
          unmask={false}
          mask="999-99-999-999-99-9999-9999"
          type="text"
          value={value}
          onChange={onChangeINK}
          className={`${style.formInput} ${emptyError && style.error}`}
        />
        {/* {error && <span className={style.errorSpan}>Неправильно ввели ИНК</span>} */}
        {emptyError && <span className={style.errorSpan}>Введите ИНК</span>}
        <div className={style.checkBoxBlock}>
          {showRobot && (
            <ReCAPTCHA
              sitekey="6LenFbMjAAAAAP-6w3JqmkEDlBD5ZEi7NQKJnhB9"
              onChange={onChangeReCapcha}
            />
          )}
          {showRobot && emptyVerifyCode && (
            <span className={style.errorSpan}>
              Необходимо заполнить «Verify Code»
            </span>
          )}
          <button className={style.submit}>Проверить</button>
        </div>
      </form>
      <Button onClick={onClickExit}>Exit</Button>
    </>
  );
};

export default Form;
