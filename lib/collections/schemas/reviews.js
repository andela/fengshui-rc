import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const Reviews = new SimpleSchema({
  productId: {
    type: String,
    label: "Product Id"
  },
  rate: {
    type: String
  },
  sender: {
    type: String
  },
  review: {
    type: String
  },
  createdAt: {
    type: String
  }
});
