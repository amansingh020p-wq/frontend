// 'use client';
// import React from 'react';
// import { cn } from '@/lib/utils';
// import { 
//   Check, 
//   X, 
//   Eye, 
//   Edit, 
//   Trash 
// } from 'lucide-react';

// type ActionType = 'view' | 'edit' | 'delete' | 'accept' | 'reject';

// interface ActionButtonProps {
//   type: ActionType;
//   onClick: () => void;
//   className?: string;
// }

// const ActionButton = ({ type, onClick, className }: ActionButtonProps) => {
//   const iconMap: Record<ActionType, React.ReactNode> = {
//     view: <Eye size={16} />,
//     edit: <Edit size={16} />,
//     delete: <Trash size={16} />,
//     accept: <Check size={16} />,
//     reject: <X size={16} />
//   };

//   const classMap: Record<ActionType, string> = {
//     view: 'bg-info/20 text-info hover:bg-info/30',
//     edit: 'bg-warning/20 text-warning hover:bg-warning/30',
//     delete: 'bg-destructive/20 text-destructive hover:bg-destructive/30',
//     accept: 'bg-success/20 text-success hover:bg-success/30',
//     reject: 'bg-destructive/20 text-destructive hover:bg-destructive/30'
//   };

//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         'p-1.5 rounded transition-colors',
//         classMap[type],
//         className
//       )}
//     >
//       {iconMap[type]}
//     </button>
//   );
// };

// export default ActionButton;


'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Check, 
  X, 
  Eye, 
  Edit, 
  Trash 
} from 'lucide-react';

type ActionType = 'view' | 'edit' | 'delete' | 'accept' | 'reject';

interface ActionButtonProps {
  type: ActionType;
  onClick: () => void;
  className?: string;
}

const ActionButton = ({ type, onClick, className }: ActionButtonProps) => {
  const iconMap = {
    view: <Eye size={16} />,
    edit: <Edit size={16} />,
    delete: <Trash size={16} />,
    accept: <Check size={16} />,
    reject: <X size={16} />
  };

  const classMap = {
    view: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30',
    edit: 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30',
    delete: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
    accept: 'bg-green-500/20 text-green-400 hover:bg-green-500/30',
    reject: 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'p-1.5 rounded transition-colors',
        classMap[type],
        className
      )}
    >
      {iconMap[type]}
    </button>
  );
};

export default ActionButton;