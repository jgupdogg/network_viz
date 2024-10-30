export function getColor(label: string | undefined): string {
    if (!label) {
      return '#888'; // Default color if label is undefined
    }
  
    // Define your color logic here
    switch (label.toLowerCase()) {
      case 'token_in':
        return '#1f77b4';
      case 'token_out':
        return '#ff7f0e';
      case 'swapper':
        return '#2ca02c';
      default:
        return '#888'; // Default color if label doesn't match any case
    }
  }
  