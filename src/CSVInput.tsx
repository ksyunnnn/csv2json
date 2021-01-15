import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const useCSVInput = (
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
) => {
  const [files, setFiles] = useState<FileList | null>();

  const [raw, setRaw] = useState<any>(); // [TODO] 型を付けたい。ちょっと不安
  const [obj, setObj] = useState<any>();

  const rawChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setRaw(e.target.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const op = {true:"true",false:"false"};
  const initCheck = localStorage.getItem("useuid") === op.true;
  const [check, setCheck] = useState(initCheck);
  const checkChange = (e: any) => {
    const bool = e.target.checked
    localStorage.setItem('useuid', bool?op.true:op.false);
    setCheck(bool)
  };

  useEffect(() => {
    const file = files?.item(0);

    const reader = new FileReader();
    if (file) {
      reader.readAsText(file);
      reader.onload = () => {
        if (
          typeof reader.result === typeof ArrayBuffer ||
          reader.result === null
        )
          return;
        setRaw(reader.result);
      };
    }
  }, [files]);

  useEffect(() => {
    if (!raw) return;

    const rows: string[] = raw.split("\n");
    const header = rows[0].split(",");

    const newObj = rows
      .map((row, i) => {
        if (i === 0) return undefined;
        const split = row.split(",");

        const rt: any = {};
        if(check)rt.uid = uuidv4();
        header.forEach((v, i) => (rt[v.replace("\r","")] = split[i].replace("\r","")));

        return rt;
      })
      .filter((v) => v);

    

    setObj(newObj);
  }, [raw, check]);

  return {
    inputProps: {
      ...inputProps,
      onChange: handleChange
    },
    raw,
    obj,
    rawChange,
    check,
    checkChange
  };
};

const CSVInput = (props: {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) => {
  return <input {...props.inputProps} type="file" accept="text/csv" />;
};

export default CSVInput;
