import { useBreakpoints } from '@vueuse/core'
import { useScreenOrientation } from '@vueuse/core'
import { computed } from '#imports'

export const useResponsive = () => {
    const { orientation } = useScreenOrientation()
    const isPortrait = computed(() => orientation.value.includes("portrait"))

    const breakpoints = useBreakpoints({
        tablet: 640,
        laptop: 1024,
        desktop: 1280,
    })

    const mobile = breakpoints.smaller('tablet')
    const tablet = breakpoints.between('tablet', 'laptop')
    const desktop = breakpoints.greaterOrEqual('laptop')

    // Generate board Size
    const boardSize = computed(() => {
        if (isPortrait.value) {
            return {
                columns: mobile.value ? 2 : tablet.value ? 4 : 7,
                rows: mobile.value ? 4 : tablet.value ? 6 : 4,
            }
        } else {
            return {
                columns: mobile.value ? 4 : tablet.value ? 6 : 7,
                rows: mobile.value ? 2 : tablet.value ? 4 : 4,
            }
        }
    })


    return {
        mobile,
        tablet,
        desktop,

        orientation,
        isPortrait,

        boardSize
    }
}