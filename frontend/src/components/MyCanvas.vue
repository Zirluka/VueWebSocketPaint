<template>
	<canvas id="myCanvas" ref="myCanvas">
		Canvas is not supported in your browser. Change browser, please!
	</canvas>
</template>

<script>
export default {
	props: {
		lineWidth: {
			require: true,
			type: Number
		},
		lineColor: {
			require: true,
			type: String
		},
		isNeedToClear: {
			require: true,
			type: Boolean
		},
		coords: {
			require: true,
			type: Array
		}
	},
 	data() {
		return {
			ctx: null,
			isMouseDown: false,
		}
	},
	watch: {
		coords(newVar, oldVar) {
			if (newVar[0] === 'clear' && newVar.length == 1) {
				this.ctx.fillStyle = "#fff"
				this.ctx.fillRect(0, 0, window.innerWidth - 200, window.innerHeight)
				this.ctx.fillStyle = this.lineColor
				return null;
			}
			newVar.forEach(element => {
				if (element === "mouseup") {
					this.ctx.beginPath()
				} else {
					this.ctx.fillStyle = element[3]
					this.ctx.strokeStyle = element[3]
					this.ctx.lineWidth = element[2]

					let e = {
						"clientX" : element[0],
						"clientY" : element[1]
					}

					this.ctx.lineTo(e.clientX, e.clientY)
					this.ctx.stroke()

					this.ctx.beginPath()
					this.ctx.arc(e.clientX, e.clientY, element[2] / 2, 0, Math.PI * 2)
					this.ctx.fill()

					this.ctx.beginPath()
					this.ctx.moveTo(e.clientX, e.clientY)
				}
			});
			this.ctx.fillStyle = this.lineColor
			this.ctx.strokeStyle = this.lineColor
			this.ctx.lineWidth = this.lineWidth
		},
	},
	mounted() {
		// Canvas init
		this.$refs.myCanvas.width = window.innerWidth - 200
		this.$refs.myCanvas.height = window.innerHeight
		this.ctx = this.$refs.myCanvas.getContext('2d');
		// Canvas events
		this.$refs.myCanvas.addEventListener('mousedown', () => {
			this.isMouseDown = true
		})
		this.$refs.myCanvas.addEventListener('mouseup', () => {
			this.isMouseDown = false
			this.ctx.beginPath()
			this.coords.push('mouseup')
			this.$emit('sendCoords', JSON.stringify(this.coords))
		})
		this.$refs.myCanvas.addEventListener('mousemove', (e) => {
			if (this.isMouseDown) {
				this.ctx.fillStyle = this.lineColor
				this.ctx.strokeStyle = this.lineColor
				this.ctx.lineWidth = this.lineWidth

				this.coords.push([e.clientX, e.clientY, this.lineWidth, this.lineColor])
				
				this.ctx.lineTo(e.clientX, e.clientY)
				this.ctx.stroke()

				this.ctx.beginPath()
				this.ctx.arc(e.clientX, e.clientY, this.lineWidth / 2, 0, Math.PI * 2)
				this.ctx.fill()

				this.ctx.beginPath()
				this.ctx.moveTo(e.clientX, e.clientY)
			}
		})
	},
	emits: ['endClear', 'sendCoords']
}


</script>

<style scoped>
#myCanvas {
	display: block;
	background-color: #fff;
}
</style>