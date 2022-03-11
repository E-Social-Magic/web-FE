/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import Forgot from "views/examples/Forgot.js"
import NewPass from "views/examples/NewPass.js"
import Tables from "views/examples/Tables.js";
import Users from "views/examples/Users.js"
import Posts from "views/examples/Posts.js";
import Videos from "views/examples/Videos.js"
import Coins from "views/examples/Coins.js"
import Groups from "views/examples/Groups.js";
import Comments from "views/examples/Comments.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-single-02 text-brown",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-album-2 text-green",
    component: Posts,
    layout: "/admin",
  },
  {
    path: "/groups",
    name: "Groups",
    icon: "ni ni-folder-17 text-blue",
    component: Groups,
    layout: "/admin",
  },
  {
    path: "/coins",
    name: "Coins",
    icon: "ni ni-money-coins text-yellow",
    component: Coins,
    layout: "/admin",
  },
  // {
  //   path: "/comments",
  //   name: "Comments",
  //   icon: "ni ni-chat-round text-pink",
  //   component: Comments,
  //   layout: "/admin",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/forgot",
    name: "Forgot",
    icon: "ni ni-key-25 text-info",
    component: Forgot,
    layout: "/auth",
  },
  {
    path: "/newpass",
    name: "NewPass",
    icon: "ni ni-key-25 text-info",
    component: NewPass,
    layout: "/auth",
  }
];
export default routes;
