import { Notice, Plugin } from "obsidian";
import { GrillingSettingsTab } from "./settings";
import { BARBECUE_VIEW_TYPE, BarbecueView } from "./view";

interface MyPluginSettings {
  whatToGrill: string;
}

const DEFAULT_SETTINGS: Partial<MyPluginSettings> = {
  whatToGrill: "essentially nothing",
};

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings | undefined;

  async fetchSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onload() {
    await this.fetchSettings();

    this.addRibbonIcon("beef", "Time for barbecue", () => {
      new Notice(`Grilling ${this.settings?.whatToGrill}`);
    });

    this.addSettingTab(new GrillingSettingsTab(this.app, this));

    this.registerView(BARBECUE_VIEW_TYPE, (leaf) => new BarbecueView(leaf));
    this.addRibbonIcon("book-user", "Open Contacts", () => {
      this.app.workspace.detachLeavesOfType(BARBECUE_VIEW_TYPE);

      const rightLeaf = this.app.workspace.getRightLeaf(false);
      if (rightLeaf != null) {
        rightLeaf.setViewState({
          type: BARBECUE_VIEW_TYPE,
        });

        this.app.workspace.revealLeaf(rightLeaf);
      } else {
        throw new Error("Could not create leaf");
      }
    });
  }

  onunload() {}
}
