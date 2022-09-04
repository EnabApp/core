<template>

    <!-- Main Container -->
    <div @click.stop="appManager.setFocus(app.id)" :style="[
        app.maximized ? 'left:0px;top:0px;' : `left:${x}px;top:${y}px;`,
        appManager.focused == app.id ? `z-index: 25;` : `z-index: ${app.zIndex};`,
        
        'touch-action: none;',
    ]" style="position: fixed" :class="[app.maximized ? 'w-full h-minus-bottombar' : 'border-rounded-[10px]']" ref="rez">

        <!-- Window Container -->
        <div flex="~" place="items-center" justify="center" :class="{ 'w-full h-minus-bottombar': app.maximized }">
            <div flex="~ col" :class="[
                app.maximized ? 'w-full h-minus-bottombar' : '' + ' border-rounded-[10px] border-1 border-secondary',
            ]" :style="[
              app.maximized ? '' : `width:${w}px;height:${h}px;`,
              `min-width:${app.minWidth}px;min-height:${app.minHeight + headerHeight}px;`,
            ]" class="relative">
                <div v-if="!app.maximized">
                    <div @mousedown="changeDrag('tl')" position="absolute" cursor="nwse-resize" z="10" left="-1" top="-1" w="20px" h="20px"></div>
                    <div @mousedown="changeDrag('tr')" position="absolute" cursor="nesw-resize" z="10" right="-1" top="-1" w="20px" h="20px"></div>
                    <div @mousedown="changeDrag('bl')" position="absolute" cursor="nesw-resize" z="10" :style="`left:-12px; top:${content.height + headerHeight - 12}px`" w="20px" h="20px"></div>
                    <div @mousedown="changeDrag('br')" position="absolute" cursor="nwse-resize" z="10" :style="`left:${content.width - 12}px; top:${content.height + headerHeight - 12}px`" w="20px" h="20px"></div>
                </div>
                
                <!-- Header -->
                <div ref="headerEl">
                  <UiDesktopWindowHeader 
                      :app="app"
                      :appManager="appManager"
                      
                      @on-move="(pos) => { x = pos.x; y = pos.y; }"
  
                      :key="'Window-' + app.id"
                  />
                </div>

                <!-- Content -->
                <UiDesktopWindowContent :app="app" @size="contentSize($event)">
                  <slot />
                </UiDesktopWindowContent>

                <!-- Footer -->
                <!-- <div flex="~ gap-2" p="y-2" justify="center" bg="b-30" un-text="white" border="rounded-b-lg" class="backdrop-blur-lg">
                    asd
                </div> -->
            </div>
        </div>

    </div>
</template>

<script setup>
import { useAppManager, ref, onMounted, useMouse, reactive, useElementBounding, useElementSize } from '#imports';

const props = defineProps({
    app: {
        type: Object,
        required: true,
    },
});

const test = (x) => console.log(x)

onMounted(() => {
    console.log('mounted')
    props.app.booting = false
})

const x = ref(40);
const y = ref(40);

const size = ref(props.app.size);

const appManager = useAppManager();




// Resize
const mouse = reactive(useMouse())

const rez = ref(null)
const headerEl = ref(null)
const content = reactive({
  width: 0,
  height: 0
})
const originalContent = reactive({
  width: props.app.minWidth,
  height: props.app.minHeight
})

const contentSize = (size) => {
  content.width = size.width
  content.height = size.height

  if ((originalContent.width == 0 || originalContent.height == 0) && !props.app.maximized){
    originalContent.width = content.width
    originalContent.height = content.height
  }
}

// const { width, height } = useElementBounding(rez)
const { width: headerWidth, height: headerHeight } = useElementSize(headerEl)

const w = ref(content.width)
const h = ref(content.height + headerHeight.value)

const oldwidth = ref(0)
const oldheight = ref(0)
const oldmousex = ref(0)
const oldmousey = ref(0)
const oldxpos = ref(0)
const oldypos = ref(0)

const resizer = ref("")

function resize (){
  switch(resizer.value){
    case "br":
      w.value = oldwidth.value + (mouse.x - oldmousex.value)
      h.value = oldheight.value + (mouse.y - oldmousey.value)
      break;
    case "bl":
      w.value = oldwidth.value - (mouse.x - oldmousex.value)
      h.value = oldheight.value + (mouse.y - oldmousey.value)

      if (!(w.value <= originalContent.width))
        x.value = oldxpos.value + (mouse.x - oldmousex.value)
      break;
    case "tr":
      w.value = oldwidth.value + (mouse.x - oldmousex.value)
      h.value = oldheight.value - (mouse.y - oldmousey.value)

      if (!(h.value <= originalContent.height + headerHeight.value))
        y.value = oldypos.value + (mouse.y - oldmousey.value)
      break;
    case "tl":
      w.value = oldwidth.value - (mouse.x - oldmousex.value)
      h.value = oldheight.value - (mouse.y - oldmousey.value)

      if (!(h.value <= originalContent.height + headerHeight.value))
        y.value = oldypos.value + (mouse.y - oldmousey.value)
      if (!(w.value <= originalContent.width))
        x.value = oldxpos.value + (mouse.x - oldmousex.value)
      break;
  }
}

function stopResize (){
  document.removeEventListener.call(window, "mousemove", resize);
  resizer.value = ""
}
function changeDrag(resizerId){
  resizer.value = resizerId

  oldwidth.value = content.width
  oldheight.value = content.height + headerHeight.value
  oldmousex.value = mouse.x
  oldmousey.value = mouse.y
  oldxpos.value = x.value
  oldypos.value = y.value

  document.addEventListener.call(window, "mousemove", resize);
  document.addEventListener.call(window, "mouseup", stopResize);
}
// End Resize
</script>
