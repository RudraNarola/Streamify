"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Wrapper from "./Wrapper";
import Content from "./Content";

const Sidebar = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Content />
      </Wrapper>
    </>
  );
};

export default Sidebar;

