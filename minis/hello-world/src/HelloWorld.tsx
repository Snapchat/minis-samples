import { useState, useEffect } from "react";
import "./HelloWorld.css";
import sc from "@snapchat/snapcanvas-sdk";
import type { App } from "@snapchat/snapcanvas-sdk";
import testStickerDataUri from "./testSticker";

function HelloWorld({ app }: { app: App }) {
  const [bitmoji, setBitmoji] = useState<string>();

  useEffect(() => {
    const avatarId = app.user!.avatarId;

    sc.fetchAvatar2D(avatarId, "20004321", 100)
      .then((response) => {
        if (response.url) {
          setBitmoji(response.url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const [info, setInfo] = useState("");

  const shareAppToChat = () => {
    const shareCard = {
      actionCta: "Open the mini",
      description: "Sample share to chat",
      headline: "Hello World",
      primaryImageUrl: "/assets/hello.jpg",
    };

    sc.shareAppToChat(
      shareCard,
      { actionCta: "Open the mini" },
      {
        path: "/fake/path",
        payload: { foo: "bar" },
      }
    )
      .then((_) => setInfo("Share app to chat called"))
      .catch((error) => {
        console.error(error);
      });
  };

  const shareMediaToChat = () => {
    sc.shareMediaToSnapchat(
      [
        {
          mediaId: "test-sticker-id",
          width: 200,
          height: 200,
          centerX: 0.5,
          centerY: 0.6,
          rotation: 0,
          dataUrl: testStickerDataUri,
        },
      ],
      {
        path: "/fake/path",
        payload: { foo: "bar" },
      }
    )
      .then((_) => setInfo(`Share media to chat called`))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "25%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>Hello World</h1>
      {bitmoji && <img id="avatar-image" alt="avatar" src={bitmoji} />}
      <p style={{ textAlign: "center" }}>{app.user?.name}</p>
      <button className="share-btn camera">
        <img
          src="./assets/cameraIcon.svg"
          alt="Share to Camera"
          onClick={shareMediaToChat}
        />
      </button>
      &nbsp;&nbsp;
      <button className="share-btn chat">
        <img
          src="./assets/chatIcon.svg"
          alt="Share to Chat"
          onClick={shareAppToChat}
        />
      </button>
      <br />
      {info && <p style={{ textAlign: "center", fontSize: "80%" }}>{info}</p>}
    </div>
  );
}

export default HelloWorld;
