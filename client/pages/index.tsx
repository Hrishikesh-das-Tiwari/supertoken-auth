import React, { useEffect, useState } from "react";
import Head from "next/head";
import Session from "supertokens-auth-react/recipe/session";
import styles from "../styles/ProtectedHome.module.css";
import SessionReact from "supertokens-auth-react/recipe/session";
import SuperTokensReact from "supertokens-auth-react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import {
  BlogsIcon,
  CelebrateIcon,
  GuideIcon,
  SeparatorLine,
  SignOutIcon,
} from "../assets/images";
import Image from "next/image";
import axios from "axios";

interface ILink {
  name: string;
  onClick: () => void;
  icon: string;
}

function ProtectedPage() {
  const [workspace, setWorkspace] = useState([]);
  const session = useSessionContext();

  async function logoutClicked() {
    await SessionReact.signOut();
    SuperTokensReact.redirectToAuth();
  }

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get("http://localhost:3001/workspace");
        const { myWorkspace } = await res.data;
        setWorkspace(myWorkspace);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    loadData();
  }, []);

  async function handleGetWorkspace() {
    try {
      const res = await axios.get("http://localhost:3001/workspace");
      const json = await res.data;
      alert(JSON.stringify(json));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function handleCreateNewWorkspace() {
    try {
      const res = await axios.post("http://localhost:3001/workspace");
      const { myWorkspace } = res.data;
      setWorkspace(myWorkspace);
    } catch (error) {
      console.log(error);
      alert(JSON.stringify(error));
    }
  }

  if (session.loading === true) {
    return null;
  }

  function openLink(url: string) {
    window.open(url, "_blank");
  }

  const links: ILink[] = [
    {
      name: "Create New Workspace",
      onClick: handleCreateNewWorkspace,
      icon: BlogsIcon,
    },
    {
      name: "Workspace",
      onClick: handleGetWorkspace,
      icon: BlogsIcon,
    },
    {
      name: "Sign Out",
      onClick: logoutClicked,
      icon: SignOutIcon,
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>WorkSpace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <div
          className={`${styles.topBand} ${styles.successTitle} ${styles.bold500}`}
        >
          Your Workspace
        </div>
        <div className={styles.innerContent}>
          {workspace!.map((space) => (
            <div className={`${styles.truncate} ${styles.userId}`}>
              <div className="text-red-600 mb-2">
                WorkspaceID : <span className="text-black">{space?._id}</span>
              </div>
              <div className="text-red-600">
                Workspace Name :{" "}
                <span className="text-black">{space?.name}</span>
              </div>
            </div>
          ))}

          <div
            onClick={handleCreateNewWorkspace}
            className={styles.sessionButton}
          >
            Create Workspace
          </div>
        </div>
      </div>
      <div className={styles.bottomLinksContainer}>
        {links.map((link) => (
          <div className={styles.linksContainerLink} key={link.name}>
            <Image
              className={styles.linkIcon}
              src={link.icon}
              alt={link.name}
            />
            <div role={"button"} onClick={link.onClick}>
              {link.name}
            </div>
          </div>
        ))}
      </div>
      <Image
        className={styles.separatorLine}
        src={SeparatorLine}
        alt="separator"
      />
    </div>
  );
}

export default function Home(props) {
  return (
    <SessionReact.SessionAuth>
      <ProtectedPage />
    </SessionReact.SessionAuth>
  );
}
