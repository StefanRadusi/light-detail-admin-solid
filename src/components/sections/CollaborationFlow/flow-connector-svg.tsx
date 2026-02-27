import clsx from "clsx";
import "./flow-connector-svg.css";

interface FlowConnectorProps {
  animate?: boolean;
}

export const FlowConnector = (props: FlowConnectorProps) => {
  return (
    <svg viewBox="0 0 163 120" fill="none" class="w-[130px]">
      <circle
        cx="147"
        cy="16"
        r="16"
        fill="#F1B434"
        class={clsx(
          "flow-connector-circle-first",
          props.animate && "flow-connector-circle-first--animated"
        )}
      />
      <circle
        cx="5"
        cy="115.5"
        r="4.5"
        fill="black"
        class={clsx(
          "flow-connector-circle-final",
          props.animate && "flow-connector-circle-final--animated"
        )}
      />
      <path
        d="M147 32V40.8941C147 58.5672 132.673 72.8941 115 72.8941H37C19.3269 72.8941 5 87.221 5 104.894V111"
        stroke="black"
        stroke-width="2"
        class={clsx(
          "flow-connector-path",
          props.animate && "flow-connector-path--animated"
        )}
      />
      <path
        d="M147 32V40.8941C147 58.5672 132.673 72.8941 115 72.8941H37C19.3269 72.8941 5 87.221 5 104.894V111"
        stroke="black"
        stroke-width="3"
        class={clsx("flow-connector-dashed")}
      />
    </svg>
  );
};
