declare module 'react-google-recaptcha' {
  import { Component } from 'react';
  
  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    theme?: 'light' | 'dark';
    size?: 'compact' | 'normal' | 'invisible';
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    tabindex?: number;
    hl?: string;
    onExpired?: () => void;
    onErrored?: () => void;
  }
  
  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset(): void;
    execute(): void;
    executeAsync(): Promise<string>;
    getValue(): string | null;
  }
}