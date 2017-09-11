import { Reaction } from "/server/api";

export default function () {
  Reaction.registerPackage({
    label: "Router",
    name: "reaction-router",
    icon: "fa fa-share-square-o",
    autoEnable: true,
    settings: {
      name: "Layout"
    },
    registry: [{
      provides: "dashboard",
      template: "routerDashboard",
      label: "Routing",
      description: "Routing utilities",
      icon: "fa fa-share-square-o",
      priority: 1,
      container: "utilities"
    }, {
      route: "/help",
      template: "help",
      name: "help page",
      workflow: "coreWorkflow",
      priority: 4
    }]
  });
}
