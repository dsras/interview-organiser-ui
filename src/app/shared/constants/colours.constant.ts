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
  ['grey', {primary: '#9c9c9c', secondary: '#666666'}]
]);

export const ColorSelector = {
  CalendarColors,
  colorForInput(input: string){
    switch (input) {
      case 'Awaiting Completion':
        return CalendarColors.get('yellow');
      case 'Candidate No Show':
          return CalendarColors.get('grey');
        case 'Complete':
        return CalendarColors.get('green');
      case 'Did Not Progress':
          return CalendarColors.get('red');
        case 'Panel No Show':
        return CalendarColors.get('grey');
      case 'Pending':
          return CalendarColors.get('yellow');
      case 'Progressed':
        return CalendarColors.get('green');
      default:
        return undefined;
    }
  }
}