import { FC, HTMLAttributes } from "react";
import styles from "./Spinner.module.css";
import { cn } from "@/lib/cn";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <div className={cn(styles.loader, className)}></div>;
};
