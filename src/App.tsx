/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import './styles.css';
import { css } from '@emotion/css';
import CSVInput, { useCSVInput } from './CSVInput';
import Snackbar, { useSnackbar } from './Snackbar';

const copyClipbord = (text: string) => {
  const area: HTMLTextAreaElement | null = window.document.createElement(
    'textarea',
  );
  area.value = text;
  window.document.body.appendChild(area);
  area.select();

  window.document.execCommand('copy');
  area?.parentElement?.removeChild(area);
};

export default function App() {
  const {
    raw, inputProps, obj, rawChange, check, checkChange,
  } = useCSVInput();
  const snack = useSnackbar();

  const clickObjButton = () => {
    if (!obj) return;
    snack.show();
    copyClipbord(JSON.stringify(obj, null, '\t'));
  };

  return (
    <div className="App">
      <header className={header}><div><h1>CSV to JSON</h1></div></header>
      <div>
        <div className="input">
          <CSVInput inputProps={inputProps} />
          <label className={checkLabel}>
            <input type="checkbox" value="useuid" checked={check} onChange={checkChange} />
            Use uid
          </label>
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
            {JSON.stringify(obj, null, '\t')}
          </label>
          <input id="copy-input" hidden onClick={clickObjButton} />
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
  position: fixed;
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

const checkLabel = css`
  text-shadow: 1px 1px 0 #fff;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 4px 8px;
`;

/* Readme */
// 以下をやってくれるカスタムフックスです。
// 1. アップロードしたCSVをテキストとして読み込み(raw)
// 2. CSVの1行目をプロパティ名として利用
// 3. プロパティ名を利用したオブジェクトを返却(obj)
