import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ChatBubbleOvalLeftIcon, PlusCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function BottomNav() {
  return (
    <nav>
      <Link to="/">
        <HomeIcon className="w-10 h-10 mr-5" />
      </Link>
      <Link to="/chatlist">
        <ChatBubbleOvalLeftIcon className="w-10 h-10 mr-5" />
      </Link>
      <Link to="/live">
        Live
      </Link>
      <Link to="/addproduct">
        <PlusCircleIcon className="w-10 h-10 mr-5" />
      </Link>
      <Link to="/userinfo">
        <UserCircleIcon className="w-10 h-10 mr-5" />
      </Link>
    </nav>
  );
}
