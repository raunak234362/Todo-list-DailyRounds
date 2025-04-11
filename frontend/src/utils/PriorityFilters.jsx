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
            checked={priorities.high}
            onChange={() => onChange("high")}
          />
          <span>High</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            checked={priorities.medium}
            onChange={() => onChange("medium")}
          />
          <span>Medium</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            checked={priorities.low}
            onChange={() => onChange("low")}
          />
          <span>Low</span>
        </label>
      </div>
    </div>
  )
}

export default PriorityFilters
