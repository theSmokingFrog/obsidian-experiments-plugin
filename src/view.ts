import { type IconName, ItemView, Setting } from "obsidian";
import Example from "./Example.svelte";

export const BARBECUE_VIEW_TYPE = "barbecue-view";

export class BarbecueView extends ItemView {
  private isCalling = false;
  private component: Example | undefined;

  getDisplayText(): string {
    return "Contacts";
  }

  getViewType(): string {
    return BARBECUE_VIEW_TYPE;
  }

  getIcon(): IconName {
    return "book-user";
  }

  async onOpen() {
    this.component = new Example({
      target: this.contentEl,
      props: {
        variable: 3,
      },
    });
  }

  private render() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl("h1", { text: "Contacts" });
    contentEl.createEl("p", { text: "Lorem Ipsum" });

    new Setting(contentEl).setName("Ghostbusters").addButton((component) => {
      component.setButtonText(this.isCalling ? "Hang up" : "Call").onClick(() => {
        this.isCalling = !this.isCalling;
        this.render();
      });
    });
  }

  async onClose() {
    this.component?.$destroy();
  }
}
