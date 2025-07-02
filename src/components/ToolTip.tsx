import type { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="relative group">
  {children}
  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                  opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-700
                  bg-gray-800 text-white text-xs rounded py-1 px-2 z-50 pointer-events-none">
    {text}
  </div>
</div>

  );
};

export default Tooltip;
