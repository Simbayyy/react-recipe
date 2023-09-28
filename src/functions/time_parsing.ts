import * as td from 'tinyduration'

export type TimeUnit =  null | "none" | "years" | "months" | "days" | "hours" |  "minutes" | "seconds"
export type Time = {
    mainTime: null | number
    mainUnit: TimeUnit
    secondaryTime: null | number
    secondaryUnit: TimeUnit
} 


export function reduce_time_object (time: any): Time {
    const keys = ["years","months","days","hours", "minutes", "seconds"]
    let mainTime: null | number = null
    let mainUnit: TimeUnit = null
    let secondaryTime: null | number = null
    let secondaryUnit: TimeUnit = null

    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        const key = keys[keyIndex];
        if (key in time && time[key]) {
            if (!mainUnit) {
                mainTime = time[key];
                mainUnit = key as TimeUnit;
            } else {
                secondaryTime = time[key];
                secondaryUnit = key as TimeUnit;
                break; // Exit the loop once secondaryTime is found
            }
        }
    }
    function convert(unit1:TimeUnit, unit2:TimeUnit, factor:number) {
        const non_null_time = (mainTime ?? 0)
        if (mainUnit === unit1 && non_null_time >= factor) {
            mainUnit = unit2
            secondaryTime = non_null_time % factor
            secondaryUnit = unit1
            mainTime = Math.floor(non_null_time /factor)    
        }
    }

    convert('seconds','minutes',60)
    convert('minutes','hours',60)
    convert('hours','days',24)

    return {
        mainTime: mainTime,
        mainUnit: mainUnit,
        secondaryTime: secondaryTime,
        secondaryUnit: secondaryUnit,        
    }
}

export const units = {
    years:"an",
    months:"mois",
    days:"jour(s)",
    hours:"h",
    minutes:"min",
    seconds:"s",
    none:""
}