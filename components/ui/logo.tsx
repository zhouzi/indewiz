import * as React from "react";
import { SVGProps, forwardRef } from "react";

const Logo = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={108}
      height={22}
      fill="none"
      ref={ref}
      {...props}
    >
      <rect width={24} height={4} y={3} fill="#5C6266" rx={2} />
      <rect width={24} height={4} y={9} fill="#5C6266" rx={2} />
      <rect width={12} height={4} x={12} y={15} fill="url(#a)" rx={2} />
      <path
        fill="#5C6266"
        d="M29.562 19V3.6h2.332V19h-2.332Zm4.269 0V8.088h2.068l.176 1.914a3.75 3.75 0 0 1 1.474-1.584c.66-.396 1.415-.594 2.266-.594 1.32 0 2.354.41 3.102 1.232.763.821 1.144 2.046 1.144 3.674V19h-2.31v-6.028c0-2.112-.865-3.168-2.596-3.168-.865 0-1.584.308-2.156.924-.557.616-.836 1.496-.836 2.64V19h-2.332Zm16.849.264c-1.056 0-1.988-.25-2.794-.748a5.197 5.197 0 0 1-1.892-2.046c-.455-.865-.682-1.848-.682-2.948 0-1.1.227-2.075.682-2.926a5.04 5.04 0 0 1 1.892-2.024c.82-.499 1.76-.748 2.816-.748.865 0 1.62.169 2.266.506.66.337 1.173.814 1.54 1.43v-6.6h2.332V19h-2.09l-.242-1.694c-.352.513-.836.968-1.452 1.364-.616.396-1.408.594-2.376.594Zm.418-2.024c.997 0 1.81-.345 2.442-1.034.645-.69.968-1.577.968-2.662 0-1.1-.323-1.987-.968-2.662-.631-.69-1.445-1.034-2.442-1.034-.998 0-1.82.345-2.464 1.034-.646.675-.968 1.562-.968 2.662 0 .719.146 1.357.44 1.914.293.557.696.997 1.21 1.32a3.47 3.47 0 0 0 1.782.462Zm12.686 2.024c-1.07 0-2.024-.235-2.86-.704a5.184 5.184 0 0 1-1.936-2.002c-.47-.85-.704-1.84-.704-2.97 0-1.144.227-2.149.682-3.014a5.145 5.145 0 0 1 1.936-2.024c.836-.484 1.804-.726 2.904-.726 1.07 0 2.002.242 2.794.726.792.47 1.408 1.1 1.848 1.892a5.3 5.3 0 0 1 .66 2.618c0 .147-.008.308-.022.484 0 .161-.007.345-.022.55h-8.492c.073 1.056.418 1.863 1.034 2.42.63.543 1.356.814 2.178.814.66 0 1.21-.147 1.65-.44a2.778 2.778 0 0 0 1.012-1.232h2.332c-.294 1.027-.88 1.885-1.76 2.574-.865.69-1.944 1.034-3.234 1.034Zm0-9.526c-.777 0-1.467.235-2.068.704-.602.455-.968 1.144-1.1 2.068h6.16c-.044-.85-.345-1.525-.902-2.024-.557-.499-1.254-.748-2.09-.748Z"
      />
      <path
        fill="url(#b)"
        d="M74.708 19.022 70.55 3.6h2.508l3.058 12.76 3.52-12.76h2.574l3.41 12.76L88.678 3.6h2.508L86.962 19h-2.728L80.868 6.922 77.392 19l-2.684.022ZM92.226 19V3.6h2.332V19h-2.332Zm3.785 0v-1.804l7.348-11.616h-7.26V3.6h9.966v1.804l-7.37 11.616h7.436V19h-10.12Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1={18}
          x2={18}
          y1={15}
          y2={19}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1788E5" />
          <stop offset={1} stopColor="#095594" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={89}
          x2={89}
          y1={0}
          y2={22}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1788E5" />
          <stop offset={1} stopColor="#095594" />
        </linearGradient>
      </defs>
    </svg>
  )
);
Logo.displayName = "Logo";

export { Logo };
