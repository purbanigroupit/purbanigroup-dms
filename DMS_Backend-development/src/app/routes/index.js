import express from "express";
import { UserRoutes } from "../modules/user/user.route.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { AdminRoutes } from "../modules/admin/admin.route.js";
import { NoticeRoutes } from "../modules/notice/notice.route.js";
import { PolicyRoutes } from "../modules/policy/policy.route.js";
import { DocumentRoutes } from "../modules/document/document.route.js";
import { KnowledgeRoutes } from "../modules/knowledge/knowledge.route.js";
const router = express.Router();

// Defining an array of module routes to be mounted on the router
const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/notice",
    route: NoticeRoutes,
  },
  {
    path: "/policy",
    route: PolicyRoutes,
  },
  {
    path: "/document",
    route: DocumentRoutes,
  },
  {
    path: "/knowledge",
    route: KnowledgeRoutes,
  },
];

// Iterate over the moduleRoutes array and mount each route on the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
