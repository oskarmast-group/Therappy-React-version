import { createSelector } from "reselect";
const selector = (state) => state.messages;

export default createSelector([selector], (data) => data);