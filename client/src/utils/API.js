import axios from "axios";

export default {
  currentTrends: function() {
    return axios.get("/api/trends");
  },
  searchQuery: function(data) {
    return axios.post("/api/search", data)
  }
}