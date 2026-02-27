<template>

  <MyCanvas :lineWidth="lineWidth"
            :lineColor="lineColor"
            :coords="coords"
            @sendCoords="sendCoords"/>
  <CanvasMenu @LineWidthEmit="changeLineWidth"
              @LineColorEmit="changeLineColor"
              @clearEmit="clearCanvas"/>

</template>

<script>
// link components
import MyCanvas from '@/components/MyCanvas.vue';
import CanvasMenu from '@/components/CanvasMenu.vue';

export default {
  // init components
  components: {
    MyCanvas,
    CanvasMenu,
  },
  // init data
  data() {
    return {
      // WebSocket
      ws: null,
      lineWidth: 20,
      lineColor: '#000',
      coords: [],
    }
  },
  // Methods
  methods: {
    changeLineWidth(lineWidth) {
      this.lineWidth = lineWidth
    },
    changeLineColor(Color) {
      this.lineColor = Color
    },
    clearCanvas() {
      if (this.ws && this.ws.readyState === WebSocket.OPEN ) {
        this.ws.send('clear')
      }
    },
    sendCoords(coords) {
      if (coords == []) return
      if (this.ws && this.ws.readyState === WebSocket.OPEN ) {
        this.ws.send(coords)
      }
    }
  },
  // onMounted
  mounted() {
    // connect to WebSocket
    this.ws = new WebSocket('http://localhost:3000')
    this.ws.onmessage = event => {
      if (event.data == 'clear') {
        this.coords = ['clear']
      }
      const message = JSON.parse(event.data)
      this.coords = message
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  width: 100vw;
  min-height: 100vh;
  background-color: #c6c6c6;
}
#app {
  display: grid;
  grid-template-columns: 1fr 200px;
  min-height: 100vh;
}
</style>
