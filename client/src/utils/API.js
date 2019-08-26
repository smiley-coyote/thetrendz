import axios from "axios";

export default {
  currentTrends: function(data) {
    return axios.post("/api/trends", data);
  },
  trendsOvertime: function(data) {
    return axios.post("/api/search", data)
  }
}