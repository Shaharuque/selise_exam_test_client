export function isParkingSlotAvailable(newEntryTime:any, newExitTime:any, vehicles:any) {
    console.log('newEntryTime', newEntryTime);
    console.log('newExitTime', newExitTime);
    for (const vehicle of vehicles) {
      const entryTime = new Date(vehicle.entryDateTime);
      const exitTime = new Date(vehicle.exitDateTime);

      console.log('entryTime', entryTime);
      console.log('exitTime', exitTime);

  
      // Check for time overlap
      if (
        (newEntryTime >= entryTime && newEntryTime <= exitTime) ||
        (newExitTime >= entryTime && newExitTime <= exitTime) ||
        (newEntryTime <= entryTime && newExitTime >= exitTime)
      ) {
        // There is a time overlap, parking slot is not available
        return false;
      }
    }
  
    // No time overlap, parking slot is available
    return true;
  }