import * as backlogjs from "backlog-js";
import * as es6promise from "es6-promise";
import "isomorphic-fetch";
import "isomorphic-form-data";

es6promise.polyfill();

// 'xxx.backlog.jp' or 'xxx.backlogtool.com' or 'your package host'
const host = process.env.REACT_APP_HOST_URL || "";
const apiKey = process.env.REACT_APP_API_KEY || "";

// Use API Key
export const backlogApi = new backlogjs.Backlog({ host, apiKey });
