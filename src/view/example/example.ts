import { ItemView } from "obsidian";
import Example from "./Example.svelte";

export const EXAMPLE_VIEW_TYPE = "example-view";
export const EXAMPLE_VIEW_ICON = "message-circle";

export class ExampleView extends ItemView {
  private component: Example | undefined;

  getDisplayText(): string {
    return "Example View";
  }

  getViewType(): string {
    return EXAMPLE_VIEW_TYPE;
  }

  getIcon() {
    return EXAMPLE_VIEW_ICON;
  }

  async onOpen() {
    this.component = new Example({
      target: this.contentEl,
      props: {
        variable: "from the props!",
      },
    });
  }

  async onClose() {
    this.component?.$destroy();
  }
}
