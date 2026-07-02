const getSystemStatus = async (req, res) => {
  const goServiceUrl = process.env.GO_SERVICE_URL || "http://localhost:8080";

  let goService = "Offline";
  let spreadsheetGenerator = "Express";

  try {
    const statusResponse = await fetch(`${goServiceUrl}/status`);

    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      goService = statusData.status || "Online";
    }
  } catch (error) {
    goService = "Offline";
  }

  if (goService === "Online") {
    try {
      const capabilityResponse = await fetch(`${goServiceUrl}/capabilities`);

      if (capabilityResponse.ok) {
        const capabilityData = await capabilityResponse.json();
        spreadsheetGenerator = capabilityData.generator || "Express";
      }
    } catch (error) {
      spreadsheetGenerator = "Express";
    }
  }

  res.json({
    goService,
    spreadsheetGenerator
  });
};

module.exports = {
  getSystemStatus
};