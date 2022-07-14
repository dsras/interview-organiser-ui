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
  ['yellow', { primary: '#f7db05', secondary: '#FDF1BA' }],
  ['green', { primary: '#12872d', secondary: '#0ad138' }],
  ['purple', { primary: '#c584f5', secondary: '#D3B2EA' }],
  ['grey', {primary: '#9c9c9c', secondary: '#666666'}],
  ['orange', {primary: '#eb9502', secondary: '#cc9200'}],
  ['lime', {primary: '#b8e002', secondary: '#a8cc02'}],
  
]);



export const ColorSelector = {
  CalendarColors,
  colorForInput(input: string): string{
    switch (input) {
      case 'Awaiting Completion':
        return 'yellow';
      case 'Candidate No Show':
          return 'grey';
      case 'Complete':
        return 'green';
      case 'Did Not Progress':
          return 'red';
      case 'Panel No Show':
        return 'grey';
      case 'Pending':
          return 'yellow';
      case 'Progressed':
        return 'green';
      case 'Stage1':
        return 'orange';
      case 'Stage2':
          return 'yellow';
      case 'Stage3':
        return 'lime';
      
      default:
        return 'blue';
    }
  },
  getCalColour(input:string): CalendarColour{
    for(let [key, value] of CalendarColors){
      if(key==input){
        return value;
      }
    };
    return { primary: '#1e90ff', secondary: '#D1E8FF' };
  }
}
