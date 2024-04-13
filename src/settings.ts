import { App, PluginSettingTab, Setting } from "obsidian";
import MyPlugin from "./main";

export class GrillingSettingsTab extends PluginSettingTab {
  constructor(
    app: App,
    private plugin: MyPlugin
  ) {
    super(app, plugin);
  }

  display() {
    console.log(this.plugin.settings);

    const { containerEl } = this;
    containerEl.createEl("h1", { text: "Barbecue Settings" });

    new Setting(containerEl)
      .setName("What to grill")
      .setDesc("I don't care if it is meat or vegan.")
      .addText((text) =>
        text.setValue(this.plugin.settings.whatToGrill).onChange(async (value) => {
          this.plugin.settings.whatToGrill = value;
          await this.plugin.saveSettings();
        })
      );
  }
}
