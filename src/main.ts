import { Notice, Plugin } from "obsidian";
import { type CharacterSheetPluginSettings, DEFAULT_SETTINGS } from "./settings/character-sheet-plugin-settings";
import { CharacterSheetPluginSettingsTab } from "./settings/character-sheet-plugin-settings-tab";
import { EXAMPLE_VIEW_ICON, EXAMPLE_VIEW_TYPE, ExampleView } from "./view/example/example";

export default class CharacterSheetPlugin extends Plugin {
  settings: CharacterSheetPluginSettings | undefined;

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new CharacterSheetPluginSettingsTab(this.app, this));

    this.registerView(EXAMPLE_VIEW_TYPE, (leaf) => new ExampleView(leaf));

    this.addRibbonIcon("shield-plus", "Check Settings", () => {
      new Notice(`Example Output for Settings: ${this.settings?.pluginName}`);
    });

    this.addRibbonIcon(EXAMPLE_VIEW_ICON, "Open Example View", () => {
      this.openExampleView();
    });
  }

  private openExampleView() {
    this.app.workspace.detachLeavesOfType(EXAMPLE_VIEW_TYPE);

    const rightLeaf = this.app.workspace.getRightLeaf(false);
    if (rightLeaf != null) {
      rightLeaf.setViewState({
        type: EXAMPLE_VIEW_TYPE,
      });

      this.app.workspace.revealLeaf(rightLeaf);
    } else {
      throw new Error("Could not create leaf");
    }
  }

  onunload() {}
}
