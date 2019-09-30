const { dateToString } = require("../../helpers/date");
const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: req.userId
    });

    try {
      const result = await event.save();
      createdEvent = transformEvent(result);

      const userModel = await User.findById(req.userId);

      if (!userModel) throw new Error("User not found");

      userModel.createdEvents.push(event);
      await userModel.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
