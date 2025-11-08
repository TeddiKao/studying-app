/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as blocks_mutations from "../blocks/mutations.js";
import type * as blocks_queries from "../blocks/queries.js";
import type * as blocks_utils from "../blocks/utils.js";
import type * as notebooks_mutations from "../notebooks/mutations.js";
import type * as notebooks_queries from "../notebooks/queries.js";
import type * as notes_mutations from "../notes/mutations.js";
import type * as notes_queries from "../notes/queries.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "blocks/mutations": typeof blocks_mutations;
  "blocks/queries": typeof blocks_queries;
  "blocks/utils": typeof blocks_utils;
  "notebooks/mutations": typeof notebooks_mutations;
  "notebooks/queries": typeof notebooks_queries;
  "notes/mutations": typeof notes_mutations;
  "notes/queries": typeof notes_queries;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
