import { createSelector } from "reselect";
const selector = (state) => state.conversations;

export default createSelector([selector], (data) => data);