import { pgTable, text, timestamp, doublePrecision, uuid, pgEnum, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const planEnum = pgEnum("Plan", ["FREE", "BASIC", "PRO", "ENTERPRISE"]);
export const subscriptionStatusEnum = pgEnum("SubscriptionStatus", ["ACTIVE", "CANCELED", "PAST_DUE", "UNPAID", "TRIALING"]);
export const workspaceRoleEnum = pgEnum("WorkspaceRole", ["OWNER", "ADMIN", "MEMBER"]);

export const users = pgTable("User", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  password: text("password"), // Added for Credentials Auth
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const subscriptions = pgTable("Subscription", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId").notNull().references(() => users.id).unique(),
  plan: planEnum("plan").default("FREE").notNull(),
  status: subscriptionStatusEnum("status").default("ACTIVE").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  canceledAt: timestamp("canceledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const usages = pgTable("Usage", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId").notNull().references(() => users.id).unique(),
  transactions: integer("transactions").default(0).notNull(),
  reports: integer("reports").default(0).notNull(),
  apiCalls: integer("apiCalls").default(0).notNull(),
  periodStart: timestamp("periodStart").defaultNow().notNull(),
  periodEnd: timestamp("periodEnd").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const workspaces = pgTable("Workspace", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  ownerId: uuid("ownerId").notNull().references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const workspaceMembers = pgTable("WorkspaceMember", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspaceId").notNull().references(() => workspaces.id),
  userId: uuid("userId").notNull().references(() => users.id),
  role: workspaceRoleEnum("role").default("MEMBER").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
});

export const transactions = pgTable("Transaction", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId").references(() => users.id),
  workspaceId: uuid("workspaceId").references(() => workspaces.id),
  amount: doublePrecision("amount").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  subscription: one(subscriptions),
  usage: one(usages),
  workspaces: many(workspaces),
  workspaceMembers: many(workspaceMembers),
  transactions: many(transactions),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export const usagesRelations = relations(usages, ({ one }) => ({
  user: one(users, {
    fields: [usages.userId],
    references: [users.id],
  }),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [workspaces.ownerId],
    references: [users.id],
  }),
  members: many(workspaceMembers),
  transactions: many(transactions),
}));

export const workspaceMembersRelations = relations(workspaceMembers, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [workspaceMembers.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [workspaceMembers.userId],
    references: [users.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [transactions.workspaceId],
    references: [workspaces.id],
  }),
}));
