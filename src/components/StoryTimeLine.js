import React, { useState, useMemo, useEffect, useCallback } from 'react';

// Example intervals with start/end dates (YYYY-MM)
const intervals = [
  // { title: 'Born', color: 'bg-yellow-300', start: '2000-01', end: '2000-01' },
  { title: 'Bachelor\'s Education', color: 'bg-blue-300', start: '2018-09', end: '2023-03' },
  { title: 'Master\'s Education', color: 'bg-green-300', start: '2023-09', end: '2025-05' },
  { title: 'Part Software Group', color: 'bg-purple-300', start: '2020-04', end: '2020-08' },
  { title: 'Smart Construction Group', color: 'bg-pink-300', start: '2020-10', end: '2021-09' },
  { title: 'Neshan Maps & Navigator', color: 'bg-orange-300', start: '2021-08', end: '2025-02' },
  { title: 'Mitacs Internship', color: 'bg-indigo-400', start: '2025-01', end: '2025-05' },
];

// Helper function to convert YYYY-MM to months since a base year (e.g., 2000)
function dateToMonths(dateStr) {
  const [year, month] = dateStr.split('-').map(Number);
  return (year - 2000) * 12 + (month - 1); // Base year 2000
}

// Find min and max months for scaling
const minTimelineDate = '2018-07'; // Start timeline a bit before the first event for padding
const maxTimelineDate = '2025-06'; // End timeline a bit after the last event for padding

const minMonth = dateToMonths(minTimelineDate);
const maxMonth = dateToMonths(maxTimelineDate);
const totalMonthsInRange = maxMonth - minMonth + 1;

// Assign rows to avoid overlap
function assignRowsToIntervals(intervalsToAssign) {
  const rows = []; // Tracks the end month of the last interval in each row
  const result = [];
  // Sort intervals by start date, then by duration, to improve packing
  const sortedIntervals = [...intervalsToAssign].sort((a, b) => {
    const startDiff = dateToMonths(a.start) - dateToMonths(b.start);
    if (startDiff !== 0) return startDiff;
    return (dateToMonths(a.end) - dateToMonths(a.start)) - (dateToMonths(b.end) - dateToMonths(b.start));
  });

  sortedIntervals.forEach((interval) => {
    let row = 0;
    // Find the first row where this interval doesn't overlap
    while (
      rows[row] && // Check if row exists
      rows[row].some( // Check if any interval in this row overlaps
        (other) =>
          !(dateToMonths(interval.end) < dateToMonths(other.start) ||
            dateToMonths(interval.start) > dateToMonths(other.end))
      )
    ) {
      row++;
    }
    if (!rows[row]) rows[row] = [];
    rows[row].push(interval);
    result.push({ ...interval, row });
  });
  return result;
}

// const intervalsWithRows = assignRows(intervals); // Original non-memoized

// Modal component for displaying interval details
function IntervalModal({ isOpen, onClose, interval }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-xl font-bold mb-4 text-gray-800">{interval.title}</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium text-gray-700">{interval.start} to {interval.end}</p>
          </div>
          {/* Add more details here as needed */}
        </div>
      </div>
    </div>
  );
}

export default function StoryTimeline() {
  const [selectedInterval, setSelectedInterval] = useState(null);
  const [timelineDimensions, setTimelineDimensions] = useState({
    width: 0,
    pxPerMonth: 0,
  });

  const intervalsWithRows = useMemo(() => assignRowsToIntervals(intervals), []);

  const calculateTimelineDimensions = useCallback(() => {
    const screenWidth = window.innerWidth;
    // Adjust overall padding based on screen size
    const horizontalPadding = screenWidth < 768 ? 32 : 80; // e.g., 32px for mobile, 80px for desktop
    const availableWidth = screenWidth - horizontalPadding;
    
    // Determine pxPerMonth dynamically, with a minimum for readability
    // Let's say minimum 10px per month on small screens, up to 30-50px on larger ones
    let calculatedPxPerMonth = availableWidth / totalMonthsInRange;
    if (screenWidth < 768) { // Mobile
        calculatedPxPerMonth = Math.max(15, calculatedPxPerMonth);
    } else if (screenWidth < 1024) { // Tablet
        calculatedPxPerMonth = Math.max(20, calculatedPxPerMonth);
    } else { // Desktop
        calculatedPxPerMonth = Math.max(25, calculatedPxPerMonth);
    }
    
    const newTimelineWidth = totalMonthsInRange * calculatedPxPerMonth;

    setTimelineDimensions({
      width: newTimelineWidth,
      pxPerMonth: calculatedPxPerMonth,
    });
  }, [totalMonthsInRange]);

  useEffect(() => {
    calculateTimelineDimensions();
    window.addEventListener('resize', calculateTimelineDimensions);
    return () => window.removeEventListener('resize', calculateTimelineDimensions);
  }, [calculateTimelineDimensions]);

  const { width: finalTimelineWidth, pxPerMonth } = timelineDimensions;

  const maxRow = Math.max(0, ...intervalsWithRows.map(i => i.row));
  // Increase base height per row and overall padding slightly for better spacing
  const timelineHeight = (maxRow + 1) * 100 + 80; // 100px per row, 80px vertical padding

  if (finalTimelineWidth === 0) {
    return <div className="text-center p-10">Loading timeline...</div>; // Or a spinner
  }

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-6 text-center px-4 sm:px-6 lg:px-8"
        style={{ color: '#fffbe6' }}
      >
        My Story Timeline
      </h2>
      
      {/* Outer container for scrolling on small screens */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-4 px-4 sm:px-6 lg:px-8">
        <div
          className="relative mx-auto px-5 py-10" // Centering via mx-auto, padding for content
          style={{
            height: `${timelineHeight}px`,
            width: `${finalTimelineWidth}px`,
            minWidth: '100%', // Ensure it tries to fill container before becoming scrollable
            background: 'radial-gradient(circle at center bottom, rgb(104 32 207) 0%, rgb(30 28 30) 70%)',
            borderRadius: '16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Year markers */}
          <div className="absolute top-4 left-0 right-0 h-8 flex items-center" style={{ zIndex: 1 }}>
            {Array.from({ length: Math.floor(totalMonthsInRange / 12) + 2 }).map((_, yearIndex) => {
              const year = 2000 + Math.floor(minMonth / 12) + yearIndex;
              if (year === 2018) {
                return null;
              }
              // Calculate the month number for the first month of this year (e.g., Jan 2018 -> (2018-2000)*12 + 0)
              const firstMonthOfYearInTimeline = (year - 2000) * 12;
              // Position relative to the start of the timeline range (minMonth)
              let leftPosition = (firstMonthOfYearInTimeline - minMonth) * pxPerMonth;
              
              // Ensure marker is not placed before the timeline actual start
              leftPosition = Math.max(0, leftPosition);

              // Only render if the year marker would be visible within the current timeline width
              if (leftPosition < finalTimelineWidth) {
                return (
                  <div
                    key={`year-${year}`}
                    className="absolute text-xs sm:text-sm font-medium"
                    style={{
                      left: `${leftPosition}px`,
                      color: 'rgba(255, 255, 255, 0.7)',
                      // Centering year text more accurately
                      transform: 'translateX(-50%)', 
                      marginLeft: '1px', // Small adjustment if needed for perfect centering over tick
                      padding: '2px 5px',
                      // width: `${12 * pxPerMonth}px`, // Optional: give it a width of a year for centering
                      // textAlign: 'center',
                    }}
                  >
                    {/* Optional: Add a small tick mark */}
                    {/* <span className="absolute top-full left-1/2 w-px h-2 bg-gray-400 -translate-x-1/2"></span> */}
                    {year}
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Intervals */}
          {intervalsWithRows.map((interval, idx) => {
            const left = (dateToMonths(interval.start) - minMonth) * pxPerMonth;
            const currentIntervalWidth = (dateToMonths(interval.end) - dateToMonths(interval.start) + 1) * pxPerMonth;
            // Ensure minimum width for very short intervals for text readability
            const displayWidth = Math.max(currentIntervalWidth, pxPerMonth * 1.5); // Min width of 1.5 months

            return (
              <div
                key={idx}
                className={`absolute flex flex-col justify-center items-center p-2 rounded-md shadow-lg ${interval.color}
                  transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-xl hover:opacity-100`}
                style={{
                  left: `${left}px`,
                  top: `${interval.row * 80 + 50}px`, // Adjusted top spacing: 80px per row, 50px base offset from top
                  width: `${displayWidth}px`,
                  height: '60px', // Fixed height for intervals
                  zIndex: 2,
                  opacity: 0.9,
                }}
                onClick={() => setSelectedInterval(interval)}
              >
                <span className="font-semibold text-xs sm:text-sm text-gray-800 text-center truncate w-full px-1">{interval.title}</span>
                <span className="text-xxs sm:text-xs text-gray-700 mt-0.5 truncate w-full px-1 text-center">
                  {interval.start.substring(0,7)} - {interval.end.substring(0,7)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <IntervalModal
        isOpen={selectedInterval !== null}
        onClose={() => setSelectedInterval(null)}
        interval={selectedInterval}
      />
    </div>
  );
}

// Add text-xxs to Tailwind JIT if not present
// In your tailwind.config.js or global.css:
// For config:
// theme: {
//   extend: {
//     fontSize: {
//       'xxs': '0.65rem', // customize as needed
//     },
//   },
// },
// For global.css:
// @layer base {
//   .text-xxs {
//     font-size: 0.65rem; /* Example size */
//     line-height: 0.85rem; /* Example line height */
//   }
// }