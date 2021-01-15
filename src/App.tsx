/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import "./styles.css";
import CSVInput, { useCSVInput } from "./CSVInput";
import Snackbar, { useSnackbar } from "./Snackbar";
import { css } from "@emotion/css";

const copyClipbord = (text: string) => {
  const area: HTMLTextAreaElement | null = window.document.createElement(
    "textarea"
  );
  area.value = text;
  window.document.body.appendChild(area);
  area.select();

  window.document.execCommand("copy");
  area?.parentElement?.removeChild(area);
};

export default function App() {
  const { raw, inputProps, obj, rawChange } = useCSVInput();
  const snack = useSnackbar();

  const clickObjButton = () => {
    snack.show();
    copyClipbord(JSON.stringify(obj, null, "\t"));
  };

  return (
    <div className="App">
      <header className={header}><div><h1>CSV to JSON</h1></div></header>
      <div>
        <div className="input">
          <CSVInput inputProps={inputProps} />
        </div>
        <div className="wrapper">
          <textarea
            className="raw"
            value={raw}
            onChange={rawChange}
            placeholder="Or write some text/csv..."
            spellCheck="false"
          />
          <label htmlFor="copy-input" className="obj">
            {JSON.stringify(obj, null, "\t")}
          </label>
          <input id="copy-input" hidden onClick={raw && clickObjButton} />
        </div>
      </div>
      <Snackbar {...snack}>Object Copied</Snackbar>
      <div className={author}>
        <a href="https://twitter.com/ksyunnnn" target="_blank" rel="noreferrer">
          @ksyunnnn
        </a>
      </div>
    </div>
  );
}

const header = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  > div {
    max-width: 1280px;
    margin: auto;
    padding: 1.6rem;
  }
  h1 {
    font-size: 1.6rem;
  }
`;

const author = css`
  position: absolute;
  right: 2.4rem;
  bottom: 0.8rem;
  font-size: 0.8rem;
  font-weight: bold;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

/* Readme */
// 以下をやってくれるカスタムフックスです。
// 1. アップロードしたCSVをテキストとして読み込み(raw)
// 2. CSVの1行目をプロパティ名として利用
// 3. プロパティ名を利用したオブジェクトを返却(obj)
