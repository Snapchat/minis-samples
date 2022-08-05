import type {
  Mini,
  Permissions,
  PermissionUpdateResponse,
} from "@snapchat/minis-sdk";
import {
  ClientEvents,
  PermissionScope,
  validateAgeThreshold,
} from "@snapchat/minis-sdk";
import React, { useEffect, useState } from "react";

export const PermissionsSample = ({
  permissions,
  mini,
}: {
  permissions: Permissions;
  mini: Mini;
}) => {
  const [result, setResult] = useState<string>("");
  const [event, setEvent] = useState<string>("");

  const options: { label: string; value: PermissionScope }[] = Object.keys(
    PermissionScope
  )
    .map((k) => {
      return { label: k, value: k as PermissionScope };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
  const [permissionScope, setPermissionScope] = useState<PermissionScope>(
    options[0].value
  );

  useEffect(() => {
    const permissionDidUpdateCb = (resp: PermissionUpdateResponse) => {
      setEvent(
        `received ${ClientEvents.PERMISSIONS_DID_UPDATE}: ${JSON.stringify(
          resp.permissions
        )}`
      );
    };
    mini.on(ClientEvents.PERMISSIONS_DID_UPDATE, permissionDidUpdateCb);

    return () => {
      mini.unbind(ClientEvents.PERMISSIONS_DID_UPDATE, permissionDidUpdateCb);
    };
  }, [mini]);

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
      </div>
      <div className="cell">
        <p className="textstyle-body">Event</p>
        <p className="textstyle-subheader">{event}</p>
      </div>
      <div className="cell">
        <div className="stack">
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              setEvent("");
              permissions
                .getPermissions(
                  Object.keys(PermissionScope) as PermissionScope[]
                )
                .then((res) =>
                  setResult(
                    `getPermissions: ${JSON.stringify(res.permissions)}`
                  )
                )
                .catch((err) =>
                  setResult(`getPermissions error: ${JSON.stringify(err)}`)
                );
            }}
          >
            getPermissions
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="permissionScope">Permission Scope</label>
            <select
              id="permissionScope"
              name="permissionScope"
              value={permissionScope}
              onChange={(e) =>
                setPermissionScope(e.target.value as PermissionScope)
              }
            >
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </form>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              setEvent("");
              permissions
                .requestPermission(permissionScope)
                .then((res) =>
                  setResult(
                    `requestPermissions: ${JSON.stringify(res.permissions)}`
                  )
                )
                .catch((err) =>
                  setResult(`requestPermissions error: ${JSON.stringify(err)}`)
                );
            }}
          >
            requestPermissions
          </button>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={async () => {
              setEvent("");
              validateAgeThreshold()
                .then((res) =>
                  setResult(`validateAgeThreshold: ${JSON.stringify(res)}`)
                )
                .catch((err) =>
                  setResult(
                    `validateAgeThreshold error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            validateAgeThreshold
          </button>
        </div>
      </div>
    </div>
  );
};
