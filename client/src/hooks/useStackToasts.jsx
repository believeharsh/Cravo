import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const useToastStack = () => {
  const [activeToastIds, setActiveToastIds] = useState([]);
  const activeToastIdsRef = useRef(activeToastIds);

  // for Keeping the ref in sync with state
  useEffect(() => {
    activeToastIdsRef.current = activeToastIds;
  }, [activeToastIds]);

  const showStackedToast = (CustomToastComponent, props, options = {}) => {
    // Dismiss any existing toasts to prevent the stack from getting too large
    if (activeToastIdsRef.current.length >= 3) {
      toast.dismiss(
        activeToastIdsRef.current[activeToastIdsRef.current.length - 1]
      );
    }

    const newToastId = toast.custom(
      t => {
        const index = activeToastIdsRef.current.findIndex(id => id === t.id);
        const stackIndex =
          index !== -1 ? index : activeToastIdsRef.current.length;
        return (
          <CustomToastComponent
            {...props}
            t={t}
            stackIndex={stackIndex}
            onDismiss={() => handleDismiss(t.id)}
          />
        );
      },
      {
        ...options,
        position: 'bottom-right',
      }
    );

    setActiveToastIds(prevIds => [newToastId, ...prevIds]);

    return newToastId;
  };

  const handleDismiss = id => {
    toast.dismiss(id);
    setActiveToastIds(prevIds => prevIds.filter(toastId => toastId !== id));
  };

  // Clean up toasts when the component unmounts
  useEffect(() => {
    return () => {
      activeToastIdsRef.current.forEach(id => toast.dismiss(id));
    };
  }, []);

  return { showStackedToast };
};
