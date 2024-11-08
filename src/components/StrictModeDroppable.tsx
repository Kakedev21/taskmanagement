import React, { useEffect, useState } from "react"
import { Droppable, DroppableProps } from "react-beautiful-dnd"

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // This is needed for StrictMode in React 18
    // https://github.com/atlassian/react-beautiful-dnd/issues/2399
    const animation = requestAnimationFrame(() => setEnabled(true))
    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}