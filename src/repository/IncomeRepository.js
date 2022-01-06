import http from "http";

const API_BASE_URL = "http://localhost:3000";

class IncomeRepository {
  async makeRequest(url) {
    const request = new Promise((resolve, reject) => {
      var chunks = [];

      http.get(url, (response) => {
        response.on("data", (data) => chunks.push(data));
        response.on("error", reject);
        response.on("end", () => {
          const data = Buffer.concat(chunks);
          resolve(JSON.parse(data));
        });
      });
    });

    return request;
  }

  async getConversions() {
    const conversions = await this.makeRequest(`${API_BASE_URL}/convert`);

    if ("results" in conversions) {
      return conversions.results;
    }

    return {};
  }
}

export default IncomeRepository;
