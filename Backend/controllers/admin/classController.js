
const { google } = require("googleapis");
const Classes  = require("../models/classes.js");

const calendar = google.calendar({
  version: "v3",
  auth: "YOUR_GOOGLE_OAUTH_TOKEN",
});

// Create a new class
const classCreation = async (req, res) => {
  try {
    const classData = await Classes.create(req.body);

    // Generate a Google Calendar event
    const event = {
      summary: req.body.name,
      start: { dateTime: req.body.start_time },
      end: { dateTime: req.body.end_time },
      conferenceData: {
        createRequest: {
          conferenceSolutionKey: { type: "hangoutsMeet" },
          requestId: `class-${classData.id}`,
        },
      },
    };

    const googleEvent = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    // Save Google Meet link in the database
    await classData.update({ google_meet_link: googleEvent.data.hangoutLink });

    res.json({ success: true, classData });
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).json({ error: "Failed to create class" });
  }
};

module.exports = { classCreation };
