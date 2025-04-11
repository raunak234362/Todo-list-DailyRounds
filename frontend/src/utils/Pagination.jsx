import React from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
          onPageChange(currentPage - 1)
        }
      }
    
      const handleNext = () => {
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1)
        }
      }
    
      return (
        <div className="flex items-center justify-between bg-white rounded-sm p-5 drop-shadow-xl">
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
    
          <div className="text-gray-600">
            {currentPage} / {totalPages}
          </div>
    
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )
}

export default Pagination
