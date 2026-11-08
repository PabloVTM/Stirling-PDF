import { TerminalPrompt } from "@editor/ui/TerminalPrompt";

export interface SidebarHeaderProps {
  className?: string;
}

/** The PabloVTM prompt; the Stirling brand mark sits in the rail beside it. */
export function SidebarHeader({ className }: SidebarHeaderProps) {
  return (
    <div className={`file-sidebar-header${className ? ` ${className}` : ""}`}>
      <TerminalPrompt path="~/pdf" fontSize="0.95rem" />
    </div>
  );
}
