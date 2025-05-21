
import React from "react";

interface DemoCredentialsButtonProps {
  role: string;
  onFill: () => void;
}

const DemoCredentialsButton: React.FC<DemoCredentialsButtonProps> = ({ role, onFill }) => {
  return (
    <button 
      type="button"
      onClick={onFill}
      className="text-xs text-imo-primary hover:underline"
    >
      Gunakan akun demo
    </button>
  );
};

export default DemoCredentialsButton;
