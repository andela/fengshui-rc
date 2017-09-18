import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "faqs",
  name: "FAQs",
  icon: "fa fa-cubes",
  autoEnable: true,
  registry: [{
    route: "/FAQs",
    template: "FAQs",
    name: "FAQs"
  }]
});
