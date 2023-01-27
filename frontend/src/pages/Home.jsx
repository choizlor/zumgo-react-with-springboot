import React from "react";
import HomeBanner from "../components/Home/HomeBanner";
import BottomNav from "../components/Nav/BottomNav";
import TopNav from "../components/Nav/TopNav";

export default function Home() {
  return (
    <div>
      <TopNav />
      <HomeBanner />
      <BottomNav />
    </div>
  );
}
