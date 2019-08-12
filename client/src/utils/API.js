import axios from "axios";

export default {
  currentTrends: function() {
    return axios.get("/api/google");
  },
}