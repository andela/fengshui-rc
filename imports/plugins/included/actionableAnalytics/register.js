import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Actionable Analytics",
  name: "reaction-actionable-analytics",
  icon: "fa fa-bar-chart",
  autoEnable: true,
  settings: {
    name: "ActionableAnalytics"
  },
  registry: [
    {
      route: "/dashboard/actionable-analytics",
      provides: "dashboard",
      name: "actionableAnalytics",
      label: "Actionable Analytics",
      description: "Click to see your store's analytics",
      icon: "fa fa-bar-chart",
      priority: 1,
      container: "core",
      workflow: "coreDashboardWorkflow",
      template: "actionableAnalytics"
    }
  ]
});
