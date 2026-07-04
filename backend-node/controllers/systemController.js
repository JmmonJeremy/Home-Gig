const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeoutMs = 75000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkGoService(goServiceUrl) {
  try {
    const response = await fetchWithTimeout(`${goServiceUrl}/status`, 75000);

    if (response.ok) {
      const data = await response.json();

      return {
        online: true,
        status: data.status || "Online"
      };
    }

    if ([502, 503, 504].includes(response.status)) {
      return {
        online: false,
        status: "Waking Up..."
      };
    }

    return {
      online: false,
      status: "Offline"
    };
  } catch (error) {
    return {
      online: false,
      status: "Waking Up..."
    };
  }
}

const getSystemStatus = async (req, res) => {
  const goServiceUrl = process.env.GO_SERVICE_URL || "http://localhost:8080";

  let spreadsheetGenerator = "Express";

  const goStatus = await checkGoService(goServiceUrl);

  if (goStatus.online) {
    try {
      const capabilityResponse = await fetchWithTimeout(
        `${goServiceUrl}/capabilities`,
        5000
      );

      if (capabilityResponse.ok) {
        const capabilityData = await capabilityResponse.json();
        spreadsheetGenerator = capabilityData.generator || "Express";
      }
    } catch (error) {
      spreadsheetGenerator = "Express";
    }
  }

  res.json({
    goService: goStatus.status,
    spreadsheetGenerator
  });
};

module.exports = {
  getSystemStatus
};