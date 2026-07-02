const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkGoService(goServiceUrl) {
  const maxWaitMs = 30000;
  const retryDelayMs = 2000;
  const requestTimeoutMs = 5000;
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    try {
      const response = await fetchWithTimeout(
        `${goServiceUrl}/status`,
        requestTimeoutMs
      );

      if (response.ok) {
        const data = await response.json();

        return {
          online: true,
          status: data.status || "Online"
        };
      }

      return {
        online: false,
        status: "Offline"
      };
    } catch (error) {
      await sleep(retryDelayMs);
    }
  }

  return {
    online: false,
    status: "Waking Up..."
  };
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