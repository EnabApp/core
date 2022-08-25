import { useElementSize, ref, watch, computed } from '#imports'

export const useBreakpointWindow = (el) => {
    const breakPoints = {
        '2xl': 1536,
        xl: 1280,
        lg: 1024,
        md: 768,
        sm: 640,
        xs: 480,
        '2xs': 320
    }

    const getMyBreakPoint = (size) => {
        for (let key in breakPoints) {
            if (size > breakPoints[key]) {
                return key
            }
        }
        return '2xs'
    }

    const { width, height } = useElementSize(el)

    const size = computed(() => getMyBreakPoint(width.value))
    const twoXs = computed(() => size.value == '2xs')
    const xs = computed(() => size.value == 'xs')
    const sm = computed(() => size.value == 'sm')
    const md = computed(() => size.value == 'md')
    const lg = computed(() => size.value == 'lg')
    const xl = computed(() => size.value == 'xl')
    const twoXl = computed(() => size.value == '2xl')

    return {
        twoXs: twoXs,
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,
        twoXl: twoXl,
        size: size
    }
}