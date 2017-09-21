import { Meteor } from "meteor/meteor";

Meteor.methods({
  "paystack/getKeys"() {
    return {
      public: process.env.publicKey,
      secret: process.env.secretKey
    };
  }
});
