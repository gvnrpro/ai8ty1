
import React from 'react';
import { 
  Circle, 
  ArrowUp, 
  Settings, 
  TrendingUp, 
  MousePointer,
  Infinity
} from 'lucide-react';

interface IconSystemProps {
  name: 'home' | 'about' | 'metrics' | 'services' | 'contact' | 'infinity';
  size?: number;
  className?: string;
}

const IconSystem: React.FC<IconSystemProps> = ({ name, size = 24, className = '' }) => {
  const iconProps = { size, className };

  switch (name) {
    case 'home':
      return <Circle {...iconProps} />;
    case 'about':
      return <ArrowUp {...iconProps} />;
    case 'metrics':
      return <TrendingUp {...iconProps} />;
    case 'services':
      return <Settings {...iconProps} />;
    case 'contact':
      return <MousePointer {...iconProps} />;
    case 'infinity':
      return <Infinity {...iconProps} />;
    default:
      return <Circle {...iconProps} />;
  }
};

export default IconSystem;
