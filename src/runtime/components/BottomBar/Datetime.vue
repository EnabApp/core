<template>


<div ref="datetimeEl" position="relative" un-text="primaryOp dark:primary">
    
    <!-- Datetime Button -->
    <div @click="datetimePanelToggle()" flex="~ gap-24px" items="center" bg="dark:hover:secondaryOp hover:secondary" p="y-2 x-4" border="rounded-10px" cursor="pointer" un-text="primaryOp dark:primary">
        <!-- Calendar -->
        <IconCalendar h="32px" w="32px"></IconCalendar>

        <!-- Datetime -->
        <div un-text="xl">{{ datetext }}</div>
    </div>


    <!-- datetime Panel -->
    <Transition name="datetime-panel">
      <div v-if="datetimePanelState" bg="primary dark:primaryOp" position="absolute" left="-16px" bottom="64px" border="~ secondary dark:secondaryOp rounded-10px">
        <div w="400px" h="460px" flex="~ col gap-20px" p="y-30px x-30px">
          <!-- Header - Title & Button -->
          <div flex="~" justify="between" items="center">
            <!-- Date: Dayname & Month & Year -->
            <div @click="monthsChoosingToggle()" flex="~ col" w="100px" bg="hover:secondary dark:hover:secondaryOp" border="rounded-5px" cursor="pointer" p="2">
              <span un-text="xs secondaryOp dark:secondary">{{ monthAndYear }}</span>
              <span font="bold" un-text="sm">{{ dayName }}</span>
            </div>

            <!-- Buttons: Change months -->
            <div flex="~ gap-1">
              <IconArrowDown @click="previous()" cursor="pointer" w="32px" h="32px" ></IconArrowDown>
              <IconArrowUp @click="next()" cursor="pointer" w="32px" h="32px"></IconArrowUp>
            </div>
          </div>


          <!-- Divider -->
          <div bg="secondary dark:secondaryOp" h="1px"></div>

          <Transition name="months-choosing">
              <!-- Show Months -->
            <div v-if="monthsChoosingState" w="full" grid="~ cols-4 auto-rows-min gap-4" un-text="center">
              <div v-for="(item, index) in monthsNames" :key="item" @click="setMonth(index)" flex="~ col" border="~ transparent hover:secondary dark:hover:secondaryOp rounded-5px" cursor="pointer" p="x-10px y-20px">
                <span>{{ item }}</span>
              </div>
            </div>
            
            <!-- datetime List -->
            <div v-else w="full" grid="~ cols-7 auto-rows-min gap-8" un-text="center">
              <span un-text="secondary dark:secondaryOp">أحد</span>
              <span un-text="secondary dark:secondaryOp">اثنين</span>
              <span un-text="secondary dark:secondaryOp">ثلاثاء</span>
              <span un-text="secondary dark:secondaryOp">اربعاء</span>
              <span un-text="secondary dark:secondaryOp">خميس</span>
              <span un-text="secondary dark:secondaryOp">جمعة</span>
              <span un-text="secondary dark:secondaryOp">سبت</span>


              <TransitionGroup name="days-trans">
                <!-- Days -->
                <span v-for="dayObject in days" :key="dayObject" un-text="lg">
                  <!-- Current Day -->
                  <span v-if="dayObject.isCurrentDay" p="x-12px y-6px" bg="secondaryOp dark:secondary" un-text="primary dark:primaryOp" border="rounded-5px"> 
                    {{ dayObject.day }} 
                  </span>
                  
                  <!-- Not Current Day -->
                  <span v-else> {{ dayObject.day }} </span>
                </span>
              </TransitionGroup>
            </div>
          </Transition>
           
        </div>
      </div>
    </Transition>
  </div>
</template>


<script setup>
import { exit } from "@tauri-apps/api/process";
import { useToggle, ref, useDebounceFn, onClickOutside, watch } from '#imports'

const [datetimePanelState, datetimePanelToggle] = useToggle(false);
const datetimeEl = ref(null);
onClickOutside(
  datetimeEl,
  (event) => (datetimePanelState.value = false)
);

// Months choosing Script
const [ monthsChoosingState, monthsChoosingToggle ] = useToggle(false)

// Setting month
const setMonth = (month) => {
  currentMonth = month;
  days.value = showCalendar(currentMonth, currentYear);
  monthsChoosingToggle()
}



// Calendar Script
const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
const selectYear = ref(null);
const selectMonth = ref(null);

const monthsNames = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
              "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
const daysNames =["اﻷحد","اﻷثنين","الثلاثاء","اﻷربعاء","الخميس","الجمعة","السبت"];

const monthAndYear = ref(null);
const dayName = ref(null);

const days = ref([]);
// Show Calendar when show component
watch (() => datetimePanelState.value, (s) => {
  if (s) {
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    days.value = showCalendar(currentMonth, currentYear);
  }
})

const next = useDebounceFn(() => {
  // Not Months Choosing
  if (monthsChoosingState.value) currentYear ++;
  else {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
  }
  days.value = showCalendar(currentMonth, currentYear);
}, 250)

const previous = useDebounceFn(() => {
  // Not Months Choosing
  if (monthsChoosingState.value) currentYear --; 
  else {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  }
  days.value = showCalendar(currentMonth, currentYear);
}, 250)


function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let selfDays = [];

    monthAndYear.value = monthsNames[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                selfDays.push({
                  day: "",
                  isCurrentDay: false
                });
            }

            else if (date > daysInMonth(month, year)) break;

            else {
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    selfDays.push({
                      day: date,
                      isCurrentDay: true
                    });
                    dayName.value = daysNames[j];
                } else {
                    selfDays.push({
                      day: date,
                      isCurrentDay: false
                    });
                }
                
                date++;
            }
        }
    }
    return selfDays;
}


// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

const datetext = ref(null)

function getDateText(today) {
  return today.toLocaleString("ar", {"timeStyle": "short", "dateStyle": "short"})
}

setInterval(() => {
  const today = new Date()
  datetext.value = getDateText(today)
}, 1000)





</script>

<style scoped>
.datetime-panel-enter-active {
  transition: all 0.15s ease-out;
}

.datetime-panel-leave-active {
  transition: all 0.15s ease-in;
}

.datetime-panel-enter-from,
.datetime-panel-leave-to {
  transform: translateY(50px);
  opacity: 0;
}



.days-trans-enter-active {
  animation: bounce-in 0.25s;
  opacity: 0;
}
.days-trans-leave-active {
  animation: bounce-in 0.25s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}


.months-choosing-enter-active {
  animation: bounce-in 0.5s;
  opacity: 0;
}
.months-choosing-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
