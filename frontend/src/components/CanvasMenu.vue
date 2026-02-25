<template>
	<form @submit.prevent>
		<!-- Ширина линии -->
		<label for="lineWidth">lineWidth</label>
		<input type="number" id="lineWidth" name="lineWidth" min="1" v-model="lineWidth"
		@input="lineWidthEmit">
		<!-- Цвет линии -->
		<label for="lineColor">Line Color</label>
		<input type="color" name="lineColor" id="lineColor" v-model="lineColor"
		@input="lineColorEmit">
		<!-- Кнопка очищение -->
		<label for="clearBtn">Clear</label>
		<button @click="clearEmit">Clear</button>

	</form>
</template>

<script>
export default {
	data() {
		return {
			lineWidth: 20,
			lineColor: '#000'
		}
	},
	methods: {
		lineWidthEmit() {
			this.$emit('LineWidthEmit', this.lineWidth)
		},
		lineColorEmit() {
			this.$emit('LineColorEmit', this.lineColor)
		},
		clearEmit() {
			this.$emit('clearEmit')
		}
	},
	emits: [
		"LineWidthEmit",
		'LineColorEmit',
		'clearEmit'
	]
}
</script>

<style>
form {
	width: 100%;
	padding: 15px 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
}
</style>