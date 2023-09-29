import { RecipeSchema } from "./types";
import * as td from 'tinyduration'

export type TimeUnit =
  | null
  | "none"
  | "years"
  | "months"
  | "days"
  | "hours"
  | "minutes"
  | "seconds";
export type Time = {
  mainTime: null | number;
  mainUnit: TimeUnit;
  secondaryTime: null | number;
  secondaryUnit: TimeUnit;
};

export type Duration = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  none: number;
}

export function reduce_time_object(time: Duration): Time {
  const keys: TimeUnit[] = [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds",
  ];
  let mainTime: null | number = null;
  let mainUnit: TimeUnit = null;
  let secondaryTime: null | number = null;
  let secondaryUnit: TimeUnit = null;

  for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
    const key = keys[keyIndex];
    if (key && key in time && time[key]) {
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
  function convert(unit1: TimeUnit, unit2: TimeUnit, factor: number) {
    const non_null_time = mainTime ?? 0;
    if (mainUnit === unit1 && non_null_time >= factor) {
      mainUnit = unit2;
      secondaryTime = non_null_time % factor;
      secondaryUnit = unit1;
      mainTime = Math.floor(non_null_time / factor);
    }
  }

  convert("seconds", "minutes", 60);
  convert("minutes", "hours", 60);
  convert("hours", "days", 24);

  return {
    mainTime: mainTime,
    mainUnit: mainUnit,
    secondaryTime: secondaryTime,
    secondaryUnit: secondaryUnit,
  };
}

export const defaultTimeObject = {
  mainTime: null,
  mainUnit: null,
  secondaryTime: null,
  secondaryUnit: null,
};

export function parseAndSetTime (recipe: RecipeSchema | undefined, timeKey: "totalTime" | "prepTime" | "cookTime", timeSetter: React.Dispatch<React.SetStateAction<Time>>) {
  if (recipe !== undefined 
    && timeKey in recipe 
    && recipe[timeKey] !== ""
    && recipe[timeKey] !== undefined)
      {
        let timeString = recipe[timeKey] as string
        try {
          let time = td.parse(timeString) as Duration;
          timeSetter(reduce_time_object(time));
        } catch (e) {
          timeSetter(defaultTimeObject);
        }
      } else {
        timeSetter(defaultTimeObject);
      }
}

export function display_time_string(
  time: Time,
  short: boolean = false,
): string {
  if (short) {
    return `${time.mainTime}${units[time.mainUnit ?? "none"]}${
      time.secondaryTime
        ? `${time.secondaryTime}${units[time.secondaryUnit ?? "none"]}`
        : ""
    }`;
  } else {
    return `${time.mainTime} ${units[time.mainUnit ?? "none"]} ${
      time.secondaryTime
        ? `${time.secondaryTime} ${units[time.secondaryUnit ?? "none"]}`
        : ""
    }`;
  }
}

export const units = {
  years: "an",
  months: "mois",
  days: "jour(s)",
  hours: "h",
  minutes: "min",
  seconds: "s",
  none: "",
};
