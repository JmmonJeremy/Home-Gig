const getSystemStatus = async (req, res) => {
  let goService = "Offline";
  let spreadsheetGenerator = "Express";

  try {
    const statusResponse = await fetch("http://localhost:8080/status");

    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      goService = statusData.status || "Online";
    }
  } catch (error) {
    goService = "Offline";
  }

  if (goService === "Online") {
    try {
      const capabilityResponse = await fetch("http://localhost:8080/capabilities");

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