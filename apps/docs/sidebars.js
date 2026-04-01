module.exports = {
  tutorialSidebar: [
    "index",
    {
      type: "category",
      label: "React",
      items: [
        "react/index",
        "react/starter-kit",
        "react/sky-button",
        "react/sky-nav",
        "react/sky-widget",
      ],
    },
    {
      type: "category",
      label: "Angular",
      items: [
        {
          type: "category",
          label: "Other",
          items: ["angular/index", "angular/starter-kit"],
        },
        {
          type: "category",
          label: "Components",
          items: [
            {
              type: "category",
              label: "Affix",
              items: ["angular/affix"],
            },
            {
              type: "category",
              label: "App",
              items: ["angular/app"],
            },
            {
              type: "category",
              label: "ConfigProvider",
              items: ["angular/config-provider"],
            },
            {
              type: "category",
              label: "Util",
              items: ["angular/util"],
            },
          ],
        },
      ],
    },
  ],
};
