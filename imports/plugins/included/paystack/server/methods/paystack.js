import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
import { Reaction } from "/server/api";

Meteor.methods({
  "paystack/getKeys"() {
    const paystack = Collections.Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    });
    return {
      public: paystack.settings.publicKey,
      secret: paystack.settings.secretKey
    };
  }
});
