import { App, PluginSettingTab, Setting } from "obsidian";
import CharacterSheetPlugin from "../main";

export class CharacterSheetPluginSettingsTab extends PluginSettingTab {
  constructor(
    app: App,
    private plugin: CharacterSheetPlugin
  ) {
    super(app, plugin);
  }

  display() {
    const { containerEl } = this;
    containerEl.createEl("h1", { text: "Character Sheet Settings" });

    new Setting(containerEl)
      .setName("Plugin Name Example")
      .setDesc("This only exists to demonstrate that settings are working.")
      .addText((text) =>
        text.setValue(this.plugin.settings!.pluginName).onChange(async (value) => {
          this.plugin.settings!.pluginName = value;
          await this.plugin.saveSettings();
        })
      );
  }
}
