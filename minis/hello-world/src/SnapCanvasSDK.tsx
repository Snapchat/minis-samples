import { ReactNode, useEffect, useState } from "react";
import sc from "@snapchat/snapcanvas-sdk";
import type { App, DevelopmentOptions } from "@snapchat/snapcanvas-sdk";

function SnapCanvasSDK(props: {
  init: DevelopmentOptions;
  loading?: ReactNode;
  children: (app: App) => ReactNode;
}) {
  const [app, setApp] = useState<App>();

  useEffect(() => {
    const initSDK = async () => {
      await sc.setLoadingProgress(1);
      await sc.loadingComplete();
      await sc.initialize(props.init);
      await sc.fetchAuthToken();
      setApp(sc.app);
    };

    initSDK().catch(console.error);
  }, [props.init]);

  return <>{app ? props.children(app) : props.loading}</>;
}

export default SnapCanvasSDK;
