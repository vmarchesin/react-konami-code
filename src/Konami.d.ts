import * as React from "react";

export interface KonamiProps {
  className?: string;
  code?: number[];
  disabled?: boolean;
  resetDelay?: number;
  action?: () => void;
  timeout?: number;
}

export interface KonamiStates {
  done: boolean;
  input: number[];
}

declare class Konami extends React.Component<KonamiProps, KonamiStates> {
  onKeyUp(e: KeyboardEvent): void;
  resetInput(): void;
  Timer(fn: TimerHandler, t?: number | undefined): void;
}

export default Konami;
