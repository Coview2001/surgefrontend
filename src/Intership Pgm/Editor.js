import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';

const Editor = ({ language, value, onChange }) => {
  return (
    <CodeMirror
      options={{
        lineNumbers: true,
        mode: language,
      }}
      value={value}
      onBeforeChange={(editor, data, value) => {
        onChange(value);
      }}
    />
  );
};

export default Editor;
