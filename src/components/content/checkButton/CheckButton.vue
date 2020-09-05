<template>
	<div class="check-button" :class="{check:checked}">
		<img src="~assets/img/cart/tick.svg" alt="">
	</div>
</template>

<script>
	export default {
		name: "CheckButton",

		props: {
			value: {
				type: Boolean,
				default: true
			}
		},
		data: function() {
			return {
				checked: this.value
			}
		},
		watch: {
			value: function(newValue) {
				this.checked = newValue;
			}
		}
	}
</script>

<style scoped>
	.check-button {
		border-radius: 50%;
		border: 2px solid #cccccc;
	}

	.check {
		background-color: #ff61a0;
		border-color: #ff61a0;
	}
</style>
