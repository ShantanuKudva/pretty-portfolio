/* First make sure that you have installed the package */

/* If you are using yarn */
// yarn add @calcom/embed-react

/* If you are using npm */
// npm install @calcom/embed-react

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function ShantanuCalCom() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: {
          branding: { brandColor: "#000000" },
        },
        hideEventTypeDetails: false,
        layout: "column_view",
      });
    })();
  }, []);
  return (
    <div className="h-[90vh]">
      <Cal
        calLink="shantanukudva/30min"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "column_view" }}
      />
    </div>
  );
}
