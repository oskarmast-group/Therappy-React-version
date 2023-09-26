import { createSelector } from "reselect";
const selector = (state) => state.requiredDocumentation;

export default createSelector([selector], (data) => data);