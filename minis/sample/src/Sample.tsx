import type { App } from "@snapchat/snapcanvas-sdk";

function Sample({ app }: { app: App }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "20%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h1>Mini Initialized</h1>
      <Info app={app} />
    </div>
  );
}

function Info({ app }: { app: App }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>AppId</td>
          <td>{app?.id}</td>
        </tr>
        <tr>
          <td>SessionId</td>
          <td>{app?.sessionId}</td>
        </tr>
        <tr>
          <td>Conversation Size</td>
          <td>{app?.conversationSize}</td>
        </tr>
        <tr>
          <td>Context</td>
          <td>{app?.context}</td>
        </tr>
        <tr>
          <td>Env</td>
          <td>{app?.env}</td>
        </tr>
        <tr>
          <td>User Id</td>
          <td>{app?.user?.id}</td>
        </tr>
        <tr>
          <td>User Name</td>
          <td>{app?.user?.name}</td>
        </tr>
        <tr>
          <td>User Avatar</td>
          <td>{app?.user?.avatarId}</td>
        </tr>
        <tr>
          <td>AuthToken</td>
          <td>{app?.authToken?.substring(0, 50)}...</td>
        </tr>
        <tr>
          <td>AuthTokenExpiration</td>
          <td>{app?.authTokenExpiration}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Sample;
