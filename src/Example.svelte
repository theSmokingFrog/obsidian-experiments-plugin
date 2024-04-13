<script lang="ts">
	import { Notice } from "obsidian";
	import MyTitle from "./my-title.svelte";

	export let variable: number;

	function sendNotice() {
		new Notice("Well this is awkward.");
	}
</script>

<div class="number">
	<MyTitle>This is a Title</MyTitle>
	<span>My number is {variable}!</span>
	<p>Was geht denn gerade so ab?</p>
	<button on:click={sendNotice}>Click me!</button>
</div>
