interface CalendarColour {
  primary: string;
  secondary: string;
}

/**
 * Colours for use in calendar events
 */
export const CalendarColors = new Map<string, CalendarColour>([
  ['red', { primary: '#ad2121', secondary: '#FAE3E3' }],
  ['blue', { primary: '#1e90ff', secondary: '#D1E8FF' }],
  ['yellow', { primary: '#e3bc08', secondary: '#FDF1BA' }],
  ['green', { primary: '#12872d', secondary: '#0ad138' }],
  ['purple', { primary: '#A52AFF', secondary: '#D3B2EA' }],
]);
