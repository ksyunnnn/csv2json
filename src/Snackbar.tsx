/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import { css } from "@emotion/css";

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

export const useSnackbar = () => {
  const [shown, setShown] = useState<boolean>(false);
  const [isRender, setIsRender] = useState<boolean>(false);

  const show = async () => {
    setIsRender(true);
    await sleep(100);
    setShown(true);

    await sleep(1000);

    setShown(false);
    await sleep(100);
    setIsRender(false);
  };

  const hide = async () => {
    setShown(false);
    await sleep(100);
    setIsRender(false);
  };

  return {
    shown,
    isRender,
    show,
    hide
  };
};

const Snackbar: React.FC<{ isRender: boolean; shown: boolean }> = (props) => {
  const { isRender, shown, children } = props;
  return (
    <>
      {isRender && (
        <div className={`${wrapper} ${shown ? "shown" : ""}`}>{children}</div>
      )}
    </>
  );
};

export default Snackbar;

const wrapper = css`
  /* 表示場所 */
  position: fixed;
  left: 4rem;
  bottom: 2.4rem;

  /* 表示したときのスタイル */
  padding: 0.4rem 1.6rem;
  font-weight: 700;
  background-color: #ebecf0;

  box-shadow: 8px 8px 16px #cad0ca, -8px -8px 16px #ffffff;
  border-radius: 8px;

  /* にゅっとでてくるスタイル */
  opacity: 0;
  transform: scale(0.75, 0.5625);
  transition: opacity 303ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 202ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &.shown {
    opacity: 1;
    transform: none;
  }
`;
