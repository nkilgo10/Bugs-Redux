import { callBegan } from "../store/api";
import { addBug, bugAdded } from "../store/bugs";
import configureStore from "../store/configureStore";

describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    const store = configureStore();
    const bug = { descrption: "a" };
    const x = await store.dispatch(addBug(bug));
    console.log("DISPATCH", x);
    console.log(store.getState());
  });
});
