/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ShantanuCalCom() {
  const themes = useTheme();
  // console.log(themes);

  useEffect(() => {
    // console.log(themes);
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: themes.theme,
        styles: {
          branding: {
            brandColor: themes.theme === "light" ? "#000000" : "#ffffff",
          },
        },
        hideEventTypeDetails: false,
        layout: "row_view",
      });
    })();
  }, [themes]);
  return (
    <div id="calcom-root">
      <Cal
        calLink="dhaatriprasanna/15min"
        style={{
          width: "100%",
          height: "100%",
        }}
        config={{ layout: "row_view" }}
      />
    </div>
  );
}
