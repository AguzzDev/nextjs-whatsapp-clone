import React, { useEffect, useState } from "react";
import { NextPage } from "next/types";
import Head from "next/head";

import { Login } from "components/Login";
import { Layout } from "components/Layout";
import { ChatActive } from "components/WindowRight/ChatActive";
import { ChatInactive } from "components/WindowRight/ChatInactive";
import { PreviewBackground } from "components/WindowRight/PreviewBackground";
import { userCookie } from "utils/userCookie";
import { Preload } from "components/Preload";
import { usePreload } from "hooks/usePreload";
import { useGlobalState } from "context/GlobalStateContext";

const Inicio: NextPage = () => {
  const { windowRight } = useGlobalState();

  const { loading } = usePreload();

  const { user } = userCookie();

  return (
    <>
      <Head>
        <title>Whatsapp Clone</title>
        <meta name="description" content="Made for AguzzDev" />
      </Head>

      <>
        {loading ? (
          <Preload />
        ) : !user ? (
          <Login />
        ) : (
          <Layout>
            {windowRight === "ChatInactivo" ? (
              <ChatInactive />
            ) : windowRight === "ChatActivo" ? (
              <ChatActive />
            ) : windowRight === "PreviewBackground" ? (
              <PreviewBackground />
            ) : windowRight === "chatDetails" ? (
              <ChatActive />
            ) : null}
          </Layout>
        )}
      </>
    </>
  );
};

export default Inicio;
