import "@editor/ui/TerminalPrompt.css";

interface TerminalPromptProps {
  /** Path shown after the host, e.g. "~/stirling-pdf". */
  path?: string;
  cursor?: boolean;
  fontSize?: string;
  className?: string;
}

/** "pablo@vtm:~/stirling-pdf_": the title of the PabloVTM terminal theme. */
export function TerminalPrompt({
  path = "~/stirling-pdf",
  cursor = true,
  fontSize = "1rem",
  className,
}: TerminalPromptProps) {
  return (
    <span
      className={`terminal-prompt${className ? ` ${className}` : ""}`}
      style={{ fontSize }}
      aria-label={`pablo@vtm:${path}`}
      title={`pablo@vtm:${path}`}
    >
      <span className="terminal-prompt__user" aria-hidden="true">
        pablo@vtm
      </span>
      <span className="terminal-prompt__sep" aria-hidden="true">
        :
      </span>
      <span className="terminal-prompt__path" aria-hidden="true">
        {path}
      </span>
      {cursor && (
        <span className="terminal-prompt__cursor" aria-hidden="true">
          _
        </span>
      )}
    </span>
  );
}
