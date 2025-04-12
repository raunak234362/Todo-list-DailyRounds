import React from 'react'

const PriorityFilters = ({priorities,onChange}) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-2">Priority</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            checked={priorities.High}
            onChange={() => onChange("High")}
          />
          <span>High</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            checked={priorities.Medium}
            onChange={() => onChange("Medium")}
          />
          <span>Medium</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            checked={priorities.Low}
            onChange={() => onChange("Low")}
          />
          <span>Low</span>
        </label>
      </div>
    </div>
  )
}

export default PriorityFilters
