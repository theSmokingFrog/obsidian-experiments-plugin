<script lang="ts">
	import MyTitle from "../shared/my-title.svelte";

	export let variable: string;
	let counter = 0;

	function increment() {
		counter++;
	}

	function decrement() {
		if (counter > 0) {
			counter--;
		}
	}
</script>

<div class="number">
	<MyTitle>Example View Title</MyTitle>
	<p>Hello {variable}</p>
	<button on:click={increment} on:auxclick={decrement}>Clicked {counter} times!</button>
</div>
