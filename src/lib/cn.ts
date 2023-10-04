import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputValues: ClassValue[]) => {
    return twMerge(clsx(inputValues))
}