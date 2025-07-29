import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <svg
        className={styles.logo}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base static elements with subtle glow */}
        <g className={styles.baseElements}>
          {/* Static lines */}
          <line
            className={styles.glowLine}
            x1="26.42"
            y1="25.94"
            x2="23.84"
            y2="25.15"
          />
          <line
            className={styles.glowLine}
            x1="24.27"
            y1="23.5"
            x2="24.2"
            y2="24.79"
          />
          <line
            className={styles.glowLine}
            x1="26.64"
            y1="23.5"
            x2="27.28"
            y2="20.99"
          />
          <line
            className={styles.glowLine}
            x1="24.91"
            y1="22.06"
            x2="27.14"
            y2="20.91"
          />
          <line
            className={styles.glowLine}
            x1="27.1"
            y1="20.59"
            x2="25.24"
            y2="19.16"
          />
          <line
            className={styles.glowLine}
            x1="24.81"
            y1="20.88"
            x2="25.02"
            y2="19.23"
          />
          <line
            className={styles.glowLine}
            x1="25.02"
            y1="17.94"
            x2="25.02"
            y2="19.16"
          />
          <line
            className={styles.glowLine}
            x1="25.45"
            y1="18.94"
            x2="28.39"
            y2="17.5"
          />
          <line
            className={styles.glowLine}
            x1="29.76"
            y1="19.16"
            x2="28.39"
            y2="17.5"
          />
          <line
            className={styles.glowLine}
            x1="28.61"
            y1="17.15"
            x2="30.55"
            y2="15.71"
          />
          <line
            className={styles.glowLine}
            x1="28.39"
            y1="17.22"
            x2="27.1"
            y2="16.14"
          />
          <line
            className={styles.glowLine}
            x1="29.04"
            y1="12.55"
            x2="29.25"
            y2="11.76"
          />
          <line
            className={styles.glowLine}
            x1="28.32"
            y1="12.77"
            x2="25.67"
            y2="9.68"
          />
          <line
            className={styles.glowLine}
            x1="24.02"
            y1="10.4"
            x2="25.74"
            y2="9.54"
          />
          <line
            className={styles.glowLine}
            x1="25.24"
            y1="12.19"
            x2="25.67"
            y2="9.68"
          />
          <line
            className={styles.glowLine}
            x1="28.11"
            y1="9.54"
            x2="25.74"
            y2="9.54"
          />
          <line
            className={styles.glowLine}
            x1="25.81"
            y1="9.32"
            x2="25.59"
            y2="6.38"
          />
          <line
            className={styles.glowLine}
            x1="25.45"
            y1="9.32"
            x2="23.51"
            y2="8.25"
          />
          <line
            className={styles.glowLine}
            x1="22.8"
            y1="7.24"
            x2="25.59"
            y2="6.38"
          />
          <line
            className={styles.glowLine}
            x1="23.37"
            y1="3.94"
            x2="21.58"
            y2="3.58"
          />
          <line
            className={styles.glowLine}
            x1="19.71"
            y1="4.73"
            x2="21.07"
            y2="3.73"
          />
          <line
            className={styles.glowLine}
            x1="16.77"
            y1="5.09"
            x2="15.98"
            y2="1.57"
          />
          <line
            className={styles.glowLine}
            x1="12.89"
            y1="2.15"
            x2="15.98"
            y2="1.57"
          />
          <line
            className={styles.glowLine}
            x1="21.15"
            y1="3.51"
            x2="16.62"
            y2="1.86"
          />

          {/* Static polyline */}
          <polyline
            className={styles.glowLine}
            points="23.19,29.02 13.72,30.32 8.05,28.45 3.31,23.72 1.38,16.29 5.91,14.76 3.6,11.78 1.79,15.82 1.38,15.82 3.78,7.1 12.28,12.23 8.91,16.75 11.56,20.27 14.6,17.4 15.48,21.02 11.56,20.48 15.55,25.9 9.99,24.93 7.04,19.91 5.82,15.1 8.62,16.61 7.22,19.62 6.83,20.02 3.6,23.5 9.81,24.97 13.47,29.99 14.04,29.92 15.62,26.26"
          />

          {/* Additional static lines */}
          <line
            className={styles.glowLine}
            x1="11.14"
            y1="20.48"
            x2="7.14"
            y2="20.08"
          />
          <polyline
            className={styles.glowLine}
            points="6.54,19.79 3.6,18.76 1.77,16.43"
          />
          <polyline
            className={styles.glowLine}
            points="5.43,15.35 3.6,18.58 3.42,23.25"
          />
          <line
            className={styles.glowLine}
            x1="10.16"
            y1="24.68"
            x2="11.56"
            y2="20.9"
          />
          <line
            className={styles.glowLine}
            x1="11.74"
            y1="19.66"
            x2="11.89"
            y2="14.49"
          />

          {/* Static dots */}
          <circle className={styles.glowDot} cx="28.5" cy="17.4" r="0.43" />
          <circle className={styles.glowDot} cx="26.35" cy="12.23" r="0.43" />
          <circle className={styles.glowDot} cx="26.2" cy="16.82" r="0.5" />
          <circle className={styles.glowDot} cx="5.82" cy="14.81" r="1" />
          <circle className={styles.glowDot} cx="3.31" cy="23.5" r="0.86" />
          <circle className={styles.glowDot} cx="7.04" cy="19.91" r="0.57" />
          <circle className={styles.glowDot} cx="1.52" cy="16.11" r="0.57" />
          <circle className={styles.glowDot} cx="9.99" cy="24.93" r="0.57" />
          <circle className={styles.glowDot} cx="24.63" cy="28.16" r="0.57" />
          <circle className={styles.glowDot} cx="27.42" cy="20.84" r="0.57" />
          <circle className={styles.glowDot} cx="29.29" cy="21.63" r="0.5" />
          <circle className={styles.glowDot} cx="25.2" cy="19.12" r="0.5" />
          <circle className={styles.glowDot} cx="30.87" cy="17.68" r="0.29" />
          <circle className={styles.glowDot} cx="28.43" cy="15.39" r="0.29" />
          <circle className={styles.glowDot} cx="30.58" cy="15.75" r="0.29" />
          <circle className={styles.glowDot} cx="30.87" cy="12.8" r="0.43" />
          <circle className={styles.glowDot} cx="29.29" cy="11.51" r="0.43" />
          <circle className={styles.glowDot} cx="30.08" cy="9.36" r="0.36" />
          <circle className={styles.glowDot} cx="27.78" cy="7.49" r="0.22" />
          <circle className={styles.glowDot} cx="25.63" cy="6.42" r="0.36" />
          <circle className={styles.glowDot} cx="27.5" cy="5.13" r="0.22" />
          <circle className={styles.glowDot} cx="23.55" cy="5.48" r="0.22" />
          <circle className={styles.glowDot} cx="21.32" cy="3.62" r="0.54" />
          <circle className={styles.glowDot} cx="19.6" cy="0.89" r="0.26" />
          <circle className={styles.glowDot} cx="25.77" cy="9.57" r="0.5" />
          <circle className={styles.glowDot} cx="16.16" cy="1.54" r="0.72" />
          <circle className={styles.glowDot} cx="23.91" cy="25" r="0.72" />
          <circle className={styles.glowDot} cx="8.05" cy="28.45" r="0.57" />
          <circle className={styles.glowDot} cx="8.91" cy="16.75" r="0.57" />
          <circle className={styles.glowDot} cx="3.6" cy="18.76" r="0.43" />
          <circle className={styles.glowDot} cx="11.56" cy="20.48" r="1" />
          <circle className={styles.glowDot} cx="13.72" cy="30.32" r="1" />
        </g>

        {/* Animated flowing lines */}
        <g className={styles.flowElements}>
          <line
            className={`${styles.flowLight} ${styles.delay1}`}
            x1="26.42"
            y1="25.94"
            x2="23.84"
            y2="25.15"
          />
          <line
            className={`${styles.flowLight} ${styles.delay2}`}
            x1="24.27"
            y1="23.5"
            x2="24.2"
            y2="24.79"
          />
          <line
            className={`${styles.flowLight} ${styles.delay3}`}
            x1="26.64"
            y1="23.5"
            x2="27.28"
            y2="20.99"
          />
          <line
            className={`${styles.flowLight} ${styles.delay4}`}
            x1="24.91"
            y1="22.06"
            x2="27.14"
            y2="20.91"
          />
          <line
            className={`${styles.flowLight} ${styles.delay5}`}
            x1="27.1"
            y1="20.59"
            x2="25.24"
            y2="19.16"
          />
          <line
            className={`${styles.flowLight} ${styles.delay6}`}
            x1="24.81"
            y1="20.88"
            x2="25.02"
            y2="19.23"
          />
          <line
            className={`${styles.flowLight} ${styles.delay7}`}
            x1="25.02"
            y1="17.94"
            x2="25.02"
            y2="19.16"
          />
          <line
            className={`${styles.flowLight} ${styles.delay8}`}
            x1="25.45"
            y1="18.94"
            x2="28.39"
            y2="17.5"
          />
          <line
            className={`${styles.flowLight} ${styles.delay9}`}
            x1="29.76"
            y1="19.16"
            x2="28.39"
            y2="17.5"
          />
          <line
            className={`${styles.flowLight} ${styles.delay10}`}
            x1="28.61"
            y1="17.15"
            x2="30.55"
            y2="15.71"
          />
        </g>

        {/* Animated pulsing lines */}
        <g className={styles.pulseElements}>
          <line
            className={`${styles.pulseLine} ${styles.delay1}`}
            x1="16.77"
            y1="5.09"
            x2="15.98"
            y2="1.57"
          />
          <line
            className={`${styles.pulseLine} ${styles.delay2}`}
            x1="12.89"
            y1="2.15"
            x2="15.98"
            y2="1.57"
          />
          <line
            className={`${styles.pulseLine} ${styles.delay3}`}
            x1="21.15"
            y1="3.51"
            x2="16.62"
            y2="1.86"
          />
          <line
            className={`${styles.pulseLine} ${styles.delay4}`}
            x1="11.14"
            y1="20.48"
            x2="7.14"
            y2="20.08"
          />
          <line
            className={`${styles.pulseLine} ${styles.delay5}`}
            x1="10.16"
            y1="24.68"
            x2="11.56"
            y2="20.9"
          />
          <line
            className={`${styles.pulseLine} ${styles.delay6}`}
            x1="11.74"
            y1="19.66"
            x2="11.89"
            y2="14.49"
          />
        </g>

        {/* Animated pulsing dots */}
        <g className={styles.pulseDots}>
          <circle
            className={`${styles.pulseDot} ${styles.delay1}`}
            cx="5.82"
            cy="14.81"
            r="1"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay2}`}
            cx="11.56"
            cy="20.48"
            r="1"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay3}`}
            cx="13.72"
            cy="30.32"
            r="1"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay4}`}
            cx="16.16"
            cy="1.54"
            r="0.72"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay5}`}
            cx="23.91"
            cy="25"
            r="0.72"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay6}`}
            cx="26.2"
            cy="16.82"
            r="0.5"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay7}`}
            cx="25.2"
            cy="19.12"
            r="0.5"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay8}`}
            cx="28.5"
            cy="17.4"
            r="0.43"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay9}`}
            cx="26.35"
            cy="12.23"
            r="0.43"
          />
          <circle
            className={`${styles.pulseDot} ${styles.delay10}`}
            cx="21.32"
            cy="3.62"
            r="0.54"
          />
        </g>

        {/* Main logo shapes (filled areas) */}
        <g className={styles.mainShapes}>
          <path
            className={styles.glowDot}
            d="M24.69,18.98c-0.17,0.43,0.06,0.91,0.2,1.18c0.41,0.75,0.17,1.52,0.3,2.27c0.08,0.42-0.21,0.72-0.52,0.96c-0.17,0.13-0.37,0.23-0.57,0.31c-0.39,0.17-0.61,0.54-0.92,0.79c-0.49,0.39,0.02,0.73,0.05,1.09c0.04,0.51,0.1,1.02-0.58,1.21c-0.16,0.05-0.42,0.14-0.43,0.43c-0.04,1.36-1.05,2.14-1.85,3.04c-0.27,0.31-0.67,0.4-1.03,0.46c-0.68,0.09-1.36,0.11-2.04,0.28c-0.45,0.11-0.8-0.37-0.73-0.76c0.13-0.73-0.26-1.32-0.6-1.76c-0.53-0.69-0.62-1.45-0.82-2.2c-0.16-0.6-0.29-1.23-0.66-1.71c-0.77-0.99-0.27-1.87,0.16-2.74c0.19-0.38,0.36-0.64,0.14-1.1c-0.2-0.42-0.14-0.94-0.35-1.41c-0.19-0.43-0.39-0.81-0.72-1.13c-0.43-0.42-0.67-0.8-0.47-1.54c0.38-1.35,0.15-1.5-1.33-1.43c-0.03-0.04-0.07-0.05-0.12-0.04c-0.11-0.57-0.43-0.79-1.02-0.71c-0.46,0.06-0.89,0.18-1.3,0.36c-0.35,0.15-0.67,0.26-1.08,0.11c-0.65-0.24-1.23,0.25-1.85,0.32c-0.44-0.35-0.89-0.7-1.33-1.05c-0.72-0.34-0.77-1.23-1.41-1.65c-0.39-0.26-0.68-0.61-0.65-1.16c0.01-0.16-0.05-0.3,0.05-0.49c0.34-0.7,0.46-1.44,0.04-2.15C2.99,8.33,3.55,8.05,3.33,7.6C3.11,7.16,3.44,6.91,3.92,6.88c0.07,0,0.11-0.2,0.2-0.28c0.39-0.36,0.6-0.87,1.18-1.08C5.7,5.37,6.01,5.03,5.95,4.44C5.9,4.02,6.12,3.57,6.55,3.36c0.4-0.19,0.67-0.45,0.8-0.87c0.07-0.23,0.17-0.23,0.42-0.14c0.56,0.19,1.12,0.26,1.7-0.14c0.88-0.61,1.95-0.48,2.95-0.57c0.12-0.01,0.25,0.04,0.36,0.01c0.38-0.12,0.75-0.15,1.1,0.08c-0.26,0.4,0.25,1.04-0.48,1.31c0.46,0.31,0.8,0.67,1.36,0.48C15,3.43,15.24,3.66,15.3,3.77c0.3,0.61,0.96,0.57,1.43,0.85c0.36,0.21,0.57,0.04,0.54-0.35c-0.04-0.44,0.22-0.58,0.54-0.74c0.32-0.16,0.43,0.12,0.64,0.21c0.87,0.36,1.75,0.84,2.76,0.51C22,4,22.9,4.38,22.96,5.03c0.01,0.16,0.02,0.4-0.08,0.48c-0.59,0.48-0.06,0.86,0.06,1.3c0.24,0.89,1.18,1.49,1.02,2.53c0.69,0.45,0.54,1.48,1.38,1.9c0.39,0.2,1.01,0.46,0.94,1.2C26.26,12.66,26.61,13,27,12.85c0.71-0.27,1.49-0.22,2.19-0.55c0.32,1.07-0.49,1.72-0.88,2.5c-0.47,0.94-1.45,1.41-2.16,2.13c-0.35,0.36-0.74,0.66-0.97,1.12C24.98,18.34,24.68,18.57,24.69,18.98z"
          />
          <path
            className={styles.glowDot}
            d="M28.49,21.61c0.41,0.52,0.42,1,0.27,1.58c-0.27,1.06-0.66,2.08-0.93,3.14c-0.12,0.48-0.42,0.61-0.83,0.64c-0.42,0.03-0.5-0.29-0.57-0.61c-0.01-0.05-0.01-0.12-0.04-0.14c-0.73-0.35-0.25-0.76-0.02-1.09c0.32-0.46,0.35-0.87,0.14-1.4c-0.14-0.36-0.25-0.9,0.53-0.7c0.32,0.09,0.54-0.15,0.71-0.37C28.02,22.36,28.23,22,28.49,21.61z"
          />
        </g>
      </svg>

      <div className={styles.loadingText}>LOADING...</div>
    </div>
  );
};

export { Loader };
