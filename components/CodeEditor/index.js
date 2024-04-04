import React, { useState } from "react";
// import CldImage from "./CldImage";
import Editor from "@monaco-editor/react";
import { LiveProvider, LivePreview } from "react-live";
import styles from "./codeEditor.module.scss";

const defaultCode = `
SELECT
    service,
    SUM(cost) AS total_cost
FROM
    cloud_costs
WHERE
    account_type = 'production (#24542)'
GROUP BY
    service
ORDER BY
    total_cost DESC;
        `;

const Playground = ({ code: propCode }) => {
  const [code, setCode] = useState(defaultCode);

  function handleOnChange(value) {
    console.log("value", value);
    setCode(value || "");
  }

  return (
    <div className={styles.container}>
      <div className={styles.insideContainer}>
        <Editor
          className="h-screen"
          defaultLanguage="sql"
          defaultValue={code.trim()}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: {
              enabled: false,
            },
            contextmenu: false,
          }}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default Playground;
